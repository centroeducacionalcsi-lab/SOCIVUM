import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.reportTemplate.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Relatórios" subtitle="Relatórios customizados" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/relatorios" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome" required />
            <input name="module" placeholder="Módulo" />
            <textarea name="filters" placeholder="Filtros" />
            <input name="format" placeholder="Formato" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome</th><th>Módulo</th><th>Filtros</th><th>Formato</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.module ?? '')}</td><td>{String(item.filters ?? '')}</td><td>{String(item.format ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
