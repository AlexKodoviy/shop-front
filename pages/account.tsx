import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  attributes: {
    totalPrice: number;
    savedAmount: number;
    subscriptionUsed: string;
    orderStatus: string;
    createdAt: string;
  };
};

export default function AccountPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders?filters[userEmail][$eq]=${session.user.email}&sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${session.user.jwt}`,
            },
          }
        );
        const data = await res.json();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Помилка при завантаженні замовлень:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session?.user?.email]);

  const totalSaved = orders.reduce(
    (sum, order) => sum + (order.attributes.savedAmount || 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Кабінет користувача</h1>

      {session?.user ? (
        <div className="mb-6">
          <p><strong>Імʼя:</strong> {session.user.name}</p>
          <p><strong>Email:</strong> {session.user.email}</p>
          <p><strong>Підписка:</strong> {session.user.subscriptionLevel || "відсутня"}</p>
          {session.user.subscriptionLevel === "PRO" && (
            <p className="text-green-600 font-semibold">
              ✅ Ви користуєтесь підпискою PRO
            </p>
          )}
        </div>
      ) : (
        <p>Не авторизовано.</p>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Історія замовлень</h2>
        {loading ? (
          <p>Завантаження...</p>
        ) : orders.length === 0 ? (
          <p>Замовлень не знайдено.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-300 p-3 rounded-md">
                <p><strong>Дата:</strong> {new Date(order.attributes.createdAt).toLocaleString()}</p>
                <p><strong>Сума:</strong> {order.attributes.totalPrice} грн</p>
                <p><strong>Економія:</strong> {order.attributes.savedAmount} грн</p>
                <p><strong>Підписка:</strong> {order.attributes.subscriptionUsed}</p>
                <p><strong>Статус:</strong> {order.attributes.orderStatus}</p>
              </div>
            ))}

            <div className="border-t pt-4 font-semibold">
              Загальна економія: {totalSaved.toFixed(2)} грн
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
