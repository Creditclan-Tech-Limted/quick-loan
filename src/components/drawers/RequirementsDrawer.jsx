import Button from "@/components/global/Button";
import Drawer from "@/components/global/Drawer";

const RequirementsDrawer = ({ isOpen, onClose, onContinue }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Loan Requirements...">
      <>
        <p className="mb-5">
          The following information will be requested from you. <br /> Ensure
          you have them available before you proceed.
        </p>
        <div className="space-y-4">
          <p>▪️ BVN</p>
          <p>▪️ Valid Work Email (gmail/yahoo email is not allowed)</p>
          <p>▪️ Utility Bill (not older than 3 month)</p>
          <p>▪️ Evidence of asset ownership</p>
        </div>
        <Button className="text-white mt-16" onClick={onContinue}>
          Continue
        </Button>
      </>
    </Drawer>
  );
};

export default RequirementsDrawer;
