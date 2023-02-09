import { useCallback } from "react";
import { ArrayItem, DataTypes, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";

export const useTreeHandler = (mainData: Json[], onChange: any) => {
  const wrapper = useCallback(
    (fn: any) =>
      (...args: any) =>
        fn(...args) || onChange(mainData),
    []
  );

  const addItem = (siblingsList: Json[], parent: Json | undefined) => {
    siblingsList?.push(TreeUtils.generateNewNode(parent));
  };
  const addSubItem = (siblingsList: Json[] | undefined, idx: number) => {
    if (!siblingsList) return;
    if (siblingsList[idx].data_type !== DataTypes.list)
      siblingsList[idx].data_type = DataTypes.object;
    siblingsList[idx].response_value = "";
    const subObject = siblingsList[idx].sub_object;
    addItem(subObject, siblingsList[idx]);
  };

  const selectAllChildren = (item: Json | undefined, checked: boolean) => {
    item?.sub_object.forEach((subItem: Json) => {
      subItem.selected = checked;
      if (subItem?.sub_object?.length) updateSelection(subItem, checked);
    });
  };

  const selectAllParent = (item: Json | undefined, checked: boolean) => {
    if (!item?.parent) return;
    if (item.parent?.parent) selectAllParent(item?.parent, checked);
    item.parent.selected = checked;
  };

  const selectAll = (checked: boolean) => {
    mainData.forEach((item) => {
      item.selected = checked;
      if (item?.sub_object?.length) selectAllChildren(item, checked);
    });
  };

  const updateSelection = (
    item: Json | undefined,
    checked: boolean,
    isReverseSelection = false
  ) => {
    if (item) item.selected = checked;
    if (item?.sub_object?.length && !isReverseSelection)
      selectAllChildren(item, checked);
    if (checked) selectAllParent(item, true);
    // This condition gets executed when there is no selection in the parent
    // This unselects the parent if all children are unselected
    else if (
      item &&
      item.parent &&
      !item.parent.sub_object.some((item: Json) => item.selected)
    )
      updateSelection(item.parent, false, true);
  };

  const updateNodeType = (item: Json, type: string) => {
    item.data_type = type;
    item.sub_object = [];
    if (type === DataTypes.object)
      item.sub_object = [TreeUtils.generateNewNode(item)];
    else if (type === DataTypes.staticList)
      item.sub_object = TreeUtils.convertJSONtoTree(
        item.originalValue,
        item,
        item.response_key
      );
    else if (type === DataTypes.list)
      item.sub_object = TreeUtils.convertJSONtoTree(
        TreeUtils.getObjectFromList(item.originalValue),
        item,
        item.response_key
      );
  };

  const removeNode = (itemList: Json[] | undefined, idx: number) => {
    itemList?.splice(idx, 1);
  };

  const updateKey = (item: ArrayItem, key: string) => {
    updateNode(item, { key });
  };

  const updateValue = (item: ArrayItem, value: string) => {
    updateNode(item, { response_value: value });
  };

  const updateNode = (item: Json, changes: Json) => {
    item = Object.assign(item, changes);
  };

  return {
    updateSelection: wrapper(updateSelection),
    updateNodeType: wrapper(updateNodeType),
    removeNode: wrapper(removeNode),
    addSubItem: wrapper(addSubItem),
    addItem: wrapper(addItem),
    updateKey: wrapper(updateKey),
    updateValue: wrapper(updateValue),
    selectAll: wrapper(selectAll),
    updateNode: wrapper(updateNode),
  };
};
