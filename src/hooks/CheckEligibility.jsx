import React, { useState } from "react";
import useSignupStore from "../../../store/signup.js";
import {
  useUpdateRideUserMutation,
  useUpdateActiveRideUserMutation,
} from "../../../api/ride.js";
import Loader from "../Loader.jsx";
import useEligibility from "../../hooks/use-eligibility.js";
import { useGetFirstPlanQuery } from "../../../api/ride.js";

function CheckEligibility({ onBack, onNext }) {
  const { data, updateData } = useSignupStore((state) => state);

  const [loading, setLoading] = useState("");

  const { data: firstPlan, isLoading: isGetFirstPlanLoading } = useGetFirstPlanQuery({
    id: data?.ride_data.rider_id
  });

  const { mutateAsync: updateRideUser, isLoading: isUpdateRideUserLoading } =
    useUpdateRideUserMutation();
  const {
    mutateAsync: updateActiveRideUser,
    isLoading: isUpdateActiveRideUserLoading,
  } = useUpdateActiveRideUserMutation();

  const { launch: launchAnalyse } = useEligibility({
    data: {
      intro: "Happy to check eligibility for your ride",
      banner: "https://i.ibb.co/F3HsSx0/eligibility-banner.jpg",
      extra: {
        ride_id: data.ride_data.id
      }, 
      request: {
        amount: data.ride_data.amount,
        tenor: 1,
        tenor_type: 2,
        // product_id: "30003",
        product_id: "29822 ",
      },
      profile: {
        full_name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        date_of_birth: null,
        gender: null,
      },
      config: {
        show_bank_account: true,
        platform: "ride",
        show_address: true,
        show_income: true,
        analyze_bank_statement: true,
        show_offers: true,
        show_signature: true,
        tokenize_card: true,
      },
    },
    onReady: () => {
      setLoading("false");
    },
    onCompleted: (data) => {
      handleEligibilityCompleted({plan_amount: data.plans[0].plan_amount, request_id: data.request_id});
    },
  });
  const handleAnalyse = () => {
    setLoading("true");
    launchAnalyse();
  };
  const handleEligibilityCompleted = async ({plan_amount, request_id}) => {
    try {
      const payload = {
        phone: data.user.phone,
        plan_amount: plan_amount,
        creditclan_request_id: request_id
      };
      const res = await updateRideUser(payload);
      let expiry_date = new Date(res.data.data.plan_expiry_date);
      let expired_date = expiry_date.toDateString();

      updateData({
        user: {
          ...data.user,
          name: res.data.data.name,
        },
        plan_amount: res.data.data.plan_amount,
        plan_expiry_date: expired_date,
      });

      const payload_two = {
        status: "active",
        id: res.data.data.id,
      };
      await updateActiveRideUser(payload_two);
      onNext();
    } catch (e) {
      console.log({ e });
    }
  };
  console.log(firstPlan)
  return (
    <>
      <div>
        <button
          style={{ marginBottom: "0px" }}
          className="back"
          type="button"
          onClick={onBack}
        >
          <span aria-hidden="true">
            <i
              style={{ fontSize: "1rem !important" }}
              className="fa-solid fa-angle-left"
            ></i>
          </span>
        </button>
      </div>
      {loading === "true" &&
        !isUpdateRideUserLoading &&
        !isUpdateActiveRideUserLoading && (
          <>
            <br />
            <br />
            <br />
            <br />
            <div className="d-flex flex-column justify-content-center align-items-center text-center py-5">
              <div className="spinner-grow text-dark" role="status">
                <span className="sr-only text-cc-dark">Loading...</span>
              </div>
              <div className="font-17 mt-4 text-cc-dark">Please wait..</div>
            </div>
          </>
        )}

      {loading !== "true" &&
        !isUpdateRideUserLoading &&
        !isUpdateActiveRideUserLoading && data?.ride_data?.amount !== "3000" && (
          <>
            <div className="pt-70 pb-2">
              <img
                style={{ width: "250px" }}
                className="mb-4"
                src="https://shop.clan.africa/img/time-lady.7a7ded04.svg"
                alt=""
              />
              <p className="font-30 redirect-text text-deep-blue font-weight-bold mb-2">
                Before you continue eligibility process, please note:
              </p>
              <li className="font-17 text-cc-dark">
                This is a one time 5 minutes process
              </li>
              <li className="font-17 text-cc-dark">
                Requires your BVN
              </li>
              <li className="font-17 text-cc-dark mb-2">
                Involves analyzing your digital bank statement 
              </li>
            </div>
            <button
              onClick={handleAnalyse}
              className="btn btn-blue mr-4 font-17"
            >
              Continue to eligibility
            </button>              
          </>
        )}
      {!loading && isUpdateRideUserLoading && isUpdateActiveRideUserLoading && (
        <Loader
          header={"Creating your account"}
          subText={"Please wait while we set you up"}
        />
      )}
    </>
  );
}

export default CheckEligibility;
