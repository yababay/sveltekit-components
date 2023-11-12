<script lang="ts">
    import type { WithHtml } from '$lib/types'
    import Article from '$lib/components/article/index.svelte'

    export let data: WithHtml
    const { html, title, description } = data
</script>

<Article {html} {title} {description} />

<svelte:head>
    {#if !!title}
        <title>{title}</title>
    {/if}
    {#if !!description}
        <meta name="description" content={description}>
    {/if}
</svelte:head>
