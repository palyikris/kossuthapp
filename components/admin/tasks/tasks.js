"use client";

import { GetUserData } from "@/lib/firebase/firebase";
import styles from "./tasks.module.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function TasksAdmin(props) {
  let { tasks } = props;
  let [userDatas, setUserDatas] = useState([]);
  let [userDataFetched, setUserDataFetched] = useState(false);
  let router = useRouter();
  let pathname = usePathname().split("/");
  let currId = pathname[1];

  useEffect(() => {
    setUserDataFetched(true);
  }, []);

  if (userDataFetched) {
    return (
      <div className={styles.container}>
        <h1>Beadások</h1>
        <div className={styles.tasks}>
          {tasks.map((task, index) => {
            return (
              <button
                key={index}
                className={styles.task}
                onClick={() => {
                  router.push(`/${currId}/admin/${task.taskId}/${task.uid}`);
                }}
              >
                <div className={styles.userData}>
                  <label>Kitől:</label>
                  <p>
                    {task.name}
                  </p>
                </div>
                <div className={styles.userData}>
                  <label>Osztály:</label>
                  <p>
                    {task.userClass}
                  </p>
                </div>
                <div className={styles.userData}>
                  <label>Jegy:</label>
                  <p>
                    {task.grade}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h1>Beadások</h1>
        <div className={styles.tasks}>
          <h2>Nincs találat!</h2>
        </div>
      </div>
    );
  }
}
