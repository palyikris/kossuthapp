"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { CheckIfTaskIsClosed, GetResultOfTask, GetTaskData, SetTaskDone } from "@/lib/firebase/firebase";
import Spinner from './../../../components/cssspinner/spinner';

export default function TaskDetailPage() {
  let pathName = usePathname();
  let pathArray = pathName.split("/");
  let uid = pathArray[1];
  let taskId = pathArray[2];
  let [taskData, setTaskData] = useState({});
  let [result, setResult] = useState({});
  let router = useRouter();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    GetTaskData(taskId).then(data => {
      setTaskData(data);
    });

    GetResultOfTask(taskId, uid).then(data => {
      setResult(data);
      setLoading(false);
    });
  }, []);

  function handleUpload(e) {
    e.preventDefault();
    CheckIfTaskIsClosed(taskId).then(isClosed => {
      if (!isClosed) {
        SetTaskDone(taskId, uid).then(() => {
          GetResultOfTask(taskId, uid).then(data => {
            setResult(data);
          });
        });
      } else {
        alert("A feladat már le van lezárva!");
      }
    });
  }


  if(loading){
    return(
      <div className={styles.container}>
        <div className={styles.details}>
          <Spinner></Spinner>
        </div>
      </div>
    )
  }

  if(!taskData){
    return(
      <div className={styles.container}>
        <div className={styles.details}>
          <h1>404 - Nincs ilyen oldal te majom!</h1>
        </div>
      </div>
    )
  }

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
            {result.isChecked ? (<p>
              {result.grade}
            </p>) : (<p>Rajta vagyok diló!</p>)}
          </div>
          <div>
            <label>Megjegyzés:</label>
            {result.isChecked ? (<p>
              {result.comment}
            </p>) : (<p>Ne türelmetlenkedjél!!</p>)}
          </div>
          <div>
            <label>Pontok</label>
            {result.isChecked ? (<>{result.tasks &&
              result.tasks.map((point, index) => {
                return (
                  <div key={index} className={styles.point}>
                    <p>{`${index + 1}. Feladat:`}</p>
                    <p>
                      {point}
                    </p>
                  </div>
                );
              })}</>) : (<p>ÁLLJÁL LE!!!!</p>)}
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
