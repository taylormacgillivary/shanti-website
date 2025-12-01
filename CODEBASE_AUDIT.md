# Codebase Audit Report
## Shanti Hot Yoga Website

**Date:** December 1, 2025  
**Framework:** Next.js 15.3.4 with React 19  
**Auditor:** AI Code Review

---

## Executive Summary

This audit reviews the Shanti Hot Yoga website codebase against industry best practices, clean code principles, proper architecture, and enterprise standards. Overall, the codebase demonstrates **solid fundamentals** with modern tooling. There are several areas of excellence and some opportunities for improvement.

### Overall Score: **B+** (Good)

| Category | Score | Notes |
|----------|-------|-------|
| Architecture & Structure | A- | Well-organized Next.js App Router structure |
| Code Quality | B+ | Clean, readable code with minor inconsistencies |
| Type Safety | B | Good TypeScript usage, some gaps |
| Security | B | Server actions used properly, minor env var concern |
| Performance | B+ | Good image optimization, some opportunities |
| Maintainability | B+ | Reusable components, some duplication |
| Testing | D | No test files found |
| Documentation | C | Limited inline documentation |

---

## 1. Architecture & Project Structure

### ✅ Strengths

- **Modern App Router**: Correctly using Next.js 15 App Router with the `src/app` directory structure
- **Component Organization**: Clean separation between page components and reusable UI components
- **shadcn/ui Integration**: Proper use of shadcn/ui components with Radix UI primitives
- **Path Aliases**: Configured `@/*` path alias for clean imports

### ⚠️ Areas for Improvement

#### 1.1 Mixed Routing Patterns
The project has both `src/app` (App Router) and `src/pages` (Pages Router) directories:

```
src/
├── app/           ← App Router (primary)
└── pages/         ← Pages Router (legacy)
    ├── _app.tsx
    └── about.tsx
```

**Recommendation:** Migrate `src/pages/about.tsx` to `src/app/about/page.tsx` to maintain consistency. Having both routers can cause confusion and potential routing conflicts.

#### 1.2 Duplicate Configuration Files
Two Next.js config files exist:
- `next.config.js`
- `next.config.ts`

**Recommendation:** Remove the unused config file (likely `next.config.js`).

---

## 2. Code Quality & Clean Code

### ✅ Strengths

- **Consistent Naming**: Components use PascalCase, functions use camelCase
- **Component Composition**: Good use of composition patterns with reusable components like `PageHero`, `CoursePage`
- **Type Safety**: TypeScript interfaces defined for major data structures

### ⚠️ Areas for Improvement

#### 2.1 Code Duplication in Server Actions
The `contact.ts`, `energy-exchange.ts`, and `membership.ts` actions contain nearly identical Web3Forms submission logic:

```typescript
// This pattern is repeated 5+ times across files
const response = await fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; ShantiHotYoga/1.0; +https://shantihotyoga.ca)",
    Origin: "https://shantihotyoga.ca",
    Referer: "...",
  },
  body: JSON.stringify({...}),
});
```

**Recommendation:** Extract into a shared utility:

```typescript
// src/lib/web3forms.ts
export async function submitWeb3Form(data: Web3FormPayload): Promise<Web3FormResponse> {
  // Centralized logic
}
```

#### 2.2 Inconsistent "use client" Placement
Some client components have `"use client"` with different formatting:

```typescript
"use client"  // Some files
"use client"; // Other files (with semicolon)
```

**Recommendation:** Standardize on one style (preferably without semicolon to match Next.js documentation).

#### 2.3 Console Logging in Production
Multiple files contain `console.log` statements:

```typescript
// src/app/api/mindbody/route.ts
console.log('Fetching from MindBody:', url.toString());
console.log('MindBody API Response:', JSON.stringify(data, null, 2));

// src/lib/mailchimp.ts
console.log(`Mailchimp: Subscribing ${email} to list ${listId}`);
```

**Recommendation:** Implement a proper logging utility that respects environment:

```typescript
const logger = {
  info: (msg: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') console.log(msg, ...args);
  },
  error: (msg: string, ...args: unknown[]) => {
    console.error(msg, ...args); // Always log errors
  }
};
```

#### 2.4 Magic Numbers and Strings
Hardcoded values scattered throughout:

```typescript
// gift-card-popup.tsx
const thirtySixHoursInMs = 36 * 60 * 60 * 1000;
setTimeout(() => setOpen(true), 1500);

// navigation.tsx
const navHeight = 64; // h-16 = 64px
```

**Recommendation:** Create a constants file:

```typescript
// src/lib/constants.ts
export const POPUP_DELAY_MS = 1500;
export const POPUP_COOLDOWN_HOURS = 36;
export const NAV_HEIGHT_PX = 64;
```

---

## 3. TypeScript & Type Safety

### ✅ Strengths

- **Strict Mode Enabled**: `tsconfig.json` has `"strict": true`
- **Interface Definitions**: Good type definitions for major structures
- **Zod Validation**: Using Zod for runtime validation in forms

