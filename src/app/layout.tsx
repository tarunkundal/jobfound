import NextTopLoader from "nextjs-toploader";
import ClientLayout from './(public)/ClientLayout';
import { ToastProvider } from './context/ToastContext';
import './globals.css';
import { TRPCProvider } from './providers';

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
        <TRPCProvider>
          <ToastProvider>
            <ClientLayout>{children}</ClientLayout>
          </ToastProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
