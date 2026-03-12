# CMS Admin User Guide

This guide covers how to use the content management system to manage pages on the OCT website.

## Logging In

In production, authentication is handled by Google Cloud IAP. When you navigate to `/admin`, you are automatically authenticated with your City of Edmonton Google account. No separate login is required.

In the development environment, you are automatically logged in as a dev user.

## Dashboard

The dashboard at `/admin` shows:

- **Your Teams** — cards for each team you have access to, showing team type, content counts, and sub-team counts. Click a card to edit that team.
- **Recent Activity** — the last 10 changes made across all teams, showing who made each change and when.

## Sidebar Navigation

The left sidebar organizes content hierarchically:

- **Dashboard** — link to the main dashboard
- **Teams** — expandable tree showing sections, teams, and sub-teams. The tree auto-expands to show the page you're currently viewing.
- **Administration** (SUPER_ADMIN and TEAM_ADMIN only):
  - User Management
  - Roadmap Editors (SUPER_ADMIN only)
  - OCT-Web-Dev Viewers (SUPER_ADMIN only)
  - Audit Log (SUPER_ADMIN only)
  - Trash (SUPER_ADMIN only)

Your name and role are displayed at the bottom of the sidebar.

## Roles

| Role | What you can do |
|------|----------------|
| **Super Admin** | Full access to all teams, users, audit logs, trash, and special sections |
| **Team Editor** | Edit content on assigned teams and their child teams |
| **Viewer** | Read-only access to assigned teams in the admin panel |

## Editing a Team Page

1. Click a team in the sidebar or on the dashboard
2. The team editor loads with sections for each content type
3. Each section has its own editor — click the pencil icon or an item to edit it
4. Make your changes, then click **Save**
5. To discard changes, click **Cancel**
6. Changes go live on the public website immediately after saving

### Page header

At the top of the team editor, you can see and edit:
- Team name
- Published/Draft status (toggle to control visibility on the public site)
- Team slug (the URL path)
- Page template type

## Content Types by Template

Different team types support different content:

### SECTION pages (top-level landing pages)

- **Service Areas** — cards with an icon, title, description, features list, and link
- **Who We Are** — description cards with a title, body text, and optional link
- **Key Initiatives** — image carousel slides with title, description, and image URL

### ITS_TEAM pages (main team pages)

- **Portfolios** — cards that link to sub-team pages. Each has an icon, title, and description.
- **Team Tabs** — tabbed content sections with video embeds and diagram links
- **Trello Boards** — links to external Trello boards
- **Team Members** — staff cards with name, title, and email
- **Accordion Links** — collapsible sections with grouped links

### SUB_TEAM pages (detail pages under a team)

- **Services** — list of services the sub-team provides
- **Initiatives** — projects and initiatives
- **Contacts** — staff contact cards
- **Quick Links** — resource links

## Reordering Content

Many content types support drag-and-drop reordering. Look for the grip icon on the left side of items. Drag items up or down to change their display order on the public site.

## Widget Layout

The **Layout Editor** controls which content sections appear on a page and in what order.

- Drag widgets up or down to reorder sections
- Add or remove widgets to customize the page layout
- Each team gets default widgets when created — you can customize from there
- Click **Reset to defaults** to restore the original widget layout

## Creating Sub-Teams

To add a new sub-team under an existing team:

1. Navigate to the parent team
2. Scroll to the **Sub-Teams** section
3. Click **Add Sub-Team**
4. Enter the team name (a URL slug is auto-generated)
5. The new sub-team appears in the sidebar and gets default widgets

## Archiving and Restoring Teams

### Archiving

To remove a team from the public site without permanently deleting it:

1. Navigate to the team
2. Click the **Archive** button
3. Confirm in the dialog

Archived teams are hidden from the public site and moved to the Trash.

### Restoring (SUPER_ADMIN only)

1. Go to **Trash** in the sidebar
2. Find the archived team
3. Click **Restore**

The team returns to active status and becomes visible on the public site again (if published).

### Permanent deletion

Teams can be permanently deleted from Trash after 7 days. This requires typing the team name to confirm. Permanent deletion removes the team and all its content (portfolios, members, services, etc.).

## User Management

### Adding a user (SUPER_ADMIN)

1. Go to **User Management** in the sidebar
2. Click **Add User**
3. Enter their email address and name
4. Select a role:
   - **Super Admin** — full access to everything
   - **Team Editor** — can edit assigned teams
   - **Viewer** — read-only access
5. Select which teams they should have access to
6. Click **Save**

### Editing permissions

Click a user card to change their role or team assignments. TEAM_ADMIN users can only manage users for teams they have access to.

### Special permissions

- **Roadmap Editors** — go to the Roadmap Editors page to grant or revoke roadmap editing access
- **OCT-Web-Dev Viewers** — go to the OCT-Web-Dev Viewers page to control who can see the development documentation

## Audit Log

The audit log at `/admin/audit-log` shows a chronological record of all content changes:

- **Who** made the change
- **What action** was taken (Create, Update, Delete, Archive, Restore)
- **Which entity** was affected
- **When** it happened

### Exporting

SUPER_ADMIN users can export audit logs:

1. Go to the Audit Log page
2. Click **Export**
3. Choose format (JSON or CSV) and optionally set a date range
4. The file downloads automatically

Audit logs are retained for 90 days.

## Publishing

Teams have a **Published** or **Draft** status:

- **Published** — the team's page is visible on the public website
- **Draft** — the team exists in the CMS but is not shown publicly

Toggle the status from the team editor header. New teams default to Draft.
