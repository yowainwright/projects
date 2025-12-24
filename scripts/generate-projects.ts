import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface GitHubRepo {
  url: string;
  stars?: number;
}

interface ProjectFrontmatter {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'personal' | 'oss-contribution' | 'work';
  tags: string[];
  github?: string | GitHubRepo[];
  npm?: string;
  website?: string;
  stars?: number;
  highlights?: string[];
}

interface ProjectWithContent extends ProjectFrontmatter {
  content: string;
}

function generateProjects(): void {
  const contentDir = join(import.meta.dirname, '../content');
  const outputPath = join(import.meta.dirname, '../src/data/projects-generated.ts');
  const files = readdirSync(contentDir).filter((f) => f.endsWith('.mdx'));

  const projects: ProjectWithContent[] = [];

  for (const file of files) {
    const filePath = join(contentDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = data as ProjectFrontmatter;

    projects.push({
      ...frontmatter,
      content: content.trim(),
    });
  }

  const contributionOrder = ['koa', 'postmate', 'lifecycle', 'jspm'];
  const contributions = projects.filter((p) => p.category === 'oss-contribution');
  const personal = projects.filter((p) => p.category === 'personal');

  contributions.sort((a, b) => {
    const aIndex = contributionOrder.indexOf(a.id);
    const bIndex = contributionOrder.indexOf(b.id);
    const aOrder = aIndex === -1 ? 999 : aIndex;
    const bOrder = bIndex === -1 ? 999 : bIndex;
    return aOrder - bOrder;
  });

  const sortedProjects = [...contributions, ...personal];

  const output = `// AUTO-GENERATED FROM content/*.mdx - DO NOT EDIT DIRECTLY
// Run \`bun run generate\` to regenerate

export interface GitHubRepo {
  url: string;
  stars?: number;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'personal' | 'oss-contribution' | 'work';
  tags: string[];
  github?: string | GitHubRepo[];
  npm?: string;
  website?: string;
  stars?: number;
  highlights?: string[];
  content?: string;
}

export const projects: Project[] = ${JSON.stringify(sortedProjects, null, 2)};

export const categories = [
  { id: 'oss-contribution', label: 'Contributions' },
  { id: 'personal', label: 'Projects' },
] as const;
`;

  writeFileSync(outputPath, output);
  console.log(`Generated ${sortedProjects.length} projects → ${outputPath}`);
}

generateProjects();
