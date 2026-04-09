/**
 * Blocklist of widget types that should NOT be available on each template.
 * Templates not listed here (or mapped to an empty array) have no restrictions.
 * CUSTOM is unrestricted by design.
 *
 * Safe for client-side import — no @prisma/client dependency.
 */
const BLOCKED_WIDGETS_BY_TEMPLATE: Record<string, string[]> = {
  SECTION: [
    'subteam_header',
    'subteam_services',
    'subteam_initiatives',
    'subteam_contacts',
    'subteam_quick_links',
  ],
  SUB_TEAM: [
    'portfolios',
    'service_areas',
  ],
  ITS_TEAM: [
    'service_areas',
    'subteam_header',
    'subteam_services',
    'subteam_initiatives',
    'subteam_contacts',
    'subteam_quick_links',
  ],
};

/**
 * Widget types that render in the sidebar column on SUB_TEAM pages.
 * All other widgets render in the main content area.
 */
export const SIDEBAR_WIDGETS = ['subteam_contacts', 'subteam_quick_links'];

export function isSidebarWidget(widgetType: string): boolean {
  return SIDEBAR_WIDGETS.includes(widgetType);
}

export function isWidgetAllowedForTemplate(
  widgetType: string,
  template: string
): boolean {
  const blocked = BLOCKED_WIDGETS_BY_TEMPLATE[template];
  if (!blocked) return true;
  return !blocked.includes(widgetType);
}
