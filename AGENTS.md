<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:mobx-rsc-boundary-checklist -->
## MobX + App Router (RSC) boundary checklist

When a Client Component is rendered from a Server Component (`page.tsx` / `layout.tsx`) it becomes an RSC client boundary. On `router.replace()` with changed `searchParams` Next performs a server navigation and may re-emit the segment. To avoid **unmount/mount** of client subtrees, follow these rules:

### Boundary component (exported from server page)
- Keep the exported boundary **plain**: `props -> hydrate/effects -> return <View />`.
- Avoid reading MobX observables in the boundary render.
- **Do NOT wrap** the exported boundary in `observer(...)` / `memo(...)` / `forwardRef(...)` / other HOCs.

### Observed UI
- Put `observer(...)` on inner “view/leaf” components that actually read observables.
- Prefer `observer(View)` over `useObserver(() => ...)` in the exported boundary.

### Hydration from server props (`initial*`)
- Effects should depend on **stable primitives**, not object identity (server recreates objects each render).
  - e.g. `initialFilters.search`, `initialFilters.categories.join(',')`
- Keep `hydrate(...)` idempotent: same input => same state.

### Controlled inputs + navigation
- Treat changing `searchParams` as a **server navigation** (not shallow routing).
- Avoid mixing local React state + MobX state without a clear source-of-truth rule (otherwise values can “snap back” after hydrate).

### Remount triggers
- Do not add `key` based on `searchParams` to boundaries or their parents.
- Avoid conditional rendering that removes the subtree during transitions (prefer skeletons inside).

### Store lifetime
- Keep `StoreProvider` above segments that re-render on navigation (layout-level is ideal).
- Any component using `observer`, `useStore()`, hooks, or event handlers must be a Client Component (`'use client'`).
<!-- END:mobx-rsc-boundary-checklist -->

<!-- BEGIN:notes -->
Notes:
- If `node_modules/next/dist/docs/` is missing in the current install, rely on repo conventions and minimal changes.
<!-- END:notes -->
'}