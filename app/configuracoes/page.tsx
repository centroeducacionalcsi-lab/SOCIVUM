import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Configurações e Segurança" subtitle="Usuários, permissões, auditoria e LGPD" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/configuracoes" method="post">
          <div className="form-grid">
            <input name="action" placeholder="Ação" required />
            <input name="userName" placeholder="Usuário" />
            <input name="module" placeholder="Módulo" />
            <input name="ip" placeholder="IP" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Ação</th><th>Usuário</th><th>Módulo</th><th>IP</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.action ?? '')}</td><td>{String(item.userName ?? '')}</td><td>{String(item.module ?? '')}</td><td>{String(item.ip ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
