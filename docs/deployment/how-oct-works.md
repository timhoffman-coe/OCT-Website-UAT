# How OCT Works — Interactive Architecture Diagram

The "How OCT Works" page (`/about/how-oct-works`) is an interactive network architecture diagram built with [React Flow](https://reactflow.dev/) (`@xyflow/react`). It provides a visual overview of OCT's infrastructure — from user access through security layers, cloud services, internal data centers, and partner networks.

## Architecture

```
app/about/how-oct-works/
  page.tsx                     Client component, dynamically imports ArchitectureFlow
  layout.tsx                   Metadata only

components/oct-architecture/
  ArchitectureFlow.tsx          Main React Flow canvas with navigation logic
  nodes/                       Custom node type components
    ServiceNode.tsx             Standard service card (icon, label, sublabel, accent color)
    DecommissionNode.tsx        Dashed amber card for services being retired
    GroupNode.tsx                Container box with label badge (groups child nodes)
    CloudNode.tsx               SVG cloud shape (used in sub-diagrams)
    UserGroupNode.tsx           User/persona node
    LandingZoneNode.tsx         Landing page zones (multiple variants)
  edges/
    GlowEdge.tsx                Animated cyan/custom-color edge with glow effect
    DashedEdge.tsx              Dashed connection line
    edges.css                   Animation keyframes for edge flow
  data/
    landing-nodes.ts            Root diagram node definitions
    landing-edges.ts            Root diagram edge definitions
    sub-diagrams/
      index.ts                  Registry mapping node IDs to sub-diagram data
      security-gateway.ts       Security & Access Gateway Layer
      saas-cloud.ts             SaaS Public Cloud
      iaas-cloud.ts             IaaS Public Cloud
      coe-internal.ts           COE Internal Environment
      partner-networks.ts       Partner Networks
      campus-network.ts         Campus Network (nested under COE Internal)
```

## How It Works

### Landing (Root) Diagram

The root view shows the high-level architecture as a left-to-right flow:

1. **CoE Remote Users** and **Citizens & Public** (left) connect through the **Internet** cloud
2. Traffic passes through the **Security & Access Gateway Layer** (vertical bar)
3. On the right side, three zones: **SaaS Public Cloud**, **IaaS Public Cloud**, and **COE Internal Environment**
4. **Equinix Express Links** connects COE Internal to both SaaS and IaaS (purple styling)
5. **Partner Networks** connects to the right of COE Internal

Clicking any zone with an "Explore" indicator drills down into its sub-diagram.

### Navigation & Drill-Down

`ArchitectureFlow.tsx` manages a navigation stack (`navStack`). When a user clicks a drillable node:

1. The current nodes/edges are saved to the stack
2. The view zooms into the clicked node (600ms animation)
3. A crossfade swaps the data to the sub-diagram's nodes/edges
4. `fitView()` adjusts to the new content

A breadcrumb panel (top-left) allows navigating back to any level. Clicking "Overview" returns to the root diagram.

### Sub-Diagram Registry

`sub-diagrams/index.ts` maps landing node IDs to their detailed views:

| Landing Node ID | Sub-Diagram | Description |
|-----------------|-------------|-------------|
| `landing-security-gateway` | Security Gateway | Internet cloud, Cloudflare/Ivanti entry points, WS1 Access, F5 APM, Citrix Gateway, Lenovo Portal |
| `landing-saas` | SaaS Cloud | Internet, Equinix, Azure Enterprise Apps (Entra ID) feeding into SaaS city/non-city apps |
| `landing-iaas` | IaaS Cloud | Equinix above four cloud providers (GCP, AWS, Azure, OCI), Cloud Applications group below |
| `landing-coe-internal` | COE Internal | Campus Network, Internet Access Zone (firewalls, IPS/IDS, load balancers), Primary & DR data centers |
| `landing-partners` | Partner Networks | B2B Firewall Cluster above AHS, EPS, EPCOR partner cards |
| `campus-network` | Campus Network | Core Area (OSPF Area 0), Campus Sites, Wireless Tower Network, LoRaWAN (nested drill-down from COE Internal) |

## Node Types

### LandingZoneNode

Used on the root diagram. Supports multiple visual variants via the `variant` data prop:

| Variant | Style | Usage |
|---------|-------|-------|
| `userGroup` | Yellow dashed border | Remote Users, Citizens |
| `cloud` | SVG cloud shape | Internet |
| `securityBar` | Tall vertical bar, rotated text | Security Gateway |
| `blueZone` | Cyan border, dark fill | SaaS, IaaS, COE Internal |
| `purpleZone` | Purple border, dark fill | Equinix Express Links |
| `partnerZone` | Pink border | Partner Networks |

Nodes with `clickable: true` show an "Explore" indicator and trigger drill-down.

### ServiceNode

The standard card used in sub-diagrams. Renders an icon, label, sublabel, and a colored left accent bar. Supports `hasSubDiagram` for nested drill-downs. Accepts a `style` prop for width overrides (used on wide Cloudflare bar).

### DecommissionNode

Dashed amber-bordered card with a "Decommissioning" badge. Used for services being retired (Citrix Gateway, Lenovo Portal).

### GroupNode

Container that visually groups child nodes. Renders a label badge in the top-left corner with white text. Supports `sublabel` and custom `color`.

### CloudNode

Small SVG cloud shape used in sub-diagrams (e.g., Internet cloud above Security Gateway).

## Edge Types

### GlowEdge

Animated edge with three layers: a glow backdrop, a base line, and an animated dashed "packet flow" overlay. Supports custom colors via data props:

- `data.color` — RGB triplet string (e.g., `'139, 92, 246'`) for the glow and base line
- `data.flowColor` — Full rgba string for the animated flow
- `data.label` — Optional label rendered at the edge midpoint

Defaults to cyan (`8, 145, 178`) when no color is provided.

### DashedEdge

Simple dashed line used for less prominent connections (e.g., COE Internal to Partner Networks).

## Adding a New Sub-Diagram

1. Create a new file in `data/sub-diagrams/` exporting a `nodes: Node[]` and `edges: Edge[]` array
2. Register it in `data/sub-diagrams/index.ts` by adding an entry to the `subDiagrams` record, keyed by the parent node's ID
3. Set `clickable: true` (landing zones) or `hasSubDiagram: true` (service nodes) on the parent node

## Adding a New Node Type

1. Create a component in `nodes/` following the existing pattern (memo-wrapped, handles on all four sides)
2. Register it in the `nodeTypes` object in `ArchitectureFlow.tsx`
3. Use the registered key as the `type` in node definitions

## Key Conventions

- All positions are in React Flow coordinates (pixels). Parent-child nesting uses `parentId` and `extent: 'parent'`
- Group nodes define their dimensions via `style: { width, height }`
- Handles use named IDs for directional control: `left`, `right`, `left-source`, `right-target`, `right-top`, `right-mid`, `right-bot`
- The diagram is non-interactive beyond navigation: `nodesDraggable`, `nodesConnectable`, and `elementsSelectable` are all `false`
- The canvas uses a dark theme with dot background (`#1e293b` dots on `#080c14`)
