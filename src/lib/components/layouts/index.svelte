<script lang="ts">
    import type { SeoProps, HeaderType, BootstrapSource, MenuItem } from '$lib/types.js'
    import Header from '../header/index.svelte'
    import Footer from '../footer/index.svelte'

    export let seo: SeoProps, 
        type: HeaderType = 'simple', 
        bootstrap: BootstrapSource = 'remote',
        menu: MenuItem[] | undefined = undefined,
        theme: string = 'dark',
        footer: boolean = true

</script>

<Header {seo} {type} {bootstrap} {menu} {theme} />

<main>
    <slot />
</main>

{#if footer}
    <Footer {seo} />
{/if}
