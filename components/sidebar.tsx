"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import DesktopSidebar from "./desktop-sidebar";
import { Bell, FormInput, Home, Mail, MoreHorizontal } from "lucide-react";
import { SidebarItems } from "@/types";
import SidebarButton from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import MobileSidebar from "./mobile-sidebar";
import DesktopSidebarSkeleton from "./sidebar-skeleton";
("usehooks-ts");

type Props = {};

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "/", icon: Home },
    { label: "Notifications", href: "/notification", icon: Bell },
    { label: "Forms", href: "/forms", icon: FormInput },
    { label: "Messages", href: "/messages", icon: Mail },
  ],
  extras: (
    <div className="flex flex-col gap-4">
      {/* <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
      <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Tweet
      </SidebarButton> */}
    </div>
  ),
};

export default function Sidebar({}: Props) {
  //   const isDesktop = useMediaQuery("(min-width: 640px)", {initializeWithValue: false});
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth <= 768);
    }

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  if (!isMounted) {
    if (!isMobile) return <DesktopSidebarSkeleton />;
  }

  if (!isMobile) return <DesktopSidebar sidebarItems={sidebarItems} />;
  return <MobileSidebar sidebarItems={sidebarItems} />;
}
