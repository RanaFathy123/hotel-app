import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";
import { axiosInstanceWithHeaders } from "../../../axiosConfig/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const CheckOut = () => {
  const location = useLocation();
  const bookingId = location?.state?.bookingId;
  const navigate = useNavigate();

  const CheckoutForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!elements || !stripe) return;
      const cardElements = elements.getElement(CardElement);
      if (!cardElements) return;
      const { error, token } = await stripe.createToken(cardElements);
      if (error) {
        console.log(error);
        return;
      }

      try {
        const response = await axiosInstanceWithHeaders.post(
          `portal/booking/${bookingId}/pay`,
          {
            token: token.id,
          }
        );
        console.log(response);
        toast.success(response.data.message || "You Payed Successfully");
        navigate("/success-checkout");
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response.data.message || "error");
      }
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "0.5rem",
        }}
      >
        <h2
          style={{ marginTop: "4rem", fontSize: "2rem", textAlign: "center" }}
        >
          Payment
        </h2>
        <h3 style={{ fontSize: "18px", textAlign: "center", color: "#B0B0B0" }}>
          Kindly follow the instructions below
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "90%", // Responsive width
            maxWidth: "40rem",
            background: "#ffffff",
            padding: "2rem",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <AddressElement options={{ mode: "billing" }} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <CardElement />
          </div>
          <Button
            sx={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  };
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckOut;
