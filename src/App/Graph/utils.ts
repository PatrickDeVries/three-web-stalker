import { URL_MATCH_REGEX } from '../../common/constants'
import { graph } from './store'
import { Graph } from './types'

const addToGraph = (newNodes: Graph) =>
  Object.entries(newNodes).forEach(([key, val]) => (graph[key] = val))

const addToConnections = (nodeKey: string, toAdd: string | string[]) =>
  typeof toAdd === 'string'
    ? graph[nodeKey].connections.add(toAdd)
    : toAdd.forEach(url => graph[nodeKey].connections.add(url))

// make a fetch and return the string version of a page
export const getPage = async (url: string): Promise<string> => {
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
export const getURLS = async (url: string): Promise<string[]> => {
  const page = await getPage(url)
  return [...page.matchAll(URL_MATCH_REGEX)].map(match => {
    const trimmed = match[1].trim()
    if (trimmed.endsWith('/')) return trimmed.slice(0, -1)
    return trimmed
  })
}

// builds the full graph for a given URL and max depth
export const buildGraph = async (
  baseURL: string,
  maxDepth: number,
  depth: number = 0,
  previousBaseURL: string | null = null,
): Promise<Graph> => {
  console.log('called', depth, maxDepth)
  if (previousBaseURL === null) {
    addToGraph({
      [baseURL]: { label: baseURL, x: 0, y: 0, z: 0, connections: new Set<string>() },
    })
    console.log('created initial graph', graph)
  } else {
    const prevNode = graph[previousBaseURL]
    addToGraph({
      [baseURL]: {
        label: baseURL,
        x: prevNode.x + 1,
        y: prevNode.y + 1,
        z: prevNode.z + 1,
        connections: new Set<string>([previousBaseURL]),
      },
    })

    console.log('added new node', baseURL)
  }

  const urls = await getURLS(baseURL)
  console.log('new urls', baseURL, urls)
  addToConnections(baseURL, urls)

  if (depth < maxDepth) {
    for (let i = 0; i < urls.length; i++) {
      if (graph.hasOwnProperty(urls[i])) {
        // if the url is already in the graph, just link it to this base URL
        console.log('adding to connections', urls[i], baseURL)
        addToConnections(urls[i], baseURL)
      } else {
        // if the url is new to the graph, build a graph for it
        const newGraph = await buildGraph(urls[i], maxDepth, depth + 1, baseURL)
        addToGraph(newGraph)
      }
    }
  }

  console.log('returning graph', depth, maxDepth)
  return graph
}
