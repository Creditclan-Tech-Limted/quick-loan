import { useState } from "react";
import { useForm } from "react-hook-form";
import useEligibility from "@/hooks/use-eligibility";
import axios from "axios";
import { differenceInMonths } from "date-fns";

// Import drawer components
import RequirementsDrawer from "./drawers/RequirementsDrawer";
import RequestExistDrawer from "./drawers/RequestExistDrawer";
import RequestDetailsDrawer from "./drawers/RequestDetailsDrawer";
import SuccessDrawer from "./drawers/SuccessDrawer";
import Button from "./global/Button";
import { IconChevronRight } from "@tabler/icons-react";

const SecondHere = ({ referral_code }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [request, setRequest] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [views, setViews] = useState("requirements");
  const [_differenceInMonths, setDifferenceInMonths] = useState(0);
  const [loan, setLoan] = useState();
  const [loanType, setLoanType] = useState("");

  const { launch } = useEligibility({
    data: {
      banner: "https://i.ibb.co/F3HsSx0/eligibility-banner.jpg",
      referral_code,
      request: {
        amount: watch().amount,
        tenor: watch().duration,
        tenor_type: 6,
        product_id: "30025",
        home_address: watch().address,
      },
      profile: {
        full_name: watch().name,
        email: watch().email,
        phone: watch().phone,
        date_of_birth: null,
        gender: null,
      },
      work: {
        monthly_income: watch().monthlyIncome,
        work_sector: watch().workSector,
        occupation_id: watch().occupationId,
        address: watch().workAddress,
        start_month: watch().startMonth,
        start_year: watch().startYear,
        company_name: watch().companyName,
        official_email: watch().workEmail,
        work_email_verified: "",
      },
      config: {
        show_bank_account: true,
        show_address: true,
        show_income: false,
        analyze_bank_statement: false,
        show_offers: false,
        show_signature: false,
        tokenize_card: false,
        verify_work_email: false,
        show_work_information: true,
        show_attachments: true,
        attachments_list: ["evidence_of_ownership"],
        show_address: true,
        show_offers: false,
        show_nok: false,
        no_frequently_called_number: 0,
        remember_last_application_date: false,
      },
    },
    onReady: () => {
      let eligibility_link = document.getElementById(
        "data-collection-widget",
      )?.src;
      axios.post(
        `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${request?.id}/offer`,
        { eligibility_link },
      );
      setIsLoading(false);
    },
    onRequest: (data) => {
      axios.post(
        `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${request?.id}/offer`,
        { creditclan_request_id: data?.request_id },
      );
    },
    onCompleted: (data) => {
      axios.post(
        `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${request?.id}/offer`,
        { creditclan_request_id: data?.request_id, offer: watch().amount },
      );
      setViews("success");
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await saveLoan();
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const gertLoanDetails = async (request_id) => {
    try {
      const { data } = await axios.post(
        "https://mobile.creditclan.com/api/v3/customer/check/details",
        { email: watch().email, phone: watch().phone },
        {
          headers: {
            "x-api-key":
              "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
          },
        },
      );
      const { token } = data;
      const res = await axios.post(
        "https://mobile.creditclan.com/api/v3/loan/details",
        { token, request_id },
        {
          headers: {
            "x-api-key":
              "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
          },
        },
      );
      setLoan(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  };

  const saveLoan = async () => {
    try {
      const res = await axios.post(
        `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loan`,
        {
          name: watch().name,
          amount: watch().amount,
          duration: watch().duration,
          email: watch().email,
          agent_phone: referral_code,
          phone: watch().phone,
          address: watch().address,
          assetCategory: watch().assetCategory,
          assetType: watch().assetType,
          assetDescription: watch().assetDescription,
          assetValue: watch().assetValue,
        },
      );
      if (!res?.data?.status) {
        const currentDate = new Date();
        const targetDate = new Date(res?.data?.data?.created_at);
        const monthsDifference = differenceInMonths(targetDate, currentDate);
        if (monthsDifference > 0) {
          await axios.delete(
            `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${req?.data?.data?.id}/cancel`,
          );
          const resi = await axios.post(
            `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loan`,
            {
              name: watch().name,
              amount: watch().amount,
              duration: watch().duration,
              email: watch().email,
              agent_phone: referral_code,
              phone: watch().phone,
              address: watch().address,
            },
          );
          setRequest(resi?.data?.data?.request);
          launch();
          return;
        }
        await gertLoanDetails(res?.data?.data?.creditclan_request_id);
        setDifferenceInMonths(monthsDifference);
        setViews("request_exist");
        setRequest(res?.data?.data);
        return;
      }
      setRequest(res?.data?.data?.request);
      launch();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelLoan = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/personal/loans/${request?.id}/cancel`,
      );
      setViews("request_details");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero-background">
      <div className="flex items-center justify-center w-full absolute bottom-4 sm:bottom-20 px-4">
        <Button
          color="white"
          onClick={() => setOpenDrawer(true)}
          size="lg"
          rightIcon={<IconChevronRight size={16} />}
          className="w-full max-w-sm sm:w-auto sm:max-w-none"
        >
          Get started Now!
        </Button>
      </div>

      <>
        <RequirementsDrawer
          isOpen={openDrawer && views === "requirements"}
          onClose={() => setOpenDrawer(false)}
          onContinue={() => setViews("request_details")}
          loanType={loanType}
          onLoanTypeChange={setLoanType}
        />

        <RequestExistDrawer
          isOpen={openDrawer && views === "request_exist"}
          onClose={() => setOpenDrawer(false)}
          request={request}
          loan={loan}
          launch={launch}
          cancelLoan={cancelLoan}
          isLoading={isLoading}
        />

        <RequestDetailsDrawer
          isOpen={openDrawer && views === "request_details"}
          onClose={() => setOpenDrawer(false)}
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isLoading={isLoading}
          watch={watch}
          loanType={loanType}
        />

        <SuccessDrawer
          isOpen={openDrawer && views === "success"}
          onClose={() => setOpenDrawer(false)}
        />
      </>
    </div>
  );
};

export default SecondHere;
