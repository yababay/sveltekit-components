<script lang="ts">
    import { weeks, nextMonth, prevMonth, days, MONTHS, month } from './store'
    import Week from './Week.svelte'
    export { choosen } from './store'
</script>

<div class="calendar-wrap">
    <div class="w-100 calendar-pane mb-1">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="change-month change-month-link" on:click={prevMonth}>« {MONTHS[$month - 1]}</span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="change-month" on:click={nextMonth}>{MONTHS[$month]}</span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="change-month change-month-link" on:click={nextMonth}>{MONTHS[$month === 11 ? 0 : ($month + 1)]} »</span>
    </div>
    <table>
        <thead>
            <tr class="tr-calendar">
                <td>Пн</td>
                <td>Вт</td>
                <td>Ср</td>
                <td>Чт</td>
                <td>Пт</td>
                <td>Сб</td>
                <td>Вс</td>
            </tr>
        </thead>
        <tbody>
            {#each $weeks as week}
                <Week {week} />
            {/each}
        </tbody>
    </table>
</div>

<style lang="scss">
    .calendar-wrap {
        max-width: 400px;
        margin: .5rem;
    }
    table, .calendar-pane {
        width: 100%;
    }
    .calendar-pane {
        display: flex;
        justify-content: space-between;
    }

    .change-month {
        cursor: pointer;
        font-size: smaller;
    }

    .change-month-link {
        color: cornflowerblue
    }

    .tr-calendar td {
        width: 1.5rem;
        height: 1.5rem;
        text-align: center;
        font-family: monospace;
        font-weight: bold;
    }
</style>
