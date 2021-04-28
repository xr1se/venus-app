import React, { FunctionComponent } from "react"

import { STATUS_LEVELS_MSG } from "../Views/Metrics"

export type Footer = {
  status: string,
  property: string,
}

type CardProps = {
  title: string,
  size: string | Array<string>,
  icon?: string,
  footer?: Footer
}

export const SIZE_SMALL = 'small';
export const SIZE_BIG = 'big';
export const SIZE_LONG = 'long';

export const Card: FunctionComponent<CardProps> = ({ title, size, icon, footer , children }) => {
  return (
    <div className={"card " + (Array.isArray(size) ? size.join(" ") : size)}>
      <div className={"contents"}>
        <div className="header row">
          <div className="header__text">
            {title}
          </div>
          {icon && (
            <div className='header__icon'>
              <img src={icon} alt={"Card icon"} />
            </div>
          )}
        </div>

        <div className="body">
          {children}
        </div>
      </div>

      {footer && (
        <div className={"footer " + footer.status}>
          <span>{footer.property}: </span>
          <span>{STATUS_LEVELS_MSG[footer.status]}</span>
        </div>
      )}
    </div>
  )
}