### ⚠️ Areas for Improvement

#### 3.1 Type Assertions with `as`
Multiple type assertions that could be replaced with proper typing:

```typescript
// mailchimp.ts
const err = error as { status?: number; response?: { body?: { detail?: string } } };
```

**Recommendation:** Create proper error types or use type guards:

```typescript
interface MailchimpError {
  status?: number;
  response?: { body?: { detail?: string; title?: string } };
  message?: string;
}

function isMailchimpError(error: unknown): error is MailchimpError {
  return typeof error === 'object' && error !== null;
}
```

#### 3.2 Incomplete Types File
`src/types/index.ts` only defines `NavItem`:

```typescript
export type NavItem = {
  title: string;
  href?: string;
  // ...
};
```

**Recommendation:** Centralize more types here:
- Teacher, Workshop, Studio types
- API response types
- Form data types

#### 3.3 Missing Return Types on Functions
Many functions lack explicit return types:

```typescript
// Should be: async function sendEmail(data: ContactFormData): Promise<{success: boolean; message: string}>
export async function sendEmail(data: ContactFormData) {
```

---

## 4. Security

### ✅ Strengths

- **Server Actions**: Properly using Next.js Server Actions for sensitive operations
- **Environment Variables**: API keys stored in environment variables
- **External Links**: Using `rel="noopener noreferrer"` on external links

### ⚠️ Areas for Improvement

#### 4.1 Public Environment Variable for API Key
The Web3Forms API key uses `NEXT_PUBLIC_` prefix:

```typescript
process.env.NEXT_PUBLIC_WEB3FORMS_KEY
```

**Issue:** `NEXT_PUBLIC_` variables are exposed to the client bundle. While Web3Forms keys are designed to be public, this pattern could be problematic if copied for other secrets.

**Recommendation:** Add a comment clarifying this is intentional, or use a non-public variable in server actions.

#### 4.2 Input Sanitization
Form inputs aren't sanitized before being included in emails:

```typescript
const emailContent = `
  Name: ${data.name}
  Message: ${data.message}
`;
```

**Recommendation:** While not critical for email content, consider basic sanitization for any data that might be displayed.

#### 4.3 No Rate Limiting
API routes and server actions have no rate limiting:

**Recommendation:** Implement rate limiting for:
- Contact form submissions
- Newsletter signups
- Energy exchange applications

---

## 5. Performance

### ✅ Strengths

- **Next.js Image Optimization**: Using `next/image` with proper `sizes` attributes
- **Font Optimization**: Using `next/font/google` for web fonts
- **React Query**: Proper data fetching with caching via TanStack Query
- **Vercel Analytics**: Performance monitoring integrated

### ⚠️ Areas for Improvement

#### 5.1 Large Component Files
Some files are quite large and could be split:
- `navigation.tsx`: 549 lines
- `course-page.tsx`: 486 lines

**Recommendation:** Extract sub-components into separate files.

#### 5.2 External Image URLs
Some components reference external images:

```typescript
// studios-section.tsx
image: "https://images.squarespace-cdn.com/content/v1/..."
```

**Recommendation:** Download and optimize these images locally, or at minimum configure `next.config.ts` for the remote domain.

#### 5.3 No Suspense Boundaries for Lazy Loading
Client components could benefit from lazy loading:

```typescript
// Current: Always loaded
import { Navigation } from "@/components/navigation";

// Better: Lazy loaded
const Navigation = dynamic(() => import("@/components/navigation"), {
  loading: () => <NavSkeleton />
});
```

#### 5.4 QueryClient Created Outside Component
In `client-layout.tsx`:

```typescript
const queryClient = new QueryClient();

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  // ...
}
```

**Issue:** This creates a new QueryClient on module load, which is fine for SSR but could cause issues if the module is reimported.

**Recommendation:**

```typescript
function makeQueryClient() {
  return new QueryClient();
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  // ...
}
```

---

## 6. Accessibility

### ✅ Strengths

- **Semantic HTML**: Good use of `<section>`, `<header>`, `<footer>`, `<main>`
- **Alt Text**: Images have alt attributes
- **Radix UI**: Using accessible Radix UI primitives
- **Screen Reader Text**: Some sr-only text present

### ⚠️ Areas for Improvement

#### 6.1 Form Labels
Some forms use placeholder text instead of proper labels:

```typescript
// newsletter-signup.tsx
<input placeholder="Email Address" />
```

**Recommendation:** Add visible or visually-hidden labels.

#### 6.2 User Scalable Disabled
In `layout.tsx`:

```typescript
export const viewport: Viewport = {
  userScalable: false,
};
```

**Issue:** This prevents users from zooming, which is an accessibility concern.

**Recommendation:** Remove `userScalable: false` or set to `true`.

#### 6.3 Color Contrast
Custom sage-green color should be verified for contrast ratio:

