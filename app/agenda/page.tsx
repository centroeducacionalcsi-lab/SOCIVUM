import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.task.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Agenda e Tarefas" subtitle="Compromissos, prazos e tarefas" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/agenda" method="post">
          <div className="form-grid">
            <input name="title" placeholder="Título" required />
            <input name="date" placeholder="Data" type="date" />
            <input name="time" placeholder="Hora" type="time" />
            <input name="responsible" placeholder="Responsável" />
            <input name="priority" placeholder="Prioridade" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Título</th><th>Data</th><th>Hora</th><th>Responsável</th><th>Prioridade</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.title ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.time ?? '')}</td><td>{String(item.responsible ?? '')}</td><td>{String(item.priority ?? '')}</td><td>{String(item.status ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
