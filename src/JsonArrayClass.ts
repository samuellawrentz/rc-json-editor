// Class JsonArray
// Is the key class that creates a new datatype called JsonArray
// Looks like an Array, works like an Array, but with custom methods
// Concepts used - Inheritance, Recursion, OOP

// TODO
// 1. Remove 'any'
// 2. Remove unwanted lines

import { DataTypes, Json, TreeData } from "./interfaces";

const DEFAULT_VALUES: Json = {
  string: "default string",
  number: 100,
  boolean: true,
  object: {},
  array: [],
};

export class JsonArray extends Array {
  private path: string;
  private mode: string;
  private parent: JsonArray | undefined;
  protected updateTree: () => void;

  constructor(
    json: Json,
    parent: JsonArray | undefined,
    path = "",
    stateUpdater?: (state: { value: JsonArray }) => void,
    mode = "schema"
  ) {
    super();
    if (typeof json !== "object") return;
    this.mode = mode;
    this.path = path;
    this.parent = parent;
    this.updateTree = () => stateUpdater?.({ value: this });
    this.updateArray(json);
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
        const subNode = jArray.addSubNode(idx, false, true);
        JsonArray.transformTree(treeItem.sub_object, subNode);
      }
    });
    return jArray;
  }

  protected static getType(obj: Json) {
    return !!obj && obj.constructor === Array
      ? "array"
      : typeof obj === "object"
      ? "object"
      : undefined;
  }

  // Inserts a node at the given index
  public addNode(idx: number, json: Json, selected: boolean) {
    this.updateArray(json, idx, undefined, selected);
    this.updateTree();
    return this;
  }

  // Inserts a sub-node at the given index
  public addSubNode(idx: number, selected: boolean, isEmpty = false) {
    if (this[idx].type === "object" || this[idx].type === "array") {
      const data = isEmpty
        ? {}
        : {
            [`key${this[idx].value.length}`]: "value",
          };
      return this[idx].value.addNode(0, data, selected);
    }
    this.updateArray({ key: "value" }, idx, true, selected);
    this.updateTree();
    return this;
  }

  public deleteNode(idx: number) {
    this.splice(idx, 1);
    this.updateTree();
    return this;
  }

  // Update individual node
  public updateNode(index: number, key?: string, value?: string) {
    try {
      if (key !== undefined) this[index].key = key;
      if (value !== undefined) this[index].value = value;
    } catch (e) {
      console.log(e);
    }
    this.updateTree();
    return this;
  }

  protected selectAllChildren(checked: boolean) {
    this.forEach((i, j) => {
      if (i.isObject) this.updateSelection(j, checked);
      i.selected = checked;
    });
  }

  public updateSelection(idx: number, checked: boolean) {
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
  public updateNodeType(index: number, toType: DataTypes) {
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

  protected createNode(key: string, value: Json, selected: boolean) {
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

  // Internal method that is used to update the array based on the propd
  // #private method
  private updateArray(
    json: Json,
    idx?: any,
    subNode?: boolean,
    selected = false
  ): void {
    Object.keys(json).forEach((key) => {
      const node = this.createNode(key, json[key], selected);
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
        // Select the newly added subnode
        this[idx].value[0].selected = selected;
      } else if (idx) this.splice(idx, 0, node);
      else this.push(node);
    });
  }
}
