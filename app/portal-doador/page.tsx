import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.donorPortalRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Portal do Doador" subtitle="Acesso de doadores e parceiros" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/portal-doador" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="donorName" placeholder="Doador" />
            <input name="type" placeholder="Tipo" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Título</th><th>Doador</th><th>Tipo</th><th>Status</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.title ?? '')}</td><td>{String(item.donorName ?? '')}</td><td>{String(item.type ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
