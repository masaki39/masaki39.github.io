import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const AfterBodyWebring: QuartzComponent = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "1rem 0" }}>
      <script src="https://at-circle.asadaame5121.net/nav/widget.js"></script>
      <webring-nav
        site="https://masaki39.github.io"
        ring="at://did:plc:ql5sv4umsrxadcsgtz3m5mq6/net.asadaame5121.at-circle.ring/3may2rxuhyp24"
        label-title="Obsidian部"
      ></webring-nav>
    </div>
  )

  return AfterBodyWebring
}) satisfies QuartzComponentConstructor
