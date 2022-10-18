import { DataTypes, Json } from "../interfaces";

export abstract class TreeUtils {
  static convertJSONtoTree(
    json: Json,
    parent: Json | undefined,
    parentKey = "",
    level = 0,
    parentIndex = 0
  ): Json[] {
    return Object.keys(json).map((item, idx) => {
      const value = json[item];
      const type = TreeUtils.getType(value);
      const isList = Array.isArray(value);
      const isObject = type === DataTypes.object || type === DataTypes.array;
      const path = `${parentKey ? `${parentKey}.` : ""}${item}`;
      const response_value =
        type === DataTypes.object ||
        (isList && !TreeUtils.isAllPrimitive(value))
          ? ""
          : value;
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

  static convertTreetoJSON(tree: Json[]): Json {
    return tree.reduce((json, treeItem) => {
      json[treeItem.key] = treeItem.response_value;
      if (treeItem.sub_object.length) {
        // Recursion
        const value = this.convertTreetoJSON(treeItem.sub_object);
        json[treeItem.key] =
          treeItem.data_type === DataTypes.array ? [value] : value;
      }
      return json;
    }, {});
  }

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

  static cleanTree = (tree: Json[]): Json[] => {
    return tree.map((item) => {
      item.parent =
        item.path =
        item.level =
        item.parentIndex =
        item.response_value =
          undefined;
      item.key = item.key;
      // Recursion
      if (item.sub_object?.length)
        item.sub_object = TreeUtils.cleanTree(item.sub_object);
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

  static getType(obj: Json) {
    return Array.isArray(obj)
      ? DataTypes.array
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
