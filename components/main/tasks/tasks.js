"use client";

import Link from "next/link";
import styles from "./tasks.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { GetResultOfTask } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Tasks(props) {
  let { classOfUser, tasks } = props;
  let { user } = useAuthContext();
  let [resultsofTasks, setResultsofTasks] = useState([]);
  let router = useRouter();

  function checkIfTaskIdIsInResults(taskId) {
    let hasResult = false;
    resultsofTasks.map(result => {
      if (result) {
        if (result.taskId === taskId) {
          hasResult = true;
        }
      }
    });
    return hasResult;
  }

  function checkIfTaskIsChecked(taskId) {
    let isChecked = false;
    resultsofTasks.map(result => {
      if (result) {
        if (result.taskId === taskId) {
          isChecked = result.isChecked;
        }
      }
    });
    return isChecked;
  }

  useEffect(
    () => {
      tasks.map(task => {
        GetResultOfTask(task.id, user.uid).then(data => {
          setResultsofTasks(prev => [...prev, data]);
        });
      });
    },
    [tasks]
  );

  return (
    <div className={styles.container}>
      <h1>Feladataid</h1>
      <div className={styles.tasks}>
        {tasks.map((task, index) => {
          let isTaskDone = checkIfTaskIdIsInResults(task.id);
          let isTaskChecked = checkIfTaskIsChecked(task.id);

          if (task.closed) {
            return (
              <div key={index} className={styles.taskClosed}>
                <h3>
                  {task.name}
                </h3>
                <p>
                  {task.description}
                </p>
                <p className={styles.details}>Lezárva...</p>
                {/* <Link href={task.linktotask} className={styles.linkToTask}>
                  Letöltés
                </Link> */}
              </div>
            );
          }

          if (isTaskChecked) {
            return (
              <div key={index} className={styles.taskChecked}>
                <h3>
                  {task.name}
                </h3>
                <p>
                  {task.description}
                </p>
                <Link
                  href={`/${user.uid}/${task.id}`}
                  className={styles.details}
                >
                  Részletek
                </Link>
                {/* <Link href={task.linktotask} className={styles.linkToTask}>
                  Letöltés
                </Link> */}
                <p style={{ margin: "0" }}>Kész van!</p>
              </div>
            );
          }

          if (isTaskDone) {
            return (
              <div key={index} className={styles.taskDone}>
                <h3>
                  {task.name}
                </h3>
                <p>
                  {task.description}
                </p>
                <Link
                  href={`/${user.uid}/${task.id}`}
                  className={styles.details}
                >
                  Részletek
                </Link>
                {/* <Link href={task.linktotask} className={styles.linkToTask}>
                  Letöltés
                </Link> */}
                <p style={{ margin: "0" }}>Javítás alatt...</p>
              </div>
            );
          }

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
