"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { Menu, X, ChevronLeft } from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

interface Links {
  label: string;
  href: string;
  icon: React.ReactElement<IconProps>;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

interface SidebarBodyProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
}

export const SidebarBody = ({ children, className, ...props }: SidebarBodyProps) => {
  return (
    <>
      <DesktopSidebar className={className} {...props}>
        {children}
      </DesktopSidebar>
      <MobileSidebar className={className}>
        {children}
      </MobileSidebar>
    </>
  );
};

interface DesktopSidebarProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: DesktopSidebarProps) => {
  const { open, setOpen, animate } = useSidebar();

  // Load initial state from localStorage
  React.useEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      setOpen(JSON.parse(savedState));
    }
  }, [setOpen]);

  // Save state changes to localStorage
  React.useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(open));
  }, [open]);

  return (
    <motion.div
      className={cn(
        "h-screen sticky top-0 px-4 py-4 hidden md:flex md:flex-col bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-r border-zinc-800/40 w-[300px] flex-shrink-0 relative backdrop-blur-sm",
        "shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-saturate-150",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      {...props}
    >
      {children}
      <motion.button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-full p-1.5 border border-zinc-800/40 hover:border-yellow-400/70 hover:shadow-[0_0_10px_rgba(250,204,21,0.15)] transition-all duration-300"
        animate={{ rotate: open ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronLeft className="w-4 h-4 text-white/70" />
      </motion.button>
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-800/40 w-full backdrop-blur-sm",
          "shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-saturate-150",
          className
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-white/70 cursor-pointer hover:text-yellow-400 hover:scale-110 transition-all duration-300"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="fixed inset-0 bg-black md:hidden z-[90] backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1]
              }}
              className={cn(
                "fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 p-6 shadow-[5px_0_25px_rgba(0,0,0,0.3)] md:hidden z-[100] backdrop-blur-sm backdrop-saturate-150",
                className
              )}
            >
              <div className="flex justify-end mb-4">
                <X
                  className="text-white/70 cursor-pointer hover:text-yellow-400 hover:scale-110 transition-all duration-300"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="overflow-y-auto h-[calc(100%-2rem)]">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-3 text-white/70 hover:text-yellow-400 relative",
        "transition-all duration-300 hover:pl-1",
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-yellow-400/20 after:to-transparent",
        "after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
        className
      )}
      {...props}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {React.cloneElement(link.icon, {
          className: "w-6 h-6 text-white/70"
        } as IconProps)}
      </motion.div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-[1.125rem] font-medium tracking-wide whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
