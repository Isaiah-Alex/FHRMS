import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts/font";


export const metadata: Metadata = {
  title: "FHRMS",
  description: "This document outlines the software components and objectives for building the Federated Hospital Record Management System (FHRMS). It is intended for developers involved in implementing the Electronic Health Record (EHR), Master Patient Index (MPI), and Health Information Exchange (HIE) Gateway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
