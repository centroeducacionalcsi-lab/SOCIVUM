import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.volunteer.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Voluntários" subtitle="Gestão de voluntários" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/voluntarios" method="post">
          <div className="form-grid">
            <input name="fullName" placeholder="Nome" required />
            <input name="cpf" placeholder="CPF" />
            <input name="skills" placeholder="Habilidades" />
            <input name="availability" placeholder="Disponibilidade" />
            <input name="hours" placeholder="Horas" type="number" step="0.01" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome</th><th>CPF</th><th>Habilidades</th><th>Disponibilidade</th><th>Horas</th><th>Observações</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.fullName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.skills ?? '')}</td><td>{String(item.availability ?? '')}</td><td>{String(item.hours ?? '')}</td><td>{String(item.notes ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
