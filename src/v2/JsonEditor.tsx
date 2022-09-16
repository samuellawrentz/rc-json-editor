import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ArrayItem, Json } from "../interfaces";
import { TreeUtils } from "./TreeUtils";
import JsonTree from "./Tree";
import { TreeContext } from "./TreeContext";

export const JsonEditor = forwardRef(function JsonEditor(
  { data, ItemComponent }: Json,
  ref
) {
  if (!data) return null;
  const [treeData, setTreeData] = useState(
    TreeUtils.convertJSONtoTree(data, undefined)
  );
  const mainDataRef = useRef(treeData);

  useEffect(() => {
    const newData = TreeUtils.convertJSONtoTree(data, undefined);
    setTreeData(newData);
    mainDataRef.current = newData;
  }, [data]);

  useImperativeHandle(
    ref,
    () => ({
      getJson: () => TreeUtils.convertTreetoJSON(mainDataRef.current),
      getTree: () => mainDataRef.current,
    }),
    []
  );

  if (!treeData) return null;

  return (
    <TreeContext.Provider
      value={{
        stateUpdater: setTreeData,
        mainDataRef,
      }}
    >
      <div className={`schema-editor ${ItemComponent ? "custom" : "default"}`}>
        <form noValidate>
          <JsonTree
            data={treeData as ArrayItem[]}
            dataRef={mainDataRef.current as ArrayItem[]}
            ItemComponent={ItemComponent}
          />
        </form>
      </div>
    </TreeContext.Provider>
  );
});
