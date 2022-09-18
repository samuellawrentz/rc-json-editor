import React, { useCallback, useContext } from "react";
import { ArrayItem, DataTypes, Json } from "../interfaces";
import { TreeContext } from "./TreeContext";
import { TreeUtils } from "./TreeUtils";

export const useTreeHandler = () => {
  const { stateUpdater, treeData } = useContext(TreeContext);

  const wrapper = useCallback((fn: any) => useCallback(fn, []), []);

  const addItem = wrapper(
    (siblingsList: Json[] | undefined, parent: Json | undefined) => {
      siblingsList?.push(
        TreeUtils.generateNewNode(parent, siblingsList.length)
      );
      stateUpdater([...treeData]);
    }
  );

  const addSubItem = wrapper(
    (siblingsList: Json[] | undefined, idx: number) => {
      if (!siblingsList) return;
      if (siblingsList[idx].display_format !== DataTypes.array)
        siblingsList[idx].display_format = DataTypes.object;
      siblingsList[idx].response_value = "";
      const subObject = siblingsList[idx].sub_object;
      addItem(subObject, siblingsList[idx]);
    }
  );

  const selectAllChildren = wrapper(
    (item: Json | undefined, checked: boolean) => {
      item?.sub_object.forEach((subItem: Json) => {
        subItem.selected = checked;
        if (subItem.sub_object.length) updateSelection(subItem, checked);
      });
    }
  );

  const selectAllParent = wrapper(
    (item: Json | undefined, checked: boolean) => {
      if (!item?.parent) return;
      if (item.parent?.parent) selectAllParent(item.parent, checked);
      item.parent.selected = checked;
    }
  );

  const updateSelection = wrapper(
    (item: Json | undefined, checked: boolean) => {
      if (!item) return;
      item.selected = checked;
      if (item?.sub_object.length) selectAllChildren(item, checked);
      checked && selectAllParent(item, true);
      stateUpdater([...treeData]);
    }
  );

  const updateNodeType = wrapper((item: Json, type: string) => {
    item.display_format = type;
    item.sub_object = [];
    if (type === DataTypes.object)
      item.sub_object = [TreeUtils.generateNewNode(item)];
    stateUpdater([...treeData]);
  });

  const removeNode = wrapper((itemList: Json[] | undefined, idx: number) => {
    itemList?.splice(idx, 1);
    stateUpdater([...treeData]);
  });

  const updateKey = wrapper((item: ArrayItem, key: string) => {
    updateNode(item, { key });
  });

  const updateValue = wrapper((item: ArrayItem, value: string) => {
    updateNode(item, { response_value: value });
  });

  const updateNode = wrapper((item: Json, changes: Json) => {
    item = Object.assign(item, changes);
    stateUpdater([...treeData]);
  });

  return {
    updateSelection,
    updateNodeType,
    removeNode,
    addSubItem,
    addItem,
    updateKey,
    updateValue,
    treeData,
  };
};
