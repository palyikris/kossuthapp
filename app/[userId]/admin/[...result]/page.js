"use client";

import {
  CheckIfResultIsCheckedById,
  GetResultIdByTaskAndUid,
  GetResultOfTask,
  UploadResult
} from "@/lib/firebase/firebase";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function UploadResultPage() {
  let pathName = usePathname().split("/");

  let taskId = pathName[3];
  let uid = pathName[4];
  let adminId = pathName[1];
  let [resultId, setResultId] = useState("");
  let [isNumberOfTasks, setIsNumberOfTasks] = useState(true);
  let [numberOfTasks, setNumberOfTasks] = useState(0);
  let [tasksData, setTasksData] = useState([]);
  let [grade, setGrade] = useState(0);
  let [comment, setComment] = useState("");
  let [isResultChecked, setIsResultChecked] = useState(false);
  let router = useRouter();

  useEffect(() => {
    GetResultIdByTaskAndUid(taskId, uid).then(response => {
      CheckIfResultIsCheckedById(response).then(isChecked => {
        if (isChecked) {
          setResultId(response);
          setIsResultChecked(true);
          GetResultOfTask(taskId, uid).then(response => {
            setGrade(response.grade);
            setComment(response.comment);
            setTasksData(response.tasks);
          });
        } else {
          setResultId(response);
        }
      });
    });
  }, []);

  let array = [];
  for (let i = 0; i < numberOfTasks; i++) {
    array.push(i);
  }

  function handleTaskInputChange(e, index) {
    let newTasksData = [...tasksData];
    newTasksData[index] = e.target.value;
    setTasksData(newTasksData);
  }

  function handleUpload() {
    let data = {
      grade: grade,
      comment: comment,
      tasks: tasksData,
      taskId: taskId,
      uid: uid,
      resultId: resultId
    };
    UploadResult(data).then(() => {
      router.push(`/${adminId}/admin`);
    });
  }

  if (isResultChecked) {
    return (
      <div className={styles.container}>
        <div className={styles.dataWrapper}>
          <h1>Eredmény már ki lett értékelve</h1>
          <div className={styles.results}>
            <div className={styles.result}>
              <label>Jegy:</label>
              <input
                type="text"
                value={grade}
                onChange={e => {
                  setGrade(e.target.value);
                }}
              />
            </div>
            <div className={styles.result}>
              <label>Megjegyzés:</label>
              <input
                type="text"
                value={comment}
                onChange={e => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <div className={styles.result}>
              {tasksData.map((task, index) => {
                return (
                  <div key={index} className={styles.task}>
                    <label>{`Feladat ${index + 1}:`}</label>
                    <input
                      type="text"
                      id={`task${index}`}
                      onChange={e => handleTaskInputChange(e, index)}
                      value={tasksData[index]}
                    />
                  </div>
                );
              })}
            </div>
            <button type="button" onClick={handleUpload}>
              Módosítás
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isNumberOfTasks
        ? <div className={styles.dataWrapper}>
            <div>
              <label htmlFor="tasks">Feladatok száma:</label>
              <input
                type="number"
                min={0}
                onChange={e => {
                  setNumberOfTasks(e.target.value);
                }}
                value={numberOfTasks}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  setIsNumberOfTasks(false);
                }}
              >
                Nyomod
              </button>
            </div>
          </div>
        : <div className={styles.dataWrapper}>
            <div>
              <label htmlFor="grade">Jegy:</label>
              <input
                type="number"
                onChange={e => {
                  setGrade(e.target.value);
                }}
                value={grade}
              />
            </div>
            <div style={{ marginBottom: "3rem" }}>
              <label htmlFor="comment">Megjegyzés:</label>
              <input
                type="text"
                onChange={e => {
                  setComment(e.target.value);
                }}
                value={comment}
              />
            </div>
            <div>
              {numberOfTasks > 0
                ? <div>
                    {array.map((e, i) => {
                      return (
                        <div key={i}>
                          <label htmlFor={`task${i}`}>
                            Feladat {i + 1}:
                          </label>
                          <input
                            type="text"
                            id={`task${i}`}
                            onChange={e => handleTaskInputChange(e, i)}
                            value={tasksData[i]}
                          />
                        </div>
                      );
                    })}
                  </div>
                : <div />}
            </div>
            <div>
              <button onClick={handleUpload}>Nyomod</button>
            </div>
          </div>}
    </div>
  );
}
