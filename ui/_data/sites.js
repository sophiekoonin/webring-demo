const fetch = require("node-fetch")

module.exports = async function () {
  const rsp = await fetch("https://webring.sophiekoonin.workers.dev/list")
  const sites = await rsp.json()
  return sites
}
