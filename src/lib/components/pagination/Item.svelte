<script lang="ts">
    import { page as appPage } from '$app/stores'

    export let page = 1, isFirst = false, isLast = false

    let label = `${page}`
    if(isFirst) label = 'Первая'
    if(isLast) label = 'Последняя'

    const { pathname } = $appPage.url
    const arr = /(.*)\/[^\/]$/.exec(pathname)
    if(!(arr && arr.length == 2)) throw 'Bad path'

    const [ _, prefix ] = arr

</script>
<li class="page-item">
    <a class="page-link" href={`${prefix}/${page}`} aria-label={label}>
        {#if isFirst}
            <span aria-hidden="true">&laquo;</span>
        {:else if isLast}
            <span aria-hidden="true">&raquo;</span>
        {:else}
            <span aria-hidden="true">{label}</span>
        {/if}
    </a>
</li>
