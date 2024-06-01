import { GetAllCatalogDataWithAbsents } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import styles from "./page.module.css";

export default function CatalogCodesComponent() {
  let [catalogData, setCatalogData] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllCatalogDataWithAbsents().then(response => {
      setCatalogData(response);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <p>Katalógus adatok betöltése...</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h3>Eddigi katalógusok</h3>
      {catalogData.map((data, index) => {
        let createdAt = moment(data.createdAt.toDate()).format("YYYY-MM-DD");
        return (
          <div key={index} className={styles.catalog}>
            <div className={styles.specs}>
              <div className={styles.data}>
                <p>Kód:</p>
                <div>
                  {data.id}
                </div>
              </div>
              <div className={styles.data}>
                <p>Osztály:</p>
                <div>
                  {data.catClass}
                </div>
              </div>
            </div>
            <div className={styles.absents}>
              {data.absentStudents
                .sort((a, b) => a.fullname.localeCompare(b.fullname))
                .map((student, index) => {
                  return (
                    <p key={index}>
                      {student.fullname}
                    </p>
                  );
                })}
            </div>
            <div className={styles.specs}>
              <div className={styles.data}>
                <p>Hiányzók száma:</p>
                <div>
                  {data.absentStudents.length}
                </div>
              </div>
              <div className={styles.data}>
                <p>Dátum:</p>
                <div>
                  {createdAt}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
