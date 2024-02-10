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
    tasks.forEach(async (task, index) => {
      let userData = await GetUserData(task.uid);
      setUserDatas(prev => [...prev, userData]);
      if (index === tasks.length - 1) {
        setUserDataFetched(true);
      }
    });
  }, []);

  if (userDataFetched) {
    console.log(tasks);
    console.log(userDatas);
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
                    {userDatas[index].fullname}
                  </p>
                </div>
                <div className={styles.userData}>
                  <label>Osztály:</label>
                  <p>
                    {userDatas[index].class}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
