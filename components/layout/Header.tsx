import { GlobalSearch } from "./GlobalSearch";
import { NotificationBell } from "./NotificationBell";
import { SocivumAIButton } from "./SocivumAIButton";
import { UserMenu } from "./UserMenu";

export function Header() {
  return (
    <header className="socivum-header">
      <div className="header-title-block">
        <div className="header-title">SOCIVUM</div>
        <div className="header-subtitle">Gestão de impacto social</div>
      </div>

      <GlobalSearch />

      <div className="header-actions">
        <SocivumAIButton />
        <NotificationBell />
        <button className="icon-button" title="Alternar tema">🌙</button>
        <UserMenu />
      </div>
    </header>
  );
}
