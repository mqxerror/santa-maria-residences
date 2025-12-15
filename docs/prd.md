---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments: ['docs/analysis/product-brief-santa-maria-residences-2025-12-15.md']
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
project_name: 'Santa Maria Residences'
user_name: 'User'
date: '2025-12-15'
---

# Product Requirements Document - Santa Maria Residences

**Author:** User
**Date:** 2025-12-15

## Executive Summary

Santa Maria Residences is an interactive web platform for a premium 41-floor residential tower in Panama, targeting international real estate investors. The platform enables prospective buyers to visually explore the building through an interactive SVG interface, view real-time apartment availability, and examine floor plans and unit details (83-85 m² each). Investors contact sales agents directly via email to proceed with reservations.

The system consists of two components:
- **Public Website:** Interactive SVG building visualization with 41 clickable floors, color-coded availability (Available/Reserved/Sold), unit details, and agent contact information
- **Admin Backend:** Dashboard for the 5-person sales team to manage 200 apartments and update statuses with one click - replacing their current Excel workflow

### What Makes This Special

1. **Visual-first SVG building experience** - Investors can virtually "walk" the tower, clicking through floors and apartments rather than scrolling static PDFs
2. **Real-time availability** - No guessing, no outdated information - what you see is what's actually available

## Project Classification

**Technical Type:** web_app
**Domain:** general (real estate)
**Complexity:** low
**Project Context:** Greenfield - new project

Standard web application with public-facing interactive visualization and protected admin backend. No payment processing, no regulated domain requirements. Core functionality is CRUD operations for apartment inventory with SVG-based UI.

## Success Criteria

### User Success

**For Investors:**
- See the building in high-quality interactive SVG visualization
- Instantly understand which apartments are available/reserved/sold via color coding
- View unit details (size, floor, position) to make informed decisions
- Know exactly who to contact (agent contact info visible on site)

**For Sales Team:**
- Update any apartment status in < 10 seconds (1 click)
- See all 200 units at a glance with current status
- No more Excel - single source of truth for inventory
- 5/5 team members using the dashboard daily

### Business Success

- 100% data accuracy across all 200 apartments
- Real-time sync between admin updates and public website
- Excel spreadsheets fully retired

### Technical Success

- Public website loads quickly with SVG rendering
- Admin authentication secures backend access
- Status updates reflect immediately on public site
- System handles 200 apartment records reliably

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Status update time | < 10 seconds |
| Team adoption | 5/5 members |
| Excel usage | 0 |
| Data accuracy | 100% |

## Product Scope

### MVP - Minimum Viable Product

**Public Website:**
- Interactive SVG building (41 clickable floors)
- Floor view showing 6 apartments (A-F) with accurate positions
- Color-coded availability (Green: Available / Yellow: Reserved / Red: Sold)
- Unit details panel (size 83-85 m², floor number, unit type)
- Agent contact information displayed

**Admin Backend:**
- Dashboard displaying all 200 units with status
- 1-click status updates (Available ↔ Reserved ↔ Sold)
- Simple login authentication
- Data persistence

### Growth Features (Post-MVP)

- Multi-language support (English, Spanish, Portuguese)
- Email notifications for status changes
- Advanced filtering (by size, floor range)
- Virtual tour integration

### Vision (Future)

- Investor portal with saved favorites
- Document upload (contracts, IDs)
- CRM system integration
- Analytics dashboard for sales insights

## User Journeys

### Journey 1: Carlos Rivera - Finding His Panama Investment

Carlos is a Colombian businessman living in Miami who's been watching Panama's real estate market for years. His accountant recently recommended diversifying into rental properties, and a friend mentioned Santa Maria Residences - a premium tower going up in Panama City. It's 11 PM in Miami when Carlos finally has time to research.

He finds the Santa Maria website and immediately sees the tower rendered in an elegant SVG visualization. Instead of downloading a PDF and squinting at floor plans, he clicks directly on Floor 28 - he wants something high enough for views but not the premium penthouse floors. The floor plan opens, showing six apartments labeled A through F in their actual positions. Apartments A and C glow green (available), B and D are yellow (reserved), and E and F are red (sold).

Carlos clicks on Apartment 28-C. A details panel shows him everything: 84 m², corner unit, east-facing with morning light. He can see it's positioned away from the elevator - quieter for future tenants. He screenshots the floor plan and emails the sales contact shown on the page: "Interested in 28-C. Please call me tomorrow."

The next morning, he receives a call from the sales team. By noon Miami time, apartment 28-C shows yellow on the website. Carlos smiles - his investment is secured, and he never had to leave his office.

