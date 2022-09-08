export interface Json {
  [key: string]: any;
}

enum DataTypes {
  string,
  number,
  boolean,
  array,
  object,
}

export interface TreeData {
  key: string;
  data_type: string;
  selected: boolean;
  sub_object: Array<TreeData>;
}
