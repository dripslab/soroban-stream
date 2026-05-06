import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import issueRoutes from "./routes/issues.routes.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "soroban-stream-backend" });
});

app.use("/api/issues", issueRoutes);

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(error);
    res.status(500).json({
      message: "Issue creation failed",
      error:
        env.NODE_ENV === "production"
          ? "Internal server error"
          : error instanceof Error
            ? error.message
            : "Unknown error"
    });
  }
);

await connectDatabase();

app.listen(env.PORT, () => {
  console.log(`Backend API listening on http://localhost:${env.PORT}`);
});
