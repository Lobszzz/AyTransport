import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add your API routes here
  // All routes should be prefixed with /api
  
  // Example:
  // app.get("/api/items", async (req, res) => {
  //   const items = await storage.getAllItems();
  //   res.json(items);
  // });

  const httpServer = createServer(app);

  return httpServer;
}
