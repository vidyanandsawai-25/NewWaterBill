# Component Reorganization Guide

## Overview
This guide explains how to move all components from `/components` to `/src/components/modules/citizen`.

## Files Already Migrated
✅ `/src/components/modules/citizen/WaterTheme.tsx`
✅ `/src/components/modules/citizen/CivicRibbon.tsx`
✅ `/src/components/figma/ImageWithFallback.tsx`
✅ `/src/components/common/ui/popover.tsx`
✅ `/src/components/common/ui/avatar.tsx`

## Files To Be Migrated

### Main Components (move to `/src/components/modules/citizen/`)
1. `/components/CitizenLanding.tsx` → `/src/components/modules/citizen/CitizenLanding.tsx`
2. `/components/CitizenPortal.tsx` → `/src/components/modules/citizen/CitizenPortal.tsx`
3. `/components/LoginPage.tsx` → `/src/components/modules/citizen/LoginPage.tsx`

### Citizen Subcomponents (move to `/src/components/modules/citizen/`)
4. `/components/citizen/ApplicationSuccess.tsx` → `/src/components/modules/citizen/ApplicationSuccess.tsx`
5. `/components/citizen/BillCalculator.tsx` → `/src/components/modules/citizen/BillCalculator.tsx`
6. `/components/citizen/FirstConnectionForm.tsx` → `/src/components/modules/citizen/FirstConnectionForm.tsx`
7. `/components/citizen/FirstConnectionGrievance.tsx` → `/src/components/modules/citizen/FirstConnectionGrievance.tsx`
8. `/components/citizen/Grievances.tsx` → `/src/components/modules/citizen/Grievances.tsx`
9. `/components/citizen/MyConnections.tsx` → `/src/components/modules/citizen/MyConnections.tsx`
10. `/components/citizen/NewConnectionForm.tsx` → `/src/components/modules/citizen/NewConnectionForm.tsx`
11. `/components/citizen/NewGrievanceFormContent.tsx` → `/src/components/modules/citizen/NewGrievanceFormContent.tsx`
12. `/components/citizen/NewGrievanceFormWrapper.tsx` → `/src/components/modules/citizen/NewGrievanceFormWrapper.tsx`
13. `/components/citizen/PayBills.tsx` → `/src/components/modules/citizen/PayBills.tsx`
14. `/components/citizen/RTIInfo.tsx` → `/src/components/modules/citizen/RTIInfo.tsx`
15. `/components/citizen/SubmitReading.tsx` → `/src/components/modules/citizen/SubmitReading.tsx`
16. `/components/citizen/Support.tsx` → `/src/components/modules/citizen/Support.tsx`
17. `/components/citizen/TrackStatus.tsx` → `/src/components/modules/citizen/TrackStatus.tsx`

## Import Path Replacements

When moving files, update all imports as follows:

### For files in `/src/components/modules/citizen/`:

**Old Import** → **New Import**
- `from './ui/button'` → `from '../../common/ui/button'`
- `from './ui/card'` → `from '../../common/ui/card'`
- `from './ui/badge'` → `from '../../common/ui/badge'`
- `from './ui/dialog'` → `from '../../common/ui/dialog'`
- `from './ui/input'` → `from '../../common/ui/input'`
- `from './ui/label'` → `from '../../common/ui/label'`
- `from './ui/select'` → `from '../../common/ui/select'`
- `from './ui/textarea'` → `from '../../common/ui/textarea'`
- `from './ui/checkbox'` → `from '../../common/ui/checkbox'`
- `from './ui/radio-group'` → `from '../../common/ui/radio-group'`
- `from './ui/tabs'` → `from '../../common/ui/tabs'`
- `from './ui/progress'` → `from '../../common/ui/progress'`
- `from './ui/avatar'` → `from '../../common/ui/avatar'`
- `from './ui/popover'` → `from '../../common/ui/popover'`
- `from './citizen/ComponentName'` → `from './ComponentName'`
- `from './WaterTheme'` → `from './WaterTheme'`
- `from './CivicRibbon'` → `from './CivicRibbon'`
- `from '../figma/ImageWithFallback'` → `from '../../figma/ImageWithFallback'`

## Additional UI Components Needed

Copy these from `/components/ui/` to `/src/components/common/ui/`:

- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- breadcrumb.tsx
- calendar.tsx
- carousel.tsx
- chart.tsx
- command.tsx
- context-menu.tsx
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- resizable.tsx
- scroll-area.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx
- use-mobile.ts

## Final Steps

1. After moving all files and updating imports
2. Update `/App.tsx` imports (already done)
3. Delete the entire `/components` folder
4. Test the application

## Verification Checklist

- [ ] All components moved to `/src/components/modules/citizen/`
- [ ] All imports updated correctly
- [ ] UI components copied to `/src/components/common/ui/`
- [ ] figma folder created in `/src/components/`
- [ ] `/App.tsx` imports updated
- [ ] Old `/components` folder deleted
- [ ] Application runs without errors
