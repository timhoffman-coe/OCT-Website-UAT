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
- **News** — news post management (requires news editor permission)
- **Administration** (SUPER_ADMIN and TEAM_ADMIN only):
  - User Management
  - News Editors (SUPER_ADMIN only)
  - Roadmap Editors (SUPER_ADMIN only)
  - OCT-Web-Dev Viewers (SUPER_ADMIN only)
  - Page Analytics
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
- **Accordion Links** — collapsible accordion groups of categorized links. Create groups, then add individual links within each group.
- **Work Tracking Boards** — links to external boards (Trello, etc.)
- **Ongoing Projects** — hero block highlighting current projects with a call-to-action button (configured via widget settings)
- **Budget & Spend** — budget overview card with link to financial reports (configured via widget settings)
- **Team Members** — staff cards with name, title, and email

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

- **News Editors** — go to the News Editors page to grant or revoke news post editing access
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

## News Posts

The CMS includes a news management system for publishing articles on the public site. Access requires a News Editor permission (granted by Super Admins) or the Super Admin role.

### Viewing News

Navigate to **News** in the sidebar. The news list shows:
- Statistics: total posts, published count, draft count
- Featured post displayed as a hero banner
- All other posts in a card grid with category badge, status, title, author, and date

### Creating a Post

1. Go to the News page and click **New Post**
2. Fill in the required fields:
   - **Title** — the article headline
   - **Author** — who wrote the article
   - **Category** — choose one: Strategy, Infrastructure, Community, or Spotlight
   - **Publish Date** — when the article should be dated
3. Optionally add:
   - **Description** — short summary shown on cards and in search results
   - **Hero Image** — drag-and-drop or click to upload (PNG, JPG, WebP, max 5 MB)
   - **Featured** toggle — highlights this post on the news list (only one post can be featured at a time)
4. Write the article body using the rich text editor (supports headings, bold, italic, lists, block quotes, links)
5. Click **Save Draft** to save without publishing, or **Publish** to make it live

### Editing a Post

Click any post card on the news list to open the editor. Make changes and save.

### Publishing and Unpublishing

- From the news list, click the publish/unpublish button on any post card
- From the editor, use the **Publish** or **Save Draft** buttons
- Draft posts are hidden from the public site

### Managing News Editors (SUPER_ADMIN)

1. Go to **News Editors** in the Administration section
2. Select a user from the dropdown and click **Add**
3. To revoke access, click the remove button next to an editor's name

## Page Analytics

The analytics dashboard at `/admin/analytics` shows page view metrics for the public site:

- **Views (Last 30 Days)** and **Views (Last 7 Days)** — summary counts
- **Daily Page Views** — area chart showing traffic over the last 30 days
- **Top Pages** — the 10 most-visited paths
- **Top Teams** — the 10 most-visited team pages
- **Recent Views** — the 50 most recent page views with timestamp, path, team, and referrer

Page views are tracked automatically by the server on every public page load. No configuration is needed. Views older than 90 days are automatically cleaned up.

## Team Change History

Each team editor includes a collapsible **Change History** panel at the bottom. Expanding it shows the most recent changes to that team:

- Action type (Create, Update, Delete, Archive, Restore) with color-coded badges
- Who made the change
- When it happened
- Expandable details showing the JSON diff of what changed

This is a filtered view of the full audit log, scoped to the specific team.

## Special Permission Pages (SUPER_ADMIN)

### Roadmap Editors

Go to **Roadmap Editors** in the Administration section to manage who can edit the Technology Roadmap. Add or remove editors using the same interface as News Editors.

### OCT-Web-Dev Viewers

Go to **OCT-Web-Dev Viewers** in the Administration section to manage who can view the OCT-Web-Dev documentation pages. Add or remove viewers using the same interface.

In both cases, Super Admins automatically have access without needing an explicit permission.
