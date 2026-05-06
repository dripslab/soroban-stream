import { Schema, model } from "mongoose";

export type IssueRequestStatus = "created" | "failed";

export interface IssueRequestDocument {
  title: string;
  body: string;
  labels: string[];
  requesterWallet?: string;
  githubIssueNumber?: number;
  githubIssueUrl?: string;
  status: IssueRequestStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const issueRequestSchema = new Schema<IssueRequestDocument>(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    labels: { type: [String], default: [] },
    requesterWallet: { type: String, trim: true },
    githubIssueNumber: Number,
    githubIssueUrl: String,
    status: {
      type: String,
      enum: ["created", "failed"],
      required: true
    },
    errorMessage: String
  },
  { timestamps: true }
);

export const IssueRequest = model<IssueRequestDocument>(
  "IssueRequest",
  issueRequestSchema
);
