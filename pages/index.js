import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    setLoading(false);
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Hayvan ismi ver</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Hayvan türü"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <p>
            <b>Örn:</b> Kedi, Köpek, Muhabbet Kuşu vb.
          </p>
          <input disabled={loading} type="submit" value="İsim oluştur" />
        </form>
        <div className={styles.result}>
          {loading ? "Yükleniyor..." : result}
        </div>
      </main>
    </div>
  );
}
