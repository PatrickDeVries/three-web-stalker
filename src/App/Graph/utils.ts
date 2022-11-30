import { TITLE_REGEX, URL_MATCH_REGEX } from './constants'
import { graphStore } from './store/store'
import { Graph, PageData } from './types'

const addToGraph = (newNodes: Graph) =>
  Object.entries(newNodes).forEach(([key, val]) => (graphStore.graph[key] = val))

const addToConnections = (nodeKey: string, toAdd: string | string[]) =>
  typeof toAdd === 'string'
    ? graphStore.graph[nodeKey].connections.add(toAdd)
    : toAdd.forEach(url => graphStore.graph[nodeKey].connections.add(url))

// make a fetch and return the string version of a page
const getPage = async (url: string): Promise<string> => {
  let response: Response | null = null
  try {
    response = await fetch(url)
  } catch (e) {
    console.error('failed to fetch', url, e)
    return ''
  }

  let page
  try {
    page = await response.text()
  } catch {
    page = undefined
  }

  if (!response.ok || page === undefined) {
    console.error('failed to get data', url, page)
    return ''
  }

  return page
}

// get list of links from a url
const getPageData = async (url: string): Promise<PageData> => {
  try {
    // return URLS
    const page = await getPage(url) // PAGE

    const title = [...page.matchAll(TITLE_REGEX)][0][1] || url.split('?')[0]
    const urls = [...page.matchAll(URL_MATCH_REGEX)].map(match => {
      const trimmed = match[1].trim()
      if (trimmed.endsWith('/')) return trimmed.slice(0, -1)
      return trimmed
    })

    return {
      title,
      urls,
    }
  } catch {
    return { title: url.split('?')[0], urls: [] }
  }
}

const buildInnerGraph = async (
  baseURL: string,
  maxDepth: number,
  depth: number,
  parentURL: string,
  childCount: number,
  childIndex: number,
) => {
  const pageData =
    depth < maxDepth ? await getPageData(baseURL) : { urls: [], title: baseURL.split('?')[0] }

  const urls = pageData.urls.filter(url => url !== baseURL) //.map(url => baseURL + '/' + url)

  const parent = graphStore.graph[parentURL]
  const d = Math.max(1, childCount / 2) * Math.max(20 - depth * 5, 1) // line scale factor

  let angle = childIndex * ((Math.PI * 2) / childCount)
  addToGraph({
    [baseURL]: {
      label: pageData.title,
      x: childCount > 1 ? d * Math.cos(angle) + parent.x : parent.x,
      y: childCount > 1 ? d * Math.sin(angle) + parent.y : parent.y,
      z: parent.z - 50 * Math.max(maxDepth - depth, 1),
      connections: new Set<string>(urls),
      parent: parentURL,
    },
  })

  if (depth < maxDepth) {
    for (let i = 0; i < urls.length; i++) {
      if (graphStore.graph.hasOwnProperty(urls[i])) {
        // if the url is already in the graph, just link it to this base URL
        addToConnections(urls[i], baseURL)
      } else {
        // if the url is new to the graph, build a graph for it
        buildInnerGraph(urls[i], maxDepth, depth + 1, baseURL, urls.length, i)
      }
    }
  }
}

// builds the full graph for a given URL and max depth
export const buildGraph = async (baseURL: string, maxDepth: number) => {
  const pageData = await getPageData(baseURL)

  const urls = pageData.urls.filter(url => url !== baseURL)

  addToGraph({
    [baseURL]: {
      label: pageData.title,
      x: 0,
      y: 0,
      z: 0,
      connections: new Set<string>(urls),
      parent: null,
    },
  })

  if (maxDepth > 0) {
    for (let i = 0; i < urls.length; i++) {
      if (graphStore.graph.hasOwnProperty(urls[i])) {
        // if the url is already in the graph, just link it to this base URL
        addToConnections(urls[i], baseURL)
      } else {
        // if the url is new to the graph, build a graph for it
        buildInnerGraph(urls[i], maxDepth, 1, baseURL, urls.length, i)
      }
    }
  }
}
