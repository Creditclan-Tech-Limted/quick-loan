import Button from '@/components/global/Button';
import Drawer from '@/components/global/Drawer';

const SuccessDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Success">
      <>
        <div className="pt-42">
          <img src="/assets/images/Young and happy-bro.svg" alt="" />
          <p className="text-center text-4xl font-bold">
            Congratulations!!! <br />
            <div className="mt-3 text-2xl font-normal">
              Application completed. Our team will review your submission
            </div>
          </p>
        </div>
        <Button className="mt-5 text-white" onClick={onClose}>
          Close
        </Button>
      </>
    </Drawer>
  );
};

export default SuccessDrawer;
