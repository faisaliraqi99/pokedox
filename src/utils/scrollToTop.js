function scrollToTop (scrollDuration) {
  const scrollHeight = window.scrollY
  const scrollStep = Math.PI / (scrollDuration / 15)
  const cosParameter = scrollHeight / 2

  let scrollCount = 0
  let scrollMargin
  const scrollInterval = setInterval(function () {
    if (+window.scrollY !== 0) {
      scrollCount = scrollCount + 1
      scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep)
      window.scrollTo(0, (scrollHeight - scrollMargin))
    } else clearInterval(scrollInterval)
  }, 15)
}

export default scrollToTop
