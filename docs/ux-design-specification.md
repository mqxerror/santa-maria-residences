---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments: ['docs/prd.md', 'docs/analysis/product-brief-santa-maria-residences-2025-12-15.md', 'docs/architecture.md']
workflowType: 'ux-design'
lastStep: 14
status: 'complete'
completedAt: '2025-12-16'
project_name: 'Santa Maria Residences'
user_name: 'User'
date: '2025-12-16'
---

# UX Design Specification Santa Maria Residences

**Author:** User
**Date:** 2025-12-16

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

Interactive web platform enabling international investors to visually explore Santa Maria Residences - a premium 41-floor tower in Panama - through an SVG building visualization with real-time availability status.

### Target Users

- **Investors**: International buyers researching remotely, often at night from different time zones, comparing units and making investment decisions
- **Sales Team**: 5 agents managing 200 apartments daily, replacing Excel workflows with a single source of truth

### Key Design Challenges

- SVG tower must be immediately intuitive to explore
- 41-floor navigation needs efficient interaction patterns
- Status colors must be universally recognizable
- Admin dashboard must handle 200 units without overwhelm
- Mobile scaling of vertical tower visualization

### Design Opportunities

- Visual-first experience differentiating from static competitor PDFs
- Real-time transparency building investor trust
- Frictionless 1-click admin workflows

## Core User Experience

### Defining Experience

Primary interaction: Explore a 41-floor building visually, clicking floors to discover available apartments with instant color-coded status feedback.

### Platform Strategy

- Desktop web primary (investors researching, agents managing)
- Mobile-responsive but not mobile-first
- Mouse/keyboard optimized, touch-friendly
- Always-online (live availability is the value)

### Effortless Interactions

- Floor click → instant apartment reveal
- Color status → traffic light intuitive
- Admin status change → single click
- Floor navigation → smooth and predictable

### Critical Success Moments

1. First building interaction - user discovers it's explorable
2. Finding availability - seeing green on desired floor
3. Admin update - one click, instant confirmation

### Experience Principles

1. **Visual First** - The building IS the interface
2. **Instant Feedback** - Every action responds immediately
3. **Zero Learning Curve** - Intuitive without instructions
4. **One-Click Admin** - Maximum efficiency for agents

## Desired Emotional Response

### Primary Emotional Goals

- **Investors**: Confidence - complete clarity on availability
- **Agents**: Control - command over entire inventory

### Emotional Journey Mapping

- Discovery: Curiosity and exploration
- Core Action: Confidence and efficiency
- Completion: Trust and accomplishment
- Return: Familiarity and reliability

### Micro-Emotions

**Cultivate:** Confidence, Trust, Accomplishment
**Avoid:** Confusion, Anxiety, Frustration

### Design Implications

- Hover states signal interactivity → Confidence
- Instant sync feedback → Trust
- Single-click actions → Efficiency
- Smooth transitions → Discovery delight

### Emotional Design Principles

1. **Clarity Creates Confidence** - Never leave users guessing
2. **Speed Builds Trust** - Instant feedback = accurate data
3. **Simplicity Enables Control** - Fewer steps = more power

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **Cinema Seat Selection**: Color-coded availability grid - instant status recognition
- **Google Maps**: Click-to-reveal info panels - maintains spatial context
- **Airbnb**: Clean property cards with key details visible at glance
- **Apple Store**: Premium hover states and smooth transitions

### Transferable UX Patterns

**Navigation:**
- Vertical building scroll with click-to-zoom floors
- Slide-in detail panels (maintain building context)

**Interaction:**
- Color-coded status as primary visual language
- Single-click actions throughout
- Hover preview before commit

**Visual:**
- Card-based apartment information display
- Minimal chrome - building is the hero
- Status colors dominate the visual hierarchy

### Anti-Patterns to Avoid

- Dropdown selectors (hide visual building experience)
- Confirmation dialogs (break 1-click flow)
- Pagination for units (break at-a-glance admin view)
- Tiny click targets (frustrate users)
- Modal overload (lose building context)

### Design Inspiration Strategy

**Adopt:** Seat-selection color grid, slide-in panels, hover feedback
**Adapt:** Property cards simplified for 6 units per floor
**Avoid:** Complex filters, multi-step workflows, hidden navigation

## Design System Foundation

### Design System Choice

**Tailwind CSS + shadcn/ui components**

- Foundation: Tailwind CSS 3.x (per architecture)
- Component Library: shadcn/ui (copy-paste, customizable)
- Custom Elements: SVG building, floor plans, status indicators

### Rationale for Selection

