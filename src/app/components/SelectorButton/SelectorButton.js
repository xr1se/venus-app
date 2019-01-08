import React, { Component } from "react"
import classNames from "classnames"

// Keep as class component to allow refs
class SelectorButton extends Component {
  render() {
    const { disabled, active, onClick, className, children } = this.props
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={classNames("selector-button", "text", { "selector-button--active": active }, className || "")}
      >
        <span>{children}</span>
      </button>
    )
  }
}

export default SelectorButton
