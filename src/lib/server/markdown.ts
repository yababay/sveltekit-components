import showdown from 'showdown'
import type { Fetch } from "../types.js"

const converter = new showdown.Converter()

export const getArticle = async (fetch: Fetch, path: string, repo: string | undefined = undefined): Promise<string[]> => {
    repo = repo ? repo =`https://github.com/yababay/${repo}/raw/articles` : '/articles'
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
    const arr = /<h1[^\>]+\>([^\<]+)/.exec(html) ?? []
    const [ _, title ] = arr
    return [ html, title, description.replace(/^-- /, '') ]
} 

export const getTableOfContent = async (fetch: Fetch, repo: string) => {
    return await getArticle(fetch, 'table-of-content', repo)
}

export const loremIpsum = async (fetch: Fetch) => {
    return await getArticle(fetch, 'lorem-ipsum')
}
