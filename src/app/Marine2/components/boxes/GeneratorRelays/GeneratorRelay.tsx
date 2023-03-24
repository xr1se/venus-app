import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { translate } from "react-i18nify"
import { formatPower } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"
import { useActiveInValues } from "@elninotech/mfd-modules"
import Button from "../../ui/Button"
import ValueBox from "../../ui/ValueBox"

const GeneratorRelay = ({
  statusCode,
  active,
  phases = 1,
  manualStart,
  autoStart,
  relayFunction,
  updateManualMode,
  updateAutoMode,
  mode = "compact",
}: Props) => {
  const getGeneratorState = (statusCode: number, active: boolean, phases: number) => {
    if (active) {
      return phases > 1 ? translate("common.nrOfPhases", { phases }) : translate("common.running")
    }

    switch (statusCode) {
      case 1:
        return translate("common.running")
      case 10:
        return translate("common.error")
      default:
        return translate("common.stopped")
    }
  }

  const title = translate("widgets.generator")
  const subTitle = getGeneratorState(statusCode, active ?? false, phases)

  const { current, voltage, power } = useActiveInValues()
  const powerSum = active
    ? power.reduce((sum: number, b) => {
        return b ? sum + b : sum
      }, 0)
    : 0
  const powerFormatted = formatPower(powerSum)
  const unit = powerSum > 1000 ? "kW" : "W"

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V" },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W" },
    ])
  }

  if (mode === "compact") {
    return (
      <DeviceCompact
        icon={
          <GeneratorIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7"}
          ></GeneratorIcon>
        }
        title={title}
        subTitle={subTitle}
        value={powerFormatted}
        unit={unit}
      />
    )
  }

  return (
    <ValueBox
      icon={
        <GeneratorIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-7"}
        ></GeneratorIcon>
      }
      title={title}
      buttons={
        <Button size="md" className="flex-none mt-3 w-full" disabled={!autoStart}>
          {translate("common.autoStartStop")}
        </Button>
      }
      unit={"A"}
      value={current[0]} //TODO: get update to design for what should be shown when there are multiple phases
      bottomValues={phasesOverview}
      infoText={
        !autoStart
          ? {
              title: "Button disabled",
              body: "Enable button functionality through genset panel",
            }
          : undefined
      }
    >
      {subTitle}
    </ValueBox>
  )
}

interface Props {
  statusCode: number
  phases?: number
  manualStart: number
  autoStart: number
  relayFunction: number
  updateManualMode: Function
  updateAutoMode: Function
  active?: boolean
  mode?: "compact" | "full"
}

export default observer(GeneratorRelay)
