export type FieldType = "text" | "number" | "date" | "checkbox";
export interface Field {
  id: string;
  name: string;
  type: FieldType;
}
export interface MachineType {
  id: string;
  name: string;
  fields: Field[];
  titleFieldId?: string;
}
export interface Machine {
  id: string;
  typeId: string;
  values: Record<string, string>;
}