---

### Journey 2: Maria Santos - Managing the Morning Rush

Maria arrives at the Santa Maria sales office at 8 AM. Before she even makes coffee, she logs into the admin dashboard - overnight inquiries from international investors tend to pile up. The dashboard shows all 200 apartments in a clean grid, color-coded by status. She spots 3 new email inquiries forwarded from the website contact.

The first email is from Carlos in Miami about 28-C. Maria clicks the unit in the dashboard, changes its status from "Available" to "Reserved" with one click, and adds a note: "Carlos Rivera - Miami - following up today." The change takes effect instantly - the public website now shows 28-C as reserved.

Her colleague Pedro walks in and asks about Floor 15. Maria doesn't need to dig through Excel or ask "which version do you have?" - they both look at the same dashboard. Floor 15-A and 15-B are available; the rest are sold. Pedro takes 15-A for his client.

By 10 AM, Maria has processed all overnight inquiries, updated 4 apartment statuses, and the website reflects everything in real-time. No spreadsheet conflicts, no version confusion, no accidentally showing a sold unit to a client. She finally gets her coffee.

---

### Journey 3: Carlos - The Comparison Shopper

Carlos's wife isn't sold on 28-C. She wants to compare options before committing. That evening, Carlos returns to the Santa Maria website. He clicks through floors 25-30, checking which units are still available. On Floor 26, he finds 26-A - also a corner unit, slightly larger at 85 m², and still green.

He takes screenshots of both 28-C (now yellow/reserved by him) and 26-A (green/available), comparing their positions on the floor plan. He can see 26-A is closer to the stairs but has better afternoon light exposure. He emails the sales team: "Can we also hold 26-A while we decide? Will confirm one of them by Friday."

The next morning, 26-A turns yellow on the website. Carlos's wife is happy - they have options, and nobody else can snatch them while they decide.

---

### Journey 4: Maria - End of Day Reconciliation

It's 6 PM and Maria is closing up. Her manager asks for a quick status update before a morning meeting with the developers. Maria opens the dashboard and filters by status:

- **Available:** 127 apartments
- **Reserved:** 31 apartments
- **Sold:** 42 apartments

She can see at a glance that floors 7-15 are nearly sold out, while floors 30+ still have good availability. No need to count cells in Excel or worry about Pedro's spreadsheet being out of sync. The numbers are live, accurate, and ready for the morning meeting.

### Journey Requirements Summary

**These journeys reveal requirements for:**

| Journey | Capabilities Required |
|---------|----------------------|
| Carlos browsing | SVG building visualization, floor plan view, apartment details panel, color-coded status, agent contact display |
| Maria updating | Admin dashboard, 1-click status update, instant sync to public site, unit notes/comments |
| Carlos comparing | Multiple floor navigation, visual position comparison, status persistence |
| Maria reporting | Status filtering, inventory counts, at-a-glance overview |

## Innovation & Novel Patterns

### Detected Innovation Areas

**Market Innovation: Visual-First Real Estate Sales (Panama)**

While interactive building visualizations exist globally, Santa Maria Residences introduces this approach to the Panama real estate market where competitors rely on:
- Static PDF floor plans
- Photo galleries
- Phone/email inquiries for availability

The SVG building visualization with click-through floor exploration represents a local market innovation.

### What Makes It Different

1. **Interactive Building Exploration** - Investors click the building, select a floor, and see apartment positions with live availability - no PDFs, no phone calls needed
2. **Real-Time Availability Display** - Color-coded status (Available/Reserved/Sold) visible instantly, eliminating back-and-forth availability questions

### Future Enhancement Path

- Phase 1 (MVP): Floor popup with apartment grid and availability
- Phase 2: Individual apartment floor plans within the detail view

### Validation Approach

- Track investor engagement with SVG vs. traditional PDF downloads
- Monitor reduction in "is unit X available?" inquiries to sales team
- Compare sales cycle length with previous projects using static materials

### Risk Mitigation

- Low technical risk: SVG visualization is well-established technology
- Fallback: Static floor plan images if SVG rendering issues occur on older browsers

## Web Application Requirements

### Project-Type Overview

Santa Maria Residences is a Multi-Page Application (MPA) with two distinct areas:
- **Public Website:** Building visualization and apartment browsing
- **Admin Backend:** Protected dashboard for sales team

### Technical Architecture Considerations

**Application Type:** MPA (Multi-Page Application)
- Traditional page loads between views
- Simpler architecture, easier to maintain
- No complex client-side state management needed

