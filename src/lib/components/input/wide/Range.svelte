<script lang="ts">
    import { writable } from 'svelte/store';
    import Wrapper from './index.svelte';
    import { onMount } from 'svelte';
    export let
        label: string = '',
        min: number = 0,
        max: number = 100,
        name: string,
        value: number

    let input: HTMLInputElement
    let badge: string = '' + value

    const id = `id-for-${name}`

</script>

<Wrapper {label} {name}>
    <div slot="input" class="d-flex">
        <input type="range" class="form-range" {min} {max} {id} {name} {value} bind:this={input} on:change={function() {badge = this.value}}>
        <span class="badge text-bg-secondary" bind:textContent={badge} contenteditable="true"></span>
    </div>
    <span slot="description">
        <slot />
    </span>
</Wrapper>
