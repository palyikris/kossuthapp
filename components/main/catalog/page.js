import { usePathname, useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CatalogForStudents() {
  let path = usePathname();
  let router = useRouter();

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          router.push(path + "/catalog");
        }}
      >
        Katalógus
      </button>
    </div>
  );
}
