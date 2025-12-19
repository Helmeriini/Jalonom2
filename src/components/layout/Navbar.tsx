"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link"; // Changed from 'a' tag to Next Link
import { NAV_ITEMS } from "../../data/navigation";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { scrollToTarget } from "../../hooks/smooth-scroll";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    // If it's a hash link, we prevent default to use our smooth scroll
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (href === "#") {
        scrollToTarget(document.body, { offset: 0 });
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
        return;
      }

      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
      const navOffset = -(navHeight + 16);
      scrollToTarget(href, { offset: navOffset });
      window.history.replaceState(null, "", href);
    }
    // If it were a real page route, Link would handle it automatically
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      setIsScrolled((prev) => {
        if (prev !== shouldBeScrolled) {
          return shouldBeScrolled;
        }
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-stone-950/90 backdrop-blur-md py-4 border-b border-stone-900"
          : "bg-transparent py-8 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="#" onClick={handleNavClick("#")} className="flex items-center">
          <Logo className="h-8 w-auto text-gold-400" />
          <span className="sr-only">Jalonom</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-12 items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className="text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-gold-300 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Button variant="outline" className="px-6 py-2 text-[10px]">
            Ota Yhteyttä
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth={1}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-stone-950 rounded-b-2xl border border-stone-900 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col items-center py-8 space-y-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm uppercase tracking-[0.2em] text-stone-300 hover:text-gold-300"
              onClick={(e) => {
                handleNavClick(item.href)(e);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};