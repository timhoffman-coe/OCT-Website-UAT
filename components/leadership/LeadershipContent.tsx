import Link from 'next/link';
import Image from 'next/image';

const branchManagerOffice = {
  section: "Branch Manager's Office",
  members: [
    { role: 'Branch Manager', name: 'Daryl Croft', email: 'daryl.croft@edmonton.ca', image: '/images/Daryl.webp' },
    { role: 'Administrative Assistant', name: 'Charalyn Parlee', email: 'charalyn.parlee@edmonton.ca', image: '/images/Portraits/Charalyn.webp' },
    { role: 'Strategic Coordinator', name: 'Andrew Clark', email: 'andrew.clark@edmonton.ca', image: '/images/Portraits/Andrew.webp' },
  ]
};

const businessUnits = [
  {
    section: 'Application Technology Services',
    link: '/application-technology-services',
    members: [
      { role: 'Director', name: 'Robert Dufresne', email: 'robert.dufresne@edmonton.ca', image: '/images/Portraits/Bob.webp' },
      { role: 'Program Manager', name: 'Matthew Raven', email: 'matthew.raven@edmonton.ca' },
      { role: 'Program Manager', name: 'Margaret Cieslak-Olmos', email: 'margaret.cieslak-olmos@edmonton.ca' },
      { role: 'Program Manager', name: 'Ken Merkel', email: 'ken.merkel@edmonton.ca' },
    ]
  },
  {
    section: 'Corporate Information and Security Office',
    link: '/corporate-information-security',
    members: [
      { role: 'Director', name: 'Daniel Pedersen', email: 'daniel.pedersen@edmonton.ca', image: '/images/Portraits/Daniel.webp' },
      { role: 'Program Manager', name: 'Andrea Buchholz', email: 'andrea.buchholz@edmonton.ca' },
      { role: 'Program Manager', name: 'David Malone', email: 'david.malone@edmonton.ca' },
      { role: 'Program Manager', name: 'Jack Truong', email: 'jack.truong@edmonton.ca' },
      { role: 'Program Manager', name: 'Kevin McKay', email: 'kevin.mckay@edmonton.ca' },
    ]
  },
  {
    section: 'Integrated Technology Solutions',
    link: '/integrated-technology-solutions',
    members: [
      { role: 'Director', name: 'Mike Fryer', email: 'mike.fryer@edmonton.ca', image: '/images/Portraits/Mike.webp' },
      { role: 'Program Manager', name: 'Josh McGillis', email: 'josh.mcgillis@edmonton.ca' },
      { role: 'Program Manager', name: 'Greg Krol', email: 'greg.krol@edmonton.ca' },
      { role: 'Program Manager', name: 'Tim Hoffman', email: 'tim.hoffman@edmonton.ca' },
      { role: 'Program Manager', name: 'Alex Noot', email: 'alex.noot@edmonton.ca' },
      { role: 'Technical Lead', name: 'Kevin Wang', email: 'kevin.wang@edmonton.ca' },
    ]
  },
  {
    section: 'Project Management Office',
    link: '/project-management-office',
    members: [
      { role: 'Director', name: 'Nisreen Hussain', email: 'nisreen.hussain@edmonton.ca', image: '/images/Portraits/Nisreen.webp' },
      { role: 'Program Manager', name: 'Liviu Jalba', email: 'liviu.jalba@edmonton.ca' },
      { role: 'Program Manager', name: 'Shengxi Jin', email: 'shengxi.jin@edmonton.ca' },
    ]
  },
  {
    section: 'Technology Planning',
    link: '/technology-planning',
    members: [
      { role: 'Director', name: 'Troy Murray', email: 'troy.murray@edmonton.ca', image: '/images/Portraits/Troy.webp' },
      { role: 'Program Manager', name: 'Liza Wong', email: 'liza.wong@edmonton.ca' },
      { role: 'Program Manager', name: 'Mike Meraw', email: 'mike.meraw@edmonton.ca' },
      { role: 'Program Manager', name: 'Romelia Fernandez', email: 'romelia.fernandez@edmonton.ca' },
    ]
  }
];

const mailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

export default function LeadershipContent() {
  const branchManager = branchManagerOffice.members[0];
  const supportStaff = branchManagerOffice.members.slice(1);

  return (
    <>
      {/* Featured Branch Manager Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured Card */}
          <div className="lg:col-span-8 bg-white rounded-xl p-8 md:p-12 shadow-sm border border-structural-gray-blue">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={branchManager.image}
                  alt={branchManager.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center text-center md:text-left">
                <h2 className="text-3xl font-bold text-dark-blue mb-1">{branchManager.name}</h2>
                <span className="text-process-blue font-semibold text-lg mb-6">{branchManager.role}</span>
                <p className="text-text-secondary mb-6 max-w-lg leading-relaxed">
                  Daryl leads the strategic vision for the Open City &amp; Technology branch, overseeing municipal digital infrastructure and citizen-centric technology initiatives.
                </p>
                <a
                  href={`mailto:${branchManager.email}`}
                  className="flex items-center justify-center md:justify-start gap-2 text-dark-blue hover:text-process-blue transition-colors font-medium"
                >
                  {mailIcon}
                  {branchManager.email}
                </a>
              </div>
            </div>
          </div>

          {/* Secondary Support Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {supportStaff.map((member, idx) => (
              <div key={idx} className="bg-structural-light-gray p-8 rounded-xl border border-structural-gray-blue">
                <div className="flex items-center gap-5 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-dark-blue">{member.name}</h3>
                    <p className="text-text-secondary text-sm">{member.role}</p>
                  </div>
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="text-process-blue hover:text-dark-blue inline-flex items-center font-medium gap-2 transition-colors text-sm"
                >
                  {mailIcon}
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Blade */}
      <div className="w-full bg-dark-blue py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Departmental Leadership</h2>
            <p className="text-white/60 text-lg">Our Directors oversee specialized teams that provide critical technology infrastructure and support across the entire municipality.</p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-[0.6875rem] text-white/60 uppercase tracking-widest">Strategic Units</div>
            </div>
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">120+</div>
              <div className="text-[0.6875rem] text-white/60 uppercase tracking-widest">Staff Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Directors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessUnits.map((unit, idx) => {
            const director = unit.members.find(m => m.role === 'Director');
            const staff = unit.members.filter(m => m.role !== 'Director');
            if (!director) return null;
            return (
              <div key={idx} className="bg-white p-8 rounded-xl flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-300 border border-structural-gray-blue">
                <div className="flex items-center gap-4 mb-6">
                  {director.image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={director.image}
                        alt={director.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-dark-blue">{director.name}</h4>
                    <p className="text-process-blue font-medium text-xs leading-tight">Director, {unit.section}</p>
                  </div>
                </div>

                {/* Staff list */}
                <div className="mb-6 flex-grow">
                  <p className="text-[0.6875rem] font-bold text-text-secondary uppercase tracking-widest mb-2">Team</p>
                  <div className="space-y-1">
                    {staff.map((member, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between text-sm">
                        <span className="text-dark-blue">{member.name}</span>
                        <span className="text-text-secondary text-xs">{member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-structural-gray-blue space-y-2 text-sm">
                  <a
                    href={`mailto:${director.email}`}
                    className="flex items-center gap-2 text-dark-blue font-bold hover:text-process-blue transition-colors"
                  >
                    {mailIcon}
                    {director.email}
                  </a>
                  <Link
                    href={unit.link}
                    className="flex items-center gap-2 text-process-blue font-medium hover:text-dark-blue transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                    View {unit.section}
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Contact Utility Card */}
          <div className="bg-structural-light-gray p-8 rounded-xl flex flex-col justify-center items-center text-center border-2 border-dashed border-structural-gray-blue">
            <div className="mb-4 text-process-blue">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <h4 className="font-bold text-dark-blue mb-2">Need general assistance?</h4>
            <p className="text-sm text-text-secondary mb-6">For all other technical inquiries, please contact our help desk.</p>
            <Link
              href="/contact"
              className="text-process-blue font-bold text-sm underline hover:text-dark-blue transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
