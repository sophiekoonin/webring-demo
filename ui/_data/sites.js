const fetch = require("node-fetch")

module.exports = async function () {
  try {
    const rsp = await fetch(
      "https://weird-website-lovers.cloudflare-aa8.workers.dev/list"
    )
    const sites = await rsp.json()
    return sites
  } catch (err) {
    console.error(err)
    return []
  }
}
