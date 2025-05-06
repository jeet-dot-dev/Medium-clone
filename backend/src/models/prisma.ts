import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';


export const getPrisma = (c :Context)=>{
    return new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
}