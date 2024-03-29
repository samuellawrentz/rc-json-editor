import React from "react";
import { ArrayItem } from "../interfaces";

interface Props {
  item: ArrayItem;
  siblings: ArrayItem[];
  idx: number;
  updateSelection: (siblings: ArrayItem, checked: boolean) => void;
  addSubItem: (siblings: ArrayItem[], idx: number) => void;
  updateNodeType: (siblings: ArrayItem, value: string) => void;
  removeNode: (siblings: ArrayItem[], idx: number) => void;
  updateKey: (item: ArrayItem, key: string) => void;
  updateValue?: (item: ArrayItem, response_value: string) => void;
}

function DefaultItemComponent({
  item,
  siblings,
  idx,
  updateSelection,
  addSubItem,
  updateNodeType,
  removeNode,
  updateKey,
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
          onChange={(e) => updateSelection(siblings?.[idx], e.target.checked)}
        />
      </div>
      <div className="add" onClick={() => addSubItem(siblings, idx)}>
        +
      </div>
      <div className="key">
        <input
          value={item.key}
          onChange={(e) => updateKey(item, e.target.value)}
        />
      </div>
      <div className="type">
        <select
          value={item.data_type}
          style={{ width: 180 }}
          onChange={(e) => {
            updateNodeType(item, e.target.value);
          }}
        >
          <option value="list">Array</option>
          <option value="list of strings">Array of Strings</option>
          <option value="list of numbers">Array of Numbers</option>
          <option value="list of booleans">Array of Booleans</option>
          <option value="static list">Static List</option>
          <option value="string">String</option>
          <option value="object">Object</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>
      <div
        className="remove"
        onClick={() => {
          removeNode(siblings, idx);
        }}
      >
        ➖
      </div>
    </>
  );
}

export default DefaultItemComponent;
