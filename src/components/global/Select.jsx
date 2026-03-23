import { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IconChevronDown } from '@tabler/icons-react';

const Select = forwardRef(
  (
    {
      id,
      label,
      options,
      disabled,
      error,
      loading = false,
      bordered = false,
      placeholder,
      ...props
    },
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
          <select
            className={classNames(
              'w-full appearance-none rounded-md px-4 py-3 pr-12 transition duration-300',
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
          >
            {loading ? (
              <option value="" disabled>
                Loading..
              </option>
            ) : (
              <>
                {!!placeholder && <option value="">{placeholder}</option>}
                <option value="">Please select an option</option>
                {options.map((option) => (
                  <>
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  </>
                ))}
              </>
            )}
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md">
            <IconChevronDown />
          </div>
        </div>
        {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Select;
