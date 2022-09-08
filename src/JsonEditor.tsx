import React, { useState } from "react";
import { Json } from "./interfaces";
import { JsonArray } from "./JsonArrayClass";
import { Tree } from "./Tree";
import "./style.scss";

// Component that acts as a state adapter
// Handles interactions between the tree and the parent component

interface State {
  value: JsonArray;
}

interface Props {
  data: Json;
  onChange?: (state: JsonArray) => void;
  hasSelection?: boolean;
}
export class JsonEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // We require state for refreshing the component on data update
    const treeData = [
      {
        key: "contact",
        data_type: "object",
        selected: true,
        sub_object: [
          {
            key: "id",
            data_type: "number",
            selected: true,
            sub_object: [],
          },
        ],
      },
    ];
    const jArray = JsonArray.transformTree(
      treeData,
      new JsonArray({}, undefined, undefined, this.setState.bind(this))
    );
    this.state = {
      value: jArray,
    };
  }
  componentDidUpdate(_: Props, pState: State) {
    if (this.state !== pState) this.props.onChange?.(this.state.value);
  }
  render() {
    return (
      <div
        className={`react-json-tree ${
          this.props.hasSelection ? "has-selection" : ""
        }`}
      >
        <Tree data={this.state.value} />
      </div>
    );
  }
}

export default JsonEditor;
