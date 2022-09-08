// Class JsonArray
// Is the key class that creates a new datatype called JsonArray
// Looks like an Array, works like an Array, but with custom methods
// Concepts used - Inheritance, Recursion, OOP

// TODO
// 1. Remove 'any'
// 2. Rectify the types
// 3. Remove unwanted lines

import { Json, TreeData } from "./interfaces";

const DEFAULT_VALUES: Json = {
  string: "default string",
  number: 100,
  boolean: true,
  object: {},
  array: [],
};

export class JsonArray extends Array {
  path: string;
  mode: string;
  value: JsonArray;
  isObject: boolean;
  selected: boolean;
  parent: JsonArray | undefined;
  protected updateTree: (state?: JsonArray) => void;

  constructor(
    json: Json,
    parent: JsonArray | undefined,
    path = "",
    stateUpdater?: (state: any) => void,
    mode = "schema"
  ) {
    super();
    if (typeof json !== "object") return;
    this.mode = mode;
    this.path = path;
    this.parent = parent;
    this.updateTree = () => stateUpdater?.({ value: this });
    this._updateArray(json);
  }

  // util Method
  // Converts the tree data back to JSON
  static convertToJSON(treeData: JsonArray) {
    return treeData?.reduce((acc, data) => {
      if (data.type === "object")
        acc[data.key] = JsonArray.convertToJSON(data.value);
      else if (data.type === "array") {
        acc[data.key] = data.value.length
          ? [JsonArray.convertToJSON(data.value)]
          : [];
      } else acc[data.key] = data.value;
      return acc;
    }, {});
  }

  // Inserts a node at the given index
  addNode(idx: number, json: Json, selected: boolean) {
    this._updateArray(json, idx, undefined, selected);
    this.updateTree();
    return this;
  }

  // Inserts a sub-node at the given index
  addSubNode(idx: number, selected: boolean, isEmpty = false) {
    if (this[idx].type === "object" || this[idx].type === "array") {
      const data = isEmpty
        ? {}
        : {
            [`key${this[idx].value.length}`]: "value",
          };
      return this[idx].value.addNode(0, data, selected);
    }
    this._updateArray({ key: "value" }, idx, true, selected);
    this.updateTree();
    return this;
  }

  deleteNode(idx: number) {
    this.splice(idx, 1);
    this.updateTree();
    return this;
  }

  // Update individual node
  updateNode(index: number, key?: string, value?: string) {
    try {
      if (key !== undefined) this[index].key = key;
      if (value !== undefined) this[index].value = value;
    } catch (e) {
      console.log(e);
    }
    this.updateTree();
    return this;
  }

  selectAllChildren(checked: boolean) {
    this.forEach((i, j) => {
      if (i.isObject) this.updateSelection(j, checked);
      i.selected = checked;
    });
  }

  updateSelection(idx: number, checked: boolean) {
    this[idx].selected = checked;
    if (this[idx].isObject) this[idx].value.selectAllChildren(checked);
    if (this.every((item) => item.selected === checked) && this.parent) {
      const parentIndex = parseInt(
        /value\[(\d+)\].value$/gi.exec(this.path)?.[1] || "0"
      );
      this.parent[parentIndex].selected = checked;
    }
    this.updateTree();
    return this;
  }
  // Update individual node
  updateNodeType(
    index: number,
    toType: "string" | "boolean" | "number" | "object" | "array"
  ) {
    this[index].type = toType;
    this[index].value = DEFAULT_VALUES[toType];
    this[index].isObject = false;
    if (toType === "object" || toType === "array") {
      this[index].isObject = true;
      this[index].value = new JsonArray(
        this[index].value,
        this,
        this[index].path + ".value",
        this.updateTree
      );
    }
    this.updateTree();
    return this;
  }

  // Factory method that creates a node
  // #private method
  _createNode(key: string, json: Json) {
    const isObject = typeof json[key] === "object";
    const xPath = `${this.path}[${this.length}]`;
    const level = (xPath.match(/value/g) || []).length;
    return {
      key,
      level,
      type: typeof json[key],
      path: xPath,
      value: isObject
        ? // Recursion if object
          new JsonArray(
            json[key],
            this.parent,
            xPath + ".value",
            this.updateTree,
            this.mode
          )
        : json[key],
    };
  }

  protected static getType(obj: Json) {
    return !!obj && obj.constructor === Array
      ? "array"
      : typeof obj === "object"
      ? "object"
      : undefined;
  }

  protected createNode1(key: string, value: any, selected: boolean) {
    const isObject = JsonArray.getType(value);
    const xPath = `${this.path}[${this.length}]`;
    const level = (xPath.match(/value/g) || []).length;
    if (isObject === "array") {
      const arrayObject = value.reduce((acc: Json, curr: Json) => {
        if (JsonArray.getType(curr))
          Object.keys(curr).forEach((objKey) => (acc[objKey] = curr[objKey]));
        return acc;
      }, {});
      value = new JsonArray(
        arrayObject,
        this,
        xPath + ".value",
        this.updateTree,
        this.mode
      );
    } else if (isObject === "object") {
      value = new JsonArray(
        value,
        this,
        xPath + ".value",
        this.updateTree,
        this.mode
      );
    }

    return {
      key,
      level,
      parent: this.parent,
      selected,
      isObject: !!isObject,
      type: isObject || typeof value,
      path: xPath,
      value,
    };
  }

  static transformTree(tree: Array<TreeData>, jArray: JsonArray) {
    // debugger;
    tree.forEach((treeItem: TreeData, idx) => {
      jArray.addNode(
        idx,
        {
          [treeItem.key]: DEFAULT_VALUES[treeItem.data_type],
        },
        treeItem.selected
      );
      if (treeItem.sub_object.length) {
        const subNode = jArray.addSubNode(0, false, true);
        JsonArray.transformTree(treeItem.sub_object, subNode);
      }
    });
    return jArray;
  }

  // Internal method that is used to update the array based on the propd
  // #private method
  _updateArray(
    json: Json,
    idx?: any,
    subNode?: boolean,
    selected = false
  ): void {
    Object.keys(json).forEach((key) => {
      const prop = this.createNode1(key, json[key], selected);
      // If index is present, insert at index
      // Or push at the end

      if (subNode) {
        this[idx].type = "object";
        this[idx].isObject = true;
        this[idx].selected = selected;
        this[idx].value = new JsonArray(
          json,
          this,
          this[idx].path + ".value",
          this.updateTree,
          this.mode
        );
      } else if (idx) this.splice(idx, 0, prop);
      else this.push(prop);
    });
  }
}
