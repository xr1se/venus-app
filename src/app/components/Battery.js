import { h, Component } from "preact"
import NumericValue from "./NumericValue"

class Battery extends Component {
  render(props, state) {
    const showTimetoGo = props.state === "Discharging"
    return (
      <div className="metric metric__container metric__battery">
        <div className="metric__container--left">
          <img src="./images/icons/battery.svg" className="metric__icon" />
          <div className="metric__value-container">
            <p className="text text--medium">Battery</p>
            <div className="metric__values">
              <NumericValue value={props.voltage} unit="V" precision={1} />
              <NumericValue value={props.current} unit="A" precision={1} />
              <NumericValue value={props.power} unit="W" />
            </div>
          </div>
        </div>
        <div
          className={"metric__battery-level-container" + (showTimetoGo ? " metric__battery-level-container--col" : "")}
        >
          <div className="text--bottom-align">
            <p className="text text--bold text--large">{props.soc ? props.soc : ""}</p>
            <p className="text text--small metric__battery-state">
              {props.soc ? "%" : ""}
              &nbsp;
              {!showTimetoGo ? props.state || "" : ""}
            </p>
          </div>
          {showTimetoGo && props.timeToGo ? <p className="text text--small">{props.timeToGo}</p> : ""}
        </div>
      </div>
    )
  }
}

export default Battery
