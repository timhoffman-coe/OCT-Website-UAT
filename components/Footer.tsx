export default function Footer() {
  return (
    <footer className="bg-primary-blue">
      <div className="w-full max-w-[95%] mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-base text-gray-200">
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> City of Edmonton | Open City & Technology
        </p>
      </div>
    </footer>
  );
}
