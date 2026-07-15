import { compile } from '@mdx-js/mdx';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import { darkTheme, lightTheme, shikiThemes } from '@/themes/shiki';

let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [lightTheme, darkTheme],
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
  const transformers = [transformerNotationDiff(), transformerNotationHighlight()];
  const shikiOptions = { themes: shikiThemes, transformers };
  const shikiPlugin = () => rehypeShikiFromHighlighter(highlighter, shikiOptions);

  const compiled = await compile(source, {
    outputFormat: 'function-body',
    rehypePlugins: [shikiPlugin],
  });

  return String(compiled);
}
