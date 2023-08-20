'use client'
import React, { useEffect, useRef } from "react";

const LaunchEligibilityWidget = ({
  children,
  request,
  onReady,
  onCancel,
  onCompleted,
  className,
}) => {
  const widget = useRef();
  
  useEffect(() => {
    const CcEligibilityWidget = window.CcEligibilityWidget;
    widget.current = CcEligibilityWidget.init({
      data: {
        intro: "Happy to fund you",
        banner:
          "https://i.ibb.co/pr1BLgq/house-in-hand.jpg",
        request: {
          amount: request.amount,
          tenor: 12,
          tenor_type: 2,
        },
        profile: {
          full_name: request.full_name,
          email: request.email,
          phone: request.phone,
          date_of_birth: null,
          gender: null,
        },
        config: {
          show_bank_account: true,
          show_address: true,
          show_income: true,
          analyze_bank_statement: true,
          show_profile: true,
          show_offers: false,
          show_nok: true,
          show_attachement: false
        },
        extra: {
          rent_id: request.id,
          tenant_id: request.tenant_id,
        },
      },
      onReady: (args) => {
        if (onReady) onReady(args);
      },
      onCancel: (args) => {
        if (onCancel) onCancel(args);
        widget.current.close();
      },
      onCompleted: (args) => {
        if (onCompleted) onCompleted(args);
        widget.current.close();
      },
    });
  }, [onCancel, onCompleted, onReady, request]);

  const handleClick = () => {
    widget.current.open();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

export default LaunchEligibilityWidget;
