import Image from 'next/image';

export default function GuidingPrinciples() {
  const principles = [
    {
      label: 'MISSION',
      color: 'bg-complement-sea-green',
      icon: '/images/oct-mission.png',
      title: 'Our Mission',
      content: 'Inspiring innovation and empowering the City and Edmontonians through data and technology.',
    },
    {
      label: 'MOTTO',
      color: 'bg-complement-empire-blue',
      icon: '/images/oct-motto.png',
      title: 'Our Motto',
      content: '"Think YES"',
      subContent: 'We think "Yes" to help problem-solve and deliver solutions.',
    },
    {
      label: 'VISION',
      color: 'bg-complement-sunrise',
      icon: '/images/oct-vision.png',
      title: 'Our Vision',
      content: 'High-performing, creative, sought-after thought leaders, building a connected City.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-sans text-3xl font-bold text-center text-gray-900 mb-12">
          Our Guiding Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div key={index} className="flip-card-container">
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className={`flip-card-front ${principle.color}`}>
                  <div className="card-label">{principle.label}</div>
                  <Image
                    src={principle.icon}
                    alt={principle.label}
                    width={200}
                    height={200}
                    className="w-40 h-40 object-cover rounded-full"
                  />
                  <div className="absolute bottom-4 right-4 text-white opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`flip-card-back ${principle.color}`}>
                  <h3 className="font-sans text-2xl font-bold text-white mb-4">
                    {principle.title}
                  </h3>
                  {principle.label === 'MOTTO' ? (
                    <>
                      <p className="font-sans text-5xl font-bold text-white">
                        {principle.content}
                      </p>
                      <p className="font-serif text-lg text-white mt-3">
                        {principle.subContent}
                      </p>
                    </>
                  ) : (
                    <p className="font-serif text-lg text-white">
                      {principle.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
