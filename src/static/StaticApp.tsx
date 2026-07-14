import { Footer } from '../components/Footer';
import type { GitHubRepo, Project } from '../data/types';

export interface StaticProjectRecord {
  project: Project;
}

interface StaticCategory {
  id: Project['category'];
  label: string;
}

interface NavItem {
  alias: string;
  name: string;
  path: string;
}

const STATIC_CATEGORIES: StaticCategory[] = [
  { id: 'oss-contribution', label: 'Contributions' },
  { id: 'personal', label: 'Projects' },
  { id: 'work', label: 'Work' },
];

const NAV_ITEMS: NavItem[] = [
  { alias: 'resume', name: 'Resume', path: 'https://jeffry.in/resume/' },
  { alias: 'archive', name: 'Archive', path: 'https://jeffry.in/archive/' },
  { alias: 'projects', name: 'Projects', path: '/projects/' },
  { alias: 'about', name: 'About', path: 'https://jeffry.in/about/' },
];

function StaticNavItem({ alias, name, path }: NavItem) {
  const itemClass = `site-nav__item site-nav__item--${alias}`;
  const linkClass = `site-nav__link site-nav__link--${alias}`;
  return (
    <li className={itemClass}>
      <a className={linkClass} href={path}>{name}</a>
    </li>
  );
}

function StaticHeader() {
  const navItems = NAV_ITEMS.map((item) => <StaticNavItem key={item.alias} {...item} />);
  return (
    <nav id="site-nav" className="site-nav" aria-label="Primary navigation">
      <section id="site-nav-container" className="site-nav__container">
        <a id="site-logo" href="https://jeffry.in" className="logo" aria-label="Jeffry.in home">
          <h3 id="site-logo-title" className="logo__title">j</h3>
        </a>
        <ul id="site-nav-items" className="site-nav__items">{navItems}</ul>
      </section>
    </nav>
  );
}

function getGitHubRepos(project: Project): GitHubRepo[] {
  if (!project.github) return [];
  if (typeof project.github === 'string') return [{ url: project.github, stars: project.stars }];
  return project.github;
}

function OptionalLink({ href, label }: { href: string | undefined; label: string }) {
  if (!href) return null;
  return <a href={href}>{label}</a>;
}

function StaticLinks({ project }: { project: Project }) {
  const label = `${project.title} links`;
  const githubLinks = getGitHubRepos(project).map(({ url }) => (
    <a key={url} href={url}>GitHub</a>
  ));
  return (
    <nav className="flex flex-wrap gap-3 pb-3" aria-label={label}>
      {githubLinks}
      <OptionalLink href={project.npm} label="npm" />
      <OptionalLink href={project.website} label="Website" />
    </nav>
  );
}

function getStarCount(project: Project): number {
  return getGitHubRepos(project).reduce((total, repo) => total + (repo.stars || 0), 0);
}

function Metric({ label, value }: { label: string; value: number }) {
  const formattedValue = value.toLocaleString('en-US');
  return (
    <div>
      <dt className="font-bold">{label}</dt>
      <dd>{formattedValue}</dd>
    </div>
  );
}

function StaticStars({ project }: { project: Project }) {
  const stars = getStarCount(project);
  if (stars === 0) return null;
  return (
    <dl className="pb-4" aria-label="Current GitHub stars">
      <Metric label="Stars" value={stars} />
    </dl>
  );
}

function StaticHighlights({ highlights }: { highlights: string[] | undefined }) {
  const values = highlights || [];
  if (values.length === 0) return null;
  const items = values.map((highlight) => <li key={highlight}>{highlight}</li>);
  return (
    <section>
      <h3 className="text-xs font-black uppercase">Highlights</h3>
      <ul className="list-disc">{items}</ul>
    </section>
  );
}

function StaticBody({ content }: { content: string | undefined }) {
  const value = content || '';
  const paragraphs = value.split(/\n{2,}/).filter(Boolean);
  if (paragraphs.length === 0) return null;
  const elements = paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
  return <div className="prose prose-sm max-w-none">{elements}</div>;
}

function StaticTags({ tags }: { tags: string[] }) {
  const items = tags.map((tag) => <li key={tag} className="text-sm font-bold">{tag}</li>);
  return <ul className="flex flex-wrap gap-2" aria-label="Technologies">{items}</ul>;
}

function StaticProject({ project }: StaticProjectRecord) {
  return (
    <article id={project.id} data-project-id={project.id} className="border-foreground py-8 lg:mr-12">
      <header>
        <h2 className="text-3xl font-black lg:text-5xl">{project.title}</h2>
        <p className="font-bold lg:text-lg">{project.tagline}</p>
      </header>
      <StaticLinks project={project} />
      <StaticStars project={project} />
      <p className="pb-2 text-lg leading-loose">{project.description}</p>
      <StaticHighlights highlights={project.highlights} />
      <StaticBody content={project.content} />
      <StaticTags tags={project.tags} />
    </article>
  );
}

interface StaticCategoryProps {
  category: StaticCategory;
  records: StaticProjectRecord[];
}

function StaticSidebarCategory({ category, records }: StaticCategoryProps) {
  const categoryRecords = records.filter(({ project }) => project.category === category.id);
  if (categoryRecords.length === 0) return null;
  const titleId = `static-${category.id}`;
  const items = categoryRecords.map(({ project }) => (
    <li key={project.id} className="mb-4">
      <a className="font-black" href={`#${project.id}`}>{project.title}</a>
    </li>
  ));
  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className="text-xs font-semibold uppercase">{category.label}</h2>
      <ul>{items}</ul>
    </section>
  );
}

function StaticSidebar({ records }: { records: StaticProjectRecord[] }) {
  const categories = STATIC_CATEGORIES.map((category) => (
    <StaticSidebarCategory key={category.id} category={category} records={records} />
  ));
  return (
    <aside id="sidebar" className="text-foreground text-right lg:sticky lg:top-4 lg:self-start">
      <nav id="sidebar-nav" className="hidden space-y-8 md:block" aria-label="Projects">
        {categories}
      </nav>
    </aside>
  );
}

function StaticProjectList({ records }: { records: StaticProjectRecord[] }) {
  const projectElements = records.map((record) => (
    <StaticProject key={record.project.id} {...record} />
  ));
  return (
    <main id="project-list" className="min-w-0 flex-1">
      <div id="project-list-container" className="max-w-3xl">{projectElements}</div>
    </main>
  );
}

export function StaticApp({ records }: { records: StaticProjectRecord[] }) {
  return (
    <>
      <StaticHeader />
      <main className="section">
        <header className="header__description">
          <h1>Projects I work on, maintain, or have maintained in the past.</h1>
        </header>
        <section id="projects-content" className="projects-content mt-10 grid gap-8 lg:mx-8 lg:mt-20 lg:grid-cols-[calc(35%-2rem)_calc(65%-2rem)] lg:gap-16">
          <StaticSidebar records={records} />
          <StaticProjectList records={records} />
        </section>
      </main>
      <Footer />
    </>
  );
}