```css
.sage-green { color: rgb(150, 191, 80); }
```

---

## 7. Dependencies & Package Management

### ✅ Strengths

- **Modern Packages**: Using latest versions of Next.js, React, and key dependencies
- **Lock File**: `package-lock.json` present for reproducible builds
- **Type Definitions**: Dev dependencies include `@types/*` packages

### ⚠️ Areas for Improvement

#### 7.1 Unused Dependencies
Consider auditing for unused packages:

```bash
npx depcheck
```

Potentially unused:
- `@tanstack/react-query` (not seeing heavy usage)

#### 7.2 Missing Environment Variable Schema
No validation for required environment variables.

**Recommendation:** Add Zod schema for env vars:

```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  MAILCHIMP_API_KEY: z.string().min(1),
  MAILCHIMP_SERVER_PREFIX: z.string().min(1),
  MINDBODY_API_KEY: z.string().min(1),
  MINDBODY_SITE_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

---

## 8. Testing

### ❌ Critical Gap

No test files were found in the codebase.

**Recommendation:** Add testing infrastructure:

1. **Unit Tests** (Jest + React Testing Library):
   - Form validation logic
   - Utility functions
   - Server actions

2. **Integration Tests**:
   - Form submissions
   - API route handlers

3. **E2E Tests** (Playwright):
   - Critical user flows (booking, contact, newsletter)

Example test structure:
```
src/
├── __tests__/
│   ├── components/
│   ├── actions/
│   └── utils/
```

---

## 9. Code Style & Formatting

### ✅ Strengths

- **ESLint Config**: Using `eslint-config-next` with TypeScript support
- **Tailwind CSS**: Consistent utility-first styling
- **CSS Variables**: Using CSS custom properties for theming

### ⚠️ Areas for Improvement

#### 9.1 Missing Prettier Configuration
No `.prettierrc` file found.

**Recommendation:** Add Prettier for consistent formatting:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

#### 9.2 Inconsistent File Naming
UI components mix conventions:
- `Bio.tsx` (PascalCase)
- `use-toast.ts` (kebab-case)
- `PastRetreatsMap.tsx` (PascalCase)

**Recommendation:** Standardize on one convention (prefer kebab-case for files, PascalCase for component names).

---

## 10. Documentation

### ⚠️ Areas for Improvement

#### 10.1 Code Comments
Most functions lack JSDoc documentation:

```typescript
// Current
export async function subscribeToList({ email, firstName, ... }) {

// Better
/**
 * Subscribe a user to a Mailchimp audience list
 * @param params - Subscription parameters
 * @param params.email - User's email address
 * @param params.listId - Mailchimp audience ID
 * @returns Promise resolving to subscription result
 */
export async function subscribeToList({ email, firstName, ... })
```

#### 10.2 README Could Be Enhanced
Current README is minimal.

**Recommendation:** Add:
- Setup instructions
- Environment variable documentation
- Development workflow
- Deployment process

---

## 11. Best Practices Checklist

| Practice | Status | Notes |
|----------|--------|-------|
| TypeScript strict mode | ✅ | Enabled |
| ESLint configuration | ✅ | Configured |
| Environment variables | ⚠️ | No schema validation |
| Error boundaries | ❌ | Not implemented |
| Loading states | ⚠️ | Inconsistent |
| SEO metadata | ✅ | Good implementation |
| Image optimization | ✅ | Using next/image |
| Font optimization | ✅ | Using next/font |
| Code splitting | ⚠️ | Could improve |
| Bundle analysis | ❌ | Not configured |

---

## Priority Recommendations

### High Priority
1. **Add Error Boundaries** - Prevent full page crashes
2. **Migrate Pages Router** - Remove `src/pages` in favor of App Router
3. **Add Environment Variable Validation** - Prevent runtime crashes
4. **Enable User Scaling** - Accessibility requirement

### Medium Priority
1. **Extract Web3Forms Utility** - Reduce code duplication
2. **Add Basic Tests** - Start with critical paths
3. **Configure Prettier** - Consistent code formatting
4. **Remove Console Logs** - Create proper logging utility

### Low Priority
1. **Add JSDoc Comments** - Improve maintainability
2. **Standardize File Naming** - Better consistency
3. **Configure Bundle Analyzer** - Optimize bundle size
4. **Add Constants File** - Remove magic numbers

---

## Conclusion

The Shanti Hot Yoga website codebase is **well-structured and follows modern React/Next.js patterns**. The primary concerns are:

1. **No test coverage** - This is the biggest risk for production stability
2. **Mixed routing patterns** - Should consolidate to App Router
3. **Code duplication** - Server actions have repeated logic
4. **Missing error boundaries** - Could cause poor UX on errors

The codebase demonstrates good understanding of Next.js 15 features including Server Actions, Image optimization, and the App Router. With the recommended improvements, this would be an **excellent** enterprise-grade codebase.

---

*Report generated by AI Code Audit*

