import { compile } from '@mdx-js/mdx';
import rehypeShiki from '@shikijs/rehype';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import customDark from '@/themes/dark.json';
import customLight from '@/themes/light.json';

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

export async function compileMDX(source: string) {
  const highlighter = await getHighlighter();

  const compiled = await compile(source, {
    outputFormat: 'function-body',
    rehypePlugins: [
      [
        rehypeShiki,
        {
          highlighter,
          themes: {
            light: customLight,
            dark: customDark,
          },
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
          ],
        },
      ],
    ],
  });

  return String(compiled);
}
