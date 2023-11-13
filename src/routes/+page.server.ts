import { loremIpsum } from "$lib/server/index.ts"
import type { WithHtml } from "$lib/types.ts"
import { title as mainTitle } from '../app.json'

export async function load({ fetch, url }): Promise<WithHtml> {
    const [ html, title, description ] = await loremIpsum(fetch)
    const { pathname } = url
    return { html, title: pathname === '/' ? mainTitle : title, description }
}