import { GetAllTasks } from "@/lib/firebase/firebase";
import styles from "./alltasks.module.css";
import { useEffect, useState } from "react";
import TaskComponent from "./taskcomponent/taskcomponent";

export default function AllTasksComponent() {
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    GetAllTasks().then(data => {
      setTasks(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Összes Feladat</h1>
      <div className={styles.tasks}>
        {tasks.map((task, index) => {
          return <TaskComponent task={task} key={index} />;
        })}
      </div>
    </div>
  );
}
