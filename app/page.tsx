"use client";

import { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaCog } from "react-icons/fa";

const defaultData = {
  name: "John Doe",
  age: 25,
  email: "email@example.com",
};

export default function Home() {
  const [data, setData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // On component mount, get data from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("value");
    if (value) {
      setData(JSON.parse(decodeURIComponent(value)));
      setEditValue(decodeURIComponent(value));
    }
  }, []);

  // Update URL and state when data changes
  useEffect(() => {
    const encodedValue = encodeURIComponent(JSON.stringify(data));
    const params = new URLSearchParams();
    params.set("value", encodedValue);
    history.pushState({}, "", `?${params.toString()}`);
  }, [data]);

  const handleSave = () => {
    setData(JSON.parse(editValue));
    setIsEditing(false);
  };

  return (
    <div>
      <FaCog
        onClick={() => setIsEditing(!isEditing)}
        style={{ cursor: "pointer", float: "right" }}
      />
      {(isEditing && (
        <>
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      )) ||
        ""}

      <div className="text-sm">
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          showLineNumbers
        >
          {JSON.stringify(data, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