- Aligns with architecture decision (Tailwind CSS)
- shadcn/ui provides accessible, ownable components
- Premium real estate requires custom aesthetic
- SVG visualization is inherently custom
- Expert developer benefits from full control

### Implementation Approach

- Use shadcn/ui for: Buttons, Cards, Tables, Dialogs, Forms
- Build custom: Building SVG, Floor components, Status badges
- Tailwind design tokens for consistent spacing/colors

### Customization Strategy

- Extend Tailwind config with brand colors
- Customize shadcn/ui components to premium aesthetic
- Create project-specific component variants

## Defining Core Experience

### The Defining Interaction

"Click the building, explore any floor, see what's available instantly"

This is the signature interaction that users will describe to friends - the core experience that, if nailed, makes everything else follow.

### User Mental Model

- **Building as clickable map** - Like Google Maps, click to explore
- **Floors as zoom targets** - Click to see deeper detail
- **Colors as traffic lights** - Green = available, Yellow = reserved, Red = sold
- **Click reveals information** - Expanding accordion pattern

**What users hate about current solutions:**
- Static PDFs with no availability info
- Phone calls asking "is unit X available?"
- Outdated websites with wrong information

### Success Criteria

| Criteria | Target |
|----------|--------|
| Floor click response | < 300ms (feels instant) |
| Status recognition | < 1 second |
| Find available unit | < 30 seconds from landing |
| Zero instructions needed | First-time users succeed |

### Experience Mechanics

**1. Initiation**
User sees tower → Hovers floor → Floor highlights + shows "Floor 28"

**2. Interaction**
User clicks floor → Floor "opens" or zooms → 6 apartments (A-F) appear

**3. Feedback**
Apartments show colors → Green/Yellow/Red instantly visible
Hover apartment → Shows size + unit number

**4. Completion**
Click apartment → Details panel slides in → Contact info visible
User screenshots or emails agent → Success

## Visual Design Foundation

### Color System

**Brand Colors:**
| Role | Color | Hex |
|------|-------|-----|
| Primary | Navy | `#1e3a5f` |
| Secondary | Gold | `#c9a227` |
| Background | Off-white | `#fafafa` |
| Surface | White | `#ffffff` |
| Text | Charcoal | `#1f2937` |
| Muted | Gray | `#6b7280` |
| Border | Light Gray | `#e5e7eb` |

**Status Colors:**
| Status | Color | Hex |
|--------|-------|-----|
| Available | Green | `#22c55e` |
| Reserved | Amber | `#eab308` |
| Sold | Red | `#ef4444` |

### Typography System

**Font Family:** Inter (Google Fonts)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 Display | 36px | 700 | 1.2 |
| H2 Section | 24px | 600 | 1.3 |
| H3 Subsection | 20px | 600 | 1.4 |
| Body | 16px | 400 | 1.5 |
| Small/UI | 14px | 400-500 | 1.5 |
| Caption | 12px | 400 | 1.4 |

### Spacing & Layout

**Base Unit:** 4px (Tailwind default)

| Context | Spacing | Use |
|---------|---------|-----|
| Tight | 8px | Admin dashboard, dense data |
| Normal | 16px | General spacing |
| Relaxed | 24px | Public site sections |
| Section | 48px | Major content blocks |

**Layout:**
- Public site: Centered, max-width 1280px, generous whitespace
- Admin dashboard: Full-width, dense, efficient

### Accessibility Considerations

- WCAG AA contrast compliance (4.5:1 minimum)
- Minimum touch target: 44x44px
- Visible focus states on all interactive elements
- Status colors work for color-blind users (distinct luminance)

## Design Direction Decision

### Chosen Direction

**Modern Minimal** - Split-view layout with building visualization left, detail panel right. White-forward with navy accents.

### Layout Structure

- **40/60 split:** Building tower (left), Floor details (right)
- **Minimal header:** Logo and navigation, white background
- **Persistent footer:** Contact information always visible
- **Contextual details:** Right panel updates on floor/apartment selection

### Visual Approach

