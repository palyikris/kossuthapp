import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <head>
        <meta charSet="utf-8" />
        <title>KossuthApp</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Egy kis segítség apátoktól a kossuthos nebulóimnak.
        találhatóak a kossuthos teendőitek, aka. beadandók, dogák illetve ezeknek az eredményei. Nyomjátok faszok!"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=7" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="kossuth, kossuthapp, pesterzsébeti kossuth, kossuth lajos gimnázium"
        />
        <meta name="author" content="Apátok" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
