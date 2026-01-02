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

  let defaultBranch: string;
  try {
    const { data: repo } = await octokit.rest.repos.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });
    defaultBranch = repo.default_branch;
  } catch {
    throw new Error('Failed to access repository. Check your permissions.');
  }

  const filePath = `${CONTENT_PATH}/${projectId}.mdx`;
  let fileData: { content: string; sha: string };
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      ref: defaultBranch,
    });
    if (!('content' in data)) {
      throw new Error(`Project file not found: ${projectId}.mdx`);
    }
    fileData = data as { content: string; sha: string };
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) throw err;
    throw new Error(`Failed to read project file: ${projectId}.mdx`);
  }

  const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
  const { data: frontmatter, content: body } = matter(currentContent);

  const updatedFrontmatter = { ...frontmatter, ...changes };
  const updatedContent = matter.stringify(body, updatedFrontmatter);

  const branchName = `edit-${projectId}-${Date.now()}`;

  try {
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
  } catch {
    throw new Error('Failed to create branch. You may need to fork the repository first.');
  }

  const message = commitMessage ?? `Update ${projectId} content`;
  const encodedContent = Buffer.from(updatedContent, 'utf-8').toString('base64');

  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message,
      content: encodedContent,
      branch: branchName,
      sha: fileData.sha,
    });
  } catch {
    throw new Error('Failed to commit changes. The file may have been modified.');
  }

  const changedFields = Object.keys(changes).join(', ');
  const prBody = `## Content Update

This PR updates the following fields for **${projectId}**:
- ${changedFields}

---
*Auto-generated via inline editing*`;

  try {
    const { data: pr } = await octokit.rest.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: `[Content] Update ${projectId}`,
      head: branchName,
      base: defaultBranch,
      body: prBody,
    });
    return pr.html_url;
  } catch {
    throw new Error('Failed to create pull request. Check repository settings.');
  }
}

export async function getUserInfo(token: string) {
  const octokit = new Octokit({ auth: token });
  const { data: user } = await octokit.rest.users.getAuthenticated();
  return user;
}
