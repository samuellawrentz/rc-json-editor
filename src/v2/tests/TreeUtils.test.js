import { DataTypes } from "../../interfaces";
import { TreeUtils } from "../TreeUtils";
import {
  mockJson,
  newItemAddedResult,
  parentJson,
  result,
  treeToJSONResult,
} from "./mocks/TreeOps";

describe("This suite tests the Tree Utils module", () => {
  test("JSONTOTree function works properly", () => {
    expect(TreeUtils.cleanTree(TreeUtils.convertJSONtoTree(mockJson))).toEqual(
      result
    );
  });

  test("Tree to JSON function works as expected", () => {
    expect(TreeUtils.convertTreetoJSON(result)).toEqual(treeToJSONResult);
  });

  test("Generate New node function", () => {
    expect(TreeUtils.generateNewNode(parentJson)).toEqual(newItemAddedResult);
  });

  test("Is all primitive function", () => {
    expect(TreeUtils.isAllPrimitive([1, 2, 3])).toBeTruthy();
    expect(TreeUtils.isAllPrimitive([1, 2, "hi"])).toBeTruthy();
    expect(TreeUtils.isAllPrimitive([1, 2, null])).toBeFalsy();
    expect(TreeUtils.isAllPrimitive([1, 2, {}])).toBeFalsy();
    expect(TreeUtils.isAllPrimitive([1, 2, []])).toBeFalsy();
    expect(TreeUtils.isAllPrimitive([1, 2, undefined])).toBeTruthy();
    expect(TreeUtils.isAllPrimitive([1, 2, NaN])).toBeTruthy();
  });

  test("Get primitive array type", () => {
    expect(TreeUtils.getPrimitiveArrayType([true, true])).toBe(
      DataTypes.listOfBooleans
    );
    expect(TreeUtils.getPrimitiveArrayType(["hi", "hello"])).toBe(
      DataTypes.listOfStrings
    );
    expect(TreeUtils.getPrimitiveArrayType([1, 2, null])).toBe(
      DataTypes.listOfNumbers
    );
  });

  test("Get Type", () => {
    expect(TreeUtils.getType([1, 2, 3])).toBe(DataTypes.listOfNumbers);
    expect(TreeUtils.getType(123)).toBe(DataTypes.number);
    expect(TreeUtils.getType(null)).toBe(DataTypes.string);
    expect(TreeUtils.getType(undefined)).toBe(DataTypes.string);
    expect(TreeUtils.getType({})).toBe(DataTypes.object);
    expect(TreeUtils.getType([{ a: "123" }])).toBe(DataTypes.list);
    expect(TreeUtils.getType(["hi"])).toBe(DataTypes.listOfStrings);
    expect(TreeUtils.getType([true])).toBe(DataTypes.listOfBooleans);
    expect(TreeUtils.getType(false)).toBe(DataTypes.boolean);
  });

  test("Get object from List", () => {
    expect(TreeUtils.getObjectFromList([])).toEqual({});
    expect(TreeUtils.getObjectFromList([1, 2, 3])).toEqual({});
    expect(TreeUtils.getObjectFromList([{ hello: "world" }])).toEqual({
      hello: "world",
    });
    expect(
      TreeUtils.getObjectFromList([{ hello: "world" }, { foo: "bar" }])
    ).toEqual({
      hello: "world",
      foo: "bar",
    });
    expect(
      TreeUtils.getObjectFromList([{ hello: "world", foo: { bar: ["hello"] } }])
    ).toEqual({
      hello: "world",
      foo: { bar: ["hello"] },
    });
    expect(
      TreeUtils.getObjectFromList([{ hello: "world" }, { hello: "world" }])
    ).toEqual({
      hello: "world",
    });
    expect(
      TreeUtils.getObjectFromList([{ hello: "world" }, { hello: "world1" }])
    ).toEqual({
      hello: "world1",
    });
    expect(
      TreeUtils.getObjectFromList([{ hello: [{ new: "prop" }] }, { hello: [] }])
    ).toEqual({
      hello: [{ new: "prop" }],
    });
    expect(TreeUtils.getObjectFromList([{ hello: [] }, { hello: [] }])).toEqual(
      {}
    );
  });
});
