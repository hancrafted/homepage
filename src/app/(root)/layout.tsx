import type { ReactNode } from "react";

type RedirectRootLayoutProps = {
  children: ReactNode;
};

export default function RedirectRootLayout({ children }: RedirectRootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}