<script lang="ts">
    import Item from './Item.svelte'

    export let count, page, recordsPerPage, itemsPerPagination, label: string

    const items: number[] = []
    let maxPageNumber = page + itemsPerPagination
    
    for(let i = page; i < maxPageNumber; i++ ){
      if((i - 1) * recordsPerPage >= count) break
      items.push(i)
    }

    let leastPageNumber = items[0]
    if(leastPageNumber > 1) leastPageNumber--
</script>

<nav aria-label={label}>
    <ul class="pagination">
      <Item isFirst={true} page={leastPageNumber}/>
      {#each items as page }
        <Item {page} />
      {/each}
      <Item page={items.pop()} isLast={true} />
    </ul>
</nav>
