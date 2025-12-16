---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['docs/prd.md', 'docs/architecture.md', 'docs/ux-design-specification.md']
workflowType: 'epics-and-stories'
lastStep: 4
status: 'complete'
completedAt: '2025-12-16'
project_name: 'Santa Maria Residences'
user_name: 'User'
date: '2025-12-16'
---

# Santa Maria Residences - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Santa Maria Residences, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements (29 FRs)

**Building Visualization (Public Website):**
- FR1: Visitors can view an interactive SVG representation of the 41-floor Santa Maria tower
- FR2: Visitors can click on any floor (7-41) to view that floor's apartment layout
- FR3: Visitors can see the building with floors visually distinguished and labeled
- FR4: Visitors can navigate between floors without returning to the main building view

**Floor & Apartment Display (Public Website):**
- FR5: Visitors can view a floor plan showing all apartments (A-F) in their accurate positions
- FR6: Visitors can see apartment unit labels (e.g., "28-C") on the floor plan
- FR7: Visitors can click on an individual apartment to view its details
- FR8: Visitors can view apartment details including: unit size (m²), floor number, and unit type

**Availability Status (Public Website):**
- FR9: Visitors can see each apartment's availability status via color coding
- FR10: Visitors can distinguish between Available (green), Reserved (yellow), and Sold (red) apartments
- FR11: Visitors can see availability status on both the floor plan view and apartment detail view
- FR12: System displays current status reflecting the latest admin updates

**Contact Information (Public Website):**
- FR13: Visitors can view sales agent contact information on the website
- FR14: Visitors can access contact information from any page on the public site

**Inventory Dashboard (Admin Backend):**
- FR15: Sales agents can view all 200 apartments in a single dashboard view
- FR16: Sales agents can see each apartment's current status in the dashboard
- FR17: Sales agents can filter apartments by status (Available/Reserved/Sold)
- FR18: Sales agents can view summary counts of apartments by status
- FR19: Sales agents can identify apartments by floor and unit designation

**Status Management (Admin Backend):**
- FR20: Sales agents can change an apartment's status with a single click
- FR21: Sales agents can set status to Available, Reserved, or Sold
- FR22: Sales agents can add notes/comments to individual apartments
- FR23: Status changes take effect immediately on the public website

**Authentication (Admin Backend):**
- FR24: Sales agents can log in to the admin backend with credentials
- FR25: Unauthenticated users cannot access the admin backend
- FR26: Sales agents can log out of the admin backend

**Data Persistence (System):**
- FR27: System persists all apartment data including status and notes
- FR28: System maintains data integrity across sessions
- FR29: System supports concurrent access by multiple sales agents

### Non-Functional Requirements (15 NFRs)

**Performance:**
- NFR1: Public website initial page load completes within 3 seconds on standard broadband
- NFR2: SVG building visualization renders within 1 second after page load
- NFR3: Floor popup displays within 500ms of floor click
- NFR4: Admin status updates complete within 2 seconds
- NFR5: Admin dashboard loads all 200 apartments within 3 seconds

**Security:**
- NFR6: Admin backend requires authentication before access
- NFR7: User credentials are stored securely (hashed, not plaintext)
- NFR8: Admin sessions expire after period of inactivity
- NFR9: Public website has no access to admin functionality
- NFR10: Database access restricted to application only

**Reliability:**
- NFR11: System maintains 99% uptime during business hours (Panama time)
- NFR12: No data loss on status updates - all changes persisted immediately
- NFR13: Concurrent updates by multiple agents do not corrupt data
- NFR14: System recovers gracefully from database connection issues
- NFR15: Public website reflects admin changes within 1 page refresh

### Additional Requirements

**From Architecture:**
- Starter template: Vite + React + TypeScript
- Database: Supabase (self-hosted at 38.97.60.181:8000)
- Authentication: Supabase Auth with hardcoded admin emails in RLS
- State Management: React Query (TanStack Query v5)
- Styling: Tailwind CSS 3.x
- Hosting: Self-hosted on VPS (nginx for static files)

**From UX Design:**
- Design System: Tailwind CSS + shadcn/ui components
- Layout: Modern Minimal split-view (40/60)
- Color System: Navy (#1e3a5f), Gold (#c9a227), Status colors
- Typography: Inter font family
- Accessibility: WCAG 2.1 AA compliance
- Responsive: Desktop-first, mobile adaptation

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Interactive SVG building |
| FR2 | Epic 2 | Clickable floors |
| FR3 | Epic 2 | Floor labels |
| FR4 | Epic 2 | Floor navigation |
| FR5 | Epic 2 | Floor plan display |
| FR6 | Epic 2 | Unit labels |
| FR7 | Epic 2 | Apartment click |
| FR8 | Epic 2 | Apartment details |
| FR9 | Epic 2 | Status color coding |
| FR10 | Epic 2 | Color distinction |
| FR11 | Epic 2 | Status in all views |
| FR12 | Epic 2 | Current status display |
| FR13 | Epic 2 | Contact info display |
| FR14 | Epic 2 | Contact accessibility |
| FR15 | Epic 4 | Dashboard view |
| FR16 | Epic 4 | Status in dashboard |
| FR17 | Epic 4 | Status filtering |
| FR18 | Epic 4 | Summary counts |
| FR19 | Epic 4 | Unit identification |
| FR20 | Epic 4 | 1-click status change |
| FR21 | Epic 4 | Status options |
| FR22 | Epic 4 | Notes/comments |
| FR23 | Epic 4 | Immediate sync |
| FR24 | Epic 3 | Agent login |
| FR25 | Epic 3 | Auth protection |
| FR26 | Epic 3 | Agent logout |
| FR27 | Epic 1 | Data persistence |
| FR28 | Epic 1 | Data integrity |
| FR29 | Epic 1 | Concurrent access |

## Epic List

### Epic 1: Foundation & Database
Project setup with Vite + React + TypeScript, Supabase connection, database schema creation, and seeding 200 apartment records. Establishes the technical foundation for all subsequent feature development.

**FRs covered:** FR27, FR28, FR29

### Epic 2: Public Building Exploration
Interactive SVG building visualization enabling investors to explore the 41-floor tower, view floor plans with apartment positions, see color-coded availability status, and access sales agent contact information.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14

### Epic 3: Admin Authentication
Secure authentication system for sales agents using Supabase Auth, including login, logout, session management, and protected route access control.

**FRs covered:** FR24, FR25, FR26

### Epic 4: Admin Inventory Management
Comprehensive dashboard for sales agents to view all 200 apartments, filter by status, update apartment status with single-click actions, add notes, and see real-time synchronization with the public website.

**FRs covered:** FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23

---

## Epic 1: Foundation & Database

Project setup with Vite + React + TypeScript, Supabase connection, database schema creation, and seeding 200 apartment records.

### Story 1.1: Project Initialization

As a **developer**,
I want **a configured Vite + React + TypeScript project with Tailwind CSS and shadcn/ui**,
So that **I can begin building the application with the correct tech stack**.

**Acceptance Criteria:**

**Given** I run `npm create vite@latest santa-maria -- --template react-ts`
**When** the project is created and dependencies installed
**Then** Tailwind CSS is configured and working
**And** shadcn/ui CLI is initialized
**And** React Router is installed and configured with basic routes
**And** the project runs without errors on `npm run dev`

### Story 1.2: Supabase Configuration

As a **developer**,
I want **Supabase client configured and connected to the self-hosted instance**,
So that **the application can interact with the database**.

**Acceptance Criteria:**

**Given** the Supabase instance is running at `http://38.97.60.181:8000`
**When** I configure the Supabase client in `src/lib/supabase.ts`
**Then** environment variables are set for SUPABASE_URL and SUPABASE_ANON_KEY
**And** the client connects successfully
**And** .env.local is gitignored
**And** .env.example is created with placeholder values

### Story 1.3: Database Schema & Seed Data

As a **developer**,
I want **the apartments table created with proper constraints and 200 seed records**,
So that **the application has data to display**.

**Acceptance Criteria:**

**Given** the Supabase database is accessible
**When** I run the migration
**Then** the `apartments` table exists with columns: id, floor, unit, size_sqm, status, notes, updated_at, updated_by
**And** constraints exist: floor (7-41), unit (A-F), status (available/reserved/sold)
**And** 200 apartment records are seeded (35 floors × 6 units, minus adjustments)
**And** RLS policies are created for public read and admin update

---

## Epic 2: Public Building Exploration

Interactive SVG building visualization enabling investors to explore the 41-floor tower, view floor plans, see availability status, and contact agents.

### Story 2.1: Building Visualization Component

As a **visitor**,
I want **to see an interactive SVG representation of the 41-floor Santa Maria tower**,
So that **I can visually explore the building**.

**Acceptance Criteria:**

**Given** I am on the homepage
**When** the page loads
**Then** I see a vertical SVG building with floors 7-41 displayed
**And** each floor is visually distinguished and labeled with its number
**And** hovering a floor highlights it and shows a tooltip with "Floor N"
**And** clicking a floor triggers the floor panel to update
**And** the SVG renders within 1 second (NFR2)

### Story 2.2: Floor Panel with Apartments

As a **visitor**,
I want **to click on a floor and see the apartment layout**,
So that **I can explore individual apartments**.

**Acceptance Criteria:**

**Given** I am viewing the building
**When** I click on Floor 28
**Then** the right panel displays apartments A-F for that floor
**And** each apartment shows its unit label (e.g., "28-C") and size (m²)
**And** the floor panel appears within 500ms (NFR3)
**And** I can click another floor to update the panel without page reload
**And** clicking an apartment shows its details (unit, floor, size, status)

### Story 2.3: Status Color Display

As a **visitor**,
I want **to see color-coded availability status for each apartment**,
So that **I can quickly identify available units**.

**Acceptance Criteria:**

**Given** I am viewing apartments on a floor
**When** I look at any apartment
**Then** Available apartments show green indicator (#22c55e)
**And** Reserved apartments show amber indicator (#eab308)
**And** Sold apartments show red indicator (#ef4444)
**And** status colors are visible in both floor view and apartment detail view
**And** the building floors also show aggregate status coloring
**And** status reflects the current database values

### Story 2.4: Contact Information Display

As a **visitor**,
I want **to see sales agent contact information**,
So that **I can reach out about apartments I'm interested in**.

**Acceptance Criteria:**

**Given** I am on any page of the public website
**When** I look for contact information
**Then** I see agent contact details (email, phone)
**And** contact info is accessible from the homepage
**And** contact info is visible on apartment detail view
**And** contact info is displayed in the footer or header for global access

---

## Epic 3: Admin Authentication

Secure authentication system for sales agents using Supabase Auth, including login, logout, and protected routes.

### Story 3.1: Login Page

As a **sales agent**,
I want **to log in to the admin backend with my credentials**,
So that **I can access the inventory management system**.

**Acceptance Criteria:**

**Given** I am an unauthenticated user at `/login`
**When** I enter valid email and password and submit
**Then** I am authenticated via Supabase Auth
**And** I am redirected to the admin dashboard
**And** my session is persisted (survives page refresh)
**And** invalid credentials show an error message
**And** the login form has proper input validation

### Story 3.2: Protected Routes

As a **system**,
I want **to prevent unauthenticated users from accessing admin routes**,
So that **only authorized agents can manage inventory**.

**Acceptance Criteria:**

**Given** I am not logged in
**When** I try to access `/admin` or any `/admin/*` route
**Then** I am redirected to `/login`
**And** no admin UI or data is visible before redirect
**Given** I am logged in as an authorized agent
**When** I navigate to `/admin`
**Then** I can access the admin dashboard
**And** my email is in the allowed admin list (RLS policy)

### Story 3.3: Logout Functionality

As a **sales agent**,
I want **to log out of the admin backend**,
So that **I can securely end my session**.

**Acceptance Criteria:**

**Given** I am logged in to the admin area
**When** I click the "Logout" button
**Then** my session is terminated via Supabase Auth
**And** I am redirected to the public homepage or login page
**And** attempting to access `/admin` requires re-authentication
**And** the logout action completes within 2 seconds

---

## Epic 4: Admin Inventory Management

Comprehensive dashboard for sales agents to view all 200 apartments, filter by status, update status with single-click, and add notes.

### Story 4.1: Inventory Dashboard

As a **sales agent**,
I want **to view all 200 apartments in a single dashboard**,
So that **I can see the complete inventory at a glance**.

**Acceptance Criteria:**

**Given** I am logged in to the admin area
**When** I access the dashboard
**Then** I see a table with all 200 apartments
**And** each row shows: Floor, Unit, Size (m²), Status, Notes
**And** apartments are identifiable by floor and unit (e.g., "28-C")
**And** the dashboard loads within 3 seconds (NFR5)
**And** I see summary cards showing counts: Available, Reserved, Sold

### Story 4.2: Status Filtering

As a **sales agent**,
I want **to filter apartments by status**,
So that **I can focus on specific inventory segments**.

**Acceptance Criteria:**

**Given** I am viewing the inventory dashboard
**When** I click on "Available" filter (or summary card)
**Then** the table shows only Available apartments
**And** I can filter by Reserved or Sold similarly
**And** I can clear filters to see all apartments
**And** the filter state is reflected in the UI
**And** filtering is instant (client-side)

### Story 4.3: Single-Click Status Update

As a **sales agent**,
I want **to change an apartment's status with a single click**,
So that **I can quickly update inventory**.

**Acceptance Criteria:**

**Given** I am viewing an apartment in the dashboard
**When** I click the status dropdown/selector
**Then** I can select Available, Reserved, or Sold
**And** the status updates immediately in the database
**And** I see a success toast confirmation
**And** the update completes within 2 seconds (NFR4)
**And** the public website reflects the change on next load
**And** concurrent updates by multiple agents don't corrupt data

### Story 4.4: Apartment Notes

As a **sales agent**,
I want **to add notes to individual apartments**,
So that **I can track client information and follow-ups**.

**Acceptance Criteria:**

**Given** I am viewing an apartment in the dashboard
**When** I click to edit notes
**Then** I can enter/edit text notes for that apartment
**And** notes are saved to the database
**And** notes persist across sessions
**And** I see the notes in the dashboard table
**And** other agents can see the notes I've added
