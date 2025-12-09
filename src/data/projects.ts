export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'personal' | 'oss-contribution' | 'work';
  tags: string[];
  github?: string;
  npm?: string;
  website?: string;
  stars?: number;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: 'stickybits',
    title: 'Stickybits',
    tagline: 'Lightweight sticky positioning polyfill',
    description:
      'A lightweight alternative to position: sticky polyfills. Stickybits enables elements to remain visible while scrolling, then stop at their parent container boundary. It prioritizes native CSS support when available and only adds scroll listeners when necessary.',
    category: 'personal',
    tags: ['JavaScript', 'CSS', 'DOM', 'Polyfill'],
    github: 'https://github.com/yowainwright/stickybits',
    npm: 'https://www.npmjs.com/package/stickybits',
    stars: 253,
    highlights: [
      'Smart CSS support detection',
      'Adds styling classes for sticky states',
      'Zero dependencies, ~1KB',
      'Configurable offset and scroll container',
    ],
  },
  {
    id: 'es-check',
    title: 'ES-Check',
    tagline: 'Validate JavaScript ES version compatibility',
    description:
      'ES-Check validates JavaScript files against specified ECMAScript versions, catching untranspiled code before production. It checks syntax by default and optionally validates ES version-specific features. Essential for build pipelines to ensure browser compatibility.',
    category: 'personal',
    tags: ['TypeScript', 'CLI', 'Build Tools', 'Transpilation'],
    github: 'https://github.com/yowainwright/es-check',
    npm: 'https://www.npmjs.com/package/es-check',
    stars: 203,
    highlights: [
      'Validates ES3 through ES2023',
      'Feature detection with --checkFeatures',
      'Browserslist integration',
      'Programmatic API available',
    ],
  },
  {
    id: 'shave',
    title: 'Shave',
    tagline: 'Zero-dependency text truncation',
    description:
      'A lightweight JavaScript utility for truncating multi-line text to fit within HTML elements based on a specified maximum height. Preserves original text content by storing truncated portions in a hidden element. Uses binary search for optimal performance.',
    category: 'personal',
    tags: ['TypeScript', 'DOM', 'Text', 'UI'],
    github: 'https://github.com/yowainwright/shave',
    npm: 'https://www.npmjs.com/package/shave',
    stars: 171,
    highlights: [
      'Zero dependencies, ~1.5KB',
      'Preserves original content',
      'Multi-language support (CJK)',
      'jQuery/Zepto plugin available',
    ],
  },
  {
    id: 'pastoralist',
    title: 'Pastoralist',
    tagline: 'Automated dependency override management',
    description:
      'A CLI tool that automates management of package.json dependency overrides, resolutions, and patches. Implements set-it-and-forget-it automation for security management, tracking why each override exists, and cleanup of unused overrides.',
    category: 'personal',
    tags: ['TypeScript', 'CLI', 'Security', 'Dependencies'],
    github: 'https://github.com/yowainwright/pastoralist',
    npm: 'https://www.npmjs.com/package/pastoralist',
    stars: 76,
    highlights: [
      'Automatic vulnerability scanning',
      'Multi-provider support (OSV, GitHub, Snyk)',
      'Monorepo ready',
      'Zero maintenance via postinstall',
    ],
  },
  {
    id: 'codependence',
    title: 'Codependence',
    tagline: 'Precision dependency version control',
    description:
      'A JavaScript utility for managing specified dependency versions in projects. Compares a codependencies array against package.json to verify critical dependencies match desired versions. Works across single projects and monorepos.',
    category: 'personal',
    tags: ['TypeScript', 'CLI', 'Dependencies', 'Monorepo'],
    github: 'https://github.com/yowainwright/codependence',
    npm: 'https://www.npmjs.com/package/codependence',
    stars: 18,
    highlights: [
      'Pin specific dependencies',
      'Permissive mode for latest versions',
      'Package manager agnostic',
      'Interactive init command',
    ],
  },
  {
    id: 'scrolldir',
    title: 'ScrollDir',
    tagline: 'CSS-driven scroll direction detection',
    description:
      'A lightweight JavaScript utility that detects vertical scroll direction and applies it via a CSS data attribute. Enables developers to style elements based on scroll direction without complex JavaScript. Perfect for hiding/showing sticky navigation.',
    category: 'personal',
    tags: ['JavaScript', 'CSS', 'DOM', 'Navigation'],
    github: 'https://github.com/yowainwright/scrolldir',
    npm: 'https://www.npmjs.com/package/scrolldir',
    stars: 40,
    highlights: [
      'Zero dependencies, ~1KB',
      'Configurable threshold',
      'Auto and manual modes',
      'CSS data attribute driven',
    ],
  },
  {
    id: 'reframe',
    title: 'Reframe.js',
    tagline: 'Make embedded content responsive',
    description:
      'A lightweight plugin that makes unresponsive elements like embedded videos and iframes scale responsively at a fixed aspect ratio. Wraps elements in a container with intrinsic ratio sizing. Inspired by FitVids but jQuery-free.',
    category: 'personal',
    tags: ['JavaScript', 'CSS', 'Responsive', 'Embeds'],
    github: 'https://github.com/yowainwright/reframe.js',
    npm: 'https://www.npmjs.com/package/reframe.js',
    stars: 65,
    highlights: [
      'jQuery-free implementation',
      'Noframe.js variant (no DOM manipulation)',
      '~1.3KB unminified',
      'Works with iframes and videos',
    ],
  },
  {
    id: 'monorepo-utilities',
    title: 'Monorepo Utilities',
    tagline: 'Tools for monorepo development',
    description:
      'A TypeScript-based monorepo development toolkit providing CLI and programmatic interfaces for monorepo management. Includes Install-Dependencies utility for granular control over dependency installation in complex monorepo environments.',
    category: 'personal',
    tags: ['TypeScript', 'CLI', 'Monorepo', 'pnpm'],
    github: 'https://github.com/yowainwright/monorepo-utilities',
    stars: 10,
    highlights: [
      'CLI and programmatic API',
      'Install-Dependencies utility',
      'pnpm workspaces + Turbo',
      'Actively maintained',
    ],
  },
  {
    id: 'mini-cookies',
    title: 'Mini Cookies',
    tagline: 'Minimal document.cookie wrapper',
    description:
      'A minimal Document.cookie package providing a clean API for cookie management in the browser. Lightweight and straightforward for basic cookie operations.',
    category: 'personal',
    tags: ['TypeScript', 'Browser', 'Cookies'],
    github: 'https://github.com/yowainwright/mini-cookies',
    npm: 'https://www.npmjs.com/package/mini-cookies',
    stars: 11,
    highlights: ['Zero dependencies', 'Simple API', 'TypeScript support'],
  },
  {
    id: 'datastructures',
    title: 'Datastructures',
    tagline: 'Functional typed data structures',
    description:
      'Simple functional typed data structures for JavaScript/TypeScript. Provides immutable, type-safe implementations of common data structures following functional programming principles.',
    category: 'personal',
    tags: ['TypeScript', 'Functional', 'Data Structures'],
    github: 'https://github.com/yowainwright/datastructures',
    stars: 10,
    highlights: ['Functional approach', 'Fully typed', 'Immutable by design'],
  },
  {
    id: 'stdouttojson',
    title: 'stdoutToJSON',
    tagline: 'Transform stdout to JSON',
    description:
      'Transforms stdout output to JSON format. Useful for parsing command line output and converting it to structured data for further processing.',
    category: 'personal',
    tags: ['TypeScript', 'CLI', 'JSON', 'Parsing'],
    github: 'https://github.com/yowainwright/stdoutToJSON',
    npm: 'https://www.npmjs.com/package/stdouttojson',
    stars: 5,
    highlights: ['Stdout parsing', 'JSON output', 'CLI integration'],
  },
  {
    id: 'build-lambda-layer',
    title: 'Build Lambda Layer',
    tagline: 'AWS Lambda layer builder',
    description:
      'Build awesome Node.js Lambda layers with control. Provides tooling to create and manage AWS Lambda layers for Node.js applications with fine-grained control over the build process.',
    category: 'personal',
    tags: ['TypeScript', 'AWS', 'Lambda', 'Serverless'],
    github: 'https://github.com/yowainwright/build-lambda-layer',
    stars: 6,
    highlights: ['Node.js Lambda layers', 'Build control', 'AWS integration'],
  },
  {
    id: 'koa',
    title: 'Koa.js',
    tagline: 'Next-gen web framework for Node.js',
    description:
      'Active contributor to Koa, the expressive HTTP middleware framework for Node.js. Contributions include security fixes, memory leak patches, stream cleanup improvements, and documentation updates. Part of the core maintenance team.',
    category: 'oss-contribution',
    tags: ['Node.js', 'HTTP', 'Middleware', 'Backend'],
    github: 'https://github.com/koajs/koa',
    website: 'https://koajs.com',
    highlights: [
      'Fixed redirect vulnerability',
      'Resolved memory leak (issue-1834)',
      'Stream cleanup improvements',
      'Documentation refresh',
    ],
  },
  {
    id: 'postmate',
    title: 'Postmate',
    tagline: 'Promise-based postMessage library',
    description:
      'Major contributor to Postmate, a powerful and simple promise-based postMessage library for cross-origin iframe communication. Contributions include the call queue feature, bug fixes, and version management. Part of Dollar Shave Club engineering.',
    category: 'oss-contribution',
    tags: ['JavaScript', 'postMessage', 'iframes', 'Cross-origin'],
    github: 'https://github.com/dollarshaveclub/postmate',
    npm: 'https://www.npmjs.com/package/postmate',
    stars: 1900,
    highlights: [
      'Call queue feature',
      'Context passing fixes',
      'Classes support',
      '29+ merged PRs',
    ],
  },
  {
    id: 'lifecycle',
    title: 'Lifecycle',
    tagline: 'Ephemeral PR environments',
    description:
      'Transforms pull requests into ephemeral development environments that seamlessly connect to required dependencies while remaining isolated from unrelated changes. Enables development, testing, design review, and external sandboxes from any PR.',
    category: 'oss-contribution',
    tags: ['TypeScript', 'Kubernetes', 'DevOps', 'CI/CD'],
    github: 'https://github.com/goodrxoss/lifecycle',
    stars: 75,
    highlights: [
      'Isolated PR environments',
      'Kubernetes + Docker integration',
      'Design review workflows',
      'Partner sandbox environments',
    ],
  },
];

export const categories = [
  { id: 'personal', label: 'Projects' },
  { id: 'oss-contribution', label: 'Contributions' },
] as const;
