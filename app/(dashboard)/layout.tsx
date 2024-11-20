import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { redirectToSignIn } from "@/lib/redirect-to-signin";
import { AlertProvider } from "@/providers/alert-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import "react-datepicker/dist/react-datepicker.css"; 

type Props = {};

export const metadata: Metadata = {
  title:
    "The Redeemed Christian Church of God, Ceaseless Joy Area HQ, Makogi, Magboro, Ogun State",
  description:
    "Join us at The Redeemed Christian Church of God, Ceaseless Joy Area HQ, where we build faith and community in Makogi, Ogun State.",
  keywords:
    "RCCG, Ceaseless Joy Area HQ, Makogi, Ogun State, Christian church, faith, community",
  authors: [
    { name: "RCCG Ceaseless Joy Area HQ, Makogi, Magboro, Ogun State" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title:
      "The Redeemed Christian Church of God, Ceaseless Joy Area HQ, Makogi, Ogun State",
    description:
      "Experience spiritual growth and community at RCCG Ceaseless Joy Area HQ in Makogi, Magboro, Ogun State",
    url: "https://rccgceaselessjoy.com", // Update with your actual URL
    images: [
      {
        url: "https://res.cloudinary.com/dwks1ttmv/image/upload/v1727220520/yqjmygmdenx9f0fpamxw.png", // Update with your actual image URL
        width: 800,
        height: 600,
        alt: "A description of the image related to the church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Redeemed Christian Church of God, Ceaseless Joy Area HQ, Makogi, Ogun State",
    description:
      "Join us at RCCG Ceaseless Joy Area HQ, a community of faith and worship in Makogi, Ogun State.",
    images: [
      "https://res.cloudinary.com/dwks1ttmv/image/upload/v1727220520/yqjmygmdenx9f0fpamxw.png",
    ],
  },
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user) redirectToSignIn();

  return (
    <main className="mx-5 sm:ml-[270px] h-full">
      <Sidebar />
      <AlertProvider />
      {children}
    </main>
  );
}
