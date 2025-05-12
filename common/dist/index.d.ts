import { z } from "zod";
export declare const craeteblogtype: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateblogtype: z.ZodObject<{
    postId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    postId: string;
}, {
    title: string;
    content: string;
    postId: string;
}>;
export type CreateBlogType = z.infer<typeof craeteblogtype>;
export type UpdateBlogType = z.infer<typeof updateblogtype>;
export declare const signuptype: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signintype: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignupType = z.infer<typeof signuptype>;
export type SigninType = z.infer<typeof signintype>;
