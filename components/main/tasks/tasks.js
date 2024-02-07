"use client";

import Link from "next/link";
import styles from "./tasks.module.css";
import { useAuthContext } from "@/context/AuthContext";

export default function Tasks(props) {
  let { classOfUser, tasks } = props;
  let { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <h1>Feladataid</h1>
      <div className={styles.tasks}>
        {tasks.map((task, index) => {
          return (
            <div key={index} className={styles.task}>
              <h3>
                {task.name}
              </h3>
              <p>
                {task.description}
              </p>
              <Link href={`/${user.uid}/${task.id}`} className={styles.details}>
                Részletek
              </Link>
              <Link href={task.linktotask} className={styles.linkToTask}>
                Letöltés
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom} />
    </div>
  );
}
