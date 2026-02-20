import { useEffect, useMemo, useState } from "react";
import Button from "@/components/global/Button";
import Drawer from "@/components/global/Drawer";
import Input from "@/components/global/Input";
import Select from "@/components/global/Select";
import { Textarea } from "../global/textarea";
import {
  IconBriefcase,
  IconBuilding,
  IconFileText,
  IconId,
  IconMapPin,
  IconUser,
} from "@tabler/icons-react";

const durations = [
  { text: "1 Month", value: 1 },
  { text: "2 Month", value: 2 },
  { text: "3 Month", value: 3 },
  { text: "4 Month", value: 4 },
  { text: "5 Month", value: 5 },
  { text: "6 Month", value: 6 },
  { text: "7 Month", value: 7 },
  { text: "8 Month", value: 8 },
  { text: "9 Month", value: 9 },
  { text: "10 Month", value: 10 },
  { text: "11 Month", value: 11 },
  { text: "12 Month", value: 12 },
];

const assetCategories = [
  {
    id: 1,
    value: "real_estate",
    text: "Real Estate",
    types: [
      {
        value: "residential",
        text: "Residential property (houses, apartments)",
      },
      {
        value: "commercial",
        text: "Commercial property (shops, warehouses, offices)",
      },
      { value: "land", text: "Land (developed or undeveloped)" },
      { value: "farmland", text: "Farmland" },
    ],
  },
  {
    id: 2,
    value: "precious_metals",
    text: "Precious Metals & Stones",
    types: [
      { value: "gold", text: "Gold (jewelry, coins, bars)" },
      { value: "silver_platinum", text: "Silver, platinum, palladium" },
      { value: "diamonds", text: "Diamonds & gemstones" },
    ],
  },
  {
    id: 3,
    value: "vehicles_machinery",
    text: "Vehicles & Machinery",
    types: [
      { value: "vehicles", text: "Cars, trucks, motorcycles" },
      {
        value: "construction",
        text: "Construction machinery (excavators, bulldozers)",
      },
      { value: "industrial", text: "Industrial equipment" },
      {
        value: "agricultural",
        text: "Agricultural machinery (tractors, harvesters)",
      },
    ],
  },
  {
    id: 4,
    value: "valuables_collectibles",
    text: "Valuables & Collectibles",
    types: [
      { value: "watches", text: "High-end watches" },
      { value: "art", text: "Fine art" },
      { value: "antiques", text: "Antiques" },
      {
        value: "luxury_bags",
        text: "Luxury handbags (in specialized lending markets)",
      },
    ],
  },
];

const personalSteps = [
  {
    id: "personal_info",
    title: "Personal Info",
    subtitle: "Contact and loan details",
    fields: ["name", "phone", "email", "amount", "duration"],
    icon: IconUser,
  },
  {
    id: "personal_address",
    title: "Personal Address",
    subtitle: "Your primary address",
    fields: ["personalAddress", "personalCity", "personalState"],
    icon: IconMapPin,
  },
  {
    id: "work_info",
    title: "Work Info",
    subtitle: "Employment details",
    fields: ["companyName", "workEmail", "jobTitle", "workAddress", "monthlyIncome", "workSector", "occupationId", "startMonth", "startYear"],
    icon: IconBriefcase,
  },
  {
    id: "work_id",
    title: "Upload Work ID",
    subtitle: "Proof of employment",
    fields: ["workId"],
    icon: IconId,
  },
  {
    id: "assets",
    title: "Asset Declaration",
    subtitle: "Assets used as collateral",
    fields: ["assetCategory", "assetType", "assetDescription", "assetValue"],
    icon: IconFileText,
  },
];

const businessSteps = [
  {
    id: "business_info",
    title: "Business Info",
    subtitle: "Company and loan details",
    fields: [
      "businessName",
      "businessType",
      "registrationNumber",
      "amount",
      "duration",
    ],
    icon: IconBuilding,
  },
  {
    id: "business_personal",
    title: "Personal Info",
    subtitle: "Primary contact details",
    fields: ["contactName", "contactEmail", "contactPhone"],
    icon: IconUser,
  },
  {
    id: "business_other",
    title: "Other Business Info",
    subtitle: "Business address and revenue",
    fields: ["businessAddress", "yearsInOperation", "annualRevenue"],
    icon: IconMapPin,
  },
  {
    id: "business_documents",
    title: "Upload CAC Documents",
    subtitle: "CAC registration files",
    fields: ["cacDocument"],
    icon: IconFileText,
  },
  {
    id: "assets",
    title: "Asset Declaration",
    subtitle: "Assets used as collateral",
    fields: ["assetCategory", "assetType", "assetDescription", "assetValue"],
    icon: IconBriefcase,
  },
];

