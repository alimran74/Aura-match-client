// src/Pages/Checkout/Checkout.jsx

import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Checkout = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["checkoutBiodata", id],
    queryFn: async () => {
      const res = await axios.get(`/biodatas/id/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading || !biodata)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f6f4d2] flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#f19c79]">
          Contact Access Request
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Biodata ID:</strong> {biodata.biodataId}
          </p>
          <p>
            <strong>Full Name:</strong> {biodata.name}
          </p>
          <p>
            <strong>Occupation:</strong> {biodata.occupation}
          </p>
          <p>
            <strong>Age:</strong> {biodata.age}
          </p>
        </div>

        {/* Stripe Payment Form */}
        <Elements stripe={stripePromise}>
          <PaymentForm biodataId={biodata._id} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
