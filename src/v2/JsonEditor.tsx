import React, { forwardRef } from "react";
import { ArrayItem, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";
import JsonTree from "./Tree";
import { useTreeHandler } from "./useTreeHandler";

export const JsonEditor = ({
  data,
  ItemComponent,
  fromTree,
  onChange,
}: Json) => {
  fromTree
    ? TreeUtils.transformTree(data, undefined)
    : TreeUtils.convertJSONtoTree(data, undefined);

  const treeMethods = useTreeHandler(data, onChange);

  return (
    <div className={`schema-editor ${ItemComponent ? "custom" : "default"}`}>
      <JsonTree
        data={data as ArrayItem[]}
        ItemComponent={ItemComponent}
        treeMethods={treeMethods}
      />
    </div>
  );
};
