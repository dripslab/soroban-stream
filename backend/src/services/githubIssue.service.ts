import { Octokit } from "@octokit/rest";
import { env } from "../config/env.js";

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN
});

export interface CreateGithubIssueInput {
  title: string;
  body: string;
  labels?: string[];
}

export async function createGithubIssue(input: CreateGithubIssueInput) {
  const response = await octokit.issues.create({
    owner: env.GITHUB_OWNER,
    repo: env.GITHUB_REPO,
    title: input.title,
    body: input.body,
    labels: input.labels ?? []
  });

  return {
    number: response.data.number,
    url: response.data.html_url,
    title: response.data.title
  };
}
