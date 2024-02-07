"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  let router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.flag}>
        <div className={styles.color}>
          <h1>Üdv a KossuthAppban!!</h1>
          <h4>Remélem készítettél zsepit te majom, mert bukó leszel...</h4>
        </div>
        <div className={styles.color}>
          <h4>A dolog folytatásához jelentkezz be, vagy regisztrálj!</h4>
        </div>
        <div className={styles.color}>
          <button
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Bejelentkezek
          </button>
          <button
            onClick={() => {
              router.push("/auth/newacc");
            }}
          >
            Regisztrálok
          </button>
        </div>
      </div>
    </div>
  );
}
