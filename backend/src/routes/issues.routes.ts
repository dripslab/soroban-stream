import { Router } from "express";
import { z } from "zod";
import { IssueRequest } from "../models/IssueRequest.js";
import { createGithubIssue } from "../services/githubIssue.service.js";

const router = Router();

const createIssueSchema = z.object({
  title: z.string().trim().min(8).max(120),
  description: z.string().trim().min(20).max(10_000),
  labels: z.array(z.string().trim().min(1).max(50)).max(10).optional(),
  requesterWallet: z.string().trim().max(128).optional()
});

router.post("/", async (req, res, next) => {
  try {
    const payload = createIssueSchema.parse(req.body);
    const labels = payload.labels?.length
      ? payload.labels
      : ["drips:medium", "needs-triage"];

    const body = [
      payload.description,
      "",
      "---",
      "Created from the Soroban Stream contributor workflow.",
      payload.requesterWallet
        ? `Requester wallet: ${payload.requesterWallet}`
        : undefined
    ]
      .filter(Boolean)
      .join("\n");

    const githubIssue = await createGithubIssue({
      title: payload.title,
      body,
      labels
    });

    const issueRequest = await IssueRequest.create({
      title: payload.title,
      body,
      labels,
      requesterWallet: payload.requesterWallet,
      githubIssueNumber: githubIssue.number,
      githubIssueUrl: githubIssue.url,
      status: "created"
    });

    res.status(201).json({
      message: "Issue created successfully",
      issue: {
        id: issueRequest.id,
        number: githubIssue.number,
        url: githubIssue.url,
        title: githubIssue.title,
        labels
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid issue payload",
        errors: error.flatten().fieldErrors
      });
      return;
    }

    try {
      await IssueRequest.create({
        title: req.body?.title ?? "Unknown issue request",
        body: req.body?.description ?? "Issue creation failed before validation",
        labels: req.body?.labels ?? [],
        requesterWallet: req.body?.requesterWallet,
        status: "failed",
        errorMessage:
          error instanceof Error ? error.message : "Unknown issue creation error"
      });
    } catch {
      // Preserve the original API failure if audit logging also fails.
    }

    next(error);
  }
});

export default router;
