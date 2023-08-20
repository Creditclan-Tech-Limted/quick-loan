import React, { forwardRef } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";

const Input = forwardRef(({ label, rightIcon, id, error, disabled, bordered = false, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      {
        !!label && <label htmlFor={ id } className="text-sm mb-1">{ label }</label>
      }
      <div className="relative">
        <input
          className={ classNames(
            "px-4 py-3 rounded-md w-full transition duration-300",
            { 'pr-12': !!rightIcon },
            { 'opacity-60 pointer-events-none': disabled },
            { 'bg-transparent border border-gray-400 focus:border-primary-600': bordered },
            { 'bg-gray-100 focus:ring-2 ring-offset-2 ring-primary-800 ring-opacity-30': !bordered }
          ) }
          id={ id } { ...props } ref={ ref }
        />
        {
          !!rightIcon && (
            <div
              className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-md flex items-center justify-center"
            >
              { rightIcon }
            </div>
          )
        }
      </div>
      {
        !!error && <div className="text-sm text-red-500 mt-1">{ error }</div>
      }
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  rightIcon: PropTypes.element,
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
}

export default Input;
