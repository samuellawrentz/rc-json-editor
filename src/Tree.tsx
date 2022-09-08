// Tree - A Recursive react component
// The Tree component that calls itself until its
// exhausted of objects in the tree
// Can be optimized and refactored a bit
import React from "react";
import { JsonArray } from "./JsonArrayClass";

interface Props {
  data: JsonArray;
}

export const Tree = ({ data, ...props }: Props) => {
  return (
    <div className="group">
      {!!data?.length &&
        data.map((item, idx) => {
          const isObject = item.type === "object" || item.type === "array";
          return (
            <div key={item.path} className="child node-row">
              <div className="row-items">
                <span
                  className="checkbox"
                  style={{
                    transform: `translate(-${item.level * 32 + 32}px, 2px)`,
                  }}
                >
                  <input
                    type={"checkbox"}
                    checked={item.selected}
                    onChange={(e) =>
                      data.updateSelection(idx, e.target.checked)
                    }
                  />
                </span>
                <span
                  className="plus"
                  onClick={(e) => {
                    data.addSubNode(idx, data[idx].selected);
                  }}
                >
                  {"➕"}
                </span>
                <input
                  value={item.key}
                  onChange={(e) => {
                    data.updateNode(idx, e.target.value);
                  }}
                />
                <select
                  value={item.type}
                  style={{ width: 180 }}
                  onChange={(e) => {
                    data.updateNodeType(idx, e.target.value);
                  }}
                >
                  <option value="array">Array</option>
                  <option value="string">String</option>
                  <option value="object">Object</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
                <span onClick={() => data.deleteNode(idx)}>🗑</span>
              </div>
              {isObject && <Tree data={item.value} {...props} />}
            </div>
          );
        })}
    </div>
  );
};
