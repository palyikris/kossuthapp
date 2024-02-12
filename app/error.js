"use client"; // Error components must be Client Components

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  useEffect(
    () => {
      // Log the error to an error reporting service
      console.error(error);
    },
    [error]
  );

  return (
    <div className={styles.container}>
      <div className={styles.flag}>
        <h2>Hát ez eléggé gatya.</h2>
        <p>
          Úgy tűnik, valami félrement a dologgal. ÉN biztos nem csesztem el a
          kódot...
        </p>
        <div className={styles.buttonWrapper}>
          <button
            onClick={// Attempt to recover by trying to re-render the segment
            () => reset()}
          >
            Nyomd meg, hátha segít
          </button>
        </div>
      </div>
    </div>
  );
}
