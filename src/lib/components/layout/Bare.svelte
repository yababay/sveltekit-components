<script lang="ts">

    import './styles/bare.scss'

    export let title: string = 'hello'

</script>

<div class="bare-layout">
    <slot />
</div>

<svelte:head>
    <title>{title}</title>
</svelte:head>
