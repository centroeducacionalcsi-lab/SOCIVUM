import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.psychologicalAssistance.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Atendimento Psicológico" subtitle="Atendimentos psicológicos com sigilo" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/atendimento-psicologico" method="post">
          <div className="form-grid">
            <input name="personName" placeholder="Pessoa" required />
            <input name="cpf" placeholder="CPF" />
            <input name="date" placeholder="Data" type="date" />
            <input name="professional" placeholder="Profissional" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Registro sigiloso" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Pessoa</th><th>CPF</th><th>Data</th><th>Profissional</th><th>Status</th><th>Registro sigiloso</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.personName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.professional ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
