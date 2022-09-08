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

export interface JsonArrayItem {
  key: string;
  value: Array<JsonArrayItem> | string | number | boolean;
  path: string;
  mode: string;
  isObject: boolean;
  selected: boolean;
  type: string;
  parent: Array<JsonArrayItem>;
  level: number;
}
