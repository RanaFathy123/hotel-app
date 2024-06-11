import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";
import { axiosInstanceWithHeaders } from "../../axiosConfig/axiosInstance";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const PayBooking = () => {
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
          `portal/booking/66677e62257b76c4adde4bec/pay`,
          {
            token: token.id,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
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
            width: "30rem",
            background: "#bbf7d0",
            padding: "3rem",
            border: "none",
            borderRadius: "2rem",
          }}
        >
          <AddressElement options={{ mode: "billing" }} />
          <CardElement />
          <button>Submit</button>
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

export default PayBooking;
