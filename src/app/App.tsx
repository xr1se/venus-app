import { useAppStore, useMqtt, useVebus, useVrmStore } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import React, { useEffect } from "react"
import "../css/index.scss"
import { getLocale } from "react-i18nify"
import Loading from "./MarineApp/components/Loading"
import { useVisibleWidgetsStore } from "./MarineApp/modules"
import { ErrorModal } from "./MarineApp/components/ErrorModal"

const KVNRV = React.lazy(() => import("./KVNRV"))
const MarineApp = React.lazy(() => import("./MarineApp"))
const Marine2 = React.lazy(() => import("./Marine2"))

export type AppProps = {
  host: string
  port: number
}

const App = observer((props: AppProps) => {
  const whitelabel = process.env.REACT_APP_WHITELABEL
  const vrmStore = useVrmStore()
  const appStore = useAppStore()
  const mqtt = useMqtt()
  const locale = getLocale()
  const visibleWidgetsStore = useVisibleWidgetsStore()
  useVebus()

  useEffect(() => {
    if (!appStore.remote) {
      mqtt.boot(props.host, props.port)
    } else if (
      appStore.remote &&
      vrmStore?.username &&
      vrmStore?.token &&
      vrmStore?.webhost &&
      vrmStore?.portalId &&
      vrmStore?.siteId
    ) {
      mqtt.boot(vrmStore.webhost, null, true, vrmStore.username, vrmStore.token, vrmStore.portalId, "live")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.host,
    props.port,
    appStore.remote,
    appStore.language,
    vrmStore.username,
    vrmStore.token,
    vrmStore.webhost,
    vrmStore.portalId,
    vrmStore.siteId,
    locale,
  ])

  useEffect(() => {
    visibleWidgetsStore.clearVisibleElements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  switch (whitelabel) {
    case "KVNRV":
      return (
        <React.Suspense fallback={<Loading />}>
          <KVNRV {...props} />
        </React.Suspense>
      )
    case "Marine2":
      return (
        <React.Suspense fallback={<Loading />}>
          <Marine2 {...props} />
        </React.Suspense>
      )
    default:
      return (
        <React.Suspense fallback={<Loading />}>
          <MarineApp {...props} />
          <ErrorModal />
        </React.Suspense>
      )
  }
})

export default App
