import AccordionSection from '@/components/its-shared/AccordionSection';
import type { AccordionItem } from '@/lib/data/its-shared';

interface AccordionLinksWidgetProps {
  items: AccordionItem[];
}

export default function AccordionLinksWidget({ items }: AccordionLinksWidgetProps) {
  if (items.length === 0) return null;
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
        Important Links
      </h2>
      <AccordionSection items={items} />
    </section>
  );
}
