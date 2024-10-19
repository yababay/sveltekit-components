<script lang="ts">
    import { getRussianDayOfWeek } from '$lib/util/date';
    import Checkbox from '../input/Checkbox.svelte'
    import Field from '../field/index.svelte';

    let hours = 0

    const dates = new Array<Date>(14).fill(new Date)
        .map(date => {
            const updated = new Date(date)
            updated.setHours(date.getHours() + hours)
            hours += 24
            return updated
        })

    const mondayIndex = dates.findIndex(day => day.getDay() === 1)
    if(typeof mondayIndex !== 'number') throw 'no monday'
    const days = dates
        .slice(mondayIndex, mondayIndex + 7)
        .map(date => getRussianDayOfWeek(date))

    export let label: string, checked: string[] = []
</script>

<Field {label}>
    <div class="days-of-week">
        {#each days as day, i}
                <Checkbox label={day} name={`day-of-week-${i}`} checked={checked.includes(day)}/>
        {/each}
    </div>
</Field>

<style lang="scss">
    .days-of-week {
        width: 70%;
        display: flex;
        flex-wrap: wrap;
        padding-inline-start: 4%;
        gap: 1rem;
    }
</style>
