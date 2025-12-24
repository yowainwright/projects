import { Octokit } from 'octokit';
import matter from 'gray-matter';
import type { Project } from '@/data/projects-generated';

const REPO_OWNER = 'yowainwright';
const REPO_NAME = 'projects';
const CONTENT_PATH = 'content';

interface CreatePRParams {
  token: string;
  projectId: string;
  changes: Partial<Project>;
  commitMessage?: string;
}

export async function createProjectEditPR({
  token,
  projectId,
  changes,
  commitMessage,
}: CreatePRParams): Promise<string> {
  const octokit = new Octokit({ auth: token });

  const { data: repo } = await octokit.rest.repos.get({
    owner: REPO_OWNER,
    repo: REPO_NAME,
  });
  const defaultBranch = repo.default_branch;

  const filePath = `${CONTENT_PATH}/${projectId}.mdx`;
  const { data: fileData } = await octokit.rest.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: filePath,
    ref: defaultBranch,
  });

  const isFileNotFound = !('content' in fileData);
  if (isFileNotFound) {
    throw new Error('File not found');
  }

  const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
  const { data: frontmatter, content: body } = matter(currentContent);

  const updatedFrontmatter = { ...frontmatter, ...changes };
  const updatedContent = matter.stringify(body, updatedFrontmatter);

  const branchName = `edit-${projectId}-${Date.now()}`;

  const { data: refData } = await octokit.rest.git.getRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `heads/${defaultBranch}`,
  });

  await octokit.rest.git.createRef({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    ref: `refs/heads/${branchName}`,
    sha: refData.object.sha,
  });

  const message = commitMessage ?? `Update ${projectId} content`;
  const encodedContent = Buffer.from(updatedContent, 'utf-8').toString('base64');

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: filePath,
    message,
    content: encodedContent,
    branch: branchName,
    sha: fileData.sha,
  });

  const changedFields = Object.keys(changes).join(', ');
  const prBody = `## Content Update

This PR updates the following fields for **${projectId}**:
- ${changedFields}

---
*Auto-generated via inline editing*`;

  const { data: pr } = await octokit.rest.pulls.create({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    title: `[Content] Update ${projectId}`,
    head: branchName,
    base: defaultBranch,
    body: prBody,
  });

  return pr.html_url;
}

export async function getUserInfo(token: string) {
  const octokit = new Octokit({ auth: token });
  const { data: user } = await octokit.rest.users.getAuthenticated();
  return user;
}
