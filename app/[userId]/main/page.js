"use client";

import Tasks from "@/components/main/tasks/tasks";
import UserSettings from "@/components/main/usersettings/settings";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  GetClassOfUser,
  GetQuote,
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

  useEffect(() => {
    GetClassOfUser(uid)
      .then(data => {
        setClassOfUser(data);
        GetTasksOfClass(data)
          .then(res => {
            setTasks(res);
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

  let text = `Neked összesen ${tasks.length} feladatod volt`;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Kossuth Lajos azt üzente...</h1>
        <h4>
          {text}
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
