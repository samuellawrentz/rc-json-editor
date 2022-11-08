export interface Json {
  [key: string]: any;
}

export enum DataTypes {
  string = "string",
  number = "number",
  boolean = "boolean",
  list = "list",
  object = "object",
  listOfStrings = "list of strings",
  listOfNumbers = "list of numbers",
  listOfBooleans = "list of booleans",
}

export const DefaultValues = {
  string: "",
  number: 0,
  boolean: true,
  list: [],
  listOfStrings: ["string"],
  listOfNumbers: [0],
  listOfBooleans: [true],
  object: {},
};

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
export interface TreeMethods {
  updateSelection: (siblings: ArrayItem, checked: boolean) => void;
  addSubItem: (siblings: ArrayItem[], idx: number) => void;
  updateNodeType: (siblings: ArrayItem, value: string) => void;
  removeNode: (siblings: ArrayItem[], idx: number) => void;
  updateKey: (item: ArrayItem, key: string) => void;
  updateValue?: (item: ArrayItem, response_value: string) => void;
}

export interface ArrayItem {
  key: string;
  response_value: string;
  path: string;
  selected: boolean;
  display_format: string;
  data_type?: string;
  parent: ArrayItem;
  level: number;
  sub_object: ArrayItem[];
}
