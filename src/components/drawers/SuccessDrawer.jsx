import Button from "@/components/global/Button";
import Drawer from "@/components/global/Drawer";

const SuccessDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Success"
    >
      <>
        <div className="pt-42">
          <img src="/assets/images/Young and happy-bro.svg" alt="" />
          <p className="text-4xl font-bold text-center">
            Congratulations!!! <br />
            <div className="text-2xl mt-3 font-normal">
              Application completed. Our team will review your submission
            </div>
          </p>
        </div>
        <Button
          className="text-white mt-5"
          onClick={onClose}
        >
          Close
        </Button>
      </>
    </Drawer>
  );
};

export default SuccessDrawer;
