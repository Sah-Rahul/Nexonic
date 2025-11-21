
import { useEffect, useState } from "react";
 
import { useQuery } from "@tanstack/react-query";
import { getMyOrderApi } from "@/api/orderApi";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

    const { data: myOrder  } = useQuery({
    queryKey: ["stats", "orderStats"],
    queryFn: getMyOrderApi,
  });
  console.log(myOrder)

//   useEffect(() => {
//     loadOrders();
//   }, []);

   

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div
            key={order._id}
            className="border p-5 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between mb-3">
              <p className="font-semibold">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </p>
              <p className="text-green-600 font-semibold">
                {order.orderStatus}
              </p>
            </div>

            <div className="space-y-3">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4">
                  <img
                    src={item.productImage}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} • ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right font-bold text-lg">
              Total: ${order.totalPrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
