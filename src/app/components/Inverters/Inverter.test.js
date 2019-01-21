import { Inverter } from "./Inverter"
import { shallow } from "enzyme"
import React from "react"

describe("Inverter", () => {
  it("exists as a regular inverter", () => {
    const wrapper = shallow(<Inverter isVebusInverter={false} />)
    expect(wrapper.type()).toBe("div")
  })

  it("exist as nonVebusInverter with 0 AC inputs", () => {
    const wrapper = shallow(<Inverter isVebusInverter={true} nAcInputs={0} />)
    expect(wrapper.type()).toBe("div")
  })

  it("not exist nonVebusInverter with 1 AC input", () => {
    const wrapper = shallow(<Inverter isVebusInverter={true} nAcInputs={1} />)
    expect(wrapper.type()).toBe(null)
  })
})
