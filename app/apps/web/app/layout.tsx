import type { Metadata } from 'next';

import Registry from './registry';

export const metadata: Metadata = {
  title: 'JoinOrigin — Where teams find their origin',
  description:
    'JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Hosted fonts — no Google Fonts network request at runtime (spec §2.3). */}
        <link rel="stylesheet" href="/fonts/inter.css" />
        <link rel="stylesheet" href="/fonts/urbanist.css" />
      </head>
      <body>
        <Registry>{children}</Registry>
      </body>
    </html>
  );
}
