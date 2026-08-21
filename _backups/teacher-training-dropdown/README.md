# Teacher Training dropdown backup

Saved before switching to the "Trainings and Courses" toggle nav.

## Restore options

### Option A — Git branch (preferred)
```bash
git checkout backup/teacher-training-dropdown-before-toggle -- \
  src/config/site.ts \
  src/components/navigation.tsx \
  src/app/teacher-training/short-ce-courses/
```

Then remove the new courses routes/components if desired:
```bash
rm -rf src/app/teacher-training/courses src/components/ce-course-page.tsx src/data/ce-courses.ts
```

### Option B — File copies in this folder
- `site.ts` — previous nav config (`teacherTrainingNav` including Short CE Courses)
- `navigation.tsx` — previous Teacher Training dropdown (no toggle)
- `short-ce-courses-page.tsx` — previous combined CE courses page
