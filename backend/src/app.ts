// app.ts
import { Hono } from "hono";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//cors
app.use(cors()) ;

app.route("/api/v1", authRoutes);
app.route("/api/v1", blogRoutes);
app.get("/", (c) => c.text("Hello Welcome!"));
app.get("*", (c) => c.text("404 Page Not Found"));

export default app;
