import { compile } from '@mdx-js/mdx';
import rehypeShiki from '@shikijs/rehype';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';

export async function compileMDX(source: string) {
  const compiled = await compile(source, {
    outputFormat: 'function-body',
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
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
