import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  run_at: "document_idle",
  matches: ["https://www.urbanoutfitters.com/*"]
}
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (document.readyState) {
  // go to https://www.urbanoutfitters.com/mens-shoes
  // selects all the items and filters out the ones that are UO MRKT
  const grid = document.querySelector(
    'div[class="c-pwa-tile-grid s-pwa-tile-grid"]'
  )
  const observer = new MutationObserver((mlist) => {
    for (const mutation of mlist) {
      if (
        mutation.type === "attributes" &&
        mutation.target.nodeName === "P" &&
        mutation.attributeName === "class" &&
        (mutation.target as HTMLParagraphElement).className.includes(
          "c-pwa-product-text-badge"
        ) &&
        (mutation.target as HTMLParagraphElement).innerText.includes("UO MRKT")
      ) {
        const toremove =
          mutation.target.parentElement.parentElement.parentElement
        const name = (
          toremove.firstElementChild.firstElementChild.firstElementChild
            .children[1] as HTMLParagraphElement
        ).innerText
        grid.removeChild(toremove)
        console.log(`Removed ${name}`)
      }
    }
  })
  observer.observe(grid, { childList: true, attributes: true, subtree: true })
}
