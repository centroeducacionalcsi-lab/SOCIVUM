import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.attendance.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Frequência" subtitle="Presenças e listas de presença" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/frequencia" method="post">
          <div className="form-grid">
            <input name="personName" placeholder="Pessoa" required />
            <input name="cpf" placeholder="CPF" />
            <input name="activity" placeholder="Atividade" />
            <input name="date" placeholder="Data" type="date" />
            <input name="status" placeholder="Status" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Pessoa</th><th>CPF</th><th>Atividade</th><th>Data</th><th>Status</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.personName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.activity ?? '')}</td><td>{String(item.date ?? '')}</td><td>{String(item.status ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
