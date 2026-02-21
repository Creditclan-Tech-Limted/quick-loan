import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ label, id, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {!!label && (
        <label htmlFor={id} className="text-sm mb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

Textarea.propTypes = {
  className: PropTypes.string,
};

export { Textarea };
