<script lang="ts">
    import Field from "./index.svelte";

    export let
        name: string,
        label: string,
        width: number = 25,
        value: string = '',
        placeholder: string = 'пароль пользователя'

    const id = `id-for-${name}`

</script>

<Field {name} {label} {width} >
    <input
        type="password"
        {placeholder}
        {name}
        {value}
        aria-label={placeholder}
        aria-describedby={id}
        class="form-control"
    >
</Field>
