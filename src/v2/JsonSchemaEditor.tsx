import React, { useRef, useState } from "react";
import { ArrayItem, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";
import JsonEditor from "./Tree";
import DefaultItemComponent from "./DefaultItemComponent";

export const EContext = React.createContext({} as any);

function JsonSchemaEditor({ data }: Json) {
  const [treeData, setTreeData] = useState(
    TreeUtils.convertJSONtoTree(data, undefined)
  );
  const mainDataRef = useRef(treeData);
  mainDataRef.current = treeData;

  if (!treeData) return null;

  // Move to props
  const handleChange = (e: any) => {
    console.log(e.target);
  };

  return (
    <EContext.Provider
      value={{
        stateUpdater: setTreeData,
        mainDataRef,
      }}
    >
      <div className="schema-editor">
        <form noValidate onChange={handleChange}>
          <JsonEditor
            data={treeData as ArrayItem[]}
            dataRef={mainDataRef.current as ArrayItem[]}
            ItemComponent={DefaultItemComponent}
          />
        </form>
      </div>
    </EContext.Provider>
  );
}

export default JsonSchemaEditor;
