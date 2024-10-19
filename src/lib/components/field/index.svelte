<script lang="ts">
    export let
        name: string = '',
        label: string = '',
        placeholder: string = '',
        width: number = 25,
        disabled = false,
        value: string | number = '',
        required: boolean = false,
        type = 'text'

    const id = `id-for-${name}`
</script>

<div class="input-group mb-3">
    <span class="input-group-text d-inline-block text-end" class:required={required} class:w-25={width <= 25}  class:w-50={width > 25 && width <= 50} class:w-75={width > 50} {id}>
        {label}
    </span>
    <slot>
        <input
            {type}
            {placeholder}
            {value}
            {name}
            aria-label={placeholder}
            aria-describedby={id}
            disabled={disabled}
            class="form-control"
        >
    </slot>
</div>

<style lang="scss">
    .required::after {
        content: '*';
        color: red;
        vertical-align: super;
        font-size: small;
    }
</style>