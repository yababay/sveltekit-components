import { type ParamVisibility } from '$lib/types'
import { get, writable, type Writable } from 'svelte/store'
import { browser } from '$app/environment'

const PARAM_VISIBILITY_KEY = 'param-visibility'

let paramVisibility: Writable<ParamVisibility[]> | null = null

if(browser) {
    const PARAM_VISIBILITY = JSON.parse(localStorage.getItem(PARAM_VISIBILITY_KEY) || '[]') as ParamVisibility[]
    paramVisibility = writable<ParamVisibility[]>(PARAM_VISIBILITY)
}

export const getParamVisibilities = () => paramVisibility && [...get(paramVisibility)] || new Array<ParamVisibility>()

export const saveParamVisibilities = (arr: ParamVisibility[]) => {
    if(!paramVisibility) return
    paramVisibility.set(arr)
    localStorage.setItem(PARAM_VISIBILITY_KEY, JSON.stringify(arr))
}

export { paramVisibility }
