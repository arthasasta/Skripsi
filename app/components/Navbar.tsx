"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Eye, EyeOff, Database, CreditCard, FileText, BarChart2, DollarSign } from "lucide-react"; // Import icon untuk Admin dan Manager
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Clothing", href: "/Clothing" },
  { name: "Mug", href: "/Mug" },
  { name: "Accessories", href: "/Accessories" },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // State untuk modal password
  const [showAdminModal, setShowAdminModal] = useState(false); // State untuk modal admin
  const [password, setPassword] = useState(""); // State untuk password
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk visibility password
  const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan kesalahan
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openPasswordModal = () => {
    setShowPasswordModal(true);  // Buka modal password
    setErrorMessage(""); // Reset pesan kesalahan
  };
  const closePasswordModal = () => {
    setShowPasswordModal(false); // Tutup modal password
    setPassword(""); // Reset password
  };

  const openAdminModal = () => setShowAdminModal(true);  // Buka modal admin
  const closeAdminModal = () => setShowAdminModal(false); // Tutup modal admin

  const handlePasswordSubmit = () => {
    if (password === "123") {
      closePasswordModal();
      openAdminModal();
    } else {
      setErrorMessage("Invalid password");
    }
  };

  const handleAdminDatabaseClick = () => {
    window.open("https://skripsi-blesswear.sanity.studio/structure/product", "_blank");
  };

  const handleAdminStripeClick = () => {
    window.open("https://dashboard.stripe.com/test/products?active=true", "_blank");
  };

  const handleAdminOrdersClick = () => {
    window.open("https://dashboard.stripe.com/test/payments", "_blank");
  };

  const handleManagerProductReportClick = () => {
    window.open("https://dashboard.stripe.com/test/products?active=true", "_blank");
  };

  const handleManagerSalesReportClick = () => {
    window.open("https://dashboard.stripe.com/test/balance", "_blank");
  };

  return (
    <header className={`mb-8 border-b ${isSticky ? 'sticky top-0 bg-white z-50' : ''}`}>
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Bless<span className="text-primary">Wear</span>
          </h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            onClick={openPasswordModal} // Panggil fungsi untuk membuka modal password
            className="flex flex-col items-center h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <User />  {/* Icon untuk Admin */}
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Login
            </span>
          </Button>

          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-col items-center h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>

      {/* Modal Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Enter Password</h2>
            <div className="flex items-center border p-2 mb-4">
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Enter password" 
                className="flex-grow outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="ghost"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="ml-2"
              >
                {passwordVisible ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errorMessage && (
              <div className="text-red-500 mb-4">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-end space-x-4">
              <Button
                variant={"outline"}
                onClick={handlePasswordSubmit}
                className="w-full"
              >
                Submit
              </Button>
              <Button
                variant={"outline"}
                onClick={closePasswordModal}
                className="w-full text-red-500 border-red-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Admin dan Manager */}
      {showAdminModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex space-x-8">
              {/* Admin Access */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-bold mb-4">Admin Access</h2>
                <Button
                  variant={"outline"}
                  onClick={handleAdminDatabaseClick}
                  className="flex items-center gap-2 w-full"
                >
                  <Database />
                  <span>Manajemen Data Produk (Sanity)</span>
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleAdminStripeClick}
                  className="flex items-center gap-2 w-full"
                >
                  <CreditCard />
                  <span>Product catalog (Stripe)</span>
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleAdminOrdersClick}
                  className="flex items-center gap-2 w-full"
                >
                  <FileText />
                  <span>Data Pemesanan (Stripe)</span>
                </Button>
              </div>

              {/* Manager Access */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-bold mb-4">Manager Access</h2>
                <Button
                  variant={"outline"}
                  onClick={handleManagerProductReportClick}
                  className="flex items-center gap-2 w-full"
                >
                  <BarChart2 />
                  <span>Laporan Produk (Stripe)</span>
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleManagerSalesReportClick}
                  className="flex items-center gap-2 w-full"
                >
                  <DollarSign />
                  <span>Laporan Penjualan (Stripe)</span>
                </Button>
              </div>
            </div>
            <Button
              variant={"outline"}
              onClick={closeAdminModal}
              className="mt-6 w-full text-red-500 border-red-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
