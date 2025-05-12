import { Context } from "hono";
import { getPrisma } from "../models/prisma";
import { craeteblogtype, updateblogtype } from "@jeet-dot-dev/medium-common";

//Create the route to initialize a blog/post
const createBlogHandler = async (c: Context) => {
  try {
    const { title, content } = await c.req.json();
    //console.log("title :", title, "cntent :", content);
    //type check
    const { success } = craeteblogtype.safeParse({ title, content });
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const jwtPayload = c.get("jwtPayload");
    if (!jwtPayload) {
      return c.json({ error: "Missing jwt token" }, 400);
    }
    const authorId = jwtPayload.userId;
    console.log(authorId);
    const client = getPrisma(c);
    // db call
    const post = await client.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    console.log(post);
    return c.json({ message: "Post successfully posted ", post: post }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "error" }, 500);
  }
};

//Create the route to update blog
const updateBlogHandler = async (c: Context) => {
  try {
    // getting the postId from body
    const { postId, title, content } = await c.req.json();
    // zod type check
    const { success } = updateblogtype.safeParse({ postId, title, content });
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    // getting the userId from middleware
    const token = c.get("jwtPayload");
    const userId = token.userId;
    if (!postId || !userId) {
      return c.json({ error: "Missing jwt token" }, 400);
    }
    const client = getPrisma(c);
    // db call for updating the post
    const updated_post = await client.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        title,
        content,
      },
    });
    return c.json({ message: "Post updated successfully", post: updated_post });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return c.json({ error: "An error occurred while updating the post" }, 500);
  }
};

//Create the route to get a blog
const getBlogbyIdHandler = async (c: Context) => {
  try {
    const postId = c.req.param("id");
    if (!postId) {
      return c.json({ error: "Missing params" }, 400);
    }
    const client = getPrisma(c);
    // db call to get post
    const post = await client.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return c.json({ error: "Cannot find the post" }, 400);
    }

    return c.json({ message: "succesfully get the post", post: post }, 200);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return c.json({ error: "An error occurred while getting the post" }, 500);
  }
};

//Create the route to get all blogs
const getAllBlogPosts = async (c: Context) => {
  try {
    const client = getPrisma(c);
    const data = await client.post.findMany({});

    // Optional: If you want to return a different status for empty array
    if (!data || data.length === 0) {
      return c.json({ error: "No posts found" }, 404); // 404 is more accurate than 400
    }

    return c.json({ data }, 200);
  } catch (error) {
    console.error(error); // Good practice to log the error
    return c.json({ error: "An error occurred while getting the posts" }, 500);
  }
};

export {
  createBlogHandler,
  updateBlogHandler,
  getBlogbyIdHandler,
  getAllBlogPosts,
};
