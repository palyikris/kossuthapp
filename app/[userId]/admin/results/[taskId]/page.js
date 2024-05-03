"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { GetResultsByTaskId, GetUserNameById } from "@/lib/firebase/firebase";
import { usePathname } from "next/navigation";
import ResultsTable from "./../../../../../components/admin/results/table/page";

export default function ResultsPage() {
  let [isLoaded, setIsLoaded] = useState(false);
  let [results, setResults] = useState([]);
  let path = usePathname();
  let taskId = path.split("/").pop();

  useEffect(() => {
    GetResultsByTaskId(taskId).then(response => {
      let data = response;
      data = data.filter(result => result.isChecked);
      data = data.map(result => {
        GetUserNameById(result.uid).then(response => {
          result.name = response;
        });
        return result;
      });
      setResults(data);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1>Eredmények</h1>
      </div>
      <ResultsTable results={results} />
    </div>
  );
}
