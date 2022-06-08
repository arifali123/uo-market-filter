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

const getProductFromBadge = (badge: HTMLParagraphElement) => {
  return badge.parentElement!.parentElement!.parentElement!
}

const remove = (productElement: HTMLElement) => {
  const name = productElement.querySelector(".o-pwa-product-tile__heading")!
    .textContent!
  console.log("Removing", name.trim())
  productElement.remove()
}

const removeInitial = () => {
  const products = document.querySelectorAll(
    "p[class='c-pwa-product-text-badge']"
  )
  products.forEach((product: HTMLParagraphElement) => {
    if (product.innerText == "UO MRKT") {
      remove(getProductFromBadge(product))
    }
  })
}

const observer = new MutationObserver((mutations) => {
  if (!state) return

  mutations.forEach((mutation) => {
    const target = mutation.target
    if (
      target instanceof HTMLParagraphElement &&
      target.className == "c-pwa-product-text-badge" &&
      target.innerText == "UO MRKT"
    ) {
      remove(getProductFromBadge(target))
    }
  })
})

removeInitial()
observer.observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true
})
