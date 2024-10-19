import * as d3 from 'd3'
import { writable } from 'svelte/store'

export const paramVisibility: Map<string, boolean> = new Map()

export const pathes = new Map<string, d3.Selection<SVGPathElement, unknown, null, undefined>>()
//export const pathes = writable<Writable<Map<string, d3.Selection<SVGPathElement, unknown, null, undefined>>>()
