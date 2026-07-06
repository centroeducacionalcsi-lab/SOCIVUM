import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";

export default async function GruposFamiliares() {
  const familias = await prisma.family.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <>
      <PageHeader title="Grupos Familiares" subtitle="Consulta de famílias formadas a partir do cadastro único de pessoas" />

      <div className="alert">
        O cadastro principal deve acontecer dentro da Pessoa/Beneficiário, na aba Grupo Familiar. Esta tela servirá para consulta, análise e relatório das famílias.
      </div>

      <div className="card">
        <h2>Famílias cadastradas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Grupo familiar</th>
              <th>Responsável</th>
              <th>CPF</th>
              <th>Bairro</th>
              <th>Renda familiar</th>
            </tr>
          </thead>
          <tbody>
            {familias.map((familia) => (
              <tr key={familia.id}>
                <td>{familia.name}</td>
                <td>{familia.responsibleName}</td>
                <td>{familia.responsibleCpf}</td>
                <td>{familia.neighborhood}</td>
                <td>{familia.familyIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
