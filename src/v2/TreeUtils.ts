/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataTypes, DefaultValues, Json } from "../interfaces";

export abstract class TreeUtils {
  static convertJSONtoTree(
    json: Json,
    parent: Json | undefined,
    parentKey = "",
    level = 0,
    parentIndex = 0
  ): Json[] {
    if (!json) return [];
    return Object.keys(json).map((item, idx) => {
      const value = json[item];
      const type = TreeUtils.getType(value);
      const isList = Array.isArray(value);
      const isObject = type === DataTypes.object || type === DataTypes.list;
      const path = `${parentKey ? `${parentKey}.` : ""}${item}`;
      const isAllPrimitive = isList && !TreeUtils.isAllPrimitive(value);
      const response_value =
        type === DataTypes.object || isAllPrimitive ? "" : value;
      return {
        setSubObject: function () {
          this.sub_object = isObject
            ? // Recursion
              TreeUtils.convertJSONtoTree(
                isList ? TreeUtils.getObjectFromList(value) : value,
                this,
                path,
                level + 1,
                idx
              )
            : [];
          return this;
        },
        key: item,
        response_key: path,
        parent,
        parentIndex,
        level,
        response_value,
        selected: false,
        data_type: type,
        sub_object: [] as Json[],
      }.setSubObject();
    });
  }

  // Util method to get JSON from the tree/attribute data
  static convertTreetoJSON = (tree: Json[]): Json => {
    return tree.reduce((json, treeItem) => {
      const key = treeItem.key ?? treeItem.response_key.match(/\w+$/g)?.[0];
      //@ts-ignore
      json[key] = treeItem.response_value || DefaultValues[treeItem.data_type];
      if (treeItem?.sub_object?.length) {
        // Recursion
        let value;
        if (treeItem.data_type === DataTypes.list)
          value = [TreeUtils.convertTreetoJSON(treeItem.sub_object)];
        else value = TreeUtils.convertTreetoJSON(treeItem.sub_object);
        json[key] = value;
      }
      return json;
    }, {});
  };

  static transformTree = (
    tree: Json[],
    parent: Json | undefined,
    level = 0,
    parentIndex = 0
  ): Json[] => {
    return tree.map((item, idx) => {
      item.parent = parent;
      item.level = level;
      item.parentIndex = parentIndex;
      // Recursion
      if (item.sub_object?.length)
        item.sub_object = TreeUtils.transformTree(
          item.sub_object,
          item,
          level + 1,
          idx
        );
      return item;
    });
  };

  static cleanTree = (
    tree: Json[],
    removeResponseKey = true,
    isRequestBody = false
  ): Json[] => {
    return tree.map((item) => {
      item.parent = item.path = item.level = item.parentIndex = undefined;
      if (removeResponseKey) item.response_key = undefined;
      if (isRequestBody) {
        item.selected = undefined;
        item.value = item?.response_value;
      }
      item.response_value = undefined;
      // Recursion
      if (item.sub_object?.length)
        item.sub_object = TreeUtils.cleanTree(
          item.sub_object,
          removeResponseKey,
          isRequestBody
        );
      return item;
    });
  };

  static generateNewNode(
    parent: Json | undefined,
    length?: number | undefined
  ) {
    return {
      key: `key${parent?.sub_object.length || length || 0}`,
      response_value: "value",
      data_type: "string",
      sub_object: [],
      path: parent?.path + ".key",
      level: parent?.level === undefined ? 0 : parent?.level + 1,
      parent,
    };
  }

  static isAllPrimitive(array: Json[]) {
    return array.every((item) => typeof item !== DataTypes.object);
  }

  static getPrimitiveArrayType(arr: any[]) {
    if (!arr.length) return DataTypes.list;
    if (typeof arr[0] === "boolean") return DataTypes.listOfBooleans;
    if (typeof arr[0] === "string") return DataTypes.listOfStrings;
    if (typeof arr[0] === "number") return DataTypes.listOfNumbers;
  }

  static getType(obj: Json) {
    return Array.isArray(obj)
      ? TreeUtils.isAllPrimitive(obj)
        ? this.getPrimitiveArrayType(obj)
        : DataTypes.list
      : typeof obj === DataTypes.object
      ? DataTypes.object
      : typeof obj;
  }

  static getObjectFromList(value: Json[]) {
    return value.reduce((acc: Json, curr: Json) => {
      if (TreeUtils.getType(curr) === DataTypes.object)
        Object.keys(curr).forEach((objKey) => (acc[objKey] = curr[objKey]));
      return acc;
    }, {});
  }
}
