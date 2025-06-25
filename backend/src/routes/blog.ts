import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlog, updateBlog } from '@kranti_sambhav/common';

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string; // Here you define the type of your environment variable because if we do not then it will give a type error. 
    JWT_SECRET: string; // typescript cannot understand by itself the toml file and so it will declared here. 
  },
  Variables: {
    userId: string; // This is extra added to the c context variable. 
  }
}>();

blogRouter.use('/*', async (c, next) => {
  // Here we check the header and then if it is correct then we proceed otherwise we return. 
  // This is a middleware to get the user and if the user is not authorised then we return from here. 
  const response = await verify(c.req.header('authorization') || '', c.env.JWT_SECRET);
  if (response) {
    c.set("userId", response.id as string);
    await next();
  } else {
    return c.json({ Message: 'Not a valid user' });
  }
});  

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // This is the edge DB URL. 
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            email: true
          }
        }
      }
    });

    return c.json({
      blog: blog
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return c.json({
      error: 'Internal Server Error'
    }, 500);
  }
});


blogRouter.get('/:id', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const blog = await prisma.post.findUnique({
    where: {    
      id: id
    },
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          email: true
        }
      }
    }
  })
  return c.json({
    blog: blog
  });
});

blogRouter.post('/', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  
  const body = await c.req.json();
  const {success} = createBlog.safeParse(body);
  if(!success){
    return c.json({
      message: "The input body is invalid"
    })
  }
  try{
    const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })
    return c.json({
      blog: blog
    })
  }catch(e){
    console.log(e);
    return c.json({
      message: "Error in creating the blog"
    })
  }

});

blogRouter.put('/', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = updateBlog.safeParse(body);
  if(!success){
    return c.json({
      message: "Invalid inputs"
    })
  }
  const blog = await prisma.post.update({
    where: {
      id: body.id // This is the id of the post 
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  return c.json({
    blog
  });
});

export default blogRouter;
