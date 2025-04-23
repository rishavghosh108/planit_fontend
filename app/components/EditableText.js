"use client";

import { useState, useEffect, useRef } from "react";

export default function EditableText({ id, defaultText, className }) {
  const [text, setText] = useState(defaultText);
  const [editing, setEditing] = useState(false);
  const textRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const savedText = localStorage.getItem(id)
;
    if (savedText) setText(savedText);
  }, [id]);

  useEffect(() => {
    if (editing && textareaRef.current && textRef.current) {
      // Copy size and position
      const { offsetWidth, offsetHeight } = textRef.current;
      textareaRef.current.style.width = `${offsetWidth}px`;
      textareaRef.current.style.height = `${offsetHeight}px`;

      // Auto adjust height for content
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    localStorage.setItem(id, text);
  };

  return (
    <div className="relative w-full">
      <p
        ref={textRef}
        className={`${className} whitespace-pre-line`}
        onClick={() => setEditing(true)}
        style={{ visibility: editing ? "hidden" : "visible" }}
      >
        {text}
      </p>

      {editing && (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          className={`${className} text-center absolute top-0 left-0 w-full h-full bg-transparent resize-none focus:outline-none whitespace-pre-line`}
          style={{
            lineHeight: getComputedStyle(textRef.current)?.lineHeight || "1.5",
            overflow: "hidden",
          }}
        />
      )}
    </div>
  );
}