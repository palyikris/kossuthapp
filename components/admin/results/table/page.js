import { GetUserNameById } from "@/lib/firebase/firebase";
import styles from "./page.module.css";

export default function ResultsTable(props) {
  let { results } = props;
  let sortedResults = results.sort((a, b) => a.grade - b.grade);
  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.name}>Név</div>
        <div className={styles.points}>Pontszámok</div>
        <div className={styles.grade}>Jegy</div>
      </div>
      {sortedResults.map(result => {
        console.log(result);
        return (
          <div key={result.uid} className={styles.row}>
            <div className={styles.name}>
              <p>
                {name}
              </p>
            </div>
            <div className={styles.points}>
              {result.tasks.map((task, i) => {
                return (
                  <div key={i}>
                    {`${i + 1}. ${task}`}
                  </div>
                );
              })}
            </div>
            <div className={styles.grade}>
              <p>
                {result.grade > 0 ? result.grade : "Nem értékelve"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
