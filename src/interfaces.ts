export interface Json {
  [key: string]: any;
}

export enum DataTypes {
  string = "string",
  number = "number",
  boolean = "boolean",
  array = "array",
  object = "object",
}

export interface TreeData {
  key: string;
  data_type: DataTypes;
  selected: boolean;
  sub_object: Array<TreeData>;
}
