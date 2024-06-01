import { useState } from "react";
import styles from "./page.module.css";
import { GenerateCatalogCode } from "@/lib/firebase/firebase";
import Loader from "./../../loader/loader";
import CatalogCodesComponent from "./code/page";

export default function CatalogComponent({ classes }) {
  let [code, setCode] = useState("");
  let [catClass, setCatClass] = useState("");
  let [expiration, setExpiration] = useState(0);
  let [loading, setLoading] = useState(false);

  function generateCode() {
    setLoading(true);

    let code = GenerateCatalogCode(catClass, expiration).then(response => {
      console.log(response);
      setCode(response);
      setCatClass("");
      setExpiration(0);
      setLoading(false);
    });
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <h3>Katalógus</h3>
        <p>Kód generálása...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>Katalógus</h3>
      <div className={styles.optionsWrapper}>
        <div className={styles.option}>
          <p>Osztály</p>
          <select
            value={catClass}
            onChange={e => {
              setCatClass(e.target.value);
            }}
          >
            <option value="0">Válassz osztályt!</option>
            {classes.map((cl, index) => {
              return (
                <option key={index} value={cl}>
                  {cl}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className={styles.option}>
          <p>Időtartam</p>
          <select
            value={expiration}
            onChange={e => {
              setExpiration(e.target.value);
            }}
          >
            <option value={0}>Válassz időtartamot!</option>
            <option value={5}>5 perc</option>
            <option value={10}>10 perc</option>
          </select>
        </div> */}
        <div className={styles.code}>
          <h5>Kód</h5>
          <input type="text" value={code} readOnly />
          {code == ""
            ? <button onClick={generateCode}>Kód generálása</button>
            : <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCode("");
                }}
                className={styles.copyButton}
              >
                Kód másolása
              </button>}
        </div>
      </div>
      <CatalogCodesComponent />
    </div>
  );
}
