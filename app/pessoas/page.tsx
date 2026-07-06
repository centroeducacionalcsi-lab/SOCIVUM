import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Page() {
  const items = await prisma.person.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <PageHeader title="Pessoas" subtitle="Cadastro Geral de Pessoas" />
      <div className="card">
        <h2>Novo registro</h2>
        <form className="form" action="/api/pessoas" method="post">
          <div className="form-grid">
            <input name="type" placeholder="Tipo" />
            <input name="fullName" placeholder="Nome completo" required />
            <input name="cpf" placeholder="CPF" />
            <input name="phone" placeholder="Telefone" />
            <input name="neighborhood" placeholder="Bairro" />
            <input name="city" placeholder="Cidade" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h2>Registros</h2>
        <table className="table">
          <thead><tr><th>Tipo</th><th>Nome completo</th><th>CPF</th><th>Telefone</th><th>Bairro</th><th>Cidade</th></tr></thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id}><td>{String(item.type ?? '')}</td><td>{String(item.fullName ?? '')}</td><td>{String(item.cpf ?? '')}</td><td>{String(item.phone ?? '')}</td><td>{String(item.neighborhood ?? '')}</td><td>{String(item.city ?? '')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
