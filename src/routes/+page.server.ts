import { loremIpsum } from "@yababay67/svelte-components/server"
import type { WithHtml } from "@yababay67/svelte-components/types"

export async function load({ fetch }): Promise<WithHtml> {
    const [ html, title, description ] = await loremIpsum(fetch)
    return { html, title, description }
}