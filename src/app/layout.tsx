import NextTopLoader from "nextjs-toploader";
import ClientLayout from './(public)/ClientLayout';
import './globals.css';
import { ThemeProvider } from "./providers/ThemeProvider";
import { ToastProvider } from './providers/ToastProvider';
import { TRPCProvider } from './providers/TRPCProvider';
export const runtime = "nodejs";

export const metadata = {
  title: 'Job Found',
  description: 'Your gateway to exciting job opportunities.',
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader
          color="gray"
          height={3}
          showSpinner={false}
        />
        <div id="modal-root"></div>
        <ThemeProvider>
          <TRPCProvider>
            <ToastProvider>
              <ClientLayout>{children}</ClientLayout>
            </ToastProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
