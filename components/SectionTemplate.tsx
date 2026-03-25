import Header from './Header';
import Footer from './Footer';
import WidgetRenderer, { DEFAULT_SECTION_WIDGETS } from '@/components/widgets/WidgetRenderer';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export interface ServiceArea {
  id: string;
  title: string;
  icon?: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  link?: string;
  isPublished?: boolean;
}

interface SectionTemplateProps {
  pageTitle: string;
  pageDescription: string;
  dataBag: WidgetDataBag;
  widgetOrder?: string[];
}

export default function SectionTemplate({
  pageTitle,
  pageDescription,
  dataBag,
  widgetOrder,
}: SectionTemplateProps) {
  const order = widgetOrder || [...DEFAULT_SECTION_WIDGETS];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Title Section */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            {pageTitle}
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            {pageDescription}
          </p>
        </div>

        <WidgetRenderer widgetOrder={order} data={dataBag} />
      </main>

      <Footer />
    </div>
  );
}
