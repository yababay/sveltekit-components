<script lang="ts">
    import '$lib/styles/bare.scss'
    export let title: string
</script>

<div class="bare-layout">
    <slot />
</div>

<svelte:head>
    <title>{title}</title>
</svelte:head>
