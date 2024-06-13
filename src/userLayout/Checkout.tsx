import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const CheckOut = () => {
  const location = useLocation();
  const bookingId = location?.state?.bookingId;

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
      console.log(token);

      try {
        const response = await axiosInstanceWithHeaders.post(
          `portal/booking/${bookingId}/pay`,
          {
            token: token.id,
          }
        );
        console.log(response);
        toast.success('You Payed Successfully')
      } catch (error:any) {
        console.log(error);
        toast.error(error?.response.data.message || 'error')
      }
    };
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "40rem",
            background: "#bbf7d0",
            padding: "3rem",
            border: "none",
            borderRadius: "2rem",
            marginTop: "5em",
          }}
        >
          <AddressElement options={{ mode: "billing" }} />
          <CardElement />
          <Button sx={{ width: "100%" }} type="submit" variant="contained">
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
