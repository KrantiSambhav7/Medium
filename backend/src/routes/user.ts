import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signupInput } from "@kranti_sambhav/common";
import { signinInput } from "@kranti_sambhav/common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    return c.json({
      message: "Input invalid"
    })
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const payload = {
    email: user.email,
    id: user.id,
  };

  const token = await sign(payload, c.env.JWT_SECRET);

  return c.json({ token: token });
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    return c.json({
      message: "Input is invalid"
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return c.json({
      message: "User not found",
    });
  }

  const payload = {
    id: user.id,
  };

  const token = await sign(payload, c.env.JWT_SECRET);

  return c.json({
    token: token,
  });
});

export default userRouter;
