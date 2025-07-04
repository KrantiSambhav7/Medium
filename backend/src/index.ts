import { Hono } from 'hono';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors';
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string; // Here u define the type of our environment variable
    JWT_SECRET: string;
  };
}>();

app.use("/*" , cors());
app.route("/api/v1/user" , userRouter);
app.route("/api/v1/blog" , blogRouter);

export default app;
 