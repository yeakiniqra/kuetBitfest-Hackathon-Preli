import { Sora as SoraFont } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";


const sora = SoraFont({ subsets: ["latin"] });


export const metadata = {
  title: "Kitchen Buddy",
  description: "A personalized recipe book",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.className} flex min-h-screen`}> 
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
