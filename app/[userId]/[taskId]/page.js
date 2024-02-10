"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { GetResultOfTask, GetTaskData, SetTaskDone } from "@/lib/firebase/firebase";

export default function TaskDetailPage() {
  let pathName = usePathname();
  let pathArray = pathName.split("/");
  let uid = pathArray[1];
  let taskId = pathArray[2];
  let [taskData, setTaskData] = useState({});
  let [result, setResult] = useState({});
  let [file, setFile] = useState(null);
  let router = useRouter();

  useEffect(() => {
    GetTaskData(taskId).then(data => {
      setTaskData(data);
    });

    GetResultOfTask(taskId, uid).then(data => {
      setResult(data);
    });
  }, []);

  function handleUpload(e) {
    e.preventDefault();
    SetTaskDone(taskId, uid).then(() => {
      router.push(`/${uid}/main`);
    })
  }

  console.log(result)

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.taskData}>
          <h1>
            {taskData.name}
          </h1>
          <p>
            {taskData.description}
          </p>
        </div>
        <div className={styles.result}>
          {result ? (<><div>
            <label>Jegy:</label>
            <p>
              {result.grade}
            </p>
          </div>
          <div>
            <label>Megjegyzés:</label>
            <p>
              {result.comment}
            </p>
          </div>
          <div>
            <label>Pontok</label>
            
            {result.tasks &&
              result.tasks.map((point, index) => {
                return (
                  <div key={index} className={styles.point}>
                    <p>{`${index + 1}. Feladat:`}</p>
                    <p>
                      {point}
                    </p>
                  </div>
                );
              })}
          </div></>) : (
          <form className={styles.uploadWrapper} onSubmit={handleUpload}>
            <label>Feladat megjelölése készként:</label>
            <button type="submit">Beküldés</button>
          </form>
          )}
          
        </div>
        <div className={styles.bottom}>
          <button
            onClick={() => {
              router.push(`/${uid}/main`);
            }}
          >
            Vissza
          </button>
        </div>
      </div>
    </div>
  );
}
