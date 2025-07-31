import * as XLSX from "xlsx";

export interface ValidationError {
  row: number;
  errors: string[];
}

export const parseCsvOrExcel = async (file: File): Promise<string[][]> => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
};

export const validateRows = (rows: string[][]): ValidationError[] => {
  const errors: ValidationError[] = [];

  const headers = rows[0].map((h) => h.trim());
  if (headers.join(",") !== "Name,Phone,AgentId") {
    errors.push({ row: 1, errors: ["Invalid header format"] });
    return errors;
  }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 3) continue;

    const [name, phone, agentId] = row.map((x) => (x || "").toString().trim());
    const rowErrors: string[] = [];

    if (!/^[A-Za-z]+$/.test(name)) rowErrors.push("Invalid Name");
    if (!/^\d{10}$/.test(phone)) rowErrors.push("Invalid Phone");
    if (!/^\w+$/.test(agentId)) rowErrors.push("Invalid AgentId");

    if (rowErrors.length > 0) {
      errors.push({ row: i + 1, errors: rowErrors });
    }
  }

  return errors;
};
