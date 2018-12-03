export const BATTERY_STATE = {
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2
}

export const VEBUS_SYSTEM_STATE = {
  OFF: 0,
  LOW_POWER: 1,
  FAULT_CONDITION: 2,
  BULK_CHARGING: 3,
  ABSORPTION_CHARGINNG: 4,
  FLOAT_CHARGING: 5,
  STORAGE_MODE: 6,
  EQUALISATION_CHARGING: 7,
  PASSTHRU: 8,
  INVERTING: 9,
  ASSISTING: 10,
  DISCHARGING: 256,
  SUSTAIN: 257
}

export const AC_SOURCE = {
  NOT_AVAILABLE: 0,
  GRID: 1,
  GENSET: 2,
  SHORE: 3,
  INVERTING_ISLAND_MODE: 240
}

export const AC_SOURCE_TYPE = {
  NOT_IN_USE: 0,
  GRID: 1,
  GENERATOR: 2,
  SHORE: 3
}

export const ACTIVE_INPUT = {
  INPUT_0: 0,
  INPUT_1: 1,
  NONE: 240 // Inverting
}

export const SYSTEM_MODE = {
  CHARGER_ONLY: 1,
  INVERTER_ONLY: 2,
  ON: 3,
  OFF: 4
}
