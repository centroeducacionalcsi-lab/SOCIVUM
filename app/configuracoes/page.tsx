import { PageHeader } from "@/components/PageHeader";
import {
  accountabilityStatusOptions, activityStatusOptions, attendanceStatusOptions,
  benefitOptions, organizationTypeOptions, priorityOptions, serviceOptions
} from "@/lib/options";
import { projectStatusOptions, projectTypeOptions } from "@/lib/projectStatus";

const groups = [
  ["Prioridades da agenda", priorityOptions],
  ["Tipos de organização", organizationTypeOptions],
  ["Tipos de atendimento/serviço", serviceOptions],
  ["Tipos de benefício", benefitOptions],
  ["Tipos de projeto", projectTypeOptions],
  ["Status de projeto/captação", projectStatusOptions],
  ["Status de atividade", activityStatusOptions],
  ["Status de frequência", attendanceStatusOptions],
  ["Status de prestação de contas", accountabilityStatusOptions]
];

export default function Configuracoes() {
  return (
    <>
      <PageHeader title="Configurações Gerais" subtitle="Listas padronizadas, parâmetros e regras do SOCIVUM" />
      <div className="grid grid-2">
        {groups.map(([title, items]) => (
          <div className="card" key={String(title)}>
            <h2>{title}</h2>
            <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </>
  );
}
