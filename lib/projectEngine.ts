export type ProjectExecutionInput = {
  beneficiariesGoal: number;
  classCount: number;
  workshopCount: number;
  meetingsPerClass: number;
  months: number;
  workload: number;
  instructors: number;
  approvedValue: number;
  capturedValue: number;
  executedValue: number;
};

export function calculateProjectExecution(input: ProjectExecutionInput) {
  const remainingToCapture = Math.max(input.approvedValue - input.capturedValue, 0);
  const availableBalance = input.capturedValue - input.executedValue;
  const capturePercent = input.approvedValue > 0 ? (input.capturedValue / input.approvedValue) * 100 : 0;
  const financialExecutionPercent = input.capturedValue > 0 ? (input.executedValue / input.capturedValue) * 100 : 0;

  const totalMeetings = input.classCount * input.meetingsPerClass;
  const averageBeneficiariesPerClass = input.classCount > 0 ? input.beneficiariesGoal / input.classCount : 0;
  const averageWorkloadPerWorkshop = input.workshopCount > 0 ? input.workload / input.workshopCount : 0;

  return {
    remainingToCapture,
    availableBalance,
    capturePercent,
    financialExecutionPercent,
    totalMeetings,
    averageBeneficiariesPerClass,
    averageWorkloadPerWorkshop
  };
}

export function generateClassNames(projectName: string, classCount: number) {
  return Array.from({ length: classCount }, (_, index) => {
    const letter = String.fromCharCode(65 + index);
    return `${projectName} - Turma ${letter}`;
  });
}

export function generateDefaultTargets(input: ProjectExecutionInput) {
  return [
    { name: "Beneficiários atendidos", target: input.beneficiariesGoal, achieved: 0 },
    { name: "Turmas abertas", target: input.classCount, achieved: 0 },
    { name: "Oficinas realizadas", target: input.workshopCount, achieved: 0 },
    { name: "Encontros realizados", target: input.classCount * input.meetingsPerClass, achieved: 0 },
    { name: "Horas executadas", target: input.workload, achieved: 0 },
    { name: "Valor captado", target: input.approvedValue, achieved: input.capturedValue },
    { name: "Valor executado", target: input.capturedValue, achieved: input.executedValue }
  ];
}
