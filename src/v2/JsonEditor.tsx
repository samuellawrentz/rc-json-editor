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

export const JsonEditor = forwardRef(function JsonEditor(
  { data, ItemComponent, fromTree, onChange }: Json,
  ref
) {
  if (!data) return null;
  const [treeData, setTreeData] = useState([] as Json[]);
  const isTreeUpdated = useRef(false);

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
    }),
    []
  );

  if (!treeData.length) return null;

  return (
    <div className={`schema-editor ${ItemComponent ? "custom" : "default"}`}>
      <JsonTree
        data={treeData as ArrayItem[]}
        ItemComponent={ItemComponent}
        stateUpdater={(data: Json[]) => {
          isTreeUpdated.current = true;
          setTreeData(data);
        }}
      />
    </div>
  );
});
