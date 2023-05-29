const Papa = require("papaparse")

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  )
})

async function fetchAndParseCsv() {
  const sheetRsp = await fetch(
    `https://docs.google.com/spreadsheets/d/1nXZmrNOCZKVgBpCydopiX4WbmgVpB4JRARX78fcfBuI/gviz/tq?tqx=out:csv&sheet=Sites`
  )
  const body = await sheetRsp.text()
  const parsed = Papa.parse(body, { header: true })
  return parsed.data
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url)
  const data = await fetchAndParseCsv()
  const referrer = request.referrer

  if (pathname.startsWith("/random")) {
    const random = data[Math.floor(Math.random() * data.length)]
    return Response.redirect(random.URL, 302)
  }

  if (pathname.startsWith("/list")) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  const referrerIdx = data.findIndex((s) => s.URL === referrer)
  if (referrer == null || referrer === -1) {
    return Response.redirect("https://weirdwebsitelovers.neocities.org", 301)
  }
  if (pathname.startsWith("/next")) {
    const nextInRing = data.length > referrerIdx + 1 ? referrerIdx + 1 : 0
    return Response.redirect(data[nextInRing].URL, 302)
  }

  if (pathname.startsWith("/prev")) {
    const prevInRing = referrerIdx > 0 ? referrerIdx - 1 : data.length - 1
    return Response.redirect(data[prevInRing].URL, 302)
  }

  return Response.redirect("https://weirdwebsitelovers.neocities.org", 301)
}
