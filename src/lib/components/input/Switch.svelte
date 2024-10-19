<script lang="ts">
    import { onMount } from "svelte";

    export let name: string, checked: boolean = false, label: string = '', labelOn: string = label, labelOff: string = label, margin: number = 25
    const id = `id-for-${name}`

    let checkboxElement: HTMLInputElement, labelElement: HTMLLabelElement

    onMount(() => {
        checkboxElement.checked = checked
        checkboxElement.addEventListener('change', () => {
            labelElement.textContent = checkboxElement.checked ? labelOn : labelOff
        })        
    })
</script>

<div class="d-flex">
    <div class:w-0={margin === 0} class:w-25={ margin <= 25 && margin > 0 }  class:w-50={margin > 25 && margin <= 50} class:w-75={margin > 50} ></div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" {id} {name} bind:this={checkboxElement}>
        <label class="form-check-label" for={id} bind:this={labelElement}>{checked ? labelOn : labelOff}</label>
    </div>
</div>
