import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.action.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Ações e Eventos" subtitle="Ações, eventos e atividades" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/acoes" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome da ação" required />
            <input name="projectName" placeholder="Projeto" />
            <input name="date" placeholder="Data" type="date" />
            <input name="time" placeholder="Hora" type="time" />
            <input name="location" placeholder="Local" />
            <input name="responsible" placeholder="Responsável" />
            <textarea name="description" placeholder="Descrição" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome da ação</th><th>Projeto</th><th>Data</th><th>Hora</th><th>Local</th><th>Responsável</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.projectName ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.time ?? '')}</td><td>{String(item.location ?? '')}</td><td>{String(item.responsible ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
