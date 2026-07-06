import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function Organizacoes() {
  const items = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <>
      <PageHeader title="Organizações" subtitle="Parceiros, fornecedores, patrocinadores, órgãos públicos e instituições externas" />

      <div className="card">
        <h2>Nova organização</h2>
        <form className="form" action="/api/parceiros" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome / Razão social" required />
            <input name="document" placeholder="CNPJ / CPF" />
            <input name="type" placeholder="Tipo: parceiro, fornecedor, patrocinador..." />
            <input name="contact" placeholder="Contato" />
            <textarea name="notes" placeholder="Observações" />
          </div>
          <button type="submit">Salvar organização</button>
        </form>
      </div>

      <div className="card">
        <h2>Organizações cadastradas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Documento</th>
              <th>Tipo</th>
              <th>Contato</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.document}</td>
                <td>{item.type}</td>
                <td>{item.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
