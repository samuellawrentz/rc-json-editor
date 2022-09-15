import React, { useCallback, useContext } from "react";
import { DataTypes, Json } from "../interfaces";
import { EContext } from "./JsonSchemaEditor";
import { TreeUtils } from "./TreeUtils";

export const useTreeHandler = () => {
  const { stateUpdater, mainDataRef } = useContext(EContext);

  const wrapper = useCallback((fn: any) => useCallback(fn, []), []);

  const addItem = wrapper(
    (dataRef: Json[] | undefined, parent: Json | undefined) => {
      dataRef?.push(TreeUtils.generateNewNode(parent));
      stateUpdater([...mainDataRef.current]);
    }
  );

  const addSubItem = wrapper((dataRef: Json[] | undefined, idx: number) => {
    if (!dataRef) return;
    if (dataRef[idx].display_format !== DataTypes.array)
      dataRef[idx].display_format = DataTypes.object;
    const subObject = dataRef[idx].sub_object;
    addItem(subObject, dataRef[idx]);
  });

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
      stateUpdater([...mainDataRef.current]);
    }
  );

  const updateNodeType = wrapper((item: Json, type: string) => {
    item.display_format = type;
    item.sub_object = [];
    if (type === DataTypes.object)
      item.sub_object = [TreeUtils.generateNewNode(item)];
    stateUpdater([...mainDataRef.current]);
  });

  const removeNode = wrapper((itemList: Json[] | undefined, idx: number) => {
    itemList?.splice(idx, 1);
    stateUpdater([...mainDataRef.current]);
  });

  return { updateSelection, updateNodeType, removeNode, addSubItem };

  // const updateNode = (item: Json, changes: Json) => {
  //   item = Object.assign(item, changes);
  //   stateUpdater([...mainDataRef.current]);
  // };
};
