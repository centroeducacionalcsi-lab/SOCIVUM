import { PageHeader } from "@/components/PageHeader";
import { permissionActions, permissionModules } from "@/lib/options";

const profiles = [
  "Administrador Geral", "Presidente", "Diretor", "Coordenador", "Financeiro",
  "Assistente Social", "Psicólogo", "Advogado", "Educador", "Voluntário",
  "Auditor", "Consultor", "Visualizador"
];

export default function Usuarios() {
  return (
    <>
      <PageHeader title="Usuários e Permissões" subtitle="Controle de acesso por perfil, módulo e tipo de ação" />

      <div className="card">
        <h2>Novo usuário</h2>
        <div className="form-grid">
          <input placeholder="Nome completo" />
          <input placeholder="CPF" />
          <input placeholder="E-mail" />
          <input placeholder="Telefone / WhatsApp" />
          <input placeholder="Cargo / Função" />
          <select>
            <option>Selecione o perfil</option>
            {profiles.map((profile) => <option key={profile}>{profile}</option>)}
          </select>
          <select>
            <option>Ativo</option>
            <option>Inativo</option>
            <option>Bloqueado</option>
          </select>
          <input placeholder="Foto do usuário (upload futuro)" />
        </div>
      </div>

      <div className="card">
        <h2>Permissões por módulo</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Módulo</th>
              {permissionActions.map((action) => <th key={action}>{action}</th>)}
            </tr>
          </thead>
          <tbody>
            {permissionModules.map((module) => (
              <tr key={module}>
                <td><b>{module}</b></td>
                {permissionActions.map((action) => (
                  <td key={`${module}-${action}`}>
                    <input type="checkbox" style={{ width: "auto" }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
