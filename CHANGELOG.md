# Changelog

All notable changes to the FHRMS project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Unified Database Architecture - 2026

#### Added
- **Comprehensive Database System (`lib/database.ts`)**:
  - Single source of truth for all mock data (patients, doctors, encounters, vitals, diagnoses)
  - Enhanced data models with extended fields (emergency contacts, date of birth, phone numbers, etc.)
  - Database utility functions for querying related data
  - Proper data relationships and foreign keys
  - Backward compatibility exports for existing imports

- **Enhanced Type System**:
  - Extended `Patient` interface with comprehensive medical fields
  - Added `Encounter`, `VitalRecord`, `PatientVitalsInfo` types
  - Improved type safety across all data models
  - Zod validation schemas for all form data

#### Changed
- **Mock Data Consolidation**:
  - Converted separate mock data files into unified database architecture
  - `lib/mockData.ts`, `lib/mockEncounterData.tsx`, `lib/vitalsData.ts` now re-export from database
  - Maintained zero breaking changes for existing imports
  - Added 25 comprehensive patient records with full medical information

- **Data Relationships**:
  - Implemented proper foreign key relationships between patients, doctors, encounters, and vitals
  - Added utility functions: `getPatientById`, `getDoctorById`, `getPatientsByDoctor`, etc.
  - Enhanced data querying capabilities

#### Technical Improvements
- **Future-Proof Architecture**: Easy migration path to real database APIs
- **Type Safety**: Comprehensive TypeScript interfaces for all data models
- **Scalability**: Modular database structure supports easy expansion
- **Maintainability**: Single file for all data management and relationships

---

### Vitals Monitoring System - 2026

#### Added
- **Complete Vitals Page (`app/(main)/vitals/page.tsx`)**:
  - Two-column layout with patient info and vitals form
  - Comprehensive vitals entry form with all medical parameters:
    - Blood Pressure (Systolic/Diastolic with proper validation)
    - Body Temperature with visual thermometer icon
    - Pulse Rate with heart icon
    - Weight and Height with automatic BMI calculation
    - BMI status indicator with color-coded health ranges
  - Vitals history table with pagination and filtering
  - Real-time BMI calculation and health status indicators
  - Summary cards showing average blood pressure, weight trends, and resting pulse

- **Advanced Vitals Features**:
  - Auto-calculating BMI with health status (Underweight/Normal/Overweight/Obese)
  - Color-coded status indicators for all vital measurements
  - Historical vitals data with date/time tracking
  - Staff attribution for each vitals entry
  - Warning/critical status flagging for abnormal readings

#### Changed
- **Vitals Data Model (`lib/vitalsData.ts`)**:
  - Comprehensive `VitalRecord` interface with all medical parameters
  - Enhanced mock data with realistic medical values and status tracking
  - Proper data relationships with patient and staff information

#### Technical Improvements
- **Medical Accuracy**: Realistic vital sign ranges and validation
- **User Experience**: Intuitive form layout with visual indicators
- **Data Visualization**: Color-coded status indicators and progress bars
- **Responsive Design**: Mobile-friendly layout with proper breakpoints

---

### UI/UX Enhancement System - 2026

#### Added
- **Color System Standardization**:
  - Converted all accent colors to primary colors across the application
  - Consistent hover states with 200ms ease-in-out animations
  - Proper color hierarchy and accessibility compliance

- **Component Improvements**:
  - Enhanced `DoctorSessionCard` with right-aligned authorization badge
  - Improved `NameProfile` component with customizable sizing
  - Better form layouts with proper spacing and alignment
  - Enhanced button states and transitions

#### Changed
- **Patients Page (`app/(main)/patients/page.tsx`)**:
  - Converted table headers from accent to primary colors
  - Added smooth transitions for all interactive elements
  - Improved select dropdown hover states

- **Encounters Page (`app/(main)/encounters/page.tsx`)**:
  - Replaced radio buttons with styled button toggles
  - Improved form layout with horizontal alignment
  - Enhanced validation feedback and error states

- **Doctor Session Card (`components/DoctorSessionCard.tsx`)**:
  - Improved profile display with larger avatars
  - Right-aligned authorization badge with primary color scheme
  - Better text hierarchy and spacing

