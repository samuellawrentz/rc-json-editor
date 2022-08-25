// Tree - A Recursive react component
// The Tree component that calls itself until its
// exhausted of objects in the tree
// Can be optimized and refactored a bit
import React, { useState } from "react";
import { JsonArray } from "./JsonArrayClass";

interface Props {
  data: JsonArray;
}

export const Tree = ({ data, ...props }: Props) => {
  return (
    <div className="group">
      {data.map((item, idx) => {
        return (
          <div key={item.path} className="child node-row">
            <span
              className="plus"
              onClick={(e) => {
                data.addSubNode(idx, { key: "value" });
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
            <span className="spacer"></span>
            {item.type === "object" ? (
              <>
                <input value={"Object"} disabled />
                <span onClick={() => data.deleteNode(idx)}>🗑</span>
                {/* Recursion */}
                <Tree data={item.value} {...props} />
              </>
            ) : (
              <>
                <input
                  value={item.value}
                  onChange={(e) => {
                    data.updateNode(idx, undefined, e.target.value);
                  }}
                />
                <span onClick={() => data.deleteNode(idx)}>🗑</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
