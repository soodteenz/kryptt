"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Home, Settings, User, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";

const sidebarLinks = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <Home className="w-5 h-5 text-white/70" />,
  },
  {
    label: "Chat",
    href: "/dashboard/chat",
    icon: <MessageSquare className="w-5 h-5 text-white/70" />,
  },
  {
    label: "Search",
    href: "/dashboard/search",
    icon: <Search className="w-5 h-5 text-white/70" />,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: <User className="w-5 h-5 text-white/70" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5 text-white/70" />,
  },
];

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody>
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                {sidebarLinks.map((link) => (
                  <SidebarLink key={link.href} link={link} />
                ))}
              </div>
            </div>
            <div className="pt-8 mt-8 border-t border-white/10">
              <SignOutButton />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        {children}
      </main>
    </div>
  );
} 