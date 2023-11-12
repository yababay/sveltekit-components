export type WithHtml = { html: string, title?: string , description?: string }

export type FooterProps = {
    author: string, 
    title?: string, 
    license?: string, 
    url?: string
}

export type Fetch = (url: string) => Promise<any>

export enum HeaderType {
    WITH_MENU,
    SIMPLE
}

export type SeoProps = {
    title: string
    subtitle: string
    description: string
    keywords: string
    author: string
    brand?: string
    subbrand?: string
    license?: string
    url?: string 
}

type HeaderSpec = {
    withBootstrap: boolean, 
    menuItems?: MenuItem[],
    headerType?: HeaderType,
    theme?: string
}

export type HeaderProps = SeoProps & HeaderSpec

export type MenuItem = {
    title: string
    href?: string
    items?: MenuItem[]
}
