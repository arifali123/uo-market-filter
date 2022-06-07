import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  run_at: "document_idle",
  matches: ["https://www.urbanoutfitters.com/*"],
  // match_origin_as_fallback: false,
  match_about_blank: false,
  all_frames: true
}
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (document.readyState) {
  // go to https://www.urbanoutfitters.com/mens-shoes
  // selects all the items and filters out the ones that are UO MRKT

  const grid = document.querySelector(
    'div[class="c-pwa-tile-grid s-pwa-tile-grid"]'
  )
  function removeItem(item: Node | Element) {
    const toremove = item.parentElement.parentElement.parentElement
    const name = (
      toremove.querySelector(
        'p[class="o-pwa-product-tile__heading"]'
      ) as HTMLParagraphElement
    ).innerText
    grid.removeChild(toremove)
    console.log(`Removed ${name}`)
  }

  setInterval(
    (function filter() {
      const initial = grid.querySelectorAll(
        'p[class="c-pwa-product-text-badge"]'
      )
      for (const item of initial) {
        if ((item as HTMLParagraphElement).innerText.includes("UO MRKT")) {
          removeItem(item)
        }
      }
      return filter
    })(),
    5000
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
        removeItem(mutation.target)
      }
    }
  })
  observer.observe(grid, { childList: true, attributes: true, subtree: true })
}
