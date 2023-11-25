<script lang="ts">
    export let 
        value: string = '', 
        name: string = 'caption',
        placeholder: string = "введите текст; можно использовать markdown",
        maxlength: number = 1024,
        rows: number = 4

</script>

<div class="mb-1 w-100">
    <textarea
        {name}
        {placeholder}
        {maxlength}
        {rows}
        value={value && value.trim().substring(0, maxlength)}
        class="form-control"
    />
</div>
