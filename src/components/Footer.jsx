export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-gray-600 tracking-wide">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </div>
          <div className="text-sm text-gray-600 tracking-wide">
            Crafted with care
          </div>
        </div>
      </div>
    </footer>
  )
}
