import { Context } from "hono";
import { getPrisma } from "../models/prisma";

//Create the route to initialize a blog/post
const createBlogHandler = async (c: Context) => {
  try {
    const { title, content } = await c.req.json();
    //console.log("title :", title, "cntent :", content);
    if (!title || !content) {
      return c.json({ error: "Missing components " }, 400);
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

const updateBlogHandler = async (c: Context) => {
  try {
    // getting the postId from body
    const {postId , title , content} = await c.req.json();
    // getting the userId from middleware
    const token = c.get("jwtPayload");
    const userId = token.userId;
    if(!postId || !userId){
     return c.json({ error: "Missing jwt token" }, 400);
    }
    const client = getPrisma(c);
    // db call for updating the post
    const updated_post = await client.post.update({
      where : {
         id : postId ,
         authorId : userId
      } ,
      data:{
         title ,
         content ,
      }
    })
    return c.json({ message: "Post updated successfully", post: updated_post });

  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    return c.json({ error: "An error occurred while updating the post" }, 500);
  }
};

const getBlogbyIdHandler = async () => {
  
};

export { createBlogHandler, updateBlogHandler, getBlogbyIdHandler };
