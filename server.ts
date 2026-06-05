import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const LETTER_FILE = path.join(process.cwd(), "letter.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API configuration endpoints for reading/writing letter content
  app.get("/api/letter", (req, res) => {
    try {
      if (fs.existsSync(LETTER_FILE)) {
        const data = fs.readFileSync(LETTER_FILE, "utf-8");
        res.json(JSON.parse(data));
      } else {
        res.json({ content: "" });
      }
    } catch (err) {
      console.error("Failed to read letter file", err);
      res.status(500).json({ error: "Failed to read letter file" });
    }
  });

  app.post("/api/letter", (req, res) => {
    try {
      const { content } = req.body;
      fs.writeFileSync(LETTER_FILE, JSON.stringify({ content }, null, 2), "utf-8");
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to write letter file", err);
      res.status(500).json({ error: "Failed to write letter file" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
