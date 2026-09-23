import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CreatorProvider } from "@/components/creator-context";
import { Modals } from "@/components/modals";
import { SmoothScroll } from "@/components/smooth-scroll";
import { UiProvider } from "@/components/ui-provider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://classplusforcreators.co"),
  title: "Classplus for Creators",
  description:
    "Launch a branded coaching app, collect fees on UPI, run live classes, and automate WhatsApp without hiring a tech team.",
  openGraph: {
    title: "Classplus for Creators",
    description:
      "Your custom coaching app, live classes, and direct payouts. Built for independent educators.",
    url: "https://classplusforcreators.co",
    siteName: "Classplus for Creators",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-white">
        <SmoothScroll>
          <CreatorProvider>
            <UiProvider>
              {children}
              <Modals />
            </UiProvider>
          </CreatorProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
