// Tree - A Recursive react component
// The Tree component that calls itself until its
// exhausted of objects in the tree
// Can be optimized and refactored a bit
import React from "react";
import { ArrayItem } from "../interfaces";
import DefaultItemComponent from "./DefaultItemComponent";
import "./style.scss";
import { useTreeHandler } from "./useTreeHandler";

interface JsonEditorProps {
  data: ArrayItem[];
  ItemComponent?: React.ComponentType<any>;
}

export const JsonTree = ({ data, ItemComponent }: JsonEditorProps) => {
  const {
    updateSelection,
    updateNodeType,
    removeNode,
    addSubItem,
    addItem,
    updateKey,
    updateValue,
  } = useTreeHandler();
  return (
    <div className={`object`}>
      {data.map((item, idx: number) => {
        const rowProps = {
          siblings: data,
          updateSelection,
          updateNodeType,
          removeNode,
          updateKey,
          addSubItem,
          addItem,
          updateValue,
          item,
          idx,
        };
        const RowComponent = ItemComponent || DefaultItemComponent;
        return (
          <React.Fragment key={idx}>
            <div
              key={idx}
              className={`item ${item.sub_object.length ? "has-children" : ""}`}
            >
              <RowComponent {...rowProps} />

              {!!item.sub_object.length && (
                <JsonTree
                  data={item.sub_object}
                  ItemComponent={ItemComponent}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default JsonTree;
