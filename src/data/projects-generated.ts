import type { Project } from './types';

export type {
  GitHubRepo,
  YearlyCommits,
  MonthlyCommits,
  Downloads,
  Activity,
  GradeData,
  HistoryEntry,
  CurrentMetrics,
  RepoHistoryEntry,
  RepoCurrentMetrics,
  RepoData,
  ProjectMetrics,
  Project,
} from './types';

export const projects: Project[] = [
  {
    "id": "koa",
    "title": "Koa.js",
    "tagline": "Next-gen web framework for Node.js",
    "description": "Active contributor to Koa, the expressive HTTP middleware framework for Node.js. Contributions include security fixes, memory leak patches, stream cleanup improvements, and documentation updates. Part of the core maintenance team.",
    "category": "oss-contribution",
    "tags": [
      "Node.js",
      "HTTP",
      "Middleware",
      "Backend"
    ],
    "github": [
      {
        "url": "https://github.com/koajs/koa",
        "stars": 35704
      }
    ],
    "npm": "https://www.npmjs.com/package/koa",
    "website": "https://koajs.com",
    "highlights": [
      "Fixed redirect vulnerability",
      "Resolved memory leak (issue-1834)",
      "Stream cleanup improvements",
      "Documentation refresh"
    ],
    "content": "Active contributor to Koa, the expressive HTTP middleware framework for Node.js.\n\nContributions include security fixes, memory leak patches, stream cleanup improvements, and documentation updates as part of the core maintenance team."
  },
  {
    "id": "postmate",
    "title": "Postmate",
    "tagline": "Promise-based postMessage library",
    "description": "Major contributor to Postmate, a powerful and simple promise-based postMessage library for cross-origin iframe communication. Contributions include the call queue feature, bug fixes, and version management. Part of Dollar Shave Club engineering.",
    "category": "oss-contribution",
    "tags": [
      "JavaScript",
      "postMessage",
      "iframes",
      "Cross-origin"
    ],
    "github": "https://github.com/dollarshaveclub/postmate",
    "npm": "https://www.npmjs.com/package/postmate",
    "stars": 1924,
    "highlights": [
      "Call queue feature",
      "Context passing fixes",
      "Classes support",
      "29+ merged PRs"
    ],
    "content": "Major contributor to Postmate, a powerful and simple promise-based postMessage library for cross-origin iframe communication.\n\nContributions include the call queue feature, bug fixes, and version management as part of Dollar Shave Club engineering."
  },
  {
    "id": "jspm",
    "title": "JSPM",
    "tagline": "Native ES module package management",
    "description": "Contributor to JSPM, providing native ES module workflows for JavaScript. Contributions include the Node.js import map loader, import-map package development, website improvements, and organization support.",
    "category": "oss-contribution",
    "tags": [
      "TypeScript",
      "ESM",
      "Import Maps",
      "Node.js"
    ],
    "github": [
      {
        "url": "https://github.com/jspm/node-importmap-loader",
        "stars": 11
      },
      {
        "url": "https://github.com/jspm/jspm.org",
        "stars": 13
      },
      {
        "url": "https://github.com/jspm/import-map",
        "stars": 51
      }
    ],
    "website": "https://jspm.org",
    "highlights": [
      "Node.js import map loader",
      "Import map package development",
      "Website improvements",
      "Organization support"
    ],
    "content": "Contributor to JSPM, providing native ES module workflows for JavaScript.\n\nContributions include the Node.js import map loader, import-map package development, website improvements, and organization support."
  },
  {
    "id": "lifecycle",
    "title": "Lifecycle",
    "tagline": "Ephemeral PR environments",
    "description": "Transforms pull requests into ephemeral development environments that seamlessly connect to required dependencies while remaining isolated from unrelated changes. Enables development, testing, design review, and external sandboxes from any PR.",
    "category": "oss-contribution",
    "tags": [
      "TypeScript",
      "Kubernetes",
      "DevOps",
      "CI/CD"
    ],
    "github": "https://github.com/goodrxoss/lifecycle",
    "stars": 76,
    "highlights": [
      "Isolated PR environments",
      "Kubernetes + Docker integration",
      "Design review workflows",
      "Partner sandbox environments"
    ],
    "website": "https://goodrxoss.github.io/lifecycle-docs",
    "content": "Lifecycle transforms pull requests into ephemeral development environments that seamlessly connect to required dependencies while remaining isolated from unrelated changes.\n\nEnables development, testing, design review, and external sandboxes from any PR."
  },
  {
    "id": "shave",
    "title": "Shave",
    "tagline": "Zero-dependency text truncation",
    "description": "A lightweight JavaScript utility for truncating multi-line text to fit within HTML elements based on a specified maximum height. Preserves original text content by storing truncated portions in a hidden element. Uses binary search for optimal performance.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "DOM",
      "Text",
      "UI"
    ],
    "github": [
      {
        "url": "https://github.com/dollarshaveclub/shave",
        "stars": 2099
      },
      {
        "url": "https://github.com/yowainwright/shave",
        "stars": 171
      }
    ],
    "npm": "https://www.npmjs.com/package/shave",
    "highlights": [
      "Zero dependencies, ~1.5KB",
      "Preserves original content",
      "Multi-language support (CJK)",
      "jQuery/Zepto plugin available"
    ],
    "website": "https://github.com/yowainwright/shave",
    "content": "Shave is a lightweight JavaScript utility for truncating multi-line text to fit within HTML elements based on a specified maximum height.\n\nIt preserves original text content by storing truncated portions in a hidden element and uses binary search for optimal performance."
  },
  {
    "id": "codependence",
    "title": "Codependence",
    "tagline": "Precision dependency version control",
    "description": "A JavaScript utility for managing specified dependency versions in projects. Compares a codependencies array against package.json to verify critical dependencies match desired versions. Works across single projects and monorepos.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Dependencies",
      "Monorepo"
    ],
    "github": "https://github.com/yowainwright/codependence",
    "npm": "https://www.npmjs.com/package/codependence",
    "stars": 19,
    "highlights": [
      "Pin specific dependencies",
      "Permissive mode for latest versions",
      "Package manager agnostic",
      "Interactive init command"
    ],
    "website": "https://jeffry.in/codependence/",
    "content": "Codependence is a JavaScript utility for managing specified dependency versions in projects.\n\nIt compares a codependencies array against package.json to verify critical dependencies match desired versions, working across single projects and monorepos."
  },
  {
    "id": "reframe",
    "title": "Reframe.js",
    "tagline": "Make embedded content responsive",
    "description": "A lightweight plugin that makes unresponsive elements like embedded videos and iframes scale responsively at a fixed aspect ratio. Wraps elements in a container with intrinsic ratio sizing. Inspired by FitVids but jQuery-free.",
    "category": "personal",
    "tags": [
      "JavaScript",
      "CSS",
      "Responsive",
      "Embeds"
    ],
    "github": [
      {
        "url": "https://github.com/dollarshaveclub/reframe.js",
        "stars": 1593
      },
      {
        "url": "https://github.com/yowainwright/reframe.js",
        "stars": 65
      }
    ],
    "npm": "https://www.npmjs.com/package/reframe.js",
    "highlights": [
      "jQuery-free implementation",
      "Noframe.js variant (no DOM manipulation)",
      "~1.3KB unminified",
      "Works with iframes and videos"
    ],
    "website": "https://github.com/yowainwright/reframe.js",
    "content": "Reframe.js is a lightweight plugin that makes unresponsive elements like embedded videos and iframes scale responsively at a fixed aspect ratio.\n\nIt wraps elements in a container with intrinsic ratio sizing, inspired by FitVids but jQuery-free."
  },
  {
    "id": "stickybits",
    "title": "Stickybits",
    "tagline": "Lightweight sticky positioning polyfill",
    "description": "A lightweight alternative to position: sticky polyfills. Stickybits enables elements to remain visible while scrolling, then stop at their parent container boundary. It prioritizes native CSS support when available and only adds scroll listeners when necessary.",
    "category": "personal",
    "tags": [
      "JavaScript",
      "CSS",
      "DOM",
      "Polyfill"
    ],
    "github": [
      {
        "url": "https://github.com/dollarshaveclub/stickybits",
        "stars": 2181
      },
      {
        "url": "https://github.com/yowainwright/stickybits",
        "stars": 253
      }
    ],
    "npm": "https://www.npmjs.com/package/stickybits",
    "highlights": [
      "Smart CSS support detection",
      "Adds styling classes for sticky states",
      "Zero dependencies, ~1KB",
      "Configurable offset and scroll container"
    ],
    "website": "https://github.com/yowainwright/stickybits",
    "content": "Stickybits is a lightweight alternative to `position: sticky` polyfills that enables elements to remain visible while scrolling, then stop at their parent container boundary.\n\nIt prioritizes native CSS support when available and only adds scroll listeners when necessary, making it highly performant for modern browsers while still supporting older ones."
  },
  {
    "id": "pastoralist",
    "title": "Pastoralist",
    "tagline": "Automated dependency override management",
    "description": "A CLI tool that automates management of package.json dependency overrides, resolutions, and patches. Implements set-it-and-forget-it automation for security management, tracking why each override exists, and cleanup of unused overrides.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Security",
      "Dependencies"
    ],
    "github": "https://github.com/yowainwright/pastoralist",
    "npm": "https://www.npmjs.com/package/pastoralist",
    "stars": 76,
    "highlights": [
      "Automatic vulnerability scanning",
      "Multi-provider support (OSV, GitHub, Snyk)",
      "Monorepo ready",
      "Zero maintenance via postinstall"
    ],
    "website": "https://jeffry.in/pastoralist/",
    "content": "Pastoralist is a CLI tool that automates management of package.json dependency overrides, resolutions, and patches.\n\nIt implements set-it-and-forget-it automation for security management, tracking why each override exists, and cleanup of unused overrides."
  },
  {
    "id": "es-check",
    "title": "ES-Check",
    "tagline": "Validate JavaScript ES version compatibility",
    "description": "ES-Check validates JavaScript files against specified ECMAScript versions, catching untranspiled code before production. It checks syntax by default and optionally validates ES version-specific features. Essential for build pipelines to ensure browser compatibility.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Build Tools",
      "Transpilation"
    ],
    "github": "https://github.com/yowainwright/es-check",
    "npm": "https://www.npmjs.com/package/es-check",
    "stars": 205,
    "highlights": [
      "Validates ES3 through ES2023",
      "Feature detection with --checkFeatures",
      "Browserslist integration",
      "Programmatic API available"
    ],
    "website": "https://jeffry.in/es-check/",
    "content": "ES-Check validates JavaScript files against specified ECMAScript versions, catching untranspiled code before production.\n\nIt checks syntax by default and optionally validates ES version-specific features, making it essential for build pipelines to ensure browser compatibility."
  },
  {
    "id": "common-utilities",
    "title": "Common Utilities",
    "tagline": "Typed functional utilities",
    "description": "Simple typed utilities generally written in a functional style for learning and practical use. Provides a collection of commonly needed helper functions with full TypeScript support.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Functional",
      "Utilities"
    ],
    "github": "https://github.com/yowainwright/common-utilities",
    "npm": "https://www.npmjs.com/package/common-utilities",
    "stars": 29,
    "highlights": [
      "Functional style",
      "Fully typed",
      "Learning-focused"
    ],
    "website": "https://yowainwright.gitbook.io/common-utilities/",
    "content": "Common Utilities provides simple typed utilities generally written in a functional style for learning and practical use.\n\nA collection of commonly needed helper functions with full TypeScript support."
  },
  {
    "id": "datastructures",
    "title": "Datastructures",
    "tagline": "Functional typed data structures",
    "description": "Simple functional typed data structures for JavaScript/TypeScript. Provides immutable, type-safe implementations of common data structures following functional programming principles.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Functional",
      "Data Structures"
    ],
    "github": "https://github.com/yowainwright/datastructures",
    "stars": 10,
    "highlights": [
      "Functional approach",
      "Fully typed",
      "Immutable by design"
    ],
    "content": "Datastructures provides simple functional typed data structures for JavaScript/TypeScript.\n\nIt offers immutable, type-safe implementations of common data structures following functional programming principles."
  },
  {
    "id": "build-lambda-layer",
    "title": "Build Lambda Layer",
    "tagline": "AWS Lambda layer builder",
    "description": "Build awesome Node.js Lambda layers with control. Provides tooling to create and manage AWS Lambda layers for Node.js applications with fine-grained control over the build process.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "AWS",
      "Lambda",
      "Serverless"
    ],
    "github": "https://github.com/yowainwright/build-lambda-layer",
    "stars": 6,
    "highlights": [
      "Node.js Lambda layers",
      "Build control",
      "AWS integration"
    ],
    "content": "Build Lambda Layer provides tooling to create and manage AWS Lambda layers for Node.js applications.\n\nBuild awesome Node.js Lambda layers with fine-grained control over the build process."
  },
  {
    "id": "scrolldir",
    "title": "ScrollDir",
    "tagline": "CSS-driven scroll direction detection",
    "description": "A lightweight JavaScript utility that detects vertical scroll direction and applies it via a CSS data attribute. Enables developers to style elements based on scroll direction without complex JavaScript. Perfect for hiding/showing sticky navigation.",
    "category": "personal",
    "tags": [
      "JavaScript",
      "CSS",
      "DOM",
      "Navigation"
    ],
    "github": [
      {
        "url": "https://github.com/dollarshaveclub/scrolldir",
        "stars": 656
      },
      {
        "url": "https://github.com/yowainwright/scrolldir",
        "stars": 40
      }
    ],
    "npm": "https://www.npmjs.com/package/scrolldir",
    "highlights": [
      "Zero dependencies, ~1KB",
      "Configurable threshold",
      "Auto and manual modes",
      "CSS data attribute driven"
    ],
    "website": "https://github.com/yowainwright/scrolldir",
    "content": "ScrollDir is a lightweight JavaScript utility that detects vertical scroll direction and applies it via a CSS data attribute.\n\nIt enables developers to style elements based on scroll direction without complex JavaScript, perfect for hiding/showing sticky navigation."
  },
  {
    "id": "stdouttojson",
    "title": "stdoutToJSON",
    "tagline": "Transform stdout to JSON",
    "description": "Transforms stdout output to JSON format. Useful for parsing command line output and converting it to structured data for further processing.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "JSON",
      "Parsing"
    ],
    "github": "https://github.com/yowainwright/stdoutToJSON",
    "npm": "https://www.npmjs.com/package/stdouttojson",
    "stars": 5,
    "highlights": [
      "Stdout parsing",
      "JSON output",
      "CLI integration"
    ],
    "content": "stdoutToJSON transforms stdout output to JSON format.\n\nUseful for parsing command line output and converting it to structured data for further processing."
  },
  {
    "id": "macrustle",
    "title": "Macrustle",
    "tagline": "Mac setup instructions for devs",
    "description": "Super basic setup instructions \"rustled up\" for coding on a Mac. A quick reference guide for setting up a development environment on macOS.",
    "category": "personal",
    "tags": [
      "Documentation",
      "macOS",
      "Setup"
    ],
    "github": "https://github.com/yowainwright/macrustle",
    "stars": 4,
    "highlights": [
      "Mac setup guide",
      "Dev environment",
      "Quick reference"
    ],
    "content": "Macrustle provides super basic setup instructions \"rustled up\" for coding on a Mac.\n\nA quick reference guide for setting up a development environment on macOS."
  },
  {
    "id": "install-perfection",
    "title": "install-perfection",
    "tagline": "Install dependencies with control",
    "description": "Install dependencies with control. Manage dependency installation with size awareness and folder management capabilities.",
    "category": "personal",
    "tags": [
      "CLI",
      "Dependencies",
      "Package Management",
      "Utilities"
    ],
    "github": "https://github.com/yowainwright/install-perfection",
    "stars": 3,
    "highlights": [
      "Controlled installation",
      "Size awareness",
      "Folder management",
      "Dependency tracking"
    ],
    "content": "Install dependencies with control and size awareness."
  },
  {
    "id": "sassimple",
    "title": "sassimple",
    "tagline": "Fill CSS gaps with sass mixins",
    "description": "Fill in your CSS gaps with sass mixins simply. A collection of useful Sass mixins for common styling patterns and utilities.",
    "category": "personal",
    "tags": [
      "Sass",
      "CSS",
      "Mixins",
      "Styling"
    ],
    "github": "https://github.com/yowainwright/sassimple",
    "stars": 12,
    "highlights": [
      "Utility mixins",
      "Common patterns",
      "Easy to use",
      "Lightweight"
    ],
    "content": "Fill in your CSS gaps with sass mixins simply."
  },
  {
    "id": "merge-tsconfigs",
    "title": "Merge TSConfigs",
    "tagline": "Merge TypeScript config files",
    "description": "A CLI or Node function for merging tsconfig files. Useful for managing complex TypeScript projects with multiple configuration files that need to be combined.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Config"
    ],
    "github": "https://github.com/yowainwright/merge-tsconfigs",
    "stars": 2,
    "highlights": [
      "TSConfig merging",
      "CLI and API",
      "Config management"
    ],
    "content": "Merge TSConfigs is a CLI or Node function for merging tsconfig files.\n\nUseful for managing complex TypeScript projects with multiple configuration files that need to be combined."
  },
  {
    "id": "fast-brake",
    "title": "Fast Brake",
    "tagline": "Quick JS checker for builds",
    "description": "A quick JavaScript checker to keep your builds right. Validates JavaScript files during the build process to catch issues early and prevent broken deployments.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Build Tools"
    ],
    "github": "https://github.com/yowainwright/fast-brake",
    "stars": 1,
    "highlights": [
      "Build validation",
      "Fast checks",
      "CI integration"
    ],
    "website": "https://jeffry.in/fast-brake/",
    "content": "Fast Brake is a quick JavaScript checker to keep your builds right.\n\nValidates JavaScript files during the build process to catch issues early and prevent broken deployments."
  },
  {
    "id": "awesome-writing-tools",
    "title": "Awesome Writing Tools",
    "tagline": "Curated list of writing tools",
    "description": "A curated list of awesome tools for improving written communication. Includes grammar checkers, style guides, markdown editors, and more.",
    "category": "personal",
    "tags": [
      "Awesome List",
      "Writing",
      "Tools",
      "Documentation"
    ],
    "github": "https://github.com/yowainwright/awesome-writing-tools",
    "stars": 158,
    "highlights": [
      "Grammar and style tools",
      "Markdown editors",
      "Documentation helpers",
      "Writing aids"
    ],
    "content": "A curated list of awesome tools for improving written communication."
  },
  {
    "id": "md-page-to-json",
    "title": "md-page-to-json",
    "tagline": "Convert markdown to json",
    "description": "An ESM snippet for converting markdown with frontmatter to JSON. Parse and transform markdown files into structured data.",
    "category": "personal",
    "tags": [
      "Markdown",
      "JSON",
      "ESM",
      "Utilities"
    ],
    "github": "https://github.com/yowainwright/md-page-to-json",
    "stars": 1,
    "highlights": [
      "Frontmatter parsing",
      "JSON output",
      "ESM module",
      "Simple API"
    ],
    "content": "An ESM snippet for converting markdown with frontmatter to JSON."
  },
  {
    "id": "logsdx",
    "title": "LogsDX",
    "tagline": "Log streaming with DX focus",
    "description": "Log streaming utility with developer experience at its core. Provides intuitive log streaming capabilities designed to make debugging and monitoring more pleasant.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Logging",
      "DX"
    ],
    "github": "https://github.com/yowainwright/logsdx",
    "stars": 3,
    "highlights": [
      "DX-focused",
      "Log streaming",
      "Developer tooling"
    ],
    "website": "https://jeffry.in/logsdx/",
    "content": "LogsDX is a log streaming utility with developer experience at its core.\n\nIt provides intuitive log streaming capabilities designed to make debugging and monitoring more pleasant."
  },
  {
    "id": "developer-ci-benefits",
    "title": "Developer CI Benefits",
    "tagline": "CI benefits talk docs",
    "description": "Talk documentation covering Continuous Integration benefits, descriptions, and setup tips. Resources for understanding and implementing CI/CD.",
    "category": "personal",
    "tags": [
      "CI/CD",
      "Documentation",
      "DevOps",
      "Testing"
    ],
    "github": "https://github.com/yowainwright/developer-ci-benefits",
    "website": "https://bit.ly/2NGQqiJ",
    "stars": 31,
    "highlights": [
      "CI benefits explained",
      "Setup guides",
      "CircleCI and Travis CI",
      "Jest integration"
    ],
    "content": "Talk docs covering CI benefits, descriptions, and setup tips."
  },
  {
    "id": "obsidian-gcal-sync",
    "title": "Obsidian GCal Sync",
    "tagline": "Obsidian Google Calendar sync",
    "description": "Obsidian plugin for bidirectional Google Calendar synchronization with slash commands. Keep your notes and calendar in sync effortlessly.",
    "category": "personal",
    "tags": [
      "Obsidian",
      "Google Calendar",
      "Plugin",
      "Productivity"
    ],
    "github": "https://github.com/yowainwright/obsidian-gcal-sync",
    "stars": 1,
    "highlights": [
      "Bidirectional sync",
      "Slash commands",
      "Calendar integration"
    ],
    "content": "Obsidian plugin for bidirectional Google Calendar sync with slash commands."
  },
  {
    "id": "mousecase",
    "title": "mousecase",
    "tagline": "Horizontal dragging on mousedown",
    "description": "A JavaScript utility enabling horizontal dragging on mousedown events. Smooth scrolling and trackpad-like interactions for web applications.",
    "category": "personal",
    "tags": [
      "JavaScript",
      "Mouse Events",
      "Scrolling",
      "UI"
    ],
    "github": "https://github.com/yowainwright/mousecase",
    "stars": 29,
    "highlights": [
      "Horizontal drag scrolling",
      "Mousedown event handling",
      "Trackpad-like UX",
      "Smooth scrolling"
    ],
    "content": "A JavaScript utility enabling horizontal dragging on mousedown events."
  },
  {
    "id": "rssm",
    "title": "rssm",
    "tagline": "React schema state machine",
    "description": "A React state machine library driven by schema definitions. Declarative state management with type-safe transitions and predictable behavior.",
    "category": "personal",
    "tags": [
      "React",
      "State Machine",
      "TypeScript"
    ],
    "github": "https://github.com/yowainwright/rssm",
    "stars": 1,
    "highlights": [
      "Schema-driven state",
      "Type-safe transitions",
      "React hooks integration"
    ],
    "content": "React schema state machine for declarative state management."
  },
  {
    "id": "monorepo-utilities",
    "title": "Monorepo Utilities",
    "tagline": "Tools for monorepo development",
    "description": "A TypeScript-based monorepo development toolkit providing CLI and programmatic interfaces for monorepo management. Includes Install-Dependencies utility for granular control over dependency installation in complex monorepo environments.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Monorepo",
      "pnpm"
    ],
    "github": "https://github.com/yowainwright/monorepo-utilities",
    "stars": 10,
    "highlights": [
      "CLI and programmatic API",
      "Install-Dependencies utility",
      "pnpm workspaces + Turbo",
      "Actively maintained"
    ],
    "content": "Monorepo Utilities is a TypeScript-based monorepo development toolkit providing CLI and programmatic interfaces for monorepo management.\n\nIt includes the Install-Dependencies utility for granular control over dependency installation in complex monorepo environments."
  },
  {
    "id": "envdx",
    "title": "EnvDX",
    "tagline": "Another dotenv manager",
    "description": "Another dotenv manager focused on developer experience. Provides intuitive environment variable management for Node.js applications.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Environment",
      "DX"
    ],
    "github": "https://github.com/yowainwright/envdx",
    "stars": 0,
    "highlights": [
      "Dotenv management",
      "DX-focused",
      "Environment vars"
    ],
    "content": "EnvDX is another dotenv manager focused on developer experience.\n\nProvides intuitive environment variable management for Node.js applications."
  },
  {
    "id": "pk",
    "title": "pk",
    "tagline": "Process killer CLI",
    "description": "A simple command-line utility for killing processes by name or port. Quick and efficient process management from the terminal.",
    "category": "personal",
    "tags": [
      "CLI",
      "Process",
      "Utilities"
    ],
    "github": "https://github.com/yowainwright/pk",
    "stars": 0,
    "highlights": [
      "Kill by process name",
      "Kill by port number",
      "Simple CLI interface"
    ],
    "content": "A simple command-line utility for killing processes by name or port."
  },
  {
    "id": "diu",
    "title": "diu",
    "tagline": "Package manager manager",
    "description": "WIP: Do I Use - a package manager manager that helps track and manage dependencies across different package managers.",
    "category": "personal",
    "tags": [
      "CLI",
      "Package Manager",
      "Dependencies"
    ],
    "github": "https://github.com/yowainwright/diu",
    "stars": 0,
    "highlights": [
      "Multi-package manager support",
      "Dependency tracking",
      "Usage analysis"
    ],
    "content": "Do I Use - a package manager manager for tracking dependencies."
  },
  {
    "id": "typescript-lib-starter",
    "title": "TypeScript Lib Starter",
    "tagline": "Batteries-included TS library template",
    "description": "A batteries-included TypeScript library starter with React GitHub Docs page setup in minutes. Provides everything needed to start building and publishing TypeScript libraries.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Template",
      "Library"
    ],
    "github": "https://github.com/yowainwright/typescript-lib-starter",
    "stars": 2,
    "highlights": [
      "Library template",
      "GitHub Pages docs",
      "Quick start"
    ],
    "content": "TypeScript Lib Starter is a batteries-included TypeScript library starter with React GitHub Docs page setup in minutes.\n\nProvides everything needed to start building and publishing TypeScript libraries."
  },
  {
    "id": "fjsf",
    "title": "FJSF",
    "tagline": "Fuzzy JSON search & filter",
    "description": "A fuzzy JSON search and filter utility. Enables flexible searching and filtering of JSON data with fuzzy matching capabilities for more forgiving queries.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "JSON",
      "Search"
    ],
    "github": "https://github.com/yowainwright/fjsf",
    "stars": 2,
    "highlights": [
      "Fuzzy matching",
      "JSON filtering",
      "Flexible queries"
    ],
    "content": "FJSF is a fuzzy JSON search and filter utility.\n\nIt enables flexible searching and filtering of JSON data with fuzzy matching capabilities for more forgiving queries."
  },
  {
    "id": "intrinsic-dependencies",
    "title": "Intrinsic Dependencies",
    "tagline": "Protect invisible required deps",
    "description": "A simple utility ensuring invisible but required Node.js dependencies are not removed. Prevents accidental removal of critical transitive dependencies that your code relies on.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Dependencies"
    ],
    "github": "https://github.com/yowainwright/intrinsic-dependencies",
    "stars": 3,
    "highlights": [
      "Dependency protection",
      "Build safety",
      "Transitive deps"
    ],
    "content": "Intrinsic Dependencies is a simple utility ensuring invisible but required Node.js dependencies are not removed.\n\nIt prevents accidental removal of critical transitive dependencies that your code relies on."
  },
  {
    "id": "awesome-monorepo-utilities",
    "title": "Awesome Monorepo Utilities",
    "tagline": "Curated monorepo utilities list",
    "description": "A curated list of awesome monorepo utilities. Tools for managing, building, and maintaining monorepo projects at scale.",
    "category": "personal",
    "tags": [
      "Awesome List",
      "Monorepo",
      "Build Tools",
      "DevOps"
    ],
    "github": "https://github.com/yowainwright/awesome-monorepo-utilities",
    "stars": 11,
    "highlights": [
      "Build orchestration tools",
      "Workspace managers",
      "Dependency management",
      "CI/CD integrations"
    ],
    "content": "A curated list of awesome monorepo utilities for managing projects at scale."
  },
  {
    "id": "1ls",
    "title": "1ls",
    "tagline": "One-line scripts for CLI",
    "description": "One-line-script utility for the command line. Provides a streamlined way to create and execute single-line scripts, simplifying common CLI tasks.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "CLI",
      "Scripting"
    ],
    "github": "https://github.com/yowainwright/1ls",
    "stars": 1,
    "highlights": [
      "One-line scripts",
      "CLI utility",
      "Task automation"
    ],
    "website": "https://jeffry.in/1ls/",
    "content": "1ls is a one-line-script utility for the command line.\n\nIt provides a streamlined way to create and execute single-line scripts, simplifying common CLI tasks."
  },
  {
    "id": "xldx",
    "title": "XLDX",
    "tagline": "Excel utility with DX focus",
    "description": "JavaScript version of xldx, an Excel utility with developer experience on the brain. Simplifies working with Excel files in Node.js applications.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Excel",
      "DX"
    ],
    "github": "https://github.com/yowainwright/xldx",
    "stars": 1,
    "highlights": [
      "Excel processing",
      "DX-focused",
      "Node.js utility"
    ],
    "website": "https://jeffry.in/xldx/",
    "content": "XLDX is the JavaScript version of xldx, an Excel utility with developer experience on the brain.\n\nSimplifies working with Excel files in Node.js applications."
  },
  {
    "id": "prisma-migrations",
    "title": "Prisma Migrations",
    "tagline": "Friendly Prisma migration tooling",
    "description": "Friendly Prisma migration tooling that simplifies database schema migrations. Provides a more intuitive interface for managing Prisma migrations in development and production.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Prisma",
      "Database",
      "Migrations"
    ],
    "github": "https://github.com/yowainwright/prisma-migrations",
    "stars": 3,
    "highlights": [
      "Prisma integration",
      "Migration management",
      "Developer friendly"
    ],
    "website": "https://jeffry.in/prisma-migrations/",
    "content": "Prisma Migrations is friendly Prisma migration tooling that simplifies database schema migrations.\n\nIt provides a more intuitive interface for managing Prisma migrations in development and production."
  },
  {
    "id": "fasthar",
    "title": "fasthar",
    "tagline": "HAR files, but fast",
    "description": "High-performance HAR (HTTP Archive) file processing. Fast parsing and analysis of network traffic data for debugging and performance analysis.",
    "category": "personal",
    "tags": [
      "HAR",
      "Performance",
      "Network"
    ],
    "github": "https://github.com/yowainwright/fasthar",
    "stars": 0,
    "highlights": [
      "Fast HAR parsing",
      "Network analysis",
      "Performance debugging"
    ],
    "content": "HAR files, but fast - high-performance HTTP Archive processing."
  },
  {
    "id": "yaml-comment-generator",
    "title": "yaml-comment-generator",
    "tagline": "Generate yaml comments with precision",
    "description": "Generate YAML comments with precision. Add documentation and annotations to YAML files programmatically while preserving structure.",
    "category": "personal",
    "tags": [
      "YAML",
      "CLI",
      "Documentation",
      "Utilities"
    ],
    "github": "https://github.com/yowainwright/yaml-comment-generator",
    "stars": 0,
    "highlights": [
      "Precise comment placement",
      "Structure preservation",
      "Programmatic generation"
    ],
    "content": "Generate YAML comments with precision while preserving file structure."
  },
  {
    "id": "awesome-policy-tools",
    "title": "Awesome Policy Tools",
    "tagline": "Policy as code tools",
    "description": "A curated list of awesome policy as code tools. Includes OPA, Sentinel, and other tools for defining and enforcing policies programmatically.",
    "category": "personal",
    "tags": [
      "Awesome List",
      "Policy as Code",
      "Security",
      "DevOps"
    ],
    "github": "https://github.com/yowainwright/awesome-policy-tools",
    "stars": 0,
    "highlights": [
      "OPA and Rego tools",
      "Policy enforcement",
      "Security automation"
    ],
    "content": "Awesome policy as code tools for programmatic policy enforcement."
  },
  {
    "id": "algorithms",
    "title": "Algorithms",
    "tagline": "Documented algorithms in TypeScript",
    "description": "Documented algorithms using JavaScript written in TypeScript and Markdown. A learning resource for understanding common algorithms with clear explanations and typed implementations.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Algorithms",
      "Education"
    ],
    "github": "https://github.com/yowainwright/algorithms",
    "stars": 0,
    "highlights": [
      "Algorithm implementations",
      "TypeScript",
      "Educational"
    ],
    "content": "Algorithms provides documented algorithms using JavaScript written in TypeScript and Markdown.\n\nA learning resource for understanding common algorithms with clear explanations and typed implementations."
  },
  {
    "id": "generate-clean-number",
    "title": "generate-clean-number",
    "tagline": "Remove NaN from numbers",
    "description": "A JavaScript utility for removing anything that is not a number (NaN) from a number. Handles internationalization, dates, and currency formatting.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Numbers",
      "Utilities",
      "Intl"
    ],
    "github": "https://github.com/yowainwright/generate-clean-number",
    "stars": 5,
    "highlights": [
      "NaN removal",
      "Intl number support",
      "Currency formatting",
      "Date number handling"
    ],
    "content": "A JavaScript utility for removing NaN from numbers with Intl support."
  },
  {
    "id": "mini-cookies",
    "title": "Mini Cookies",
    "tagline": "Minimal document.cookie wrapper",
    "description": "A minimal Document.cookie package providing a clean API for cookie management in the browser. Lightweight and straightforward for basic cookie operations.",
    "category": "personal",
    "tags": [
      "TypeScript",
      "Browser",
      "Cookies"
    ],
    "github": "https://github.com/yowainwright/mini-cookies",
    "npm": "https://www.npmjs.com/package/mini-cookies",
    "stars": 11,
    "highlights": [
      "Zero dependencies",
      "Simple API",
      "TypeScript support"
    ],
    "website": "https://jeffry.in/mini-cookies/",
    "content": "Mini Cookies is a minimal Document.cookie package providing a clean API for cookie management in the browser.\n\nLightweight and straightforward for basic cookie operations."
  },
  {
    "id": "codesandbox-cli-template",
    "title": "CodeSandbox CLI Template",
    "tagline": "Template for CLI codesandboxes",
    "description": "A template for easily creating CodeSandbox environments for CLI programs. Enables interactive demos and examples for command-line tools.",
    "category": "personal",
    "tags": [
      "Template",
      "CodeSandbox",
      "CLI"
    ],
    "github": "https://github.com/yowainwright/codesandbox-cli-template",
    "stars": 0,
    "highlights": [
      "Quick CLI sandbox setup",
      "Interactive demos",
      "Easy sharing"
    ],
    "content": "A template for creating CodeSandbox environments for CLI programs."
  }
];

export const categories = [
  { id: 'oss-contribution', label: 'Contributions' },
  { id: 'personal', label: 'Projects' },
] as const;
