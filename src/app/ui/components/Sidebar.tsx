"use client";
import Link from "next/link";
import { useState } from "react";
import HomeActive from "../../../../public/icons/home-active.svg";
import HomeInactive from "../../../../public/icons/home-inactive.svg";
import ProductActive from "../../../../public/icons/product-active.svg";
import ProductInactive from "../../../../public/icons/product-inactive.svg";
import CartActive from "../../../../public/icons/cart-filled.svg";
import CartInactive from "../../../../public/icons/cart-unfilled.svg";
import Login from "../../../../public/icons/login.svg";
import Image from "next/image";
import useCart from "@/app/hooks/useCart";
import { useSidebar } from "@/app/store/use-sidebar";
import { PanelRight, PanelLeftClose } from "lucide-react";

// Define the type for the hovered icon
type HoveredIcon = "home" | "product" | "cart" | "logout" | "login" | null;

export default function Sidebar() {
  const { session } = useCart();
  const { isOpen, toggle } = useSidebar();
  const [hoveredIcon, setHoveredIcon] = useState<HoveredIcon>(null);

  const handleMouseEnter = (iconName: HoveredIcon) => {
    setHoveredIcon(iconName);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-background text-text h-screen fixed left-0 top-0 border-r border-border flex flex-col transition-all duration-300 ease-in-out z-50`}
    >
      {/* Logo and Toggle Section */}
      <div className='h-16 px-4 border-b border-border flex items-center justify-between'>
        <div className='flex-1 flex items-center justify-center'>
          {!isOpen ? (
            <div className='w-10 h-10 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center'>
              <span className='text-xl font-bold text-background'>N</span>
            </div>
          ) : (
            <div className='flex items-center gap-3'>
              <span className='text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                NextStore
              </span>
            </div>
          )}
        </div>
        <button
          onClick={toggle}
          className='-mr-9 w-10 h-10 rounded-lg hover:bg-secondary/50 transition-colors flex items-center justify-center'
        >
          {isOpen ? (
            // Collapse icon (rectangle with arrow pointing left)
            <PanelLeftClose className='w-5 h-5' />
          ) : (
            // Expand icon (rectangle with hamburger menu)
            <PanelRight className='w-5 h-5' />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className='flex-1 py-4'>
        <ul className='space-y-2'>
          <li
            className='group px-3'
            onMouseEnter={() => handleMouseEnter("home")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              className='w-full h-10 flex items-center gap-3 px-2 rounded-lg transition-all duration-200 hover:bg-secondary/50'
              href='/'
            >
              <Image
                src={hoveredIcon === "home" ? HomeActive : HomeInactive}
                alt='Home'
                className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
              />
              {isOpen && <span className='text-sm font-medium'>Home</span>}
            </Link>
          </li>
          <li
            className='group px-3'
            onMouseEnter={() => handleMouseEnter("product")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href='/products'
              className='w-full h-10 flex items-center gap-3 px-2 rounded-lg transition-all duration-200 hover:bg-secondary/50'
            >
              <Image
                src={
                  hoveredIcon === "product" ? ProductActive : ProductInactive
                }
                alt='Products'
                className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
              />
              {isOpen && <span className='text-sm font-medium'>Products</span>}
            </Link>
          </li>
          {session?.user?.role === "user" && (
            <li
              className='group px-3'
              onMouseEnter={() => handleMouseEnter("cart")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href='/cart'
                className='w-full h-10 flex items-center gap-3 px-2 rounded-lg transition-all duration-200 hover:bg-secondary/50'
              >
                <Image
                  src={hoveredIcon === "cart" ? CartActive : CartInactive}
                  alt='Cart'
                  className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
                />
                {isOpen && <span className='text-sm font-medium'>Cart</span>}
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className='p-3 border-t border-border'>
        {session?.user ? (
          <div
            className='group'
            onMouseEnter={() => handleMouseEnter("logout")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href='/auth/signout'
              className='w-full h-10 flex items-center gap-3 px-2 rounded-lg transition-all duration-200 hover:bg-secondary/50'
            >
              <Image
                src={Login}
                alt='Logout'
                className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
              />
              {isOpen && <span className='text-sm font-medium'>Log Out</span>}
            </Link>
          </div>
        ) : (
          <div
            className='group'
            onMouseEnter={() => handleMouseEnter("login")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href='/auth/signin'
              className='w-full h-10 flex items-center gap-3 px-2 rounded-lg transition-all duration-200 hover:bg-secondary/50'
            >
              <Image
                src={Login}
                alt='Login'
                className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
              />
              {isOpen && <span className='text-sm font-medium'>Login</span>}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
