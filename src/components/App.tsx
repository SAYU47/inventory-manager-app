import React from "react";
import TopTabs from "./TopTabs";
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopTabs />
      {children}
    </div>
  );
}
