"use client";
import { useState, useEffect } from "react";
import TabsComponent from "./TabsComponent";

export default function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header khi scroll */}
      <header
        className={`fixed transform ${
          isScrolled ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 flex items-center justify-between p-4 bg-white w-full shadow-lg z-10`}
      >
        <div className="flex items-center gap-2">
          <img src="/timesheet-logo.png" alt="Logo Bạch Hổ" className="h-10" />
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-black text-custom-red">Bạch Hổ</h1>
            <h1 className="text-lg font-black text-custom-red">Security</h1>
          </div>
        </div>
      </header>

      {/* Header chính */}
      <div className="w-full flex">
        <div className="flex justify-center items-center p-6 gap-3">
          <img src="/timesheet-logo.png" alt="Logo Bạch Hổ" className="h-10" />
          <div className="flex justify-evenly flex-col">
            <h1 className="text-2xl font-bold text-custom-red">
              Hệ Thống Chấm Công – Bạch Hổ Security
            </h1>
            <p className="text-custom-blue text-sm">
              Quản lý chấm công, ca trực và nhân sự bảo vệ tập trung
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-2 w-full shadow-lg">
        <TabsComponent />
      </nav>
    </>
  );
}
