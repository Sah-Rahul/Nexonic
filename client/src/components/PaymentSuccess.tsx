import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/my-orders");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p>Your order has been placed successfully!</p>
    </div>
  );
};

export default PaymentSuccess;
