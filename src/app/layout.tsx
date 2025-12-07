import NextTopLoader from "nextjs-toploader";
import ClientLayout from './(public)/ClientLayout';
import './globals.css';
import { ToastProvider } from './providers/ToastProvider';
import { TRPCProvider } from './providers/TRPCProvider';
import { ThemeProvider } from "./providers/ThemeProvider";

export const metadata = {
  title: 'Job Found',
  description: 'Your gateway to exciting job opportunities.',
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
