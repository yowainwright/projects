import { codeToHtml } from 'shiki';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';

export async function highlightCode(code: string, lang: string = 'typescript') {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
    ],
  });

  return html;
}
