import type { ReactNode } from "react";

import "@public/styles/global.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
