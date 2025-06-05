import axios from "axios";
import { BACKEND_URL } from "../Utills/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [Premium, setPremium] = useState(false);

  useEffect(() => {
    verifyPremium();
  }, []);

  const verifyPremium = () => {
    try {
      const res = axios.get(BACKEND_URL + "/payment/verify", {
        withCredentials: true,
      });
      setPremium(res.data.isPremium);
    } catch (err) {
      console.error("Error verifying premium status:", err);
    }
  };
  const handleOnClick = async (type) => {
    try {
      const order = await axios.post(
        BACKEND_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      const { key_Id, orderId, amount, currency, notes } = order.data;
      const options = {
        key: key_Id, // Enter the Key ID generated from the Dashboard
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: currency,
        name: "Dev Tinder", //your business name
        description: "Connect with other developers",
        image: "https://example.com/your_logo",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: notes.firstName + " " + notes.lastName, //your customer's name
          email: "email@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: verifyPremium(),
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return !Premium ? (
    <div className="mx-4 my-4">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-primary rounded-box grid h-80 grow place-items-center">
          <h1 className="my-2 font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connenction requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            className="bg-gray-700 py-2 px-4 rounded-lg"
            onClick={() => handleOnClick("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-secondary rounded-box grid h-80 grow place-items-center">
          <h1 className="my-2 font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- Infinite requests</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            className="bg-yellow-500 py-2 px-4 rounded-lg"
            onClick={() => handleOnClick("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p>You are already a premium user</p>
  );
};

export default Premium;
