import { useEffect, useRef } from "react";

let CcEligibilityWidget;

if (typeof window !== "undefined") {
  // Client-side-only code
  CcEligibilityWidget = { ...window.CcEligibilityWidget };
}
const useEligibility = ({ data, onReady, onCancel, onOffer, onCompleted }) => {
  const widget = useRef();

  useEffect(() => {
    widget.current = CcEligibilityWidget.init({
      data,
      onReady: (args) => {
        if (onReady) onReady(args);
      },
      onOffer: (offer) => {
        if (onOffer) onOffer(offer);
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
  }, [onCancel, onCompleted, onReady, onCancel, CcEligibilityWidget]);

  const launch = () => {
    widget.current.open();
  };

  return { launch };
};

export default useEligibility;