<script lang="ts">
    import { HeaderType, type HeaderProps } from '$lib/types.js'
    import WithMenu from './WithMenu.svelte'
    import Simple from './Simple.svelte'

    export let props: HeaderProps

    let { 
        title, subtitle, description, keywords, author, brand,
        menuItems, headerType, theme, withBootstrap
    } = props

    if(!theme) theme = 'dark'
</script>

<header>
    {#if headerType === HeaderType.WITH_MENU && menuItems && brand}
        <WithMenu {menuItems} {brand} {theme} />
    {:else}
        <Simple {title} {subtitle} />
    {/if}
</header>

<svelte:head>
    <meta name="description" content={description}>
    <meta name="keywords" content={keywords}>
    <meta name="author" content={author}>
    {#if withBootstrap}
        <link href="/bootstrap.min.css" rel="stylesheet">
        <script src="/bootstrap.bundle.min.js"></script>
    {/if}
    <title>{title}</title>
</svelte:head>
