"use client";

import Tasks from "@/components/main/tasks/tasks";
import UserSettings from "@/components/main/usersettings/settings";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  GetClassOfUser,
  GetQuote,
  GetResultOfUserForTask,
  GetTasksOfClass
} from "@/lib/firebase/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { logOut } from "@/firebase/auth/sign";
import Loader from "@/components/loader/loader";

export default function MainPage() {
  let { user } = useAuthContext();
  let uid = user.uid;
  let [classOfUser, setClassOfUser] = useState("");
  let [tasks, setTasks] = useState([]);
  let [quotes, setQuotes] = useState([]);
  let [quotesFetched, setQuotesFetched] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [resultsOfUser, setResultsOfUser] = useState([]);

  useEffect(() => {
    GetClassOfUser(uid)
      .then(data => {
        setClassOfUser(data);
        GetTasksOfClass(data)
          .then(res => {
            setTasks(res);
            res.map(task => {
              GetResultOfUserForTask(uid, task.id)
                .then(data => {
                  if (data) {
                    setResultsOfUser(prev => [...prev, data]);
                  }
                })
                // .then(() => {
                //   setResultsOfUser(prev =>
                //     prev.splice(0, resultsOfUser.length / 2)
                //   );
                // })
                .catch(error => {
                  console.error(error);
                });
            });
            setIsLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });

    GetQuote()
      .then(data => {
        setQuotes(data);
        setQuotesFetched(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  let randomQuote = "";
  if (quotesFetched) {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    randomQuote = quotes[randomIndex];
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Kossuth Lajos azt üzente...</h1>
        <h4>
          Neked{" "}
          <span className={styles.red}>
            {tasks.length - resultsOfUser.length / 2}
          </span>{" "}
          feladatod van még hátra,{" "}
          <span className={styles.accent}>
            {resultsOfUser.filter(result => result.isChecked === true).length /
              2}
          </span>{" "}
          feladat vár javításra.
        </h4>
        <div className={styles.bottom}>
          <h3>
            {randomQuote}
          </h3>
          <button
            onClick={() => {
              logOut();
            }}
          >
            Kijelentkezés
          </button>
        </div>
      </div>
      <Tasks classOfUser={classOfUser} tasks={tasks} />
      <UserSettings />
    </div>
  );
}
