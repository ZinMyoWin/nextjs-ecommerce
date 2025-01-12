import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./ui/components/Sidebar";

export const metadata: Metadata = {
  title: "NexE",
  description: "Developed by Zin Myo Win",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex'>
        <Sidebar />
        <main className='flex-1 p-4 ml-64  bg-blue-50'>
          {" "}
          {/* Add ml-64 to account for the sidebar width */}
          {children}
        </main>
      </body>
    </html>
  );
}
