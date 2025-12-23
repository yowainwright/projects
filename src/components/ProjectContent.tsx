import { useMemo, useState, type ChangeEvent } from 'react';
import { projects, categories } from '@/data/projects';
import { Sidebar } from '@/components/Sidebar';
import { ProjectList } from '@/components/Projects';
import { SaveChanges } from '@/components/SaveChanges';
import { useScrollspy } from '@/hooks/useScrollspy';
import { useProjectEdits } from '@/hooks/useProjectEdits';
import { PROJECT_CONTENT_STYLES } from './ProjectContent.constants';
import '@/styles/content.css';

const trimWord = (wrd: string, srchWrd: string) => {
  const lwrSrchWrd = srchWrd.toLowerCase();
  return wrd.toLowerCase().includes(lwrSrchWrd);
};

export function ProjectContent() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { hasUnsavedChanges, updateField, getEditedValue, discardEdits, getAllEdits } = useProjectEdits();

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const title = trimWord(p.title, search);
      const tagLine = trimWord(p.tagline, search);
      const matchesSearch =
        !search || title || tagLine ||
        p.tags.some((t) => trimWord(t, search));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => p.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [search, selectedTags]);

  const projectsByCategory = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        projects: filteredProjects.filter((p) => p.category === category.id),
      }))
      .filter((category) => category.projects.length > 0);
  }, [filteredProjects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const projectIds = useMemo(() => projects.map((p) => p.id), []);
  const { activeId, scrollTo } = useScrollspy(projectIds, 150);

  return (
    <section id="projects-content" className={PROJECT_CONTENT_STYLES.section}>
      <Sidebar
        activeId={activeId}
        onProjectClick={scrollTo}
        search={search}
        handleSearch={handleSearch}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        clearFilters={clearFilters}
        allTags={allTags}
        filteredProjects={filteredProjects}
        projectsByCategory={projectsByCategory}
      />
      <ProjectList
        projects={filteredProjects}
        selectedTags={selectedTags}
        onTagClick={toggleTag}
        onTitleClick={scrollTo}
        onFieldChange={updateField}
        getEditedValue={getEditedValue}
      />
      <SaveChanges
        hasChanges={hasUnsavedChanges}
        edits={getAllEdits()}
        onDiscard={discardEdits}
      />
    </section>
  );
}
