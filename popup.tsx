import { useStorage } from "@plasmohq/storage"

function IndexPopup() {
  const [data, setData] = useStorage<boolean>("hide", true)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 5,
        width: "100px"
      }}>
      <input
        checked={data}
        type="checkbox"
        onChange={async () => {
          setData(!data)
        }}
      />
      <div>Hide UO MRKT Items</div>
    </div>
  )
}

export default IndexPopup
