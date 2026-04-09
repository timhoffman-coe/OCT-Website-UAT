/**
 * Blocklist of widget types that should NOT be available on each template.
 * Templates not listed here (or mapped to an empty array) have no restrictions.
 * CUSTOM is unrestricted by design.
 *
 * Safe for client-side import — no @prisma/client dependency.
 */

const ALL_TEAM_WIDGETS = [
  'page_header', 'portfolios', 'team_tabs', 'accordion_links', 'work_tracking',
  'ongoing_projects', 'budget_spend', 'team_members', 'service_areas',
  'who_we_are', 'key_initiatives',
  'subteam_header', 'subteam_services', 'subteam_initiatives',
  'subteam_contacts', 'subteam_quick_links',
];

const ALL_PROJECT_WIDGETS = [
  'project_header', 'project_governance', 'project_objectives',
  'project_financial', 'project_timeline', 'project_status_updates',
];

const BLOCKED_WIDGETS_BY_TEMPLATE: Record<string, string[]> = {
  SECTION: [
    'subteam_header',
    'subteam_services',
    'subteam_initiatives',
    'subteam_contacts',
    'subteam_quick_links',
    ...ALL_PROJECT_WIDGETS,
  ],
  SUB_TEAM: [
    'portfolios',
    'service_areas',
    ...ALL_PROJECT_WIDGETS,
  ],
  ITS_TEAM: [
    'service_areas',
    'subteam_header',
    'subteam_services',
    'subteam_initiatives',
    'subteam_contacts',
    'subteam_quick_links',
    ...ALL_PROJECT_WIDGETS,
  ],
  PROJECT: [
    ...ALL_TEAM_WIDGETS,
  ],
};

/**
 * Widget types that render in the sidebar column.
 */
export const SIDEBAR_WIDGETS = ['subteam_contacts', 'subteam_quick_links'];
export const PROJECT_SIDEBAR_WIDGETS = ['project_financial', 'project_timeline', 'project_status_updates'];

export function isSidebarWidget(widgetType: string): boolean {
  return SIDEBAR_WIDGETS.includes(widgetType) || PROJECT_SIDEBAR_WIDGETS.includes(widgetType);
}

export function isWidgetAllowedForTemplate(
  widgetType: string,
  template: string
): boolean {
  const blocked = BLOCKED_WIDGETS_BY_TEMPLATE[template];
  if (!blocked) return true;
  return !blocked.includes(widgetType);
}
