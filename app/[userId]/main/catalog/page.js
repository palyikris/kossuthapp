"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { usePathname, useRouter } from "next/navigation";
import { GetUserNameById, LogStudentToCatalog } from "@/lib/firebase/firebase";

export default function CatalogPage() {
  let [code, setCode] = useState("");
  let [loading, setLoading] = useState(false);
  let [hasBeenLogged, setHasBeenLogged] = useState(false);
  let [wasLoggingSuccessful, setWasLoggingSuccessful] = useState(false);
  let [userName, setUserName] = useState("");
  let path = usePathname();
  let router = useRouter();
  let userId = path.split("/")[1];

  function handleUserCatalog() {
    setLoading(true);
    GetUserNameById(userId).then(name => {
      setUserName(name);
      fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
          console.log(data.ip);
          LogStudentToCatalog(code, userId, name, data.ip).then(response => {
            setWasLoggingSuccessful(response);
            setHasBeenLogged(true);
            setLoading(false);
          });
        })
        .catch(error => console.error("Error:", error));
    });
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.flag}>
          <div className={styles.red}>
            <h3>Katalógus</h3>
          </div>
          <div className={styles.white}>
            <p>Logollak broski nyugi...</p>
          </div>
          <div className={styles.green}>
            <button disabled>Nyomod</button>
          </div>
        </div>
      </div>
    );
  }

  if (hasBeenLogged) {
    return (
      <div className={styles.container}>
        <div className={styles.flag}>
          <div className={styles.red}>
            <h3>Katalógus</h3>
          </div>
          <div className={styles.white}>
            {wasLoggingSuccessful
              ? <p>Sikerült!</p>
              : <p>Nem sikerült... Béna vagy. Keresd meg a Feljebbvalód!</p>}
          </div>
          <div className={styles.green}>
            <button
              onClick={() => {
                router.push(path.replace("/catalog", ""));
              }}
            >
              Vissza a főoldalra
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.flag}>
        <div className={styles.red}>
          <h3>Katalógus</h3>
        </div>
        <div className={styles.white}>
          <p>Kód</p>
          <input
            type="text"
            placeholder="Ide írd a kódod"
            value={code}
            onChange={e => {
              setCode(e.target.value);
            }}
          />
        </div>
        <div className={styles.green}>
          <button onClick={handleUserCatalog}>Nyomod</button>
        </div>
      </div>
    </div>
  );
}
