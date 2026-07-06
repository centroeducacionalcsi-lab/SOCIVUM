import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { accountabilityStatusOptions } from "@/lib/options";

export default async function PrestacaoContas() {
  const projects = await prisma.project.findMany({ orderBy: { name: "asc" } });
  const entries = await prisma.financeEntry.findMany({ orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <>
      <PageHeader title="Prestação de Contas" subtitle="Extratos, notas, comprovantes e rubricas por projeto/centro de custo" />
      <div className="alert">
        Selecione projeto/centro de custo, importe extrato, suba notas fiscais/comprovantes e vincule cada despesa à rubrica correta.
      </div>
      <div className="card">
        <h2>Nova prestação de contas</h2>
        <div className="form-grid">
          <select>
            <option>Selecione o projeto / centro de custo</option>
            {projects.map((project) => <option key={project.id}>{project.name}</option>)}
            <option>Conta de doações institucional</option>
          </select>
          <select>
            <option>Status</option>
            {accountabilityStatusOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input type="month" />
          <input placeholder="Conta bancária / extrato" />
        </div>
      </div>
      <div className="card">
        <h2>Lançamentos financeiros para conciliar</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Data</th><th>Projeto</th><th>Descrição</th><th>Valor</th><th>Status</th><th>Comprovante</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.paidDate || entry.dueDate}</td>
                <td>{entry.projectName}</td>
                <td>{entry.description}</td>
                <td>R$ {entry.amount.toLocaleString("pt-BR")}</td>
                <td>{entry.status}</td>
                <td><button type="button">Anexar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
