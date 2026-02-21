import Button from "@/components/global/Button";
import Drawer from "@/components/global/Drawer";

const RequestExistDrawer = ({
  isOpen,
  onClose,
  request,
  loan,
  launch,
  cancelLoan,
  isLoading,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Request Details">
      <>
        {!request?.eligibility_link && !request?.creditclan_request_id && (
          <p>
            {" "}
            You have an on-going request. <br /> Click on <b>Continue</b> to
            proceed with your application.{" "}
          </p>
        )}
        {request?.eligibility_link && !request?.creditclan_request_id && (
          <>
            <p>
              {" "}
              You have an on-going request. <br /> Click on <b>Continue</b> to
              proceed with your application.{" "}
            </p>
            <p>
              Contact us on our support lines if you require any assistance.
            </p>
          </>
        )}

        {request?.eligibility_link && request?.creditclan_request_id && (
          <p className="">
            You have a pending request that is under review. <br /> Contact us
            on our support lines if you require any assistance.
          </p>
        )}

        <div className="border border-black space-y-4 p-3 rounded mt-5">
          <div className="flex justify-between">
            <p>Name:</p>
            <p>{request?.full_name}</p>
          </div>
          <div className="flex justify-between">
            <p>Phone:</p>
            <p>{request?.phone}</p>
          </div>
          <div className="flex justify-between">
            <p>Email:</p>
            <p>{request?.email}</p>
          </div>
          <div className="flex justify-between">
            <p>Amount:</p>
            <p>{request?.amount}</p>
          </div>
          <div className="flex justify-between">
            <p>Duration:</p>
            <p>{request?.duration} month(s)</p>
          </div>
        </div>

        {!request?.eligibility_link && !request?.creditclan_request_id && (
          <>
            <Button
              className="mt-10 mb-5 bg-blue-600 text-white"
              onClick={launch}
              loading={isLoading}
            >
              Continue
            </Button>
            <p
              onClick={cancelLoan}
              className="underline text-red-500 text-center cursor-pointer"
            >
              Cancel this request
            </p>
          </>
        )}

        {request && loan && loan.loan.stage !== "completed" && (
          <Button
            className="mt-10 bg-blue-600 text-white"
            onClick={launch}
            loading={isLoading}
          >
            Continue
          </Button>
        )}
      </>
    </Drawer>
  );
};

export default RequestExistDrawer;
