import { Context } from "hono";
import { getPrisma } from "../models/prisma";
import { hashPassword, verifyPassword } from "../utils/crypto";
import { sign } from "hono/jwt";

// for sign up
const signupHandler = async (c: Context) => {
  const prisma = getPrisma(c);
  const { email, password } = await c.req.json();

  //hashing the password
  const { hash, salt } = await hashPassword(password);

  // storing it to db
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        salt,
      },
    });

    // creating jwt token
    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "Signup successful", userId: user.id, token });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Failed to sign up user" }, 500);
  }
};

// for signin
const signinHandler = async (c: Context) => {
  try {
    const prisma = getPrisma(c);
    const { email, password } = await c.req.json();
    // check email exists or not
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return c.text("Invalid credentials", 401);

    // checking the password
    const valid = await verifyPassword(password, user.passwordHash, user.salt);
    if (!valid) return c.text("Invalid credentials", 401);

    // creating jwt
    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    return c.json({ message: "Signin successful", userId: user.id, token });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Failed to sign in user" }, 500);
  }
};

export { signinHandler, signupHandler };
