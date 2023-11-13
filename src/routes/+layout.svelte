<script lang="ts">
    import '../app.scss'
    import '$lib/styles/layouts/publications/index.scss'
    import { Header, Footer } from '$lib/index.js'
    import { author, description, title, subtitle, keywords, license, url, brand } from '../app.json'
    import { PUBLIC_WITH_BOOTSTRAP } from '$env/static/public'
    import { HeaderType, type MenuItem } from '$lib/types.ts';

    export let 
        menuItems: MenuItem[] | undefined = undefined, 
        headerType: HeaderType = HeaderType.SIMPLE, 
        theme: string = 'dark', 
        withBootstrap: boolean = true

    const footerProps = {author, title, license, url}
    const headerProps = {
        author, title, description, subtitle, keywords, brand,
        withBootstrap, theme, headerType, menuItems
    }
</script>

<Header  props={headerProps} />

<main>
    <slot />
</main>

<Footer props={footerProps} />

<svelte:head>
    {#if PUBLIC_WITH_BOOTSTRAP === '1'}
        <link href="/bootstrap.min.css" rel="stylesheet">
        <script src="/bootstrap.bundle.min.js"></script>
    {/if}
</svelte:head>
