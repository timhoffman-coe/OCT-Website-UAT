export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-blue">
      <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-base text-gray-200">
          &copy; {currentYear} City of Edmonton | Open City & Technology
        </p>
      </div>
    </footer>
  );
}
