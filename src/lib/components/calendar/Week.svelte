<script lang="ts">
    import { choosen, days, month } from './store'
    export let week: Date[], today = new Date
</script>

<tr>
    {#each week as day}
        <td 
            class="td-square" 
            class:td-today={day.getMonth() === today.getMonth() && day.getDate() === today.getDate()}
            class:prev-month={day.getMonth() !== $month}
            on:click={() => $choosen = day}
        >
            {day.getDate()}
        </td>
    {/each}
</tr>

<style lang="scss">
    .prev-month {
        color: silver
    }
    .td-today {
        background-color: cadetblue;
    }
    .td-square {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        text-align: center;
        font-family: monospace;
    }
</style>
