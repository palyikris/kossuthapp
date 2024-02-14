"use client";
import { signIn, signInWithGoogle } from "@/firebase/auth/sign";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../newacc/page.module.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async event => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful

    if (result.user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push(`/${result.user.uid}/admin`);
    } else {
      router.push(`/${result.user.uid}/main`);
    }
  };

  async function handleGoogleAuth() {
    const { result, error } = await signInWithGoogle();

    if (error) {
      return console.log(error);
    }

    // else successful

    if (result.user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push(`/${result.user.uid}/admin`);
    } else {
      router.push(`/${result.user.uid}/main`);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.img} />
      <div className={styles.formWrapper}>
        <div className={styles.text}>
          <h1>Bejelentkezés</h1>
          <h4>Dejó, hogy megint itt vagy te majom...</h4>
        </div>
        <form onSubmit={handleForm} autoComplete="off">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={e => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="pelda@gmail.com..."
            />
          </label>
          <label htmlFor="password">
            <p>Jelszó</p>
            <input
              onChange={e => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Jelszó..."
            />
          </label>
          <div className={styles.buttonWrapper}>
            <button type="submit">Nyomod</button>
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              Vissza
            </button>
          </div>
        </form>
        <div className={styles.buttonWrapper}>
          <button Google onClick={handleGoogleAuth}>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
