import React from "react"
import Grid, { GridProps } from "../Grid"
import range from "lodash-es/range"
import classnames from "classnames"
import PageFlipper from "../PageFlipper"

const GridPaginator = ({
  children,
  className,
  childClassName,
  flow,
  forceOneDimensionRatio,
  onClick,
  childrenPerPage,
  orientation = "horizontal",
}: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const pages = Math.ceil(childrenArray.length / childrenPerPage)

  if (pages === 1) {
    return (
      <Grid childClassName={childClassName} flow={flow} className={className}>
        {childrenArray}
      </Grid>
    )
  }
  return (
    <div className={"h-full w-full min-h-0 min-w-0"}>
      <PageFlipper pages={pages}>
        <div
          className={classnames(`flex`, {
            "flex-col": orientation === "vertical",
          })}
          style={{
            width: orientation === "horizontal" ? `${pages}00%` : "100%",
            height: orientation === "vertical" ? `${pages}00%` : "100%",
          }}
        >
          {range(pages).map((page) => {
            console.log(childrenArray.slice(page * childrenPerPage, (page + 1) * childrenPerPage))
            return (
              <Grid
                key={page}
                className={className}
                childClassName={childClassName}
                flow={flow}
                forceOneDimensionRatio={forceOneDimensionRatio}
                onClick={onClick}
              >
                {childrenArray.slice(page * childrenPerPage, (page + 1) * childrenPerPage)}
              </Grid>
            )
          })}
        </div>
      </PageFlipper>
    </div>
  )
}

interface Props extends GridProps {
  childrenPerPage: number
  orientation?: "vertical" | "horizontal"
}

export default GridPaginator
