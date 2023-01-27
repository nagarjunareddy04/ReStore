import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckOutPage";

const stripePromise = loadStripe('pk_test_51MUBrOCc7bfdm1a1XRrhW8pT6biABo1ZV3L6qEAWX7Jg1x5C052WIV9qfu2Ie1rOgZ8jvjaT8wNiKpZf685AUjwn004aXU0TFp');

export default function CheckoutWrapper(){
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    }, [dispatch]);

    if(loading) return <LoadingComponent message="Loading Checkout..." />
    
    return(
        <>
            <Elements stripe={stripePromise}>
                <CheckoutPage />
            </Elements>
        </>
    )
}