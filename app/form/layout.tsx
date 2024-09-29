import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title:
    "The Dynamites of The Redeemed Christian Church of God, Ceaseless Joy Area HQ, Makogi, Magboro, Ogun State",
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

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col justify-center items-center bg-background h-full">
      <main className="flex w-full flex-col flex-grow">{children}</main>
    </div>
  );
}
