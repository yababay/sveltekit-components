import { loremIpsum } from "@yababay67/svelte-components/markdown"
import type { WithHtml } from "@yababay67/svelte-components/types"
import { title as mainTitle } from '../app.json'

export async function load({ fetch, url }): Promise<WithHtml> {
    const [ html, title, description ] = await loremIpsum(fetch)
    const { pathname } = url
    return { html, title: pathname === '/' ? mainTitle : title, description }
}