const RequestDetailsDrawer = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  handleSubmit,
  errors,
  isLoading,
  watch,
  loanType,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = useMemo(
    () => (loanType === "business" ? businessSteps : personalSteps),
    [loanType],
  );

  const watchedAssetCategory = watch?.("assetCategory");
  const selectedCategory = assetCategories.find(
    (cat) => cat.value === watchedAssetCategory,
  );

  useEffect(() => {
    setActiveStep(0);
  }, [loanType, isOpen]);

  const isFieldComplete = (fieldName) => {
    const value = watch?.(fieldName);
    // if (value instanceof FileList) {
    //   return value.length > 0;
    // }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === "number") {
      return !Number.isNaN(value);
    }
    return value !== undefined && value !== null && `${value}`.trim() !== "";
  };

  const isStepComplete = (step) =>
    step.fields.every((field) => isFieldComplete(field));

  const canSubmit = steps.every((step) => isStepComplete(step));
  const currentStep = steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} padding={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 h-full">
        <div className="grid grid-cols-[250px_1fr] gap-6 h-full">
          <div className="text-body bg-gray-200 p-6 space-y-10">
            {steps.map((s, i) => {
              const isActive = i === activeStep;
              const isComplete = isStepComplete(s);
              const StepIcon = s.icon;
              return (
                <div className="flex items-center space-x-6" key={i}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isComplete
                        ? "bg-green-600 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600"
                    }`}
                  >
                    {StepIcon && <StepIcon size={18} />}
                  </div>
                  <div>
                    <h3 className="font-medium leading-tight">{s.title}</h3>
                    <p className="text-sm">{s.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 space-y-6">
            <p className="text-xl">{steps[activeStep].title}</p>
            {currentStep?.id === "personal_info" && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name as it appears on your ID"
                  bordered
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Full Name is required",
                    },
                  })}
                  error={errors?.name?.message}
                />
                <Input
                  type="tel"
                  label="Phone Number"
                  placeholder="e.g., 08012345678"
                  bordered
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Please enter a valid 11-digit phone number",
                    },
                  })}
                  error={errors?.phone?.message}
                />
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="your.email@company.com"
                  bordered
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  error={errors?.email?.message}
                />
                <Input
                  type="number"
                  label="Loan Amount (₦)"
                  placeholder="e.g., 500000"
                  bordered
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "Amount is required",
                    },
                    min: {
                      value: 150000,
                      message: "Minimum Amount is ₦150,000",
                    },
                    max: {
                      value: 1000000,
                      message: "Maximum amount is ₦1,000,000",
                    },
                  })}
                  error={errors?.amount?.message}
                />
                <Select
                  label="Duration"
                  options={durations}
                  {...register("duration", {
                    required: {
                      value: true,
                      message: "Duration is required",
                    },
                  })}
                  error={errors?.duration?.message}
                />
              </div>
            )}

            {currentStep?.id === "personal_address" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Personal Address"
                  placeholder="Enter your personal address"
                  bordered
                  {...register("personalAddress", {
                    required: {
                      value: true,
                      message: "Personal Address is required",
                    },
                  })}
                  error={errors?.personalAddress?.message}
                />
                <Input
                  type="text"
                  label="City"
                  placeholder="Enter your city"
                  bordered
                  {...register("personalCity", {
                    required: {
                      value: true,
                      message: "City is required",
                    },
                  })}
                  error={errors?.personalCity?.message}
                />
                <Input
                  type="text"
                  label="State"
                  placeholder="Enter your state"
                  bordered
                  {...register("personalState", {
                    required: {
                      value: true,
                      message: "State is required",
                    },
                  })}
                  error={errors?.personalState?.message}
                />
              </div>
            )}

            {currentStep?.id === "work_info" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Company Name"
                  placeholder="Enter your company name"
                  bordered
                  {...register("companyName", {
                    required: {
                      value: true,
                      message: "Company Name is required",
                    },
                  })}
                  error={errors?.companyName?.message}
                />
                <Input
                  type="email"
                  label="Work Email"
                  placeholder="your.email@company.com"
                  bordered
                  {...register("workEmail", {
                    required: {
                      value: true,
                      message: "Work Email is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  error={errors?.workEmail?.message}
                />
                <Input
                  type="text"
                  label="Job Title"
                  placeholder="Enter your job title"
                  bordered
                  {...register("jobTitle", {
                    required: {
                      value: true,
                      message: "Job Title is required",
                    },
                  })}
                  error={errors?.jobTitle?.message}
                />
                <Input
                  type="text"
                  label="Work Address"
                  placeholder="Enter your work address"
                  bordered
                  {...register("workAddress", {
                    required: {
                      value: true,
                      message: "Work Address is required",
                    },
                  })}
                  error={errors?.workAddress?.message}
                />
                <Input
                  type="number"
                  label="Monthly Income (₦)"
                  placeholder="e.g., 150000"
                  bordered
                  {...register("monthlyIncome", {
                    required: {
                      value: true,
                      message: "Monthly Income is required",
                    },
                    min: {
                      value: 1,
                      message: "Monthly Income must be greater than 0",
                    },
                  })}
                  error={errors?.monthlyIncome?.message}
                />
                <Select
                  label="Work Sector"
                  options={[
                    { text: "Private", value: "private" },
                    { text: "Government / Public", value: "government" },
                    { text: "NGO / Non-profit", value: "ngo" },
                    { text: "Self-employed", value: "self_employed" },
                  ]}
                  {...register("workSector", {
                    required: {
                      value: true,
                      message: "Work Sector is required",
                    },
                  })}
                  error={errors?.workSector?.message}
                />
                <Select
                  label="Occupation"
                  options={[
                    { text: "Accounting / Finance", value: "1" },
                    { text: "Administration", value: "2" },
                    { text: "Agriculture", value: "3" },
                    { text: "Banking", value: "4" },
                    { text: "Construction / Engineering", value: "5" },
                    { text: "Education", value: "6" },
                    { text: "Healthcare / Medical", value: "7" },
                    { text: "ICT / Technology", value: "8" },
                    { text: "Legal", value: "9" },
                    { text: "Manufacturing", value: "10" },
                    { text: "Marketing / Sales", value: "11" },
                    { text: "Media / Communications", value: "12" },
                    { text: "Oil & Gas", value: "13" },
                    { text: "Real Estate", value: "14" },
                    { text: "Security / Military", value: "15" },
                    { text: "Transport / Logistics", value: "16" },
                    { text: "Other", value: "17" },
                  ]}
                  {...register("occupationId", {
                    required: {
                      value: true,
                      message: "Occupation is required",
                    },
                  })}
                  error={errors?.occupationId?.message}
                />
                <Select
                  label="Employment Start Month"
                  options={[
                    { text: "January", value: "1" },
                    { text: "February", value: "2" },
                    { text: "March", value: "3" },
                    { text: "April", value: "4" },
                    { text: "May", value: "5" },
                    { text: "June", value: "6" },
                    { text: "July", value: "7" },
                    { text: "August", value: "8" },
                    { text: "September", value: "9" },
                    { text: "October", value: "10" },
                    { text: "November", value: "11" },
                    { text: "December", value: "12" },
                  ]}
                  {...register("startMonth", {
                    required: {
                      value: true,
                      message: "Start Month is required",
                    },
                  })}
                  error={errors?.startMonth?.message}
                />
                <Select
                  label="Employment Start Year"
                  options={Array.from({ length: 2026 - 1970 + 1 }, (_, i) => {
                    const year = 2026 - i;
                    return { text: String(year), value: String(year) };
                  })}
                  {...register("startYear", {
                    required: {
                      value: true,
                      message: "Start Year is required",
                    },
                  })}
                  error={errors?.startYear?.message}
                />
              </div>
            )}

            {currentStep?.id === "work_id" && (
              <div className="space-y-4">
                <Input
                  type="file"
                  label="Upload Work ID"
                  bordered
                  accept="image/*,.pdf"
                  {...register("workId", {
                    required: {
                      value: true,
                      message: "Work ID is required",
                    },
                  })}
                  error={errors?.workId?.message}
                />
              </div>
            )}

            {currentStep?.id === "business_info" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Business Name"
                  placeholder="Enter your business name"
                  bordered
                  {...register("businessName", {
                    required: {
                      value: true,
                      message: "Business Name is required",
                    },
                  })}
                  error={errors?.businessName?.message}
                />
                <Input
                  type="text"
                  label="Business Type"
                  placeholder="e.g., Retail, Services"
                  bordered
                  {...register("businessType", {
                    required: {
                      value: true,
                      message: "Business Type is required",
                    },
                  })}
                  error={errors?.businessType?.message}
                />
                <Input
                  type="text"
                  label="Registration Number"
                  placeholder="Enter CAC/RC number"
                  bordered
                  {...register("registrationNumber", {
                    required: {
                      value: true,
                      message: "Registration Number is required",
                    },
                  })}
                  error={errors?.registrationNumber?.message}
                />
                <Input
                  type="number"
                  label="Loan Amount (₦)"
                  placeholder="e.g., 500000"
                  bordered
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "Amount is required",
                    },
                    min: {
                      value: 150000,
                      message: "Minimum Amount is ₦150,000",
                    },
                    max: {
                      value: 1000000,
                      message: "Maximum amount is ₦1,000,000",
                    },
                  })}
                  error={errors?.amount?.message}
                />
                <Select
                  label="Duration"
                  options={durations}
                  {...register("duration", {
                    required: {
                      value: true,
                      message: "Duration is required",
                    },
                  })}
                  error={errors?.duration?.message}
                />
              </div>
            )}

            {currentStep?.id === "business_personal" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Contact Name"
                  placeholder="Enter contact full name"
                  bordered
                  {...register("contactName", {
                    required: {
                      value: true,
                      message: "Contact Name is required",
                    },
                  })}
                  error={errors?.contactName?.message}
                />
                <Input
                  type="email"
                  label="Contact Email"
                  placeholder="contact@company.com"
                  bordered
                  {...register("contactEmail", {
                    required: {
                      value: true,
                      message: "Contact Email is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  error={errors?.contactEmail?.message}
                />
                <Input
                  type="tel"
                  label="Contact Phone"
                  placeholder="e.g., 08012345678"
                  bordered
                  {...register("contactPhone", {
                    required: {
                      value: true,
                      message: "Contact Phone is required",
                    },
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Please enter a valid 11-digit phone number",
                    },
                  })}
                  error={errors?.contactPhone?.message}
                />
              </div>
            )}

            {currentStep?.id === "business_other" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Business Address"
                  placeholder="Enter your business address"
                  bordered
                  {...register("businessAddress", {
                    required: {
                      value: true,
                      message: "Business Address is required",
                    },
                  })}
                  error={errors?.businessAddress?.message}
                />
                <Input
                  type="number"
                  label="Years in Operation"
                  placeholder="e.g., 5"
                  bordered
                  {...register("yearsInOperation", {
                    required: {
                      value: true,
                      message: "Years in operation is required",
                    },
                    min: {
                      value: 1,
                      message: "Minimum is 1 year",
                    },
                  })}
                  error={errors?.yearsInOperation?.message}
                />
                <Input
                  type="number"
                  label="Annual Revenue (₦)"
                  placeholder="e.g., 10000000"
                  bordered
                  {...register("annualRevenue", {
                    required: {
                      value: true,
                      message: "Annual revenue is required",
                    },
                  })}
                  error={errors?.annualRevenue?.message}
                />
              </div>
            )}

            {currentStep?.id === "business_documents" && (
              <div className="space-y-4">
                <Input
                  type="file"
                  label="Upload CAC Document"
                  bordered
                  accept="image/*,.pdf"
                  {...register("cacDocument", {
                    required: {
                      value: true,
                      message: "CAC Document is required",
                    },
                  })}
                  error={errors?.cacDocument?.message}
                />
              </div>
            )}

            {currentStep?.id === "assets" && (
              <div className="space-y-4">
                <Select
                  label="Asset Category"
                  options={assetCategories.map((cat) => ({
                    text: cat.text,
                    value: cat.value,
                  }))}
                  {...register("assetCategory", {
                    required: {
                      value: true,
                      message: "Asset Category is required",
                    },
                  })}
                  error={errors?.assetCategory?.message}
                />
                {selectedCategory && (
                  <Select
                    label="Asset Type"
                    options={selectedCategory.types}
                    {...register("assetType", {
                      required: {
                        value: true,
                        message: "Asset Type is required",
                      },
                    })}
                    error={errors?.assetType?.message}
                  />
                )}
                <Textarea
                  label="Asset Description"
                  placeholder="Provide detailed description of your asset"
                  bordered
                  {...register("assetDescription", {
                    required: {
                      value: true,
                      message: "Asset Description is required",
                    },
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                  })}
                  error={errors?.assetDescription?.message}
                />
                <Input
                  type="number"
                  label="Asset Value (₦)"
                  placeholder="e.g., 2000000"
                  bordered
                  {...register("assetValue", {
                    required: {
                      value: true,
                      message: "Asset Value is required",
                    },
                    min: {
                      value: 100000,
                      message: "Minimum asset value is ₦100,000",
                    },
                  })}
                  error={errors?.assetValue?.message}
                />
              </div>
            )}

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
                  disabled={activeStep === 0}
                  className={`px-6 py-2 rounded-full ${
                    activeStep === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                >
                  Back
                </Button>

                {!isLastStep && (
                  <Button
                    type="button"
                    onClick={() =>
                      setActiveStep((step) =>
                        Math.min(step + 1, steps.length - 1),
                      )
                    }
                    disabled={!isStepComplete(currentStep)}
                    className={`px-6 py-2 rounded-full ${
                      isStepComplete(currentStep)
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </Button>
                )}

                {isLastStep && (
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={!canSubmit}
                    className={`px-6 py-2 rounded-full ${
                      canSubmit
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Drawer>
  );
};

export default RequestDetailsDrawer;
