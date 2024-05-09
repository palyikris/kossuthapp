"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  GetClasses,
  GetResultsByTaskId,
  GetResultsWithNamesByTaskId,
  GetTasksOfClass
} from "@/lib/firebase/firebase";
import TasksAdmin from "@/components/admin/tasks/tasks";
import NewTaskAdderComponent from "@/components/admin/newtask/newtask";
import { logOut } from "@/firebase/auth/sign";
import AllTasksComponent from "@/components/admin/alltasks/alltasks";

export default function AdminPage() {
  let [classes, setClasses] = useState([]);
  let [chosenClass, setChosenClass] = useState("");
  let [tasksToChoose, setTasksToChoose] = useState([]);
  let [chosenTask, setChosenTask] = useState("");
  let [isAll, setIsAll] = useState(true);
  let [isChecked, setIsChecked] = useState(false);
  let [isNotChecked, setIsNotChecked] = useState(false);
  let [isTasksDisplayed, setIsTasksDisplayed] = useState(false);
  let [tasks, setTasks] = useState([]);

  useEffect(
    () => {
      if (classes.length === 0) {
        GetClasses().then(response => {
          setClasses(response);
        });
      }

      if (chosenClass) {
        GetTasksOfClass(chosenClass).then(response => {
          setTasksToChoose(response);
        });
      }
    },
    [chosenClass, chosenTask, isAll, isChecked, isNotChecked]
  );

  function handleTasks(e) {
    e.preventDefault();
    GetResultsWithNamesByTaskId(chosenTask).then(response => {
      let tasks = response;

      if (isAll) {
        let filteredTasks = tasks.filter(task => task.taskId === chosenTask);
        setTasks(filteredTasks);
      }

      if (isChecked) {
        let checkedTasks = tasks.filter(
          task => task.isChecked === true && task.taskId === chosenTask
        );
        setTasks(checkedTasks);
      }

      if (isNotChecked) {
        let checkedTasks = tasks.filter(
          task => task.isChecked === false && task.taskId === chosenTask
        );
        setTasks(checkedTasks);
      }

      setIsTasksDisplayed(true);
    });
  }

  return (
    <div className={styles.container}>
      <h1>Admin Page</h1>
      <div className={styles.logoutWrapper}>
        <button
          onClick={() => {
            logOut();
          }}
          className={styles.logout}
        >
          Kijelentkezés
        </button>
      </div>
      <div className={styles.filterWrapper}>
        <div className={styles.filter}>
          <label htmlFor="classes">Osztály és Feladat</label>
          <select
            name="classes"
            id="classes"
            onChange={e => {
              setChosenClass(e.target.value);
            }}
            value={chosenClass}
          >
            <option value="">Válassz osztályt</option>
            {classes
              ? classes.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })
              : <option value="none">Nincs osztály</option>}
          </select>
          <select
            name="tasks"
            id="tasks"
            onChange={e => {
              setChosenTask(e.target.value);
            }}
            value={chosenTask}
          >
            <option value="">Válassz feladatot</option>
            {tasksToChoose
              ? tasksToChoose.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })
              : <option value="none">Nincs feladat</option>}
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor="checked">Ellenőrizve</label>
          <div className={styles.buttons}>
            {isAll
              ? <button className={styles.selected}>Összes</button>
              : <button
                  onClick={() => {
                    setIsAll(true);
                    setIsChecked(false);
                    setIsNotChecked(false);
                  }}
                >
                  Összes
                </button>}
            {isChecked
              ? <button className={styles.selected}>Csak Ellenőrzöttek</button>
              : <button
                  onClick={() => {
                    setIsAll(false);
                    setIsChecked(true);
                    setIsNotChecked(false);
                  }}
                >
                  Csak Ellenőrzöttek
                </button>}
            {isNotChecked
              ? <button className={styles.selected}>
                  Csak Nem Ellenőrzöttek
                </button>
              : <button
                  onClick={() => {
                    setIsAll(false);
                    setIsChecked(false);
                    setIsNotChecked(true);
                  }}
                >
                  Csak Nem Ellenőrzöttek
                </button>}
          </div>
        </div>
        <div className={styles.filter} />
        <div className={styles.buttonWrapper}>
          <button onClick={handleTasks}>Nyomod</button>
        </div>
      </div>

      {isTasksDisplayed ? <TasksAdmin tasks={tasks} /> : <div />}

      <NewTaskAdderComponent />
      <AllTasksComponent />
    </div>
  );
}
