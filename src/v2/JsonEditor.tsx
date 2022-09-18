import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { ArrayItem, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";
import JsonTree from "./Tree";
import { TreeContext } from "./TreeContext";

export const JsonEditor = forwardRef(function JsonEditor(
  { data, ItemComponent, fromTree }: Json,
  ref
) {
  if (!data) return null;
  const [treeData, setTreeData] = useState([] as Json[]);

  // Update the tree on props change
  useEffect(() => {
    const newData = fromTree
      ? TreeUtils.transformTree(data, undefined)
      : TreeUtils.convertJSONtoTree(data, undefined);
    setTreeData(newData);
  }, [data]);

  // Expose certain methods via ref
  useImperativeHandle(
    ref,
    () => ({
      getJson: () => TreeUtils.convertTreetoJSON(treeData),
      getTree: () => treeData,
    }),
    []
  );

  // Props for the context is preserved on every render
  const contextProps = useMemo(
    () => ({
      stateUpdater: (data: ArrayItem[]) => setTreeData(data),
      treeData,
    }),
    [treeData]
  );

  if (!treeData.length) return null;

  return (
    <TreeContext.Provider value={contextProps}>
      <div className={`schema-editor ${ItemComponent ? "custom" : "default"}`}>
        <form noValidate>
          <JsonTree
            data={treeData as ArrayItem[]}
            ItemComponent={ItemComponent}
          />
        </form>
      </div>
    </TreeContext.Provider>
  );
});
