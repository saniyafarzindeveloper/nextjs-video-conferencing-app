import StreamVideoProvider from "@/providers/StreamClientProvider";
import { ReactNode } from "react";

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
