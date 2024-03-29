"use client";

import { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaCog, FaShareSquare } from "react-icons/fa";
type DataType = { [key: string]: any };

const defaultData: DataType = {};

function getQueryParamObject() {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    let queryParams: DataType = {};
    params.forEach((value, key) => {
      queryParams[key] = decodeURIComponent(value);
    });
    return queryParams;
  }
  return null;
}

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(() => getQueryParamObject() || defaultData);
  const [editValue, setEditValue] = useState(
    () => getQueryParamObject() || defaultData
  );

  // Update URL and state when data changes
  useEffect(() => {
    const params = new URLSearchParams();
    for (const key in data) {
      const encodedValue = encodeURIComponent(data[key]);
      params.set(key, encodedValue);
    }
    history.pushState({}, "", `?${params.toString()}`);
  }, [data]);

  const handleSave = () => {
    console.log({ editValue });
    setData(editValue);
    setIsEditing(false);
  };

  return (
    <div>
      <FaCog
        className="fixed top-4 right-4 text-white"
        onClick={() => setIsEditing(!isEditing)}
        style={{ cursor: "pointer", float: "right" }}
      />
      <button
        className="fixed bottom-3 right-3 p-1 text-white bg-slate-800/80"
        onClick={() => window.open(window.location.href, "_blank")}
      >
        <FaShareSquare className="w-4 text-white cursor-pointer" />
      </button>
      {(isEditing && (
        <>
          <textarea
            value={JSON.stringify(editValue)}
            onChange={(e) => {
              setEditValue(JSON.parse(e.target.value));
            }}
          />
          <button onClick={handleSave}>Save</button>
        </>
      )) ||
        ""}

      <div className="text-sm p-3 py-2">
        <SyntaxHighlighter language="json" style={dracula}>
          {JSON.stringify(data, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
