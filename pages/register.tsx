
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstName.trim()) {
      setError("Ім’я є обов’язковим");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstName,
        lastName,
        middleName,
        email,
        password,
      }),
    });

    if (res.ok) {
      router.push("/api/auth/signin");
    } else {
      const data = await res.json();
      setError(data.message || "Помилка реєстрації");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Ім’я *</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

        <label>Прізвище</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label>По батькові</label>
        <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Пароль</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Зареєструватися</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
        Уже маєш акаунт? <a href="/api/auth/signin">Увійти</a>
      </p>
    </div>
  );
}
