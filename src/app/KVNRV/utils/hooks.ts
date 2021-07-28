export const useContainerColors = () => {
  const selected = document.querySelector("#root > .container")
  if (selected) {
    const container = getComputedStyle(selected as Element)

    const colorGray = container.getPropertyValue("--color-lightgray")
    const colorRed = container.getPropertyValue("--color-red")
    const colorYellow = container.getPropertyValue("--color-yellow")
    const colorGreen = container.getPropertyValue("--color-green")
    const textColor = container.getPropertyValue("--text-color-main")

    return { colorGray, colorRed, colorYellow, colorGreen, textColor, colorTransparent: "rgba(0,0,0,0)" }
  }

  return {
    colorGray: "#000",
    colorRed: "#000",
    colorYellow: "#000",
    colorGreen: "#000",
    textColor: "#000",
    colorTransparent: "#000",
  }
}
