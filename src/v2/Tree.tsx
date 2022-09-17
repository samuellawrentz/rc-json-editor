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
  dataRef: ArrayItem[];
  ItemComponent?: React.ComponentType<any>;
}

export const JsonTree = ({ data, dataRef, ItemComponent }: JsonEditorProps) => {
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
          updateSelection,
          updateNodeType,
          removeNode,
          updateKey,
          addSubItem,
          addItem,
          updateValue,
          item,
          dataRef,
          idx,
        };
        return (
          <React.Fragment key={idx}>
            <div
              key={idx}
              className={`item ${item.sub_object.length ? "has-children" : ""}`}
            >
              {ItemComponent ? (
                <ItemComponent {...rowProps} />
              ) : (
                <DefaultItemComponent {...rowProps} />
              )}
              {!!item.sub_object.length && (
                <JsonTree
                  data={item.sub_object}
                  dataRef={dataRef?.[idx].sub_object}
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
