import OrgCard from '@/components/its-shared/OrgCard';
import type { TeamMember } from '@/lib/data/its-shared';

interface TeamMembersWidgetProps {
  teamMembers: TeamMember[];
}

export default function TeamMembersWidget({ teamMembers }: TeamMembersWidgetProps) {
  if (teamMembers.length === 0) return null;
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
        Who We Are
      </h2>
      <p className="font-sans text-gray-600 max-w-2xl mb-8">
        Our team is organized by portfolio. For general inquiries, please use the support
        request button. For portfolio-specific questions or escalations, you can contact the
        leads below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <OrgCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
}
