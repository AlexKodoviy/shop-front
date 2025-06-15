
import { useSession } from "next-auth/react";

const products = [
  {
    name: "масло 5в40",
    price: {
      guest: 130,
      pro: 110,
      max: 100,
    },
  },
  {
    name: "масло 5в30",
    price: {
      guest: 140,
      pro: 120,
      max: 110,
    },
  },
];

export default function Shop() {
  const { data: session } = useSession();
  const level = session?.user?.subscriptionLevel || "гість";

  const getUserPrice = (product) => {
    if (level === "максимум") return product.price.max;
    if (level === "про") return product.price.pro;
    return product.price.guest;
  };

  const renderUpgradeButton = () => {
    if (level === "гість") {
      return <button>Оформити підписку</button>;
    }
    if (level === "про") {
      return <button>Підняти до максимуму</button>;
    }
    return null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Товари</h2>
      <p>Ваш рівень: <strong>{level}</strong></p>
      {products.map((product, idx) => (
        <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
          <h3>• {product.name}</h3>
          <p>📄 Гість: <strong>{product.price.guest} грн</strong></p>
          <p>🔒 Про: <strong>{product.price.pro} грн</strong></p>
          <p>🔥 Максимум: <strong>{product.price.max} грн</strong></p>
          <p style={{ fontWeight: "bold", color: "green" }}>
            Ваша ціна: {getUserPrice(product)} грн
          </p>
          {renderUpgradeButton()}
        </div>
      ))}
    </div>
  );
}
