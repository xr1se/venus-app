import React  from "react"
import { Card, SIZE_SMALL } from "../Card"
import DonutIndicator from "../DonutIndicator"
import { useDcLoads } from "../../../modules/DcLoads"
import { DC_CONF, PV_CONF } from "../../constants/constants"
import "./DcLoads.scss"
import { NotAvailable } from "../NotAvailable"

export const DcLoads = () => {
  const {voltage, power} = useDcLoads()

  let normalized_power = (power || 0) / DC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={'DC Loads'} size={SIZE_SMALL}>
        <div className="gauge">
          {power ? (
            <DonutIndicator value={power} percent={normalized_power} parts={DC_CONF.THRESHOLDS} unit={"W"} />
          ) : ( <NotAvailable /> )}

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>{(voltage || '--') + " A"}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DcLoads
