import React, { useState } from "react";

const Notes: React.FC = () => {
  const [note, setNote] = useState<string>("");

  return (
    <div>
      <h1>Notes</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Take a quick note..."
      ></textarea>
    </div>
  );
};

export default Notes;
