import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Projetos" subtitle="Gestão de projetos" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/projetos" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome do projeto" required />
            <input name="source" placeholder="Fonte de recurso" />
            <input name="budget" placeholder="Orçamento" type="number" step="0.01" />
            <input name="received" placeholder="Recebido" type="number" step="0.01" />
            <input name="status" placeholder="Status" />
            <input name="startDate" placeholder="Início" type="date" />
            <input name="endDate" placeholder="Fim" type="date" />
            <textarea name="description" placeholder="Descrição" />
            <textarea name="objectives" placeholder="Objetivos" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome do projeto</th><th>Fonte de recurso</th><th>Orçamento</th><th>Recebido</th><th>Status</th><th>Início</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.source ?? '')}</td><td>{String(item.budget ?? '')}</td><td>{String(item.received ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.startDate ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
