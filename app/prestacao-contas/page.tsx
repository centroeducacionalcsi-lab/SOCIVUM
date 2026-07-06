import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.accountability.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Prestação de Contas" subtitle="Execução física e financeira" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/prestacao-contas" method="post">
          <div className="form-grid">
            <input name="projectName" placeholder="Projeto" required />
            <input name="period" placeholder="Período" />
            <input name="status" placeholder="Status" />
            <textarea name="pending" placeholder="Pendências" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Projeto</th><th>Período</th><th>Status</th><th>Pendências</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.projectName ?? '')}</td><td>{String(item.period ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.pending ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
