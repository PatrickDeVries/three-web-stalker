import { URL_MATCH_REGEX } from '../../common/constants'
import { PAGE } from './constants'
import { store } from './store/store'
import { Graph } from './types'

const addToGraph = (newNodes: Graph) =>
  Object.entries(newNodes).forEach(([key, val]) => (store.graph[key] = val))

const addToConnections = (nodeKey: string, toAdd: string | string[]) =>
  typeof toAdd === 'string'
    ? store.graph[nodeKey].connections.add(toAdd)
    : toAdd.forEach(url => store.graph[nodeKey].connections.add(url))

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
const getURLS = async (url: string): Promise<string[]> => {
  const page = PAGE // await getPage(url)
  return [...page.matchAll(URL_MATCH_REGEX)].map(match => {
    const trimmed = match[1].trim()
    if (trimmed.endsWith('/')) return trimmed.slice(0, -1)
    return trimmed
  })
}

const buildInnerGraph = async (
  baseURL: string,
  maxDepth: number,
  depth: number,
  parentURL: string,
  childCount: number,
  childIndex: number,
) => {
  const prevNode = store.graph[parentURL]

  const d = childCount * 4 // line scale factor

  let angle = childIndex * ((Math.PI * 2) / childCount)
  addToGraph({
    [baseURL]: {
      label: baseURL,
      x: d * Math.cos(angle) + prevNode.x,
      y: d * Math.sin(angle) + prevNode.y,
      z: prevNode.z - d,
      connections: new Set<string>([parentURL]),
    },
  })

  const urls = await getURLS(baseURL)
  addToConnections(baseURL, urls)

  if (depth < maxDepth) {
    for (let i = 0; i < urls.length; i++) {
      if (store.graph.hasOwnProperty(urls[i])) {
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
  addToGraph({
    [baseURL]: { label: baseURL, x: 0, y: 0, z: 0, connections: new Set<string>() },
  })

  const urls = await getURLS(baseURL)
  addToConnections(baseURL, urls)

  if (maxDepth > 0) {
    for (let i = 0; i < urls.length; i++) {
      if (store.graph.hasOwnProperty(urls[i])) {
        // if the url is already in the graph, just link it to this base URL
        addToConnections(urls[i], baseURL)
      } else {
        // if the url is new to the graph, build a graph for it
        buildInnerGraph(urls[i], maxDepth, 1, baseURL, urls.length, i)
      }
    }
  }
}
