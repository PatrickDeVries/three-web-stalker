import { URL_MATCH_REGEX } from '../../common/constants'
import { Graph } from './types'

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
export const getLinks = async (url: string): Promise<string[]> => {
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
  graph: Graph = {},
  depth: number = 0,
  previousBaseURL: string | null = null,
): Promise<Graph> => {
  console.log('called', depth, maxDepth)
  if (previousBaseURL === null) {
    graph = {
      [baseURL]: { label: baseURL, x: 0, y: 0, z: 0, connections: new Set<string>() },
    }
    console.log('created initial graph', graph)
  } else {
    const prevNode = graph[previousBaseURL]
    graph = {
      ...graph,
      [baseURL]: {
        label: baseURL,
        x: prevNode.x + 1,
        y: prevNode.y + 1,
        z: prevNode.z + 1,
        connections: new Set<string>([previousBaseURL]),
      },
    }
    console.log('added new node', graph)
  }

  const links = await getLinks(baseURL)
  links.forEach(link => graph[baseURL].connections.add(link))
  console.log('new links', baseURL, links)

  if (depth < maxDepth) {
    for (let i = 0; i < links.length; i++) {
      if (!graph.hasOwnProperty(links[i])) {
        const newGraph = await buildGraph(links[i], maxDepth, graph, depth + 1, baseURL)
        graph = { ...graph, ...newGraph }
      } else {
        graph[links[i]].connections.add(baseURL)
      }
    }
  }

  console.log('final graph', graph)
  return graph
}
