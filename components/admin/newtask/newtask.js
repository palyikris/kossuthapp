"use client";

import { useEffect, useState } from "react";
import styles from "./newtask.module.css";
import { GetClasses, AddTask } from "@/lib/firebase/firebase";

export default function NewTaskAdderComponent() {
  let [classes, setClasses] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [link, setLink] = useState("");
  let [classData, setClassData] = useState("");

  useEffect(() => {
    GetClasses().then(response => {
      setClasses(response);
    });
  }, []);

  function handleTaskUpload(e) {
    e.preventDefault();
    let data = {
      name: name,
      description: description,
      linktotask: link,
      myclass: classData
    };
    AddTask(data).then(() => {
      setName("");
      setDescription("");
      setLink("");
      setClassData("");
    });
  }

  return (
    <div className={styles.container}>
      <h1>Új feladat</h1>

      <form className={styles.newTaskWrapper} onSubmit={handleTaskUpload}>
        <div className={styles.data}>
          <label htmlFor="name">Feladat neve:</label>
          <input
            type="text"
            id="name"
            onChange={e => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="description">Leírás:</label>
          <input
            id="description"
            type="text"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            onChange={e => {
              setLink(e.target.value);
            }}
            value={link}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="class">Osztály:</label>
          <select
            name="class"
            id="class"
            onChange={e => {
              setClassData(e.target.value);
            }}
            value={classData}
          >
            <option value="">Válassz osztályt</option>
            {classes.map((classData, index) => {
              return (
                <option key={index} value={classData}>
                  {classData}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.data}>
          <button>Feltöltés</button>
        </div>
      </form>
    </div>
  );
}
