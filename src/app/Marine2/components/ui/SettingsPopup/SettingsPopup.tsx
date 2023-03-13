import React, { ReactNode, useState } from "react"
import { Modal } from "../Modal"
import Button from "../Button"
import classnames from "classnames"

interface Props {
  children: ReactNode
  title?: string
  className?: string
}
const Frame = ({ children, title, className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className={classnames(className)}>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>{title}</Button>
      </div>
      <Modal.Frame
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        className="w-full max-w-sm border-victron-gray-200 border-2"
      >
        <Modal.Body>{children}</Modal.Body>
      </Modal.Frame>
    </>
  )
}

const Header: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={classnames("text-md text-center", className)}>{children}</div>
)
const Body: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={classnames("flex flex-col text-sm mb-2 dark:text-white md:mb-4 md-m:text-base p-4", className)}>
    {children}
  </div>
)

const Footer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={classnames("w-full flex flex-row justify-between", className)}>{children}</div>
)

const SettingsPopup = { Frame, Header, Body, Footer }
export default SettingsPopup
