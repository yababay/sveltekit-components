<script lang="ts">
    import { Article } from '@yababay67/svelte-components'
    import type { WithHtml } from '@yababay67/svelte-components/types';

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
