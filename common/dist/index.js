import { z } from "zod";
export const craeteblogtype = z.object({
    title: z.string(),
    content: z.string(),
});
export const updateblogtype = z.object({
    postId: z.string(),
    title: z.string(),
    content: z.string(),
});
// user
// signup backend
export const signuptype = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});
//signin backend
export const signintype = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
