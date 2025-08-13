import { useState } from "react";
import Button from "@/components/global/Button";
import Drawer from "@/components/global/Drawer";
import Input from "@/components/global/Input";
import Select from "@/components/global/Select";
import { Textarea } from "../global/textarea";

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

const RequestDetailsDrawer = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  handleSubmit,
  errors,
  isLoading,
  watch,
}) => {
  const [activeTab, setActiveTab] = useState("bio");

  const watchedAssetCategory = watch?.("assetCategory");
  const selectedCategory = assetCategories.find(
    (cat) => cat.value === watchedAssetCategory
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Check if Bio tab is complete
  const isBioComplete = () => {
    const bioFields = watch?.();
    return (
      bioFields?.name &&
      bioFields?.phone &&
      bioFields?.email &&
      bioFields?.address &&
      bioFields?.amount &&
      bioFields?.duration
    );
  };

  // Check if Asset Declaration tab is complete
  const isAssetComplete = () => {
    const assetFields = watch?.();
    return (
      assetFields?.assetCategory &&
      assetFields?.assetType &&
      assetFields?.assetDescription &&
      assetFields?.assetValue
    );
  };

  const canSubmit = isBioComplete() && isAssetComplete();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Application">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
          <button
            type="button"
            onClick={() => handleTabChange("bio")}
            className={`flex-1 py-2 px-4 rounded-2xl text-sm font-medium transition-colors duration-200 ${
              activeTab === "bio"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Bio Data</span>
              {isBioComplete() && <span className="text-green-500">✓</span>}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("assets")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeTab === "assets"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Asset Declaration</span>
              {isAssetComplete() && <span className="text-green-500">✓</span>}
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Bio Data Tab */}
          {activeTab === "bio" && (
            <div className="space-y-6">
              <div className="">
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
                    placeholder="your.email@company.com (work email required)"
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
                    type="text"
                    label="Home Address"
                    placeholder="Enter your complete home address"
                    bordered
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Home Address is required",
                      },
                    })}
                    error={errors?.address?.message}
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
              </div>
            </div>
          )}

          {/* Asset Declaration Tab */}
          {activeTab === "assets" && (
            <div className="space-y-6">
              <div className="">
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
              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              {activeTab === "assets" && (
                <Button
                  type="button"
                  onClick={() => setActiveTab("bio")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
                >
                  Previous
                </Button>
              )}

              {activeTab === "bio" && (
                <Button
                  type="button"
                  onClick={() => setActiveTab("assets")}
                  disabled={!isBioComplete()}
                  className={`px-6 py-2 rounded-full ${
                    isBioComplete()
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Proceed
                </Button>
              )}

              {activeTab === "assets" && (
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
        </form>
      </div>
    </Drawer>
  );
};

export default RequestDetailsDrawer;
