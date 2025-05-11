import { Hono } from "hono";
import { signinHandler, signupHandler } from "../controllers/auth.controller";

const authRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      };
}>() ;

authRoutes.post('/signup',signupHandler);
authRoutes.post('/signin',signinHandler);

export default authRoutes ;