- White-forward design with subtle card shadows
- Navy (#1e3a5f) for headers, selected states, CTAs
- Gold (#c9a227) for premium accent touches
- Generous whitespace throughout
- Clean typography with clear hierarchy

### Interaction Style

| State | Visual Treatment |
|-------|------------------|
| Floor hover | Subtle highlight + floor number tooltip |
| Floor selected | Navy accent bar, details panel updates |
| Apartment hover | Card lifts slightly, cursor pointer |
| Apartment click | Details slide-in or expand |

### Implementation Notes

- Building SVG fixed in left panel
- Right panel scrollable for floor details
- Smooth transitions between states (200-300ms)
- Mobile: Stack vertically (building top, details bottom)

## User Journey Flows

### Journey 1: Investor Find & Reserve

**Flow:** Entry → Building → Floor click → Apartment click → Details → Contact

| Step | Action | System Response |
|------|--------|-----------------|
| 1 | Land on homepage | See building visualization |
| 2 | Hover floor | Tooltip shows floor number |
| 3 | Click floor | Right panel shows 6 apartments |
| 4 | Scan colors | Instant status recognition |
| 5 | Click apartment | Details expand in panel |
| 6 | View contact | Email/call agent |

**Target:** < 60 seconds from landing to contact

### Journey 2: Agent Update Status

**Flow:** Login → Dashboard → Find unit → Click status → Select new → Done

| Step | Action | System Response |
|------|--------|-----------------|
| 1 | Login | Dashboard loads with all 200 units |
| 2 | Find unit | Search or scroll to locate |
| 3 | Click status | Dropdown appears |
| 4 | Select status | Instant update + toast confirmation |
| 5 | (Optional) Add note | Note saved to unit |

**Target:** < 10 seconds per status update

### Journey 3: Investor Compare Units

**Flow:** Floor A → Note details → Floor B → Compare → Contact

| Step | Action | System Response |
|------|--------|-----------------|
| 1 | Click Floor 28 | See apartments, note 28-C |
| 2 | Click Floor 26 | Panel updates, building shows position |
| 3 | Click 26-A | Compare details with mental note |
| 4 | Screenshot/email | Contact agent with comparison |

**Key:** Building remains visible for spatial context during comparison

### Journey 4: Agent Dashboard Overview

**Flow:** Login → Summary cards → Filter → Review

| Step | Action | System Response |
|------|--------|-----------------|
| 1 | Open dashboard | Summary cards show counts |
| 2 | Click status card | Filter table to that status |
| 3 | Scan list | See all units with notes |

**Target:** At-a-glance inventory status for reporting

### Journey Patterns

| Pattern | Description | Usage |
|---------|-------------|-------|
| Click-to-reveal | Progressive disclosure | Floor → apartments |
| Hover preview | Info before commit | Floor numbers, unit sizes |
| Instant feedback | < 300ms response | All interactions |
| Persistent context | Never lose position | Building always visible |
| Filter by status | Quick segment access | Dashboard filtering |

### Flow Optimization Principles

1. **Minimize clicks to value** - 3 clicks from landing to apartment details
2. **Maintain context** - Building always visible during exploration
3. **Instant feedback** - Every action responds immediately
4. **Clear progress** - User always knows their position in the flow

## Component Strategy

### Design System Components (shadcn/ui)

| Component | Usage |
|-----------|-------|
| Button | CTAs, actions, form submissions |
| Card | Apartment details, summary cards |
| Table | Admin inventory table |
| Input | Search, notes field |
| Select | Status dropdown |
| Badge | Status indicators (customized) |
| Toast | Update confirmations |
| Dialog | Modals if needed |

**Customization:** All components styled with brand colors and spacing tokens.

### Custom Components

#### BuildingView
- **Purpose:** SVG 41-floor tower visualization
- **Props:** `apartments[]`, `selectedFloor`, `onFloorClick`
- **States:** Default, floor-hovered, floor-selected
- **Accessibility:** Keyboard navigation, aria-labels per floor

#### Floor
- **Purpose:** Single clickable floor element
- **Props:** `floorNumber`, `apartments[]`, `isSelected`, `onClick`
- **States:** Default, hover (highlight), selected (navy accent)
- **Accessibility:** `role="button"`, `aria-pressed`, focus ring

#### FloorPanel
- **Purpose:** Right panel showing 6 apartments for selected floor
- **Props:** `floor`, `apartments[]`, `onApartmentClick`
- **Content:** Apartment grid (A-F), status colors, unit details

#### ApartmentCard
- **Purpose:** Display apartment unit with status
- **Props:** `apartment`, `onClick`
- **States:** Default, hover (lift shadow), selected
- **Content:** Unit label, size (m²), status color

#### StatusBadge
- **Purpose:** Show availability status
- **Props:** `status`
- **Variants:** available (green), reserved (amber), sold (red)
- **Accessibility:** `aria-label` for screen readers

#### InventoryTable
- **Purpose:** Admin view of all 200 apartments
- **Features:** Sortable, filterable, inline status edit
- **Columns:** Floor, Unit, Size, Status, Notes, Actions

#### SummaryCard
- **Purpose:** Dashboard metric display
- **Props:** `label`, `count`, `status`
- **Interaction:** Clickable to filter table

### Implementation Priority

| Priority | Components | Reason |
|----------|------------|--------|
| Critical | BuildingView, Floor, FloorPanel, ApartmentCard | Core experience |
| High | StatusBadge, InventoryTable | Admin functionality |
| Medium | SummaryCard, FloorLegend | Enhanced UX |

### Component Consistency Rules

- All components use Tailwind design tokens
- Status colors only from `status.*` palette
- Hover transitions: 200ms ease
- Focus rings: 2px navy outline
- Border radius: `rounded-lg` (8px)

## UX Consistency Patterns

### Button Hierarchy

| Level | Style | Use Case |
|-------|-------|----------|
| Primary | Navy fill, white text | Main actions: "Contact Agent", "Save" |
| Secondary | Navy outline, navy text | Alternative actions: "Cancel", "Back" |
| Ghost | No border, navy text | Tertiary actions: "View more" |
| Status | Status color fill | Quick status change buttons |

**Rules:**
- One primary button per view
- Primary on right, secondary on left
- Minimum 44px height for touch targets

### Feedback Patterns

| Type | Component | Duration | Position |
|------|-----------|----------|----------|
| Success | Toast (green) | 3 seconds | Top-right |
| Error | Toast (red) + inline | Until dismissed | Top-right + field |
| Warning | Toast (amber) | 5 seconds | Top-right |
| Loading | Spinner + text | Until complete | Inline/overlay |

### Status Color Patterns

Status colors are **exclusively** for availability status:

| Context | Available | Reserved | Sold |
|---------|-----------|----------|------|
| SVG Floor | Green fill | Amber fill | Red fill |
| Apartment Card | Green border | Amber border | Red border |
| Badge | Green background | Amber background | Red background |
| Table Row | Green dot | Amber dot | Red dot |

**Rule:** Never use green/amber/red for purposes other than availability status.

### Navigation Patterns

| Action | Behavior |
|--------|----------|
| Floor click | Right panel updates, floor highlights in building |
| Apartment click | Details expand in panel |
| Back to building | Click building area or "Back" link |
| Admin navigation | Top bar with Dashboard / Logout |

**Transitions:** 200ms for panel content, instant for floor selection

### Loading States

| Component | Loading State |
|-----------|---------------|
| Building SVG | Skeleton building shape |
| Floor panel | 6 skeleton cards |
| Inventory table | Skeleton rows |
| Status update | Spinner on button |

### Empty States

| Context | Message | Action |
|---------|---------|--------|
| Filter no results | "No apartments match this filter" | "Clear filters" button |
| No floor selected | "Select a floor to view apartments" | — |

## Responsive Design & Accessibility

### Responsive Strategy

**Approach:** Desktop-first with mobile adaptation

| Device | Layout |
|--------|--------|
| Desktop (1024px+) | Split-view: Building 40%, Details 60% |
| Tablet (768-1023px) | Compact split or stacked |
| Mobile (< 768px) | Stacked: Building top, details below |

### Breakpoints (Tailwind)

| Size | Breakpoint | Layout Behavior |
|------|------------|-----------------|
| Mobile | < 640px | Stacked, 1-2 column grid |
| Tablet | md (768px) | Stacked or compact split |
| Desktop | lg (1024px) | Full split-view |
| Large | xl (1280px) | Max-width 1280px container |

### Mobile Layout Adaptation

- Building visualization: Compact or horizontal scroll
- Floor selector: Dropdown or horizontal picker
- Apartments: 2-column card grid
- Details: Full-width slide-up panel

### Accessibility Strategy (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for all text |
| Keyboard navigation | Tab through floors, Enter to select |
| Screen readers | ARIA labels on all interactive elements |
| Touch targets | 44x44px minimum |
| Focus indicators | 2px navy outline ring |

### SVG Building Accessibility

```html
<svg role="img" aria-label="Santa Maria building, 41 floors">
  <g role="button"
     aria-label="Floor 28: 4 available, 1 reserved, 1 sold"
     tabindex="0">
    <!-- floor elements -->
  </g>
</svg>
```

### Testing Strategy

| Type | Method |
|------|--------|
| Responsive | Chrome DevTools, physical devices |
| Accessibility | axe DevTools, Lighthouse audit |
| Keyboard | Manual tab-through all flows |
| Screen reader | VoiceOver (Mac), NVDA (Windows) |
| Color blindness | Sim Daltonism or similar |
