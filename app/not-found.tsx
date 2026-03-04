import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center py-16 md:py-24">
          {/* Animated 404 number */}
          <div className="relative mb-8">
            <p className="font-sans text-[8rem] md:text-[12rem] font-bold leading-none text-primary-blue/10 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-peaceful-light-blue flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-blue" style={{ fontSize: '3rem' }}>
                  explore_off
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary-blue mb-4">
            Page Not Found
          </h1>
          <p className="font-serif text-lg md:text-xl text-text-secondary max-w-lg mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Navigation options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button as="link" href="/" size="lg">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>home</span>
                Back to Home
              </span>
            </Button>
            <Button as="link" href="/contact" variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>mail</span>
                Contact Us
              </span>
            </Button>
          </div>

          {/* Quick links */}
          <div className="border-t-2 border-structural-light-gray pt-10">
            <p className="font-sans text-sm font-semibold text-complement-grey-flannel uppercase tracking-wider mb-6">
              Popular Pages
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'About Us', href: '/about', icon: 'groups' },
                { label: 'Dashboards', href: '/dashboards', icon: 'dashboard' },
                { label: 'Resources', href: '/resources', icon: 'folder_open' },
                { label: 'Service Health', href: '/service-health', icon: 'monitor_heart' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-structural-light-gray hover:bg-peaceful-light-blue transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-primary-blue group-hover:text-dark-blue transition-colors" style={{ fontSize: '1.5rem' }}>
                    {link.icon}
                  </span>
                  <span className="font-sans text-sm font-semibold text-text-dark group-hover:text-primary-blue transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
