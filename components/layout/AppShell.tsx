import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="socivum-shell">
      <Sidebar />
      <div className="main-area">
        <Header />
        <div className="content-wrap">{children}</div>
      </div>
    </div>
  );
}
