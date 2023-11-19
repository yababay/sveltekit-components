<script lang="ts">
    import type { SeoProps, MenuItem, HeaderType, BootstrapSource } from '$lib/types.js'
    import WithNavbar from './WithNavbar.svelte'
    import Simple from './Simple.svelte'

    export let seo: SeoProps, 
        type: HeaderType, 
        bootstrap: BootstrapSource,
        menu: MenuItem[] | undefined,
        theme: string

    const { title, subtitle, description, keywords, author, brand } = seo

</script>

<header>
    {#if type === 'with-navbar' && menu && brand}
        <WithNavbar {menu} {brand} {theme} />
    {:else}
        <Simple {title} {subtitle} />
    {/if}
</header>

<svelte:head>
    <meta name="description" content={description}>
    <meta name="keywords" content={keywords}>
    <meta name="author" content={author}>
    {#if bootstrap === 'local'}
        <link href="/bootstrap.min.css" rel="stylesheet">
        <script src="/bootstrap.bundle.min.js" defer></script>
    {:else if bootstrap === 'remote'}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous" defer></script>
    {/if}
    <title>{title}</title>
</svelte:head>
