import { GetAllTasks } from "@/lib/firebase/firebase";
import styles from "./alltasks.module.css";
import { useEffect, useState } from "react";
import TaskComponent from "./taskcomponent/taskcomponent";

export default function AllTasksComponent() {
  let [tasks, setTasks] = useState([]);
  let [reloadTime, setReloadTime] = useState(0);

  useEffect(
    () => {
      GetAllTasks().then(data => {
        setTasks(data);
        console.log(reloadTime);
      });
    },
    [reloadTime]
  );

  return (
    <div className={styles.container}>
      <h1>
        <button
          onClick={() => {
            setReloadTime(prev => prev + 1);
          }}
        >
          Összes Feladat
        </button>
      </h1>
      {tasks.length > 0
        ? tasks.map(task => {
            return <TaskComponent key={task.id} task={task} />;
          })
        : <h2>Nincs feladat</h2>}
    </div>
  );
}
