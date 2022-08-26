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
    this.state = { value: new JsonArray() };
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
        <Tree
          data={new JsonArray(this.props.data, "", this.setState.bind(this))}
        />
      </div>
    );
  }
}

export default JsonEditor;