- **Name Profile Component (`components/NameProfile.tsx`)**:
  - Added configurable sizing (w-16 h-16 for larger displays)
  - Improved initial generation logic (skips titles like "Dr.")
  - Enhanced visual consistency across the application

#### Fixed
- **Hydration Mismatch Errors**: Fixed server/client rendering inconsistencies
- **Type Safety Issues**: Resolved Zod schema validation problems
- **Import Compatibility**: Maintained backward compatibility during refactoring

#### Technical Improvements
- **Animation System**: Consistent 200ms ease-in-out transitions
- **Color Consistency**: Primary color system across all components
- **Accessibility**: Proper contrast ratios and focus states
- **Performance**: Optimized component rendering and state management

---

### Navigation & Sidebar Functionality - 2024

#### Added
- Functional navigation in Sidebar using Next.js Link components
- Functional navigation in QuickActions using Next.js Link components
- Active state detection based on current route using `usePathname` hook
- Route-based active state styling (highlighted when on current page)
- Placeholder pages for all navigation routes:
  - `/patients` - Patients management page
  - `/encounters` - Encounters management page
  - `/vitals` - Vitals monitoring page
  - `/laboratory` - Laboratory tests page
  - `/pharmacy` - Pharmacy management page
  - `/users` - Users management page
- Automatic active state management (turns off when navigating to another page)
- QuickActions navigation routes:
  - "Register New Patient" → `/patients`
  - "Create Encounter" → `/encounters`
  - "View Activity" → `/vitals`
  - "Manage Medications" → `/pharmacy`

#### Changed
- **NavItem Component (`components/NavItem.tsx`)**:
  - Converted to use Next.js `Link` component for navigation
  - Added `href` prop instead of hardcoded `active` prop
  - Active state now automatically determined by current pathname
  - Improved accessibility with aria-label
  - Standardized icon sizing to `w-5 h-5`
  - Better hover states and transitions
  - Active state shows with `bg-primary-light text-primary`
  - Inactive state shows with `text-white hover:bg-primary-hover`

- **Sidebar Component (`components/Sidebar.tsx`)**:
  - Removed hardcoded `active` props from NavItem components
  - Added proper `href` props for all navigation items
  - Fixed color to use `bg-primary` instead of `bg-blue-600` (follows color system)
  - Standardized icon sizing across all navigation items
  - Improved semantic structure

- **QuickActions Component (`components/QuickActions.tsx`)**:
  - Converted to use Next.js `Link` component for navigation (same pattern as NavItem)
  - Added `href` prop instead of `onClick` handler
  - Active state now automatically determined by current pathname
  - Preserved existing styling:
    - Active: `bg-primary text-white hover:bg-primary-hover`
    - Inactive: `text-neutral-500 hover:text-primary border border-neutral-500 hover:border-primary`
  - All QuickActions buttons now navigate to their respective pages

- **Dashboard Page (`app/(main)/page.tsx`)**:
  - Removed `handleQuickAction` function (no longer needed)
  - Updated QuickActions components to use `href` props instead of `onClick`
  - Simplified component structure

#### Fixed
- Hardcoded active states replaced with dynamic route-based detection in both Sidebar and QuickActions
- Sidebar color now uses existing color variables (`bg-primary` instead of `bg-blue-600`)
- Navigation items now properly navigate to their respective pages
- QuickActions buttons now properly navigate to their respective pages
- Active state automatically updates when route changes for both Sidebar and QuickActions
- Inactive state properly displays when on different pages
- Removed placeholder onClick handlers from QuickActions

#### Technical Improvements
- All navigation uses Next.js App Router navigation
- Client-side navigation for better performance
- Type-safe routing with TypeScript
- Consistent page structure following dashboard pattern

---

### Form Validation Implementation - 2026

#### Added
- Comprehensive form validation for encounters page using React Hook Form + Zod
- Real-time form validation with error messages and visual indicators
- Form submission handling with loading states and error handling
- Draft saving functionality for encounters
- Proper form reset functionality with confirmation dialogs

#### Changed
- **Encounters Form (`app/(main)/encounters/page.tsx`)**:
  - Converted from basic useState to React Hook Form with Zod validation
  - Added comprehensive validation schema for all form fields
  - Implemented real-time error display with warning colors
  - Added loading states for form submission and draft saving
  - Enhanced user experience with proper form feedback
  - Added required field indicators (*) for all mandatory fields

