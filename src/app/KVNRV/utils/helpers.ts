import { Conf, MessagesObj, STATUS_LEVELS, STATUS_LEVELS_MSG } from "./constants"
import { Footer } from "../../components/Card/Card"

export const sendUpdate = (percent: number, conf: Conf, part: string, addFunc: Function, removeFunc: Function) => {
  let level = STATUS_LEVELS.SUCCESS
  let footer: Footer = {
    message: STATUS_LEVELS_MSG[level],
    property: "Status",
    status: level,
  }

  if (percent > conf.THRESHOLDS[0]) {
    if (percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
      level = STATUS_LEVELS.WARNING
      addFunc({ part, message: conf.MESSAGES[level as keyof MessagesObj] ?? "", level: level })
      footer.status = level
      footer.message = STATUS_LEVELS_MSG[level]
    } else {
      level = STATUS_LEVELS.ALARM
      addFunc({ part, message: conf.MESSAGES[level as keyof MessagesObj], level: level })
      footer.status = level
      footer.message = STATUS_LEVELS_MSG[level]
    }
  } else {
    removeFunc(part)
  }

  return footer
}

export const normalizePower = (power: number, max: number) => {
  return Math.max(Math.min(power / max, 1), 0)
}
