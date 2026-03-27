import cx from 'clsx';
import * as React from 'react';
import './Text.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-32' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const classNames = cx('text', className, {
    [`text-view-${view}`]: view,
    [`text-weight-${weight}`]: weight,
    [`text-color-${color}`]: color,
    'text-max-lines': maxLines,
  });
  const maxLinesStyle = maxLines
    ? {
        WebkitLineClamp: maxLines,
        lineClamp: maxLines,
      }
    : undefined;

  return (
    <Tag className={classNames} style={maxLinesStyle}>
      {children}
    </Tag>
  );
};

export default Text;
