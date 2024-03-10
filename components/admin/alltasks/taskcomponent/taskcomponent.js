"use client";

import {
  DeleteTasksAndAllResultsByTaskId,
  SetTaskClosed,
  SetTaskOpen
} from "@/lib/firebase/firebase";
import styles from "./taskcomponent.module.css";
import { useRouter } from "next/navigation";

export default function TaskComponent(props) {
  let { task } = props;
  let router = useRouter();

  return (
    <div className={styles.task}>
      <h2>
        {task.name}
      </h2>
      <p>
        {task.description}
      </p>
      <h5>
        {task.class}
      </h5>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            DeleteTasksAndAllResultsByTaskId(task.id);
            router.refresh();
          }}
        >
          Törlés
        </button>
        {task.closed
          ? <button
              onClick={() => {
                SetTaskOpen(task.id);
              }}
            >
              Megnyitás
            </button>
          : <button
              onClick={() => {
                SetTaskClosed(task.id);
              }}
            >
              Lezárás
            </button>}
      </div>
    </div>
  );
}
