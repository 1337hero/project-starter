import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { db, users } from "./db";

const app = new Hono();

app.use('/*', serveStatic({ root: './dist' }));
//app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

app.get("/server/users", async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

export default {
  port: 3050,
  fetch: app.fetch,
};
