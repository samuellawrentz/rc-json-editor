import { useCallback } from "react";
import { ArrayItem, DataTypes, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";

export const useTreeHandler = (stateUpdater: (data: any) => void) => {
  const wrapper = useCallback((fn: any) => useCallback(fn, []), []);

  const addItem = wrapper((siblingsList: Json[], parent: Json | undefined) => {
    stateUpdater((treeData: Json[]) => {
      siblingsList?.push(TreeUtils.generateNewNode(parent));
      return [...treeData];
    });
  });

  const addSubItem = wrapper(
    (siblingsList: Json[] | undefined, idx: number) => {
      if (!siblingsList) return;
      if (siblingsList[idx].data_type !== DataTypes.list)
        siblingsList[idx].data_type = DataTypes.object;
      siblingsList[idx].response_value = "";
      const subObject = siblingsList[idx].sub_object;
      addItem(subObject, siblingsList[idx]);
    }
  );

  const selectAllChildren = wrapper(
    (item: Json | undefined, checked: boolean) => {
      item?.sub_object.forEach((subItem: Json) => {
        subItem.selected = checked;
        if (subItem?.sub_object?.length) updateSelection(subItem, checked);
      });
    }
  );

  const selectAllParent = wrapper(
    (item: Json | undefined, checked: boolean) => {
      if (!item?.parent) return;
      if (item.parent?.parent) selectAllParent(item?.parent, checked);
      item.parent.selected = checked;
    }
  );

  const selectAll = wrapper((checked: boolean) => {
    stateUpdater((treeData: Json[]) => {
      treeData.forEach((item) => {
        item.selected = checked;
        if (item?.sub_object?.length) selectAllChildren(item, checked);
      });
      return [...treeData];
    });
  });

  const updateSelection = wrapper(
    (item: Json | undefined, checked: boolean) => {
      stateUpdater((treeData: Json[]) => {
        if (!item) return treeData;
        item.selected = checked;
        if (item?.sub_object?.length) selectAllChildren(item, checked);
        checked && selectAllParent(item, true);
        return [...treeData];
      });
    }
  );

  const updateNodeType = wrapper((item: Json, type: string) => {
    stateUpdater((treeData: Json[]) => {
      item.data_type = type;
      item.sub_object = [];
      if (type === DataTypes.object)
        item.sub_object = [TreeUtils.generateNewNode(item)];
      return [...treeData];
    });
  });

  const removeNode = wrapper((itemList: Json[] | undefined, idx: number) => {
    stateUpdater((treeData: Json[]) => {
      itemList?.splice(idx, 1);
      return [...treeData];
    });
  });

  const updateKey = wrapper((item: ArrayItem, key: string) => {
    updateNode(item, { key });
  });

  const updateValue = wrapper((item: ArrayItem, value: string) => {
    updateNode(item, { response_value: value });
  });

  const updateNode = wrapper((item: Json, changes: Json) => {
    stateUpdater((treeData: Json[]) => {
      item = Object.assign(item, changes);
      return [...treeData];
    });
  });

  return {
    updateSelection,
    updateNodeType,
    removeNode,
    addSubItem,
    addItem,
    updateKey,
    updateValue,
    selectAll,
    updateNode,
  };
};