**Browser Support Matrix:**

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Latest 2 versions | Full |
| Firefox | Latest 2 versions | Full |
| Safari | Latest 2 versions | Full |
| Edge | Latest 2 versions | Full |
| IE 11 | - | Not supported |

**Real-time Requirements:** None
- Page refresh to see updated availability is acceptable
- No WebSocket or polling infrastructure needed
- Simplifies architecture significantly

### Responsive Design

- Desktop-first design (investors likely on laptops/desktops)
- Mobile-friendly but not mobile-optimized
- SVG building must scale properly across screen sizes

### Performance Targets

| Metric | Target |
|--------|--------|
| Initial page load | < 3 seconds |
| SVG render time | < 1 second |
| Status update (admin) | < 2 seconds |

### SEO Strategy

**Level:** Basic
- Proper meta tags and page titles
- Semantic HTML structure
- Not a primary acquisition channel (investors come via referrals/marketing)

### Accessibility Level

**Level:** Basic
- Semantic HTML elements
- Alt text for images
- Keyboard navigable
- No formal WCAG certification required

### Implementation Considerations

- Server-rendered pages (no SPA framework overhead)
- Simple tech stack: HTML/CSS/JS for frontend
- Database-backed for apartment data persistence
- Admin authentication for backend protection

## Functional Requirements

### Building Visualization (Public Website)

- FR1: Visitors can view an interactive SVG representation of the 41-floor Santa Maria tower
- FR2: Visitors can click on any floor (7-41) to view that floor's apartment layout
- FR3: Visitors can see the building with floors visually distinguished and labeled
- FR4: Visitors can navigate between floors without returning to the main building view

### Floor & Apartment Display (Public Website)

- FR5: Visitors can view a floor plan showing all apartments (A-F) in their accurate positions
- FR6: Visitors can see apartment unit labels (e.g., "28-C") on the floor plan
- FR7: Visitors can click on an individual apartment to view its details
- FR8: Visitors can view apartment details including: unit size (m²), floor number, and unit type

### Availability Status (Public Website)

- FR9: Visitors can see each apartment's availability status via color coding
- FR10: Visitors can distinguish between Available (green), Reserved (yellow), and Sold (red) apartments
- FR11: Visitors can see availability status on both the floor plan view and apartment detail view
- FR12: System displays current status reflecting the latest admin updates

### Contact Information (Public Website)

- FR13: Visitors can view sales agent contact information on the website
- FR14: Visitors can access contact information from any page on the public site

### Inventory Dashboard (Admin Backend)

- FR15: Sales agents can view all 200 apartments in a single dashboard view
- FR16: Sales agents can see each apartment's current status in the dashboard
- FR17: Sales agents can filter apartments by status (Available/Reserved/Sold)
- FR18: Sales agents can view summary counts of apartments by status
- FR19: Sales agents can identify apartments by floor and unit designation

### Status Management (Admin Backend)

- FR20: Sales agents can change an apartment's status with a single click
- FR21: Sales agents can set status to Available, Reserved, or Sold
- FR22: Sales agents can add notes/comments to individual apartments
- FR23: Status changes take effect immediately on the public website

### Authentication (Admin Backend)

- FR24: Sales agents can log in to the admin backend with credentials
- FR25: Unauthenticated users cannot access the admin backend
- FR26: Sales agents can log out of the admin backend

### Data Persistence (System)

- FR27: System persists all apartment data including status and notes
- FR28: System maintains data integrity across sessions
- FR29: System supports concurrent access by multiple sales agents

## Non-Functional Requirements

### Performance

- NFR1: Public website initial page load completes within 3 seconds on standard broadband
- NFR2: SVG building visualization renders within 1 second after page load
- NFR3: Floor popup displays within 500ms of floor click
- NFR4: Admin status updates complete within 2 seconds
- NFR5: Admin dashboard loads all 200 apartments within 3 seconds

### Security

- NFR6: Admin backend requires authentication before access
- NFR7: User credentials are stored securely (hashed, not plaintext)
- NFR8: Admin sessions expire after period of inactivity
- NFR9: Public website has no access to admin functionality
- NFR10: Database access restricted to application only

### Reliability

- NFR11: System maintains 99% uptime during business hours (Panama time)
- NFR12: No data loss on status updates - all changes persisted immediately
- NFR13: Concurrent updates by multiple agents do not corrupt data
- NFR14: System recovers gracefully from database connection issues
- NFR15: Public website reflects admin changes within 1 page refresh
