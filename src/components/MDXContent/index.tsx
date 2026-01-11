import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import customDark from '@/themes/dark.json';
import customLight from '@/themes/light.json';

interface MDXContentProps {
  content: string;
  className?: string;
}

const CONTENT_CLASS = 'prose prose-sm dark:prose-invert max-w-none';

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className', 'style'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className', 'style'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className', 'style'],
  },
};

let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [customLight, customDark],
      langs: [
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/jsx.mjs'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/go.mjs'),
        import('shiki/langs/python.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/shellscript.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/yaml.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/markdown.mjs'),
        import('shiki/langs/sql.mjs'),
        import('shiki/langs/rust.mjs'),
        import('shiki/langs/dockerfile.mjs'),
      ],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });
  }
  return highlighterPromise;
}

async function renderMarkdown(content: string): Promise<string> {
  const highlighter = await getHighlighter();

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter,
      themes: {
        light: customLight,
        dark: customDark,
      },
    })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(content);

  return String(result);
}

export function MDXContent({ content, className }: MDXContentProps) {
  const [html, setHtml] = useState<string>('');

  const hasContent = content.trim().length > 0;

  useEffect(() => {
    const shouldRender = hasContent;
    if (!shouldRender) return;

    renderMarkdown(content).then(setHtml);
  }, [content, hasContent]);

  const combinedClass = className ? `${CONTENT_CLASS} ${className}` : CONTENT_CLASS;

  if (!hasContent) {
    return null;
  }

  return (
    <div
      className={combinedClass}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
