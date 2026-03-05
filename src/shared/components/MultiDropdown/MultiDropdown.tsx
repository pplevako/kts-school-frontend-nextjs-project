import cx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

import './MultiDropdown.scss';
import Input from '../Input';
import Text from '../Text';
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (val: string) => {
    if (disabled) {
      return;
    }
    setSearchValue(val);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    if (disabled) {
      return;
    }
    setIsOpen(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchValue('');
    }
  };

  const handleOptionClick = (option: Option) => {
    if (disabled) {
      return;
    }
    const isSelected = value.some((v) => v.key === option.key);
    const newValue = isSelected ? value.filter((v) => v.key !== option.key) : [...value, option];
    onChange(newValue);
  };

  const handleIconClick = () => {
    if (disabled) {
      return;
    }
    inputRef.current?.focus();
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  let inputValue: string;

  if (isOpen) {
    inputValue = searchValue;
  } else {
    if (value.length === 0) {
      inputValue = '';
    } else {
      inputValue = getTitle(value);
    }
  }

  return (
    <div className={cx('multi-dropdown', className)} ref={rootRef}>
      <Input
        ref={inputRef}
        className="multi-dropdown-input"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        disabled={disabled}
        placeholder={getTitle(value)}
        afterSlot={
          <ArrowDownIcon
            className={cx('multi-dropdown-icon', { 'multi-dropdown-icon-disabled': disabled })}
            color="secondary"
            onClick={handleIconClick}
          />
        }
      />
      {isOpen && !disabled && filteredOptions.length > 0 && (
        <ul className="multi-dropdown-options" onMouseDown={(e) => e.stopPropagation()}>
          {filteredOptions.map((option) => {
            const selected = value.some((v) => v.key === option.key);
            return (
              <li
                key={option.key}
                className="multi-dropdown-option"
                onClick={() => handleOptionClick(option)}
              >
                <Text view="p-16" color={selected ? 'accent' : 'primary'}>
                  {option.value}
                </Text>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
