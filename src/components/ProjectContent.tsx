import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { projects, categories } from '@/data/projects-generated';
import { Sidebar } from '@/components/Sidebar';
import { ProjectList } from '@/components/Projects';
import { SaveChanges } from '@/components/SaveChanges';
import { useScrollspy } from '@/hooks/useScrollspy';
import { useProjectEdits } from '@/hooks/useProjectEdits';
import { useDebounce } from '@/hooks/useDebounce';
import { PROJECT_CONTENT_STYLES } from './ProjectContent.constants';
import '@/styles/content.css';

const trimWord = (wrd: string, srchWrd: string) => {
  const lwrSrchWrd = srchWrd.toLowerCase();
  return wrd.toLowerCase().includes(lwrSrchWrd);
};

export function ProjectContent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 150);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { hasUnsavedChanges, updateField, getEditedValue, discardEdits, getAllEdits } = useProjectEdits();

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const title = trimWord(p.title, debouncedSearch);
      const tagLine = trimWord(p.tagline, debouncedSearch);
      const matchesSearch =
        !debouncedSearch || title || tagLine ||
        p.tags.some((t) => trimWord(t, debouncedSearch));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => p.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [debouncedSearch, selectedTags]);

  const projectsByCategory = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        projects: filteredProjects.filter((p) => p.category === category.id),
      }))
      .filter((category) => category.projects.length > 0);
  }, [filteredProjects]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setSelectedTags([]);
  }, []);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);

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
