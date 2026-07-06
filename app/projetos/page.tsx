import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { projectStatusOptions, projectTypeOptions } from "@/lib/projectStatus";

export default async function Projetos() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <>
      <PageHeader title="Projetos" subtitle="Cadastro integrado com financeiro, beneficiários, documentos e prestação de contas" />

      <div className="alert">
        Ao cadastrar um projeto com valor aprovado, o SOCIVUM deverá criar automaticamente um centro de custo, uma visão financeira e uma pasta documental do projeto.
      </div>

      <div className="card">
        <h2>Novo projeto</h2>
        <form className="form" action="/api/projetos" method="post">
          <div className="form-grid">
            <input name="name" placeholder="Nome do projeto" required />

            <select name="source">
              <option value="">Tipo / Fonte</option>
              {projectTypeOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input name="budget" placeholder="Valor aprovado" type="number" step="0.01" />
            <input name="received" placeholder="Valor captado/recebido" type="number" step="0.01" />

            <select name="status">
              {projectStatusOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input name="startDate" type="date" />
            <input name="endDate" type="date" />
          </div>

          <textarea name="description" placeholder="Descrição do projeto" />
          <textarea name="objectives" placeholder="Objetivos, metas e público-alvo" />

          <button type="submit">Salvar projeto</button>
        </form>
      </div>

      <div className="card">
        <h2>Projetos cadastrados</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Tipo/Fonte</th>
              <th>Valor aprovado</th>
              <th>Captado</th>
              <th>Saldo a captar</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const budget = project.budget || 0;
              const received = project.received || 0;
              const remaining = budget - received;

              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.source}</td>
                  <td>R$ {budget.toLocaleString("pt-BR")}</td>
                  <td>R$ {received.toLocaleString("pt-BR")}</td>
                  <td>R$ {remaining.toLocaleString("pt-BR")}</td>
                  <td><span className="badge">{project.status || "Sem status"}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
