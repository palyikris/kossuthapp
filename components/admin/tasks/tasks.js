import { GetUserData } from "@/lib/firebase/firebase";
import styles from "./tasks.module.css";
import { useEffect, useState } from "react";

export default function TasksAdmin(props) {
  let { tasks } = props;
  let [userDatas, setUserDatas] = useState([]);
  let [userDataFetched, setUserDataFetched] = useState(false);

  useEffect(() => {
    tasks.forEach(async (task, index) => {
      let userData = await GetUserData(task.uid);
      setUserDatas(prev => [...prev, userData]);
      console.log(userData);
      if (index === tasks.length - 1) {
        setUserDataFetched(true);
      }
    });
  }, []);

  if (userDataFetched) {
    return (
      <div className={styles.container}>
        <h1>Beadások</h1>
        <div className={styles.tasks}>
          {tasks.map((task, index) => {
            return (
              <button key={index} className={styles.task}>
                <div className={styles.userData}>
                  <label>Kitől:</label>
                  <p>
                    {userDatas[index].name}
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
