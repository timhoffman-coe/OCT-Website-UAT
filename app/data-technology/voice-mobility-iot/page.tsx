import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';

const fallback = {
  parentTeam: 'Data Technology',
  parentTeamHref: '/data-technology',
  title: 'Voice, Mobility & IoT',
  description:
    'We provide comprehensive communication services including wireline and VoIP phone systems, cellular wireless, machine-to-machine connectivity, and the City\'s LoRaWAN IoT network infrastructure.',
  icon: 'Phone',
  services: [
    {
      title: 'Voice Services (VoIP)',
      items: [
        'Cisco IP phone provisioning',
        'Voicemail and unified messaging',
        'Call centre solutions',
      ],
    },
    {
      title: 'Cellular & M2M',
      items: [
        'Corporate mobile device plans',
        'Machine-to-machine connectivity',
        'Fleet tracking integration',
      ],
    },
    {
      title: 'IoT Network',
      items: [
        'LoRaWAN sensor network',
        'Smart city device management',
        'Environmental monitoring sensors',
      ],
    },
    {
      title: 'Collaboration Tools',
      items: [
        'Video conferencing systems',
        'Digital signage (Appspace)',
        'Meeting room technology',
      ],
    },
  ],
  initiatives: [
    {
      title: 'Smart City Sensor Expansion',
      description: 'Deploying additional LoRaWAN sensors for air quality and traffic monitoring.',
      href: '#',
    },
    {
      title: 'Unified Communications Migration',
      description: 'Transitioning to cloud-based collaboration and voice platforms.',
      href: '#',
    },
  ],
  contacts: [
    {
      name: 'First Last',
      role: 'Manager, Telecom & IoT',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      role: 'IoT Solutions Architect',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
  quickLinks: [
    {
      label: 'Phone Request Form',
      description: 'Request new VoIP phones or extensions.',
      href: '#',
    },
    {
      label: 'IoT Device Portal',
      description: 'Manage and monitor connected devices.',
      href: '#',
    },
    {
      label: 'Cellular Plan Requests',
      description: 'Corporate mobile device and plan management.',
      href: '#',
      isSecure: true,
    },
  ],
};

export default async function VoiceMobilityIoTPage() {
  const data = (await fetchPortfolioSubpage('/data-technology/voice-mobility-iot')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
