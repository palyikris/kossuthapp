"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { GetResultOfTask, GetTaskData } from "@/lib/firebase/firebase";

export default function TaskDetailPage() {
  let pathName = usePathname();
  let pathArray = pathName.split("/");
  let uid = pathArray[1];
  let taskId = pathArray[2];
  let [taskData, setTaskData] = useState({});
  let [result, setResult] = useState({});
  let router = useRouter();

  useEffect(() => {
    GetTaskData(taskId).then(data => {
      setTaskData(data);
    });

    GetResultOfTask(taskId, uid).then(data => {
      console.log(data);
      setResult(data);
    });
  }, []);

  console.log(result);

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
          <div>
            <label>Jegy:</label>
            <p>
              {result.result}
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
            {/* {result.points.forEach((point, index) => {
              return (
                <div key={index}>
                  <p>{`${index + 1}. Feladat:`}</p>
                  <p>
                    {point}
                  </p>
                </div>
              );
            })} */}
            {result.points &&
              result.points.map((point, index) => {
                return (
                  <div key={index} className={styles.point}>
                    <p>{`${index + 1}. Feladat:`}</p>
                    <p>
                      {point}
                    </p>
                  </div>
                );
              })}
          </div>
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
