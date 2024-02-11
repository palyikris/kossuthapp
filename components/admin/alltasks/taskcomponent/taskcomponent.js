"use client";

import { DeleteTasksAndAllResultsByTaskId } from "@/lib/firebase/firebase";
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
      <button
        onClick={() => {
          DeleteTasksAndAllResultsByTaskId(task.id);
          router.refresh();
        }}
      >
        Törlés
      </button>
    </div>
  );
}
