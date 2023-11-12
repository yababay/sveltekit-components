import { loremIpsum } from "$lib/server/index.js"
import type { WithHtml } from "$lib/types.js"

export async function load({ fetch }): Promise<WithHtml> {
    const [ html, title, description ] = await loremIpsum(fetch)
    return { html, title, description }
}