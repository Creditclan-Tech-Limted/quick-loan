import Button from "@/components/global/Button";
import Drawer from "@/components/global/Drawer";
import { IconBriefcase, IconChevronRight, IconUser } from "@tabler/icons-react";

const RequirementsDrawer = ({
  isOpen,
  onClose,
  onContinue,
  loanType,
  onLoanTypeChange,
}) => {
  const isPersonal = loanType === "personal";
  const isBusiness = loanType === "business";

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Choose Loan Type">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Select the type of loan you want so we can show the right
            requirements.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <button
            type="button"
            onClick={() => onLoanTypeChange("personal")}
            className={`text-left border rounded-2xl p-5 transition relative overflow-hidden ${
              isPersonal
                ? "border-blue-500 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 shadow-lg"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100 opacity-60" />
            <div className="absolute -left-6 -bottom-10 h-20 w-20 rounded-full bg-sky-100 opacity-60" />
            <div className="relative flex items-center gap-3">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isPersonal
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <IconUser size={22} />
              </span>
              <div>
                <p className="text-lg font-semibold">Personal Loan</p>
                <p className="text-sm text-gray-600 mt-1">
                  For salary earners and personal needs.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <p>Includes personal address, work info, and ID upload.</p>
              <p>Asset declaration required.</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onLoanTypeChange("business")}
            className={`text-left border rounded-2xl p-5 transition relative overflow-hidden ${
              isBusiness
                ? "border-emerald-500 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 shadow-lg"
                : "border-gray-200 hover:border-emerald-300 hover:shadow-md"
            }`}
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-100 opacity-60" />
            <div className="absolute -left-6 -bottom-10 h-20 w-20 rounded-full bg-teal-100 opacity-60" />
            <div className="relative flex items-center gap-3">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isBusiness
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <IconBriefcase size={22} />
              </span>
              <div>
                <p className="text-lg font-semibold">Business Loan</p>
                <p className="text-sm text-gray-600 mt-1">
                  For business expansion and operations.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <p>Includes business and personal info.</p>
              <p>Upload CAC documents and asset declaration.</p>
            </div>
          </button>
        </div>

        <Button
          className={`text-white ${loanType ? "bg-blue-600" : "bg-gray-300"}`}
          onClick={onContinue}
          disabled={!loanType}
          rightIcon={<IconChevronRight size={16} />}
        >
          Proceed
        </Button>
      </div>
    </Drawer>
  );
};

export default RequirementsDrawer;
