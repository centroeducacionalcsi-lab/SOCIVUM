import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { projectStatusOptions, projectTypeOptions } from "@/lib/projectStatus";
import {
  costCenterStatusOptions,
  projectAreaOptions,
  projectAudienceOptions,
  projectFinanceStatusOptions,
  projectSchedulePhaseOptions,
  projectTargetTypeOptions
} from "@/lib/projectSmartOptions";

const branches = [
  "CSI Pernambuco",
  "CSI Rio de Janeiro",
  "CSI São Paulo",
  "CSI Bahia",
  "CSI Santa Catarina",
  "CSI Rio Grande do Sul"
];

const units = [
  "Unidade Ibura",
  "Unidade Várzea",
  "Unidade Moreno",
  "Unidade RJ Campo Grande",
  "Unidade SP",
  "Unidade BA",
  "Unidade SC",
  "Unidade RS"
];

const territories = [
  "Ibura",
  "Várzea",
  "Moreno",
  "Beirinha",
  "Recife",
  "Rio de Janeiro",
  "São Paulo",
  "Bahia",
  "Santa Catarina",
  "Rio Grande do Sul"
];

export default async function Projetos() {
  const [projects, people] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    }),
    prisma.person.findMany({
      orderBy: { fullName: "asc" },
      take: 200
    })
  ]);

  return (
    <>
      <PageHeader
        title="Cadastro Inteligente de Projetos"
        subtitle="Projeto como motor integrado de metas, financeiro, equipe, cronograma, oficinas, beneficiários e prestação de contas"
      />

      <div className="alert">
        Ao cadastrar um projeto, o SOCIVUM deverá preparar automaticamente centro de custo, visão financeira, cronograma, indicadores, equipe, documentos e prestação de contas.
      </div>

      <div className="card">
        <h2>Filtros de projetos</h2>
        <div className="form-grid">
          <select><option>Status</option>{projectStatusOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select><option>Tipo/Fonte</option>{projectTypeOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select><option>Área</option>{projectAreaOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select><option>Filial</option>{branches.map((item) => <option key={item}>{item}</option>)}</select>
          <select><option>Unidade</option>{units.map((item) => <option key={item}>{item}</option>)}</select>
          <select><option>Território</option>{territories.map((item) => <option key={item}>{item}</option>)}</select>
          <select><option>Status financeiro</option>{projectFinanceStatusOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <input placeholder="Nome, código, edital ou processo" />
        </div>
      </div>

      <form className="form" action="/api/projetos" method="post">
        <div className="card">
          <h2>1. Identificação do projeto</h2>
          <div className="form-grid">
            <input name="name" placeholder="Nome do projeto" required />
            <input name="code" placeholder="Código interno / PRONAC / Processo" />
            <select name="source">
              <option>Tipo / Fonte de recurso</option>
              {projectTypeOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select name="area">
              <option>Área principal</option>
              {projectAreaOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input name="funder" placeholder="Órgão, edital, patrocinador ou financiador" />
            <input name="publicNotice" placeholder="Edital / Chamada / Lei de incentivo" />
            <select name="status">
              {projectStatusOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select name="financeStatus">
              <option>Status financeiro</option>
              {projectFinanceStatusOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <textarea name="description" placeholder="Descrição resumida do projeto" />
          <textarea name="objectives" placeholder="Objetivos, justificativa e resultados esperados" />
        </div>

        <div className="card">
          <h2>2. Estrutura organizacional do projeto</h2>
          <div className="form-grid">
            <select name="branch">
              <option>Filial responsável</option>
              {branches.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select name="unit">
              <option>Unidade principal</option>
              {units.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input name="otherUnits" placeholder="Outras unidades envolvidas" />
            <select name="territory">
              <option>Território principal</option>
              {territories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input name="city" placeholder="Município" />
            <input name="state" placeholder="UF" />
          </div>
        </div>

        <div className="card">
          <h2>3. Financeiro integrado</h2>
          <div className="form-grid">
            <input name="budget" placeholder="Valor aprovado" type="number" step="0.01" />
            <input name="received" placeholder="Valor captado/recebido" type="number" step="0.01" />
            <input name="executed" placeholder="Valor executado até agora" type="number" step="0.01" />
            <input name="adminFee" placeholder="% taxa administrativa, se houver" type="number" step="0.01" />
            <select name="costCenterMode">
              {costCenterStatusOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input name="costCenter" placeholder="Centro de custo" />
            <input name="bankAccount" placeholder="Conta bancária vinculada" />
            <input name="budgetLines" placeholder="Rubricas principais" />
          </div>
          <textarea name="financeNotes" placeholder="Observações financeiras, captação, rubricas e prestação" />
        </div>

        <div className="card">
          <h2>4. Vigência e cronograma</h2>
          <div className="form-grid">
            <input name="startDate" type="date" />
            <input name="endDate" type="date" />
            <input name="executionMonths" placeholder="Meses de execução" type="number" />
            <input name="captureDeadline" type="date" />
          </div>

          <h3>Fases previstas</h3>
          <div className="form-grid">
            {projectSchedulePhaseOptions.map((phase) => (
              <label key={phase} className="card" style={{ boxShadow: "none", marginBottom: 0 }}>
                <input type="checkbox" name="schedulePhases" value={phase} style={{ width: "auto", marginRight: 8 }} />
                {phase}
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>5. Público e metas</h2>
          <div className="form-grid">
            {projectAudienceOptions.map((audience) => (
              <label key={audience} className="card" style={{ boxShadow: "none", marginBottom: 0 }}>
                <input type="checkbox" name="audiences" value={audience} style={{ width: "auto", marginRight: 8 }} />
                {audience}
              </label>
            ))}
          </div>

          <h3>Metas principais</h3>
          <div className="form-grid">
            <select name="targetType1"><option>Tipo de meta</option>{projectTargetTypeOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <input name="targetValue1" type="number" step="0.01" placeholder="Valor/meta prevista" />
            <select name="targetType2"><option>Tipo de meta</option>{projectTargetTypeOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <input name="targetValue2" type="number" step="0.01" placeholder="Valor/meta prevista" />
            <select name="targetType3"><option>Tipo de meta</option>{projectTargetTypeOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <input name="targetValue3" type="number" step="0.01" placeholder="Valor/meta prevista" />
          </div>
        </div>

        <div className="card">
          <h2>6. Equipe e responsáveis</h2>
          <div className="form-grid">
            <select name="coordinator">
              <option>Coordenador do projeto</option>
              {people.map((person) => <option key={person.id}>{person.fullName}</option>)}
            </select>
            <input name="technicalResponsible" placeholder="Responsável técnico" />
            <input name="financialResponsible" placeholder="Responsável financeiro" />
            <input name="accountabilityResponsible" placeholder="Responsável pela prestação de contas" />
            <input name="teamForecast" placeholder="Equipe prevista" />
          </div>
        </div>

        <div className="card">
          <h2>7. Oficinas, turmas, ações e eventos previstos</h2>
          <div className="form-grid">
            <input name="workshopsForecast" placeholder="Oficinas/turmas previstas" />
            <input name="classesForecast" placeholder="Quantidade de turmas" type="number" />
            <input name="actionsForecast" placeholder="Ações/eventos previstos" />
            <input name="workloadForecast" placeholder="Carga horária prevista" />
            <input name="frequencyRule" placeholder="Regra de frequência mínima" />
            <input name="attendanceRule" placeholder="Critério de participação" />
          </div>
        </div>

        <div className="card">
          <h2>8. Prestação de contas e documentos</h2>
          <div className="form-grid">
            <input name="accountabilityPeriod" placeholder="Periodicidade da prestação" />
            <input name="documentFolder" placeholder="Pasta documental do projeto" />
            <input name="requiredDocuments" placeholder="Documentos obrigatórios" />
            <input name="reportDeadline" type="date" />
          </div>
          <textarea name="accountabilityNotes" placeholder="Observações sobre prestação, anexos, diligências e relatórios" />
        </div>

        <button type="submit">Salvar projeto inteligente</button>
      </form>

      <div className="card">
        <h2>Projetos cadastrados</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Fonte</th>
              <th>Status</th>
              <th>Aprovado</th>
              <th>Captado</th>
              <th>Executado</th>
              <th>Saldo</th>
              <th>% Captação</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const approved = project.budget || 0;
              const captured = project.received || 0;
              const executed = 0;
              const balance = captured - executed;
              const percent = approved > 0 ? (captured / approved) * 100 : 0;

              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.source}</td>
                  <td><span className="badge">{project.status || "Sem status"}</span></td>
                  <td>R$ {approved.toLocaleString("pt-BR")}</td>
                  <td>R$ {captured.toLocaleString("pt-BR")}</td>
                  <td>R$ {executed.toLocaleString("pt-BR")}</td>
                  <td>R$ {balance.toLocaleString("pt-BR")}</td>
                  <td>{percent.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
