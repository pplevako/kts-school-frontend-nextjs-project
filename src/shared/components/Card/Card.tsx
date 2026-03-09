import cx from 'clsx';
import Image from 'next/image';
import React from 'react';

import './Card.scss';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  ...props
}: CardProps) => {
  return (
    <div className={cx('card', className)} onClick={onClick} {...props}>
      <div className="card-header">
        <div className="card-image">
          <Image
            src={image}
            alt={typeof title === 'string' ? title : 'card image'}
            width={360}
            height={360}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="card-text">
          {captionSlot ? (
            <div className="card-caption">
              <Text view="p-14" color="secondary">
                {captionSlot}
              </Text>
            </div>
          ) : null}
          <div className="card-title">
            <Text view="p-20" maxLines={2}>
              {title}
            </Text>
          </div>
          <div className="card-description">
            <Text view="p-16" color="secondary" maxLines={3}>
              {subtitle}
            </Text>
          </div>
        </div>
        {contentSlot || actionSlot ? (
          <div className="card-footer">
            <div className="card-content">
              <Text view="p-18" weight="bold">
                {contentSlot}
              </Text>
            </div>
            <div className="card-action">{actionSlot}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
