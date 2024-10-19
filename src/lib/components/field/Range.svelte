<script lang="ts">
    import { onMount } from "svelte";
    import Field from "./index.svelte";
    import { writable } from "svelte/store";

    export let
        name: string,
        label: string,
        value: number,
        width: number = 25,
        disabled = false,
        min: number = 0,
        max: number = 100

    let input: HTMLInputElement

    const id = `id-for-${name}`

    const dynamicLabel = writable(`${label} (${value})`)

    onMount(() => {
        input.addEventListener('change', () => {
            $dynamicLabel = `${label} (${input.value})`
        })
    })
</script>

<Field {name} label={$dynamicLabel} {width} >
    <input type="range" class="form-range" {min} {max} {id} {disabled} bind:this={input}>
</Field>
