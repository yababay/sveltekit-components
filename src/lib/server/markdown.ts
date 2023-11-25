import showdown from 'showdown'
import type { Fetch } from "../types.js"
import { base } from '$app/paths'

const converter = new showdown.Converter()

export const getArticle = async (fetch: Fetch, path: string, repo: string | undefined = undefined, branch: string | undefined = 'articles'): Promise<string[]> => {
    repo = repo ? repo =`https://github.com/yababay/${repo}/raw/${branch}` : '/articles'
    const url = `${repo}/${path}.md`
    let html = await fetch(url).then((res: any) => res.text())
    if(typeof html !== 'string') throw 'bad text'
    html = html.trim()
    let description
    if(html.startsWith('-- ')) {
        description = html.split(/[\r\n]/)[0]
        const n = `${html}\n`.indexOf('\n')
        html = html.substring(n)
    }
    html = converter.makeHtml(html.trim())
    .replace(/[\r\n]+/, ' ')
    .replace(/\ src\=\"img\//g, ` src="${repo}/img/`)
    .replace(/href=\"\/articles/g, `href=\"${base}/articles`)
    const arr = /<h1[^\>]+\>([^\<]+)/.exec(html) ?? []
    const [ _, title ] = arr
    return [ html, title, description ? description.replace(/^-- /, '') : undefined ]
} 

export const getTableOfContent = async (fetch: Fetch, repo: string | undefined = undefined, branch: string | undefined = 'articles') => {
    return await getArticle(fetch, 'table-of-content', repo, branch)
}

export const loremIpsum = async (fetch: Fetch) => {
    return await getArticle(fetch, 'lorem-ipsum')
}
