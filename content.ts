import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  run_at: "document_idle",
  matches: ["https://www.urbanoutfitters.com/*"]
}
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (document.readyState) {
  // go to https://www.urbanoutfitters.com/mens-shoes
  // selects all the items and filters out the ones that are UO MRKT
  const items = document.querySelectorAll('div[class="c-pwa-tile-grid-inner"]')
  //   console.log(items)
  console.log(items)
  for (const item of items) {
    if (item.textContent.includes("UO MRKT")) {
      console.log(item)
      // item.remove() when I can get filtering working
    }
  }
}
