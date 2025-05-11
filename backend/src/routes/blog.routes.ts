import { Hono } from "hono";
import {
  createBlogHandler,
  getBlogbyIdHandler,
  updateBlogHandler,
  getAllBlogPosts
} from "../controllers/blog.controller";
import authmiddleware from "../middlewares/auth.middleware";

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRoutes.post("/blog", authmiddleware, createBlogHandler);
blogRoutes.put("/blog", authmiddleware, updateBlogHandler);
blogRoutes.get("/blog/bulk",getAllBlogPosts);
blogRoutes.get("/blog/:id", getBlogbyIdHandler);


export default blogRoutes;
