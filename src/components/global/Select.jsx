import { forwardRef } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { IconChevronDown } from '@tabler/icons-react';

const Select = forwardRef((
  { id, label, options, disabled, error, loading = false, bordered = false, placeholder, ...props }, ref
) => {
  return (
    <div className="flex flex-col">
      {!!label && <label htmlFor={id} className="text-sm mb-1">{label}</label>}
      <div className="relative">
        <select
          className={classNames(
            "px-4 py-3 rounded-md w-full appearance-none pr-12 transition duration-300",
            { 'opacity-60 pointer-events-none': disabled },
            { 'bg-transparent border border-gray-400 focus:border-primary-600': bordered },
            { 'bg-gray-100 focus:ring-2 ring-offset-2 ring-primary-800 ring-opacity-30': !bordered },
          )}
          id={id} {...props} ref={ref}
        >
          {
            loading
              ? <option value="" disabled>Loading..</option>
              : (
                <>
                  {
                    !!placeholder && <option value="">{placeholder}</option>
                  }
                  <option value="">Please select an option</option>
                  {
                    options.map(option => (
                      <>
                        <option key={option.value} value={option.value}>{option.text}</option>
                      </>
                    ))
                  }
                </>
              )
          }
        </select>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-md flex items-center justify-center pointer-events-none"
        >
          <IconChevronDown />
        </div>
      </div>
      {
        !!error && <div className="text-sm text-red-500 mt-1">{error}</div>
      }
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
}

export default Select;
