export default function GuidingPrinciples() {
  const principles = [
    {
      label: 'MISSION',
      title: 'Our Mission',
      content: 'Inspiring innovation and empowering the City and Edmontonians through data and technology.',
      frontBg: 'bg-structural-light-gray',
      frontText: 'text-dark-blue',
      backBg: 'bg-white',
      backText: 'text-dark-blue',
      descText: 'text-text-secondary',
      iconBg: 'bg-process-blue/10 text-process-blue',
      frontIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      bgWatermark: 'database',
    },
    {
      label: 'MOTTO',
      title: 'Our Motto',
      content: '"Think YES"',
      subContent: 'We think "Yes" to help problem-solve and deliver solutions.',
      frontBg: 'bg-dark-blue',
      frontText: 'text-white',
      backBg: 'bg-primary-blue',
      backText: 'text-white',
      descText: 'text-white/70',
      iconBg: 'bg-white/10 text-white',
      frontIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      bgWatermark: 'verified',
    },
    {
      label: 'VISION',
      title: 'Our Vision',
      content: 'High-performing, creative, sought-after thought leaders, building a connected City.',
      frontBg: 'bg-structural-light-gray',
      frontText: 'text-dark-blue',
      backBg: 'bg-white',
      backText: 'text-dark-blue',
      descText: 'text-text-secondary',
      iconBg: 'bg-process-blue/10 text-process-blue',
      frontIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
      bgWatermark: 'hub',
    },
  ];

  return (
    <section id="guiding-principles" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-dark-blue tracking-tight mb-4">
            Our Identity &amp; Purpose
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Defining the core principles that drive the OCT Branch forward, ensuring every decision aligns with our commitment to Edmontonians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {principles.map((principle, index) => (
            <div key={index} className="flip-card-container">
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className={`flip-card-front ${principle.frontBg} ${principle.label !== 'MOTTO' ? 'border border-structural-gray-blue' : ''}`}>
                  <div className={`card-label ${principle.label !== 'MOTTO' ? '!text-dark-blue !bg-white/80' : ''}`}>{principle.label}</div>
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${principle.iconBg}`}>
                    {principle.frontIcon}
                  </div>
                  <h3 className={`mt-6 text-2xl font-bold tracking-tight ${principle.frontText}`}>{principle.title}</h3>
                  <div className={`absolute bottom-4 right-4 opacity-70 ${principle.frontText}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`flip-card-back ${principle.backBg} ${principle.label !== 'MOTTO' ? 'border border-structural-gray-blue' : ''} relative overflow-hidden`}>
                  {/* Background watermark */}
                  <div className={`absolute -bottom-10 -right-10 opacity-[0.03] ${principle.label === 'MOTTO' ? 'opacity-[0.06]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-48 h-48">
                      {principle.bgWatermark === 'database' && (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      )}
                      {principle.bgWatermark === 'verified' && (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      )}
                      {principle.bgWatermark === 'hub' && (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      )}
                    </svg>
                  </div>

                  {/* Motto corner gradient */}
                  {principle.label === 'MOTTO' && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full" />
                  )}

                  <div className="relative z-10">
                    <div className={`mb-8 w-14 h-14 rounded-full flex items-center justify-center ${principle.iconBg}`}>
                      {principle.frontIcon}
                    </div>
                    {principle.label === 'MOTTO' ? (
                      <>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-6">{principle.title}</h3>
                        <p className="text-5xl font-black text-white leading-none tracking-tighter mb-4 italic">
                          Think YES
                        </p>
                        <p className="text-lg text-white/60 font-medium">
                          {principle.subContent}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className={`text-2xl font-bold mb-4 tracking-tight ${principle.backText}`}>{principle.title}</h3>
                        <p className={`text-lg leading-relaxed ${principle.descText}`}>{principle.content}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
