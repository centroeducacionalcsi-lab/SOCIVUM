import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.workshop.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Oficinas e Turmas" subtitle="Cursos, oficinas e turmas" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/oficinas" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome da oficina" required />
            <input name="projectName" placeholder="Projeto" />
            <input name="instructor" placeholder="Instrutor" />
            <input name="workload" placeholder="Carga horária" />
            <input name="period" placeholder="Período" />
            <input name="vacancies" placeholder="Vagas" type="number" step="0.01" />
            <input name="location" placeholder="Local" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome da oficina</th><th>Projeto</th><th>Instrutor</th><th>Carga horária</th><th>Período</th><th>Vagas</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.name ?? '')}</td><td>{String(item.projectName ?? '')}</td><td>{String(item.instructor ?? '')}</td><td>{String(item.workload ?? '')}</td><td>{String(item.period ?? '')}</td><td>{String(item.vacancies ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
