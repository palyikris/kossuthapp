"use client";

import { useAuthContext } from "@/context/AuthContext";
import { GetClasses, GetUserData, SetUserData } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import styles from "./settings.module.css";

export default function UserSettings() {
  let [classes, setClasses] = useState([]);
  let [fullname, setFullname] = useState("");
  let [selectedClass, setSelectedClass] = useState("");
  let { user } = useAuthContext();
  let uid = user.uid;

  useEffect(() => {
    GetClasses().then(response => {
      setClasses(response);

      GetUserData(uid).then(data => {
        setFullname(data.fullname);
        setSelectedClass(data.class);
      });
    });
  }, []);

  function handleMutation(e) {
    e.preventDefault();
    SetUserData(uid, fullname, selectedClass).then(() => {});
  }

  return (
    <div className={styles.container}>
      <h1>Felhasználói beállítások</h1>
      <form autoComplete="off" onSubmit={handleMutation}>
        <div className={styles.data}>
          <p>Teljes név</p>
          <input
            type="text"
            placeholder="Teljes neved..."
            required
            onChange={e => {
              setFullname(e.target.value);
            }}
            value={fullname}
          />
        </div>
        <div className={styles.data}>
          <p>Osztály</p>
          <select
            name="classes"
            id="classes"
            onChange={e => {
              setSelectedClass(e.target.value);
            }}
            value={selectedClass}
          >
            <option value="">Válassz osztályt</option>
            {classes.map((myclass, i) => {
              return (
                <option key={i} value={myclass}>
                  {myclass}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit">Módosítás</button>
        </div>
      </form>
    </div>
  );
}
