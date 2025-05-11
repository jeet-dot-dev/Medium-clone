    import { Context, Next } from "hono";
    import { verify } from "hono/jwt";

    const authmiddleware = async (c: Context, next: Next) => {
    try {
        // get the jwt token
        const authHeader = c.req.header("Authorization");
        //console.log("token  : ", authHeader);

        // check the authHeader
        if (!authHeader || !authHeader.startsWith("Bearer")) {
        return c.json({ error: "Unauthorized - No token provided" }, 401);
        }

        // Extract the token
        const token = authHeader.split(" ")[1]; // "Bearer xg4775648758574" -> ["Bearer", "xg4775648758574"]

        // verify the token
        const decoded = await verify(token, c.env.JWT_SECRET);
       // console.log("decode",decoded);

        if (!decoded) {
        return c.json({ error: "Varification failed" }, 401);
        }

        c.set("jwtPayload", decoded);

        await next();
    } catch (error) {
        console.error("Auth error:", error);
        return c.json({ error: "Unauthorized - Invalid token" }, 401);
    }
    };

    export default authmiddleware;
