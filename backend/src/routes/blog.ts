import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { createBlog, updateBlog } from '@kranti_sambhav/common';

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string; // Here you define the type of your environment variable
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

blogRouter.use('/*', async (c, next) => {
  // Here we check the header and then if it is correct then we proceed otherwise we return
  const response = await verify(c.req.header('authorization') || '', c.env.JWT_SECRET);
  if (response) {
    c.set("userId", response.id as string);
    await next();
  } else {
    return c.json({ Message: 'Not a valid user' });
  }
});  

blogRouter.get('/bulk', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
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
  })
  return c.json({
    blog: blog
  });
});

blogRouter.get('/:id', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const parameter = c.req.param("id");
  const body = await c.req.json();
  const blog = await prisma.post.findFirst({
    where: {    
      id: parameter
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
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })
  return c.json({
    blogId: blog.id
  })
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
      id: body.id
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
