import Box from "../../ui/Box"
import DevicesIcon from "../../../images/icons/devices.svg"
import { AppViews } from "../../../modules/AppViews"
import { observer } from "mobx-react"
import { translate } from "react-i18nify"
import {
  ChargerInstanceId,
  GeneratorFpProvider,
  GeneratorRelayProvider,
  InstanceId,
  InverterInstanceId,
  useChargers,
  useGeneratorFp,
  useGeneratorRelay,
  useInverters,
  useVebus,
  VebusInverters,
} from "@victronenergy/mfd-modules"
import Charger from "../Charger"
import Inverter from "../Inverter"
import GeneratorFp from "../GeneratorFp"
import InverterCharger from "../InverterCharger"
import { useVisibilityNotifier } from "../../../modules"
import { AC_SOURCE, BoxTypes, RELAY_FUNCTION } from "../../../utils/constants"
import { PageSelectorProps } from "../../ui/PageSelector"
import GridPaginator from "../../ui/GridPaginator"
import React from "react"
import GeneratorRelay from "../GeneratorRelay/GeneratorRelay"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import classNames from "classnames"
import { ComponentMode } from "@m2Types/generic/component-mode"

const DevicesOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  const { inverters } = useInverters()
  const { instanceId, vebusInverters } = useVebus()
  const { chargers } = useChargers()
  const generatorFp = useGeneratorFp()
  const generatorRelay = useGeneratorRelay()
  const [compactBoxSize, setCompactBoxSize] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 })

  const boxes = getAvailableDeviceBoxes(
    chargers,
    inverters,
    vebusInverters,
    instanceId,
    generatorFp,
    generatorRelay,
    compactBoxSize,
    componentMode
  )

  useVisibilityNotifier({ widgetName: BoxTypes.DEVICES, visible: !!boxes.length })

  if (!boxes.length) {
    return null
  }

  const activeStyles = applyStyles(compactBoxSize, defaultBoxStyles)
  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.devices")}
        icon={
          <DevicesIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.icon)}
          />
        }
        linkedView={AppViews.BOX_DEVICES_OVERVIEW}
        getBoxSizeCallback={setCompactBoxSize}
        withPagination={true}
        paginationOrientation={"vertical"}
      >
        {boxes}
      </Box>
    )
  }

  return (
    <GridPaginator
      childClassName={"p-1"}
      perPage={4}
      orientation={"horizontal"}
      pageSelectorPropsSetter={pageSelectorPropsSetter}
      flow={window.innerWidth > window.innerHeight ? "row" : "col"}
    >
      {boxes}
    </GridPaginator>
  )
}

const getAvailableDeviceBoxes = function (
  chargers: ChargerInstanceId[],
  inverters: InverterInstanceId[],
  vebusInverters: VebusInverters,
  instanceId: InstanceId,
  generatorFp: GeneratorFpProvider,
  generatorRelay: GeneratorRelayProvider,
  compactBoxSize: { width: number; height: number },
  componentMode?: ComponentMode
) {
  let devices = []

  if (!!chargers) {
    chargers.forEach((charger) => {
      devices.push(
        <Charger key={charger} instanceId={charger} componentMode={componentMode} compactBoxSize={compactBoxSize} />
      )
    })
  }

  if (!!inverters) {
    inverters.forEach((id) => {
      devices.push(
        <Inverter
          key={id}
          instanceId={id}
          isVebusInverter={false}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    })
  }

  if (!!vebusInverters.length) {
    vebusInverters.forEach((id) => {
      devices.push(
        <Inverter
          key={id}
          instanceId={id}
          isVebusInverter={true}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    })
  }

  if (!!instanceId) {
    devices.push(<InverterCharger key={instanceId} componentMode={componentMode} compactBoxSize={compactBoxSize} />)
  }

  if (!!generatorFp.phases)
    devices.push(
      <GeneratorFp
        key={"generatorFp"}
        generatorFp={generatorFp}
        componentMode={componentMode}
        compactBoxSize={compactBoxSize}
      />
    )
  if (!!generatorRelay.settings) {
    if (generatorRelay.settings.includes(AC_SOURCE.GENERATOR)) {
      generatorRelay.settings.forEach((source: number, i: number) => {
        if (source === AC_SOURCE.GENERATOR)
          devices.push(
            <GeneratorRelay
              key={"generator_relay" + i}
              {...generatorRelay}
              active={generatorRelay.activeInput === i}
              componentMode={componentMode}
              compactBoxSize={compactBoxSize}
            />
          )
      })
    } else if (
      generatorRelay.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP &&
      generatorRelay.statusCode !== undefined
    ) {
      devices.push(
        <GeneratorRelay
          key={"generator_relay"}
          {...generatorRelay}
          componentMode={componentMode}
          compactBoxSize={compactBoxSize}
        />
      )
    }
  }
  return devices
}

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default observer(DevicesOverview)
