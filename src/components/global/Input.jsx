import React, { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    { label, rightIcon, id, error, disabled, bordered = false, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        {!!label && (
          <label htmlFor={id} className="mb-1 text-sm">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            className={classNames(
              'w-full rounded-md px-4 py-3 transition duration-300',
              { 'pr-12': !!rightIcon },
              { 'pointer-events-none opacity-60': disabled },
              {
                'focus:border-primary-600 border border-gray-400 bg-transparent':
                  bordered,
              },
              {
                'ring-primary-800 bg-gray-100 ring-opacity-30 ring-offset-2 focus:ring-2':
                  !bordered,
              }
            )}
            id={id}
            {...props}
            ref={ref}
          />
          {!!rightIcon && (
            <div className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md">
              {rightIcon}
            </div>
          )}
        </div>
        {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  rightIcon: PropTypes.element,
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