- **Form Validation Schema (`lib/mockEncounterData.tsx`)**:
  - Added Zod validation schema for encounter forms
  - Implemented field-level validation rules:
    - Encounter type selection (required)
    - Date validation (required, cannot be in past)
    - Time validation (required)
    - Reason for visit (required, 10-500 characters)
    - Clinical notes (required, 20-2000 characters)
    - Diagnosis validation (at least one diagnosis required)
  - Added TypeScript types for form schema

#### Fixed
- Form validation prevents submission of invalid or incomplete data
- Form error handling with user-friendly messages
- Loading states prevent multiple form submissions
- Form reset functionality preserves user experience

#### Technical Improvements
- Form validation using industry-standard React Hook Form + Zod
- Type-safe form handling with full TypeScript integration
- Improved accessibility with proper error messaging
- Enhanced user experience with real-time validation feedback

---

### Dashboard Improvements - 2024

#### Added
- Click handlers for all QuickActions buttons with placeholder functionality
- Proper date and time formatting in History component
- Age calculation from date of birth in History component
- Empty state handling in History component when no data is available
- Mock clinician data for encounter displays
- Initials calculation from patient names (replaces hardcoded "JD")
- `isEncounters` prop handling in History component to differentiate between patient registrations and encounters
- Aria labels for accessibility on QuickActions buttons
- Improved icon sizing consistency (16-20px for buttons)

#### Changed
- **Dashboard Page (`app/(main)/page.tsx`)**:
  - Converted to client component to support interactive elements
  - Fixed duplicate QuickActions text labels:
    - Third action changed from "Register New Patient" to "View Activity"
    - Fourth action changed from "Register New Patient" to "Manage Medications"
  - Added proper `isEncounters` props to History components (false for patient registrations, true for encounters)
  - Improved code formatting and structure
  - Added `handleQuickAction` function for button click handlers

- **QuickActions Component (`components/QuickActions.tsx`)**:
  - Added `onClick` prop for button functionality
  - Improved accessibility with aria-label
  - Fixed text color contrast (changed from `text-primary-light` to `text-white` on active state)
  - Standardized icon sizing to `w-5 h-5`
  - Added proper spacing classes

- **History Component (`components/History.tsx`)**:
  - Added proper date formatting using `Intl.DateTimeFormat`
  - Added proper time formatting with 12-hour format
  - Implemented accurate age calculation considering month and day
  - Added mock clinician data for encounter displays
  - Added empty state display when no patients/encounters available
  - Properly passes all required props to Patient component including `doctorName`, `isEncounter`, and `isActive`

- **Patient Component (`components/Patient.tsx`)**:
  - **Encounters Display**: Changed from showing gender and age to showing status badges ("Active" or "Completed")
    - Active encounters display with green success styling
    - Completed encounters display with neutral styling
  - Added `getInitials` function to calculate patient initials from full name
  - Improved code structure and readability
  - Fixed prop handling for encounter vs. registration display

- **Card Component (`components/Card.tsx`)**:
  - Refactored color logic into `getColorClasses` helper function
  - Improved notice color handling with `getNoticeColorClass` helper
  - Better code organization and maintainability
  - Fixed icon alignment in percentage display

- **Hero Component (`components/Hero.tsx`)**:
  - Improved TypeScript types (removed `undefined` from optional prop)
  - Better className handling

#### Fixed
- Broken QuickActions buttons (now have proper onClick handlers)
- Missing `isEncounters` prop in History component usage
- Hardcoded patient initials ("JD") replaced with calculated initials
- Missing props in Patient component (doctorName, isEncounter, isActive)
- Incorrect text labels in QuickActions (duplicate "Register New Patient")
- Accessibility issues (contrast, aria-labels)
- Inconsistent icon sizing across components
- Hardcoded date/time values in History component

#### Technical Improvements
- All components now follow TypeScript strict type checking
- Improved code structure without breaking changes
- Preserved existing layout, spacing, and visual hierarchy
- All color usage strictly adheres to existing CSS variables
- No new colors, hex values, or Tailwind utilities introduced
- Consistent component patterns established for future pages

---

## Notes

- All changes maintain backward compatibility
- No breaking changes to component APIs
- Color system remains strictly within defined variables
- Dashboard serves as the reference pattern for all future pages