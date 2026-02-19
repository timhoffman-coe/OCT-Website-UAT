import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gray-900 h-80 md:h-96">
      {/* Edmonton skyline image */}
      <Image
        src="/images/skyline.webp"
        alt="Edmonton skyline and river valley"
        fill
        sizes="100vw"
        className="object-cover opacity-50"
        priority
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="font-sans text-4xl md:text-6xl font-bold text-white text-center px-4">
          Connecting Edmonton Through Technology
        </h2>
      </div>
    </section>
  );
}
