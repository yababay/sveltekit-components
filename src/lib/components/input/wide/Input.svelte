<script lang="ts">
    import Wrapper from './index.svelte';
    export let
        name: string,
        value: string = '',
        placeholder: string = '',
        label: string = ''
</script>

<Wrapper {label} {name} >
    <input class="form-control" aria-describedby={descr} type="text" {placeholder} {name} {value} {id} slot="input" let:id let:descr>
    <span slot="description">
        <slot />
    </span>
</Wrapper>
