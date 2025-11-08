import React from "react";
import TopTabs from "./TopTabs";
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopTabs />
      {children}
    </div>
  );
}
