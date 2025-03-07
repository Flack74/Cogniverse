import React, { useState } from "react";

interface Task {
  user: string;
  task: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { user: "Flack", task: "Finish coding project" },
  ]);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t.user}: {t.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
