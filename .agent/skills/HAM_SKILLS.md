# HAM Framework (Html As Modules) - Agent Skills

This document provides a comprehensive guide to the HAM framework used in this project. HAM is a Go-based static HTML compiler that enables modular development through Layouts, Pages, and Partials.

## Project Structure
- `src/`: Source files (`.html`, `.lhtml`, `.ts`, `.css`).
- `public/`: Output directory for the compiled site.
- `ham.json`: Project marker file.
- `package.json`: Contains build scripts (`ham build && rollup -c`).
- `rollup.config.js`: Bundles TypeScript/CSS from `src/` to `public/assets/`.

## Core Concepts

### 1. Layouts (`.lhtml`)
Layouts define the global wrapper (HTML, head, body tags). They must include `<embed type="ham/page"/>` where page content will be injected.
- Example: `src/default.lhtml`
- Useful placeholders: `{ham:css}` (injected styles), `{ham:js}` (injected scripts).

### 2. Pages (`.html`)
Individual pages that provide content to a layout. They must declare their configuration in a `data-ham-page-config` attribute on the root `div.page`.
- Example:
  ```html
  <div class="page" data-ham-page-config='{ "layout": "default.lhtml" }'>
    <!-- Page Content -->
  </div>
  ```

### 3. Partials
Reusable HTML fragments. Included using `<embed type="ham/partial" src="path/to/partial.html"/>`.
- Path is relative to the current file.

### 4. Resource Auto-linking
The HAM compiler automatically detects resources:
- A `.css` file with the same name as the `.html` page is auto-linked.
- A `.ts` file with the same name as the `.html` page is auto-linked as `<script type="module" src="...js">`.

## Development Workflow
- **Build**: `npm run build` executes `ham build` followed by Rollup for assets.
- **Local Dev**: Use `ham build -w` for watching source changes and a dev server (Vite) to serve the `public/` directory.

## Best Practices
- Keep layouts in `.lhtml` to differentiate from pages.
- Place reusable UI components in `src/components/` and include as partials.
- Use TypeScript for all logic; Rollup/Vite will handle the conversion to JS.
