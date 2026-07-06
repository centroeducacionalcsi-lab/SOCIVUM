import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.staff.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Equipe e Prestadores" subtitle="Funcionários, equipe técnica e prestadores" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/equipe" method="post">
          <div className="form-grid">
            <input name="fullName" placeholder="Nome" required />
            <input name="cpf" placeholder="CPF/CNPJ" />
            <input name="role" placeholder="Função" />
            <input name="contractType" placeholder="Vínculo" />
            <input name="projectName" placeholder="Projeto" />
            <input name="monthlyValue" placeholder="Valor" type="number" step="0.01" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Nome</th><th>CPF/CNPJ</th><th>Função</th><th>Vínculo</th><th>Projeto</th><th>Valor</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.fullName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.role ?? '')}</td><td>{String(item.contractType ?? '')}</td><td>{String(item.projectName ?? '')}</td><td>{String(item.monthlyValue ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
