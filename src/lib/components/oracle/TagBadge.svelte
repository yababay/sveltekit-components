<script>
    export let tagsListener, label
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="badge text-bg-primary tag-badge" on:click={e => tagsListener({label}, true)}>{label}</span>
<span>&nbsp;</span>

<style>
    .tag-badge {
        cursor: pointer;
    }
</style>
