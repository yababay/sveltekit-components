<script lang="ts">
    export let label: string, value: string | number
</script>

<li class="list-group-item d-flex gap-2">
    <strong class="w-50">{label}</strong>
    <span>{value}</span>
</li>
