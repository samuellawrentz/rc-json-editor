import React, { useState } from "react";
import { Json } from "./interfaces";
import { JsonArray } from "./JsonArrayClass";
import { Tree } from "./Tree";
import "./style.scss";

// Component that acts as a state adapter
// Handles interactions between the tree and the parent component

interface State {
  value: JsonArray | never[];
}

interface Props {
  data: Json;
  onChange?: (state: JsonArray | never[]) => void;
  hasSelection?: boolean;
}
export class JsonTree extends React.Component<Props, State> {
  jsonTree: JsonArray;
  constructor(props: Props) {
    super(props);
    this.jsonTree = new JsonArray(props.data, "", this.setState.bind(this));
    this.state = {
      value: [],
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
        <Tree data={this.jsonTree} />
      </div>
    );
  }
}

export default JsonTree;
