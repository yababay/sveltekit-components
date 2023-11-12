<script lang="ts">
    import type { WithHtml } from '$lib/types'
    export let html: string, title: string | undefined = undefined, description: string | undefined = undefined
</script>

<article>
    {@html html}
</article>

<svelte:head>
    {#if !!title}
        <title>{title}</title>
    {/if}
    {#if !!description}
        <meta name="description" content={description}>
    {/if}
</svelte:head>
