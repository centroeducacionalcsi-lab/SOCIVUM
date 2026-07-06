import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SOCIVUM",
  description: "Plataforma de Gestão para Organizações do Terceiro Setor"
};

const nav = [["Dashboard", "/"], ...[["Pessoas", "/pessoas"], ["Famílias", "/familias"], ["Beneficiários", "/beneficiarios"], ["Voluntários", "/voluntarios"], ["Equipe e Prestadores", "/equipe"], ["Doadores", "/doadores"], ["Parceiros e Fornecedores", "/parceiros"], ["Projetos", "/projetos"], ["Ações e Eventos", "/acoes"], ["Oficinas e Turmas", "/oficinas"], ["Frequência", "/frequencia"], ["Atendimento Social", "/atendimento-social"], ["Atendimento Psicológico", "/atendimento-psicologico"], ["Atendimento Jurídico", "/atendimento-juridico"], ["Atendimento Pedagógico", "/atendimento-pedagogico"], ["Doações Financeiras", "/doacoes-financeiras"], ["Doações Materiais", "/doacoes-materiais"], ["Financeiro", "/financeiro"], ["Conciliação Bancária", "/conciliacao-bancaria"], ["Compras", "/compras"], ["Estoque", "/estoque"], ["Patrimônio", "/patrimonio"], ["Contratos e Convênios", "/contratos"], ["Documentos", "/documentos"], ["Prestação de Contas", "/prestacao-contas"], ["Editais e Captação", "/editais"], ["Comunicação", "/comunicacao"], ["Agenda e Tarefas", "/agenda"], ["Relatórios", "/relatorios"], ["Dashboards", "/dashboards"], ["Inteligência Artificial", "/ia"], ["Portal do Beneficiário", "/portal-beneficiario"], ["Portal do Doador", "/portal-doador"], ["Configurações e Segurança", "/configuracoes"], ["Mobile", "/mobile"]]];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div className="brand">SOCIVUM</div>
            <div className="brand-sub">Gestão inteligente para organizações do terceiro setor</div>
            <nav className="nav">
              {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
