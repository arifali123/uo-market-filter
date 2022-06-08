import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoContentScript = {
  run_at: "document_idle",
  matches: ["https://www.urbanoutfitters.com/*"]
}

const storage = new Storage()
let state = false

storage.get<boolean>("hide").then((s) => {
  state = s
})

chrome.runtime.onMessage.addListener((message) => {
  console.log("Got hide toggle request", message)
  if (message.type === "hide" && typeof message.data == "boolean") {
    state = message.data
  }
})

const observer = new MutationObserver((mutations) => {
  if (!state) return

  mutations.forEach((mutation) => {
    const target = mutation.target
    if (
      target instanceof HTMLParagraphElement &&
      target.className == "c-pwa-product-text-badge" &&
      target.innerText == "UO MRKT"
    ) {
      const parent = target.parentElement?.parentElement?.parentElement
      if (!parent) {
        console.log("Failed to find parent")
        return
      }
      const name = parent.querySelector(".o-pwa-product-tile__heading")!
        .textContent!
      console.log("Removing", name.trim())
      parent.remove()
    }
  })
})

observer.observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true
})
