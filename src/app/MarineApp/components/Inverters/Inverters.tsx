import React from "react"

import { useInverters, useVebus } from "@elninotech/mfd-modules"

import Inverter from "./Inverter"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"

const Inverters = observer(() => {
  const { inverters } = useInverters()
  const { instanceId } = useVebus()
  const visible = !!(inverters.length || instanceId)

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.INVERTERS, visible })

  if (visible) {
    return (
      <>
        {inverters && inverters.map((id) => <Inverter key={id} instanceId={id} isVebusInverter={false} />)}
        {instanceId && <Inverter key={instanceId} instanceId={instanceId} isVebusInverter={true} />}
      </>
    )
  } else {
    return null
  }
})

export default Inverters