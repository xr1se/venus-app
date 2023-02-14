import React from "react"
import classNames from "classnames"

interface Props {
  selected?: boolean
  disabled?: boolean
  color?: string
  onChange: () => void
}

const RadioButton: React.FC<Props> = ({ selected, onChange, disabled }) => {
  return (
    <div>
      <div
        onClick={() => !disabled && onChange()}
        className={classNames("w-4 h-4 border-[1px] bg-inherit rounded-full", {
          "border-victron-gray": !selected,
          "border-victron-blue": selected,
          "md-l:w-6 md-l:h-6 md-l:border-2": true, // large
          "sm-s:w-4 sm-s:h-4 :border-[1px]": true, // small
        })}
      >
        {selected && (
          <div
            className={classNames("w-2 h-2 mt-[3px] ml-[3px] rounded-full bg-victron-blue", {
              "md-l:w-4 md-l:h-4 md-l:mt-[2px] md-l:ml-[2px]": true, // large
              "sm-s:w-2 sm-s:h-2 sm-s:mt-[3px] sm-s:ml-[3px]": true, // small
            })}
          ></div>
        )}
      </div>
    </div>
  )
}

export default RadioButton
