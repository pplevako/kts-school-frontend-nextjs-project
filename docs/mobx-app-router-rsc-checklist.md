# MobX + Next App Router (RSC) — checklist (rephrased)

This repo uses Next App Router with Server Components. Any Client Component rendered by a Server Component (`page.tsx` / `layout.tsx`) is an **RSC client boundary**. When `searchParams` change (e.g. via `router.replace()`), Next performs a **server navigation** and may re-emit that segment. If the boundary’s identity changes, React/Next may **replace the subtree** (unmount/mount) instead of updating it.

## 1) Exported boundary: keep it boring
**Goal:** make the component that the server renders stable across navigations.

Do:
- Export a **plain** boundary component: `props -> effects/hydration -> <View />`.
- Keep boundary render mostly “pure”: wire stores, run effects, delegate UI.

Avoid:
- Wrapping the exported boundary in `observer(...)`, `memo(...)`, `forwardRef(...)`, or other HOCs.
- Reading MobX observables directly in the exported boundary render.

Recommended pattern:
```tsx
// boundary shell (NOT observer)
export default function PageClient(props) {
  useEffect(() => hydrateFromProps(props), [/* stable deps */]);
  return <PageView />;
}

// observed UI
const PageView = observer(function PageView() {
  return <UI />;
});
```

## 2) Observed UI: `observer()` on inner components
Do:
- Put `observer()` on “view/leaf” components that actually read observables.
- Prefer `observer(Component)` over `useObserver(() => ...)` inside the exported boundary.

## 3) Hydration: depend on stable values
Server pages often create fresh objects each render (new identity every navigation). That is normal.

Do:
- Make hydration effects depend on **stable primitives** instead of whole objects.
  - e.g. `initialFilters.search`, `initialFilters.categories.join(',')`
- Keep `hydrate(...)` idempotent (same input => same state).

Avoid:
- Depending on `initialFilters` / `initialProducts` object identity if it causes unnecessary re-hydration.

## 4) Inputs + URL sync: pick a source of truth
When the URL drives server data, hydration can update the store after navigation.

Do:
- Decide whether the store or local React state is the “truth” for controlled inputs.

Avoid:
- Mixing local `useState` + a MobX `reaction` that overwrites it without a clear priority rule (can cause “snap back”).

## 5) Common remount triggers (even without MobX)
Avoid:
- `key` derived from `searchParams` on boundaries or their parents.
- Conditional rendering that removes the subtree during transitions (prefer skeletons *inside* the subtree).

## 6) Store lifetime
Do:
- Keep `StoreProvider` above segments that re-render on navigations (layout-level is ideal).
- Ensure any component using hooks / `useStore()` / event handlers / `observer` is a Client Component (`'use client'`).
