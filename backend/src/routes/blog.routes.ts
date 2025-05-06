import { Hono } from "hono";
import {
  createBlogHandler,
  getBlogbyIdHandler,
  updateBlogHandler,
} from "../controllers/blog.controller";
const blogRoutes = new Hono();

blogRoutes.post("/blog", createBlogHandler);
blogRoutes.put("/blog", updateBlogHandler);
blogRoutes.get("/blog/:id", getBlogbyIdHandler);

export default blogRoutes;
