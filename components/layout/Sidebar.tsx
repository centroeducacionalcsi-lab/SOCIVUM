"use client";

import Link from "next/link";
import { useState } from "react";
import { menuGroups } from "./menuData";

export function Sidebar() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Organização: true,
    Pessoas: true,
    "Projetos e Captação": true
  });

  function toggleGroup(title: string) {
    setOpenGroups((current) => ({
      ...current,
      [title]: !current[title]
    }));
  }

  return (
    <aside className="socivum-sidebar">
      <div className="org-card">
        <div className="org-logo-row">
          <img src="/logo-csi.jpg" alt="Logo da instituição" className="org-logo" />
          <div>
            <div className="org-name">Centro Educacional CSI</div>
            <div className="org-subtitle">SOCIVUM ERP Social</div>
          </div>
        </div>
      </div>

      <Link href="/" className="sidebar-single-link">🏠 Dashboard</Link>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Centrais do sistema</div>

        {menuGroups.map((group) => {
          const isOpen = !!openGroups[group.title];

          return (
            <div className="sidebar-group" key={group.title}>
              <button
                type="button"
                className="sidebar-group-header"
                onClick={() => toggleGroup(group.title)}
                style={{
                  width: "100%",
                  border: 0,
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <span>{group.icon} {group.title}</span>
                <span>{isOpen ? "▾" : "▸"}</span>
              </button>

              {isOpen && (
                <div>
                  {group.items.map((item) => (
                    <Link className="sidebar-link" href={item.href} key={`${group.title}-${item.label}`}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
