import React, { useState } from "react";
import { JsonArray } from "../JsonArrayClass";
import JsonEditor from "../JsonEditor";
import { debounce } from "./utils";

function Demo() {
  const [json, setJson] = useState({
    a: 1,
    b: 2,
  });
  return (
    <div
      style={{
        margin: "32px 0",
        padding: "32px",
        paddingLeft: 48,
        display: "flex",
        border: "1px solid #d1d1d1",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div>
        <JsonEditor
          data={json}
          onChange={(data) => setJson(JsonArray.convertToJSON(data))}
        />
      </div>
      <div
        style={{
          backgroundColor: "#eafbff",
          flex: "auto",
        }}
      >
        <textarea
          rows={10}
          value={JSON.stringify(json, null, 2)}
          style={{
            width: "calc(100% - 32px)",
            height: "100%",
            border: 0,
            background: "transparent",
            padding: 16,
            fontSize: 16,
            lineHeight: "20px",
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default Demo;
