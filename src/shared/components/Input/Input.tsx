import cx from 'clsx';
import React, { useId } from 'react';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, id, ...props }, ref) => {
    const generatedId = useId();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
    return (
      <div className={cx('input-container', className)} data-has-icon={!!afterSlot}>
        <input
          type="text"
          id={id ?? generatedId}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {afterSlot && <span className="input-icon">{afterSlot}</span>}
      </div>
    );
  }
);

export default Input;
