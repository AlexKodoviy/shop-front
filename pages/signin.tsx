
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn({ providers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <button onClick={() => router.push("/register")}>Зареєструватися</button>
      <div>
        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Увійти за допомогою Google
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти за допомогою Credentials</button>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
