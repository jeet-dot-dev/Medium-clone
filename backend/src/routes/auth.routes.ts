import { Hono } from "hono";
import { signinHandler, signupHandler } from "../controllers/auth.controller";
const authRoutes = new Hono() ;

authRoutes.post('/signup',signupHandler);
authRoutes.post('/signin',signinHandler);

export default authRoutes ;