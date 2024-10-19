<script lang="ts">
    
    import { onMount } from "svelte";

    export let name: string, checked: boolean, label: string, listener: CallableFunction = () => {}

    const id = `id-for-${name}`
    let element: HTMLInputElement

    onMount(() => {
        element.addEventListener('change', (e: Event) => listener(e))
    })

</script>

<div class="form-check">
    {#if checked}
        <input class="form-check-input" type="checkbox" value={label} {id} {name} bind:this={element}  checked>
    {:else}
        <input class="form-check-input" type="checkbox" value={label} {id} {name}  bind:this={element}>
    {/if}
    <label class="form-check-label" for={id}>
      {label}
    </label>
</div>
