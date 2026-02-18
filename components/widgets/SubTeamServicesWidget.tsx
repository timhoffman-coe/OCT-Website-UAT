interface ServiceCard {
  title: string;
  items: string[];
}

interface SubTeamServicesWidgetProps {
  services: ServiceCard[];
}

export default function SubTeamServicesWidget({ services }: SubTeamServicesWidgetProps) {
  if (services.length === 0) return null;
  return (
    <section className="mb-10">
      <h2 className="font-sans text-xl md:text-2xl font-bold text-primary-blue mb-2 pb-2 border-b-2 border-[#F4F2F1]">
        Our Services
      </h2>
      <p className="font-sans text-gray-600 mb-6">
        We offer end-to-end solutions for business areas. Explore our core capabilities below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-[#DDE3E6] rounded-md p-5 bg-white hover:border-primary-blue hover:-translate-y-1 hover:shadow-md transition-all duration-200"
          >
            <h3 className="font-sans text-primary-blue font-bold text-lg mb-3">
              {service.title}
            </h3>
            <ul className="font-sans text-sm text-gray-600 space-y-1 list-disc list-inside">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
