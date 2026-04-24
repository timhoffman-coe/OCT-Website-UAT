import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-dark-blue px-6 pt-24 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/skyline.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
          priority
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/85 text-[11px] font-bold tracking-widest uppercase mb-6">
          Branch Portal Home
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
          Powering the Modern<br />
          <span className="text-process-blue">Open City.</span>
        </h1>
        <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto">
          Access the resources, tools, and technical expertise required to build a smarter, more connected Edmonton.
        </p>
      </div>
    </section>
  );
}
