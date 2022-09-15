import React from "react";
import { ArrayItem } from "../interfaces";

interface Props {
  item: ArrayItem;
  dataRef: ArrayItem[];
  idx: number;
  updateSelection: (dataRef: ArrayItem, checked: boolean) => void;
  addSubItem: (dataRef: ArrayItem[], idx: number) => void;
  updateNodeType: (dataRef: ArrayItem, value: string) => void;
  removeNode: (dataRef: ArrayItem[], idx: number) => void;
}

function DefaultItemComponent({
  item,
  dataRef,
  idx,
  updateSelection,
  addSubItem,
  updateNodeType,
  removeNode,
}: Props) {
  return (
    <>
      <div
        className="checkbox"
        style={{ transform: `translateX(-${32 * item.level}px)` }}
      >
        <input
          type="checkbox"
          checked={item.selected}
          onChange={(e) => updateSelection(dataRef?.[idx], e.target.checked)}
        />
      </div>
      <div className="add" onClick={() => addSubItem(dataRef, idx)}>
        +
      </div>
      <div className="key">
        <input defaultValue={item.key} />
      </div>
      <div className="type">
        <select
          value={item.display_format}
          style={{ width: 180 }}
          onChange={(e) => {
            updateNodeType(item, e.target.value);
          }}
        >
          <option value="array">Array</option>
          <option value="string">String</option>
          <option value="object">Object</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>
      <div
        className="remove"
        onClick={() => {
          removeNode(dataRef, idx);
        }}
      >
        ➖
      </div>
    </>
  );
}

export default DefaultItemComponent;
