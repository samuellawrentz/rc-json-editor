import React, { useState } from 'react'
import { Json } from './interfaces';
import { JsonArray } from './JsonArrayClass';
import { Tree } from './Tree';

// Component that acts as a state adapter
// Handles interactions between the tree and the parent component

interface State {
  value: JsonArray | never []
}

interface Props {
  data: Json,
  onChange: (state: JsonArray | never []) => void
}
export class TreeWrapper extends React.Component<Props, State> {
  jsonTree: JsonArray
  constructor(props: Props) {
    super(props);
    this.jsonTree = new JsonArray(props.data, "", this.setState.bind(this));
    this.state = {
      value: []
    };
  }
  componentDidUpdate(_: any, pState: State) {
    if (this.state !== pState) this.props.onChange(this.state.value);
  }
  render() {
    return (
      <div className="json-tree">
        <Tree data={this.jsonTree} />
      </div>
    );
  }
}

export default TreeWrapper