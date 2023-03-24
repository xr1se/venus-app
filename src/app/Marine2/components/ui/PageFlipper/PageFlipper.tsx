import PageSelector, { PageSelectorProps } from "../PageSelector"
import classnames from "classnames"
import React, { useState, useRef, useEffect } from "react"
import useSize from "@react-hook/size"

const PageFlipper = ({ children, pageSelectorPropsSetter, pages, currentPageSetter, startingPage }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)
  const [currentPage, setCurrentPage] = useState(startingPage ?? 0)

  useEffect(() => {
    if (pageSelectorPropsSetter) {
      pageSelectorPropsSetter({
        onClickLeft: () => setCurrentPage(currentPage - 1),
        onClickRight: () => setCurrentPage(currentPage + 1),
        currentPage: currentPage,
        maxPages: pages,
      })
    }
  }, [currentPage, pageSelectorPropsSetter, pages])

  useEffect(() => {
    if (!pageRef.current) {
      return
    }
    if (typeof pageRef.current.scrollTo !== "function") {
      pageRef.current.scrollLeft = currentPage * pageRef.current.offsetWidth
      return
    }

    pageRef.current.scrollTo({
      left: currentPage * pageRef.current.offsetWidth,
      behavior: "smooth",
    })
  }, [width, height, currentPage])

  useEffect(() => {
    if (!currentPageSetter) return
    currentPageSetter(currentPage)
  }, [currentPage, currentPageSetter])

  return (
    <div
      ref={wrapperRef}
      className={classnames("w-full h-full", {
        "flex flex-col justify-between": !pageSelectorPropsSetter,
      })}
    >
      <div
        ref={pageRef}
        className={classnames("overflow-hidden w-full", {
          "h-[calc(100%-3.5rem)]": !pageSelectorPropsSetter,
          "h-full": !!pageSelectorPropsSetter,
        })}
      >
        {children}
      </div>
      {!pageSelectorPropsSetter && (
        <PageSelector
          onClickLeft={() => {
            setCurrentPage(currentPage - 1)
          }}
          onClickRight={() => {
            setCurrentPage(currentPage + 1)
          }}
          currentPage={currentPage}
          maxPages={pages}
        ></PageSelector>
      )}
    </div>
  )
}

interface Props {
  children: JSX.Element
  pages: number
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
  currentPageSetter?: (arg0: number) => void
  startingPage?: number
}

export default PageFlipper
