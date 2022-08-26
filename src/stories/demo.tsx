import React, { useEffect, useState } from "react";
import { JsonArray } from "../JsonArrayClass";
import JsonEditor from "../JsonEditor";
import { debounce } from "./utils";

function Demo() {
  const [err, setE] = useState("");
  const [json, setJson] = useState({
    order_details: {
      id: "iowoiu-123iu123oi",
      // type: "product",
      amount: "13200",
      time: "12:00:00",
    },
    order_dispatched: false,
    // customer_info: {
    //   name: "Jane Doe",
    //   email: "jane@doe.com",
    //   join_date: "12-12-12",
    // },
  });

  useEffect(() => {
    setE("");
  }, [json]);

  console.log(json);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    try {
      const pJson = JSON.parse(e.target?.value);
      setJson(pJson);
    } catch (e: any) {
      setE("Invalid JSON: " + e.message);
    }
  };

  const dValue = JSON.stringify(json, null, 2);
  return (
    <div
      style={{
        margin: "32px 0",
        padding: "32px",
        paddingLeft: 48,
        display: "flex",
        border: "1px solid #d1d1d1",
        flexDirection: "column",
        position: "relative",
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
          value={dValue}
          onChange={handleChange}
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
      <span
        style={{
          position: "absolute",
          bottom: 12,
          fontSize: 12,
          color: "#e80a0a",
        }}
      >
        {err}
      </span>
    </div>
  );
}

export default Demo;
