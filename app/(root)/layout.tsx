import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "VidLink",
  description: "NextJS powered video conferencing app",
  icons:{
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    //this component wraps
    <main>
      <StreamVideoProvider>
      {children}
      </StreamVideoProvider>
      
      </main>
  );
}
