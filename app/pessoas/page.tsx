import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import {
  ageRangeOptions, consentOptions, disabilityOptions, documentTypeOptions,
  educationOptions, genderOptions, personRoleOptions, personStatusOptions,
  raceOptions, sexOptions, socialProgramOptions
} from "@/lib/personOptions";
import { serviceOptions, benefitOptions } from "@/lib/options";

const branches = ["CSI Pernambuco","CSI Rio de Janeiro","CSI São Paulo","CSI Bahia","CSI Santa Catarina","CSI Rio Grande do Sul"];
const units = ["Unidade Ibura","Unidade Várzea","Unidade Moreno","Unidade RJ Campo Grande","Unidade SP","Unidade BA","Unidade SC","Unidade RS"];
const spaces = ["Todos","Sala de Informática","Biblioteca","Sala de Atendimento Social","Sala de Psicologia","Auditório","Quadra","Cozinha Solidária"];

export default async function Pessoas() {
  const [people, projects] = await Promise.all([
    prisma.person.findMany({ include: { links: true, benefits: true, familyAsPerson: true }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.project.findMany({ orderBy: { name: "asc" }, take: 100 })
  ]);

  return (
    <>
      <PageHeader title="Cadastro Único Inteligente" subtitle="Pessoa única, múltiplos papéis, unidade, projetos, família, benefícios e histórico" />

      <div className="alert">A pessoa é cadastrada uma única vez e pode ter vários papéis simultaneamente.</div>

      <div className="card">
        <h2>Filtros inteligentes</h2>
        <div className="form-grid">
          <select><option>Tipo de pessoa</option>{personRoleOptions.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>Status</option>{personStatusOptions.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>Filial</option>{branches.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>Unidade</option>{units.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>Projeto</option>{projects.map(i=><option key={i.id}>{i.name}</option>)}</select>
          <select><option>Atendimento</option>{serviceOptions.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>Faixa etária</option>{ageRangeOptions.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>Raça/Cor</option>{raceOptions.map(i=><option key={i}>{i}</option>)}</select>
          <select><option>PCD</option>{disabilityOptions.map(i=><option key={i}>{i}</option>)}</select>
          <input placeholder="Bairro" /><input placeholder="Cidade" /><input placeholder="CPF ou nome" />
        </div>
      </div>

      <form className="form" action="/api/pessoas" method="post">
        <div className="card">
          <h2>1. Identificação</h2>
          <div className="form-grid">
            <input name="photoUrl" placeholder="Foto da pessoa (upload futuro)" />
            <input name="fullName" placeholder="Nome completo" required />
            <input name="socialName" placeholder="Nome social" />
            <input name="cpf" placeholder="CPF" />
            <input name="rg" placeholder="RG" />
            <input name="issuingAgency" placeholder="Órgão expedidor" />
            <input name="nis" placeholder="NIS" />
            <input name="cns" placeholder="Cartão SUS / CNS" />
            <input name="voterTitle" placeholder="Título de eleitor" />
            <input name="birthDate" type="date" />
            <select name="sex"><option>Sexo</option>{sexOptions.map(i=><option key={i}>{i}</option>)}</select>
            <select name="gender"><option>Gênero</option>{genderOptions.map(i=><option key={i}>{i}</option>)}</select>
            <select name="race"><option>Raça/Cor</option>{raceOptions.map(i=><option key={i}>{i}</option>)}</select>
            <input name="maritalStatus" placeholder="Estado civil" />
            <input name="nationality" placeholder="Nacionalidade" />
            <input name="naturality" placeholder="Naturalidade" />
          </div>
        </div>

        <div className="card">
          <h2>2. Papéis da pessoa</h2>
          <div className="form-grid">{personRoleOptions.map(role=><label key={role} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="roles" value={role} style={{width:"auto",marginRight:8}} />{role}</label>)}</div>
        </div>

        <div className="card">
          <h2>3. Local de atendimento</h2>
          <div className="form-grid">
            <select name="organization"><option>Centro Educacional CSI</option></select>
            <select name="branch"><option>Filial</option>{branches.map(i=><option key={i}>{i}</option>)}</select>
            <select name="unit"><option>Unidade de atendimento</option>{units.map(i=><option key={i}>{i}</option>)}</select>
            <select name="space"><option>Espaço/local</option>{spaces.map(i=><option key={i}>{i}</option>)}</select>
            <input name="territory" placeholder="Território/comunidade" />
          </div>
        </div>

        <div className="card">
          <h2>4. Endereço atual e histórico</h2>
          <div className="form-grid">
            <input name="zipCode" placeholder="CEP" /><input name="address" placeholder="Rua / Logradouro" />
            <input name="number" placeholder="Número" /><input name="complement" placeholder="Complemento" />
            <input name="neighborhood" placeholder="Bairro" /><input name="city" placeholder="Cidade" />
            <input name="state" placeholder="UF" /><input name="referencePoint" placeholder="Ponto de referência" />
            <input name="addressStartDate" type="date" /><input name="residenceProof" placeholder="Comprovante (upload futuro)" />
          </div>
          <textarea name="addressHistory" placeholder="Histórico de endereços / observação de mudança" />
        </div>

        <div className="card"><h2>5. Contatos</h2><div className="form-grid"><input name="phone" placeholder="Telefone" /><input name="whatsapp" placeholder="WhatsApp" /><input name="email" placeholder="E-mail" /><input name="emergencyContact" placeholder="Contato de emergência" /></div></div>

        <div className="card">
          <h2>6. Escolaridade, trabalho e renda</h2>
          <div className="form-grid">
            <select name="education"><option>Escolaridade</option>{educationOptions.map(i=><option key={i}>{i}</option>)}</select>
            <input name="school" placeholder="Escola" /><input name="grade" placeholder="Série/ano" /><input name="shift" placeholder="Turno" />
            <input name="profession" placeholder="Profissão" /><input name="workStatus" placeholder="Situação de trabalho" />
            <input name="individualIncome" type="number" step="0.01" placeholder="Renda individual" />
            <input name="familyIncome" type="number" step="0.01" placeholder="Renda familiar" />
          </div>
        </div>

        <div className="card">
          <h2>7. Situação social e saúde</h2>
          <div className="form-grid">
            {socialProgramOptions.map(p=><label key={p} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="socialProgramsList" value={p} style={{width:"auto",marginRight:8}} />{p}</label>)}
            <select name="hasDisability"><option>Deficiência</option>{disabilityOptions.map(i=><option key={i}>{i}</option>)}</select>
            <input name="disabilityType" placeholder="Tipo/CID" /><input name="medications" placeholder="Medicamentos" />
            <input name="allergies" placeholder="Alergias" /><input name="foodRestrictions" placeholder="Restrições alimentares" />
          </div>
          <textarea name="vulnerability" placeholder="Vulnerabilidades" />
          <input name="housingStatus" placeholder="Situação habitacional" />
        </div>

        <div className="card"><h2>8. Grupo familiar</h2><div className="form-grid"><input name="familyNames" placeholder="Nome do familiar/responsável" /><input name="familyCpfs" placeholder="CPF do familiar" /><input name="familyKinships" placeholder="Parentesco" /><input name="familyNames" placeholder="Nome do familiar" /><input name="familyCpfs" placeholder="CPF do familiar" /><input name="familyKinships" placeholder="Parentesco" /></div></div>

        <div className="card"><h2>9. Projetos vinculados</h2><div className="form-grid"><select name="projectRole"><option>Beneficiário</option><option>Voluntário</option><option>Monitor</option><option>Equipe</option><option>Responsável Familiar</option></select><input name="startDate" type="date" /></div><div className="form-grid">{projects.length===0 && <p className="small">Cadastre projetos primeiro para aparecerem aqui.</p>}{projects.map(project=><label key={project.id} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="projectIds" value={project.id} style={{width:"auto",marginRight:8}} />{project.name}</label>)}</div></div>

        <div className="card"><h2>10. Atendimentos, benefícios, documentos e consentimentos</h2>
          <h3>Atendimentos</h3><div className="form-grid">{serviceOptions.map(s=><label key={s} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="serviceNames" value={s} style={{width:"auto",marginRight:8}} />{s}</label>)}</div>
          <h3>Benefícios</h3><div className="form-grid">{benefitOptions.map(b=><label key={b} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="benefitTypes" value={b} style={{width:"auto",marginRight:8}} />{b}</label>)}</div>
          <h3>Documentos</h3><div className="form-grid">{documentTypeOptions.map(d=><label key={d} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="documentTypes" value={d} style={{width:"auto",marginRight:8}} />{d}</label>)}</div>
          <h3>Consentimentos</h3><div className="form-grid">{consentOptions.map(c=><label key={c} className="card" style={{boxShadow:"none",marginBottom:0}}><input type="checkbox" name="consents" value={c} style={{width:"auto",marginRight:8}} />{c}</label>)}</div>
        </div>

        <div className="card"><h2>11. Status e observações</h2><select name="status"><option>Status</option>{personStatusOptions.map(i=><option key={i}>{i}</option>)}</select><textarea name="notes" placeholder="Observações gerais" /></div>
        <button type="submit">Salvar Cadastro Único</button>
      </form>

      <div className="card">
        <h2>Registros recentes</h2>
        <table className="table"><thead><tr><th>Nome</th><th>CPF</th><th>Tipo/Papéis</th><th>Projetos/Atendimentos</th><th>Benefícios</th><th>Grupo familiar</th></tr></thead>
          <tbody>{people.map(person=><tr key={person.id}><td>{person.fullName}</td><td>{person.cpf}</td><td>{person.type}</td><td>{person.links.map(link=>link.projectName || link.serviceName).filter(Boolean).join(", ")}</td><td>{person.benefits.map(b=>b.benefitType).join(", ")}</td><td>{person.familyAsPerson.map(f=>f.relativeName).join(", ")}</td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}
