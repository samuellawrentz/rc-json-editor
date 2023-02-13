// Tree - A Recursive react component
// The Tree component that calls itself until its
// exhausted of objects in the tree
// Can be optimized and refactored a bit
import React, { useMemo } from "react";
import { ArrayItem, DataTypes, TreeMethods } from "../interfaces";
import DefaultItemComponent from "./DefaultItemComponent";
import "./style.scss";

interface JsonEditorProps {
  data: ArrayItem[];
  ItemComponent?: React.ComponentType<any>;
  treeMethods: TreeMethods;
}

export const JsonTree = ({
  data,
  ItemComponent,
  treeMethods,
}: JsonEditorProps) => {
  return (
    <div className={`object`}>
      {data.map((item, idx: number) => {
        const rowProps = {
          siblings: data,
          item,
          idx,
          ...treeMethods,
        };

        const RowComponent = useMemo(() => {
          return ItemComponent || DefaultItemComponent;
        }, []);

        return (
          <div
            key={item.data_type}
            className={`item ${item.sub_object?.length ? "has-children" : ""} ${
              item.parent?.data_type === DataTypes.staticList
                ? "static-list-item"
                : ""
            }`}
          >
            <RowComponent {...rowProps} />

            {!!item.sub_object?.length && (
              <JsonTree
                data={item.sub_object}
                ItemComponent={ItemComponent}
                treeMethods={treeMethods}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JsonTree;
