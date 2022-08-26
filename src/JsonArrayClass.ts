// Class JsonArray
// Is the key class that creates a new datatype called JsonArray
// Looks like an Array, works like an Array, but with custom methods
// Concepts used - Inheritance, Recursion, OOP
import { Json } from "./interfaces";

export class JsonArray extends Array {
  path: string;
  _updateTree: (state?: JsonArray) => void;

  constructor(json: Json, path = "", stateUpdater: (state: any) => void) {
    super();
    if (typeof json !== "object") return;

    this.path = path;
    this._updateTree = () => stateUpdater({ value: this });
    this._updateArray(json);
  }

  // util Method
  static convertToJSON(treeData: JsonArray) {
    return treeData.reduce((acc, data) => {
      if (data.type === "object")
        // Recursive call, if type is object
        acc[data.key] = JsonArray.convertToJSON(data.value);
      else acc[data.key] = data.value;
      return acc;
    }, {});
  }

  // Inserts a node at the given index
  addNode(idx: number, json: Json) {
    this._updateArray(json, idx);
    this._updateTree();
    return this;
  }

  // Inserts a sub-node at the given index
  addSubNode(idx: number, json: Json) {
    if (this[idx].type === "object") return this[idx].value.addNode(0, json);
    this._updateArray(json, idx, true);
    this._updateTree();
    return this;
  }

  deleteNode(idx: number) {
    this.splice(idx, 1);
    this._updateTree();
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
    this._updateTree(this);
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
          new JsonArray(json[key], xPath + ".value", this._updateTree)
        : json[key],
    };
  }

  // Internal method that is used to update the array based on the propd
  // #private method
  _updateArray(json: Json, idx?: any, subNode?: boolean): void {
    Object.keys(json).forEach((key) => {
      const prop = this._createNode(key, json);
      // If index is present, insert at index
      // Or push at the end

      if (subNode) {
        this[idx].type = "object";
        this[idx].value = new JsonArray(
          json,
          this[idx].path + ".value",
          this._updateTree
        );
      } else if (idx) this.splice(idx, 0, prop);
      else this.push(prop);
    });
  }
}
