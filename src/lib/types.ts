export type HeaderType =  'with-navbar' | 'simple'
export type BootstrapSource = 'local' | 'remote'

export type WithHtml = { html: string, title?: string , description?: string }

export type Fetch = (url: string) => Promise<any>

export type SeoProps = {
    title: string
    subtitle: string
    author: string
    description?: string
    keywords?: string
    brand?: string
    subbrand?: string
    license?: string
    url?: string 
}

export type MenuItem = {
    title: string
    href?: string
    items?: MenuItem[]
}
