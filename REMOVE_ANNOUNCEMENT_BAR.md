# How to Remove the Announcement Bar

Once the form submission issue is resolved, follow these steps to remove the announcement bar:

## Quick Removal

### Option 1: Comment Out (Easiest - Can be re-enabled quickly)

In `src/app/client-layout.tsx`, comment out the AnnouncementBar:

```tsx
return (
  <QueryClientProvider client={queryClient}>
    {/* <AnnouncementBar /> */}  {/* ← Add comment markers */}
    <Navigation />
    <main className="flex-grow">{children}</main>
    <Footer />
    <Toaster position="top-center" richColors />
  </QueryClientProvider>
);
```

### Option 2: Complete Removal

1. **Remove from layout** (`src/app/client-layout.tsx`):
   - Remove the import: `import { AnnouncementBar } from "@/components/announcement-bar";`
   - Remove the component: `<AnnouncementBar />`

2. **Delete the component file** (optional):
   - Delete `src/components/announcement-bar.tsx`

## Files to Modify

### File: `src/app/client-layout.tsx`

**Current (with announcement):**
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";  // ← Remove this

const queryClient = new QueryClient();

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <AnnouncementBar />  {/* ← Remove this */}
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
```

**After removal:**
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const queryClient = new QueryClient();

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
```

## After Making Changes

1. **Commit and push** to your repository
2. Vercel will automatically deploy the changes
3. The announcement bar will disappear from the site

## Note

Users can also dismiss the announcement bar themselves by clicking the X button, but removing it ensures new visitors won't see it at all.

