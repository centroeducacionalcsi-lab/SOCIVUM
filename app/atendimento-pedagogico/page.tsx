import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.pedagogicalAssistance.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Atendimento Pedagógico" subtitle="Acompanhamento educacional" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/atendimento-pedagogico" method="post">
          <div className="form-grid">
            <input name="personName" placeholder="Pessoa" required />
            <input name="cpf" placeholder="CPF" />
            <input name="school" placeholder="Escola" />
            <input name="grade" placeholder="Série" />
            <textarea name="difficulty" placeholder="Dificuldade" />
            <textarea name="evolution" placeholder="Evolução" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Pessoa</th><th>CPF</th><th>Escola</th><th>Série</th><th>Dificuldade</th><th>Evolução</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.personName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.school ?? '')}</td><td>{String(item.grade ?? '')}</td><td>{String(item.difficulty ?? '')}</td><td>{String(item.evolution ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
