import showdown from 'showdown'
import type { Fetch } from "../types.js"
import { base } from '$app/paths'

const converter = new showdown.Converter()

export function fromString(html: string): string[] {
    html = html.trim()
    let description
    if(html.startsWith('-- ')) {
        description = html.split(/[\r\n]/)[0]
        const n = `${html}\n`.indexOf('\n')
        html = html.substring(n)
    }
    html = converter.makeHtml(html.trim())
    .replace(/[\r\n]+/, ' ')
    .replace(/\ src\=\"img\//g, ` src="${base}/img/`)
    .replace(/href=\"\/articles/g, `href=\"${base}/articles`)
    const arr = /<h1[^\>]+\>([^\<]+)/.exec(html) ?? []
    const [ _, title ] = arr
    return [ html, title, description ? description.replace(/^-- /, '') : undefined ]
}

export const getArticle = async (fetch: Fetch | string, path: string, repo: string = '', branch: string = 'articles'): Promise<string[]> => {
    if(typeof fetch === 'string') return fromString(fetch)
    if(repo && repo.includes('gitpub.com')) repo =`https://github.com/yababay/${repo}/raw/${branch}`
    const url = `${repo}/${path}.md`
    let html = await fetch(url).then((res: any) => res.text())
    if(typeof html !== 'string') throw 'bad text'
    return fromString(html)
} 

export const getTableOfContent = async (fetch: Fetch, repo: string | undefined = undefined, branch: string | undefined = 'articles') => {
    return await getArticle(fetch, 'table-of-content', repo, branch)
}

export const loremIpsum = async (fetch: Fetch) => {
    return await getArticle(fetch, 'lorem-ipsum')
}

