
"use client";
import { useSession } from "next-auth/react";

const products = [
  {
    name: "масло 5в40",
    guest: 130,
    pro: 110,
    max: 100,
  },
  {
    name: "масло 5в30",
    guest: 140,
    pro: 120,
    max: 110,
  },
];

export default function ProductList() {
  const { data: session } = useSession();
  const level = session?.user?.subscriptionLevel || "гість";

  const getPrice = (product) => {
    if (level === "максимум") return product.max;
    if (level === "про") return product.pro;
    return product.guest;
  };

  return (
    <div>
      <h2>🧾 Ваш рівень: <b>{level}</b></h2>
      <ul>
        {products.map((product, i) => (
          <li key={i} style={{ marginBottom: "20px" }}>
            <h3>• {product.name}</h3>
            <div>📄 Гість: <strong>{product.guest} грн</strong></div>
            <div>🔒 Про: <strong>{product.pro} грн</strong></div>
            <div>🔥 Максимум: <strong>{product.max} грн</strong></div>
            <div style={{ marginTop: "6px" }}>💰 <strong>Ваша ціна: {getPrice(product)} грн</strong></div>
            {level === "гість" && <button>Оформити підписку</button>}
            {level === "про" && <button>Підняти до максимуму</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
