import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import {
  generatedStructureOptions,
  projectAlertTypeOptions,
  projectDocumentChecklistOptions,
  projectTemplateOptions,
  ruleActionOptions,
  ruleTriggerOptions
} from "@/lib/executionOptions";
import { calculateProjectExecution, generateClassNames, generateDefaultTargets } from "@/lib/projectEngine";

export default async function MotorProjetos() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  const demo = calculateProjectExecution({
    beneficiariesGoal: 200,
    classCount: 10,
    workshopCount: 48,
    meetingsPerClass: 24,
    months: 12,
    workload: 960,
    instructors: 4,
    approvedValue: 450000,
    capturedValue: 180000,
    executedValue: 75000
  });

  const demoClasses = generateClassNames("Primeiros Cliques", 10);
  const demoTargets = generateDefaultTargets({
    beneficiariesGoal: 200,
    classCount: 10,
    workshopCount: 48,
    meetingsPerClass: 24,
    months: 12,
    workload: 960,
    instructors: 4,
    approvedValue: 450000,
    capturedValue: 180000,
    executedValue: 75000
  });

  return (
    <>
      <PageHeader
        title="Motor de Execução de Projetos"
        subtitle="Geração automática de estrutura operacional, metas, turmas, cronograma, frequência, indicadores e prestação"
      />

      <div className="alert">
        Esta tela é o início do motor inteligente: ao parametrizar um projeto, o SOCIVUM calcula e prepara a estrutura operacional automaticamente.
      </div>

      <div className="card">
        <h2>1. Assistente de execução</h2>
        <div className="form-grid">
          <select>
            <option>Selecione o projeto</option>
            {projects.map((project) => <option key={project.id}>{project.name}</option>)}
          </select>

          <select>
            <option>Modelo de execução</option>
            {projectTemplateOptions.map((item) => <option key={item}>{item}</option>)}
          </select>

          <input type="number" placeholder="Meta de beneficiários" />
          <input type="number" placeholder="Quantidade de turmas" />
          <input type="number" placeholder="Quantidade de oficinas" />
          <input type="number" placeholder="Encontros por turma" />
          <input type="number" placeholder="Meses de execução" />
          <input type="number" placeholder="Carga horária total" />
          <input type="number" placeholder="Quantidade de instrutores" />
          <input type="number" placeholder="Valor aprovado" />
          <input type="number" placeholder="Valor captado" />
          <input type="number" placeholder="Valor executado" />
        </div>
      </div>

      <div className="card">
        <h2>2. Estrutura a gerar automaticamente</h2>
        <div className="form-grid">
          {generatedStructureOptions.map((item) => (
            <label key={item} className="card" style={{ boxShadow: "none", marginBottom: 0 }}>
              <input type="checkbox" defaultChecked style={{ width: "auto", marginRight: 8 }} />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-4">
        <div className="card"><div className="metric">{demo.capturePercent.toFixed(1)}%</div><div className="label">Captação</div></div>
        <div className="card"><div className="metric">{demo.financialExecutionPercent.toFixed(1)}%</div><div className="label">Execução financeira</div></div>
        <div className="card"><div className="metric">R$ {demo.remainingToCapture.toLocaleString("pt-BR")}</div><div className="label">Saldo a captar</div></div>
        <div className="card"><div className="metric">R$ {demo.availableBalance.toLocaleString("pt-BR")}</div><div className="label">Saldo disponível</div></div>
      </div>

      <div className="grid grid-3">
        <div className="card"><div className="metric">{demo.totalMeetings}</div><div className="label">Encontros previstos</div></div>
        <div className="card"><div className="metric">{demo.averageBeneficiariesPerClass.toFixed(0)}</div><div className="label">Beneficiários por turma</div></div>
        <div className="card"><div className="metric">{demo.averageWorkloadPerWorkshop.toFixed(1)}h</div><div className="label">Carga média por oficina</div></div>
      </div>

      <div className="card">
        <h2>3. Turmas geradas pelo motor</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Turma</th>
              <th>Status</th>
              <th>Lista de frequência</th>
              <th>Indicadores</th>
            </tr>
          </thead>
          <tbody>
            {demoClasses.map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td><span className="badge">Prevista</span></td>
                <td>Será criada automaticamente</td>
                <td>Beneficiários, frequência e carga horária</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>4. Metas automáticas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Meta</th>
              <th>Previsto</th>
              <th>Realizado</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {demoTargets.map((target) => {
              const percent = target.target > 0 ? (target.achieved / target.target) * 100 : 0;
              return (
                <tr key={target.name}>
                  <td>{target.name}</td>
                  <td>{target.target.toLocaleString("pt-BR")}</td>
                  <td>{target.achieved.toLocaleString("pt-BR")}</td>
                  <td>{percent.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>5. Checklist documental</h2>
        <div className="form-grid">
          {projectDocumentChecklistOptions.map((item) => (
            <label key={item} className="card" style={{ boxShadow: "none", marginBottom: 0 }}>
              <input type="checkbox" style={{ width: "auto", marginRight: 8 }} />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>6. Alertas e pendências automáticas</h2>
        <div className="form-grid">
          {projectAlertTypeOptions.map((item) => (
            <div className="card" key={item} style={{ boxShadow: "none", marginBottom: 0 }}>
              <b>{item}</b>
              <p className="small">O SOCIVUM poderá gerar esse alerta automaticamente conforme os dados do projeto.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>7. Motor de regras</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Quando acontecer</th>
              <th>O SOCIVUM poderá executar</th>
            </tr>
          </thead>
          <tbody>
            {ruleTriggerOptions.map((trigger, index) => (
              <tr key={trigger}>
                <td>{trigger}</td>
                <td>{ruleActionOptions[index % ruleActionOptions.length]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
