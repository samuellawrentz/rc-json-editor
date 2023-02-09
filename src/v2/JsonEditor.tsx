import React, { forwardRef, useImperativeHandle } from "react";
import { ArrayItem, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";
import JsonTree from "./Tree";
import { useTreeHandler } from "./useTreeHandler";

export const JsonEditor = forwardRef(function JsonEditor(
  { data, ItemComponent, fromTree, onChange }: Json,
  ref
) {
  if (!data) return null;

  fromTree
    ? TreeUtils.transformTree(data, undefined)
    : TreeUtils.convertJSONtoTree(data, undefined);

  const treeMethods = useTreeHandler(data, onChange);

  // Expose certain methods via ref
  useImperativeHandle(
    ref,
    () => ({
      getJson: () => TreeUtils.convertTreetoJSON([...data]),
      getTree: () => [...data],
      selectAll: treeMethods.selectAll,
      updateSelection: treeMethods.updateSelection,
    }),
    []
  );

  if (!data.length) return null;

  return (
    <div className={`schema-editor ${ItemComponent ? "custom" : "default"}`}>
      <JsonTree
        data={data as ArrayItem[]}
        ItemComponent={ItemComponent}
        treeMethods={treeMethods}
      />
    </div>
  );
});
