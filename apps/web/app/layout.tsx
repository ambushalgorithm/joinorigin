import type { Metadata } from 'next';
import Registry from './registry';

export const metadata: Metadata = {
  title: 'JoinOrigin',
  description: 'JoinOrigin — a cross-platform collaboration workspace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Registry>{children}</Registry>
      </body>
    </html>
  );
}
