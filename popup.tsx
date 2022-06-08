import { useStorage } from "@plasmohq/storage"

function IndexPopup() {
  const [hide, setHide] = useStorage<boolean>("hide", true)

  const toggle = () => {
    const newData = !hide
    setHide(newData)
    chrome.tabs.query({ url: "https://www.urbanoutfitters.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        if (!tab.id) return
        chrome.tabs.sendMessage(tab.id, { type: "hide", data: newData })
        console.log("Notified", tab.id)
      })
    })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 5,
        width: "100px"
      }}>
      <input checked={hide} type="checkbox" onChange={toggle} />
      <div>Hide UO MRKT Items</div>
    </div>
  )
}

export default IndexPopup
