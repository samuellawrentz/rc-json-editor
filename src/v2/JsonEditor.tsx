import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ArrayItem, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";
import JsonTree from "./Tree";
import { useTreeHandler } from "./useTreeHandler";

export const JsonEditor = forwardRef(function JsonEditor(
  { data, ItemComponent, fromTree, onChange, viewFrom }: Json,
  ref
) {
  if (!data) return null;
  const [treeData, setTreeData] = useState([] as Json[]);
  const isTreeUpdated = useRef(false);
  const stateUpdater = (data: Json[]) => {
    isTreeUpdated.current = true;
    setTreeData(data);
  };
  const treeMethods = useTreeHandler(stateUpdater);

  // Update the tree on props change
  useEffect(() => {
    const newData = fromTree
      ? TreeUtils.transformTree(data, undefined)
      : TreeUtils.convertJSONtoTree(data, undefined);
    setTreeData(newData);
  }, [data]);

  useEffect(() => {
    isTreeUpdated.current && onChange?.(treeData);
    isTreeUpdated.current = false;
  });

  // Expose certain methods via ref
  useImperativeHandle(
    ref,
    () => ({
      getJson: () => TreeUtils.convertTreetoJSON([...treeData]),
      getTree: () => [...treeData],
      selectAll: treeMethods.selectAll,
      updateSelection: treeMethods.updateSelection,
    }),
    []
  );

  if (!treeData.length) return null;

  return (
    <div className={`schema-editor ${ItemComponent ? "custom" : "default"}`}>
      <JsonTree
        data={treeData as ArrayItem[]}
        ItemComponent={ItemComponent}
        stateUpdater={stateUpdater}
        treeMethods={treeMethods}
      />
    </div>
  );
});
