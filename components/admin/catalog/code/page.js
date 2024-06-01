import {
  CloseCatalog,
  DeleteAllCatalogs,
  GetAllCatalogDataWithAbsents,
  OpenCatalog
} from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import styles from "./page.module.css";

export default function CatalogCodesComponent() {
  let [catalogData, setCatalogData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [refresh, setRefresh] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      GetAllCatalogDataWithAbsents().then(response => {
        setCatalogData(response);
        setLoading(false);
      });
    },
    [refresh]
  );

  function DeleteCatalogs() {
    setLoading(true);
    DeleteAllCatalogs().then(() => {
      setRefresh(prev => !prev);
    });
  }

  function handleClose(code) {
    CloseCatalog(code).then(() => {
      setRefresh(prev => !prev);
    });
  }

  function handleOpen(code) {
    OpenCatalog(code).then(() => {
      setRefresh(prev => !prev);
    });
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.controls}>
          <button>Törlés</button>
          <h3>Eddigi katalógusok</h3>
          <button
            onClick={() => {
              setRefresh(prev => !prev);
            }}
          >
            Frissítés
          </button>
        </div>
        <p>Katalógus adatok betöltése...</p>
      </div>
    );
  }

  if (catalogData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.controls}>
          <button>Törlés</button>
          <h3>Eddigi katalógusok</h3>
          <button
            onClick={() => {
              setRefresh(prev => !prev);
            }}
          >
            Frissítés
          </button>
        </div>
        <p>Nincsenek katalógusok!</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button onClick={DeleteCatalogs}>Törlés</button>
        <h3>Eddigi katalógusok</h3>
        <button
          onClick={() => {
            setRefresh(prev => !prev);
          }}
        >
          Frissítés
        </button>
      </div>
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
              {data.closed
                ? <button onClick={() => handleOpen(data.id)}>Megnyit</button>
                : <button onClick={() => handleClose(data.id)}>Lezár</button>}
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
