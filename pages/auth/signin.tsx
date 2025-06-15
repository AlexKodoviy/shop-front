
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn({ providers, csrfToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <a href="/register">
        <button style={{ marginBottom: "20px" }}>Зареєструватися</button>
      </a>

      {providers.google && (
        <div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            Увійти за допомогою Google
          </button>
        </div>
      )}

      {providers.credentials && (
        <>
          <form
            method="post"
            action="/api/auth/callback/credentials"
            style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>Електронна пошта</label>
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Пароль</label>
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>
              Увійти
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
