function Footer() {
  return (
    <footer className="bg-teal-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Hospital Patient Record System
            </p>
          </div>
          <div className="text-sm">
            <p>Hash-Indexed Database Management System</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

