<script lang="ts">
    import Alert from '$lib/components/Alert.svelte'
    import Table from '$lib/components/Table.svelte';
    import type { LoopAttributes } from '$lib/types/model/loop';
    import { getRussianDayAndMonth, getVerboseRussianDate, verboseDuration } from '$lib/util/date';

    export let 
        loops: LoopAttributes[], 
        criterion: number | Date

    const suffix = typeof criterion === 'number' ? `серии №${criterion}` : `за ${getRussianDayAndMonth(criterion)}`
    const subpath =  typeof criterion === 'number' ? `by-serial/${criterion}` : `by-date/${criterion.toISOString().slice(0, 10)}`
    const columns = ['Цикл', 'Дата', 'Длит.', 'Серия', 'Пользователь', 'Процесс', '']

</script>

{#if loops.length}
    <div class="h-100 mt-5 w-100 d-flex flex-column align-items-center">
        <h5 class="mb-3">Данные по циклам {suffix}</h5>
        <Table {columns}>
            {#each loops as { loopId, serialId, userName, procName, duration, ts } }
                <tr>
                    <td align="center">{loopId}</td>
                    <td align="center">{getVerboseRussianDate(ts, 'short')}</td>
                    <td align="center">{verboseDuration(duration)}</td>
                    <td align="center">{serialId}</td>
                    <td>{userName}</td>
                    <td>{procName}</td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Действия">
                            <a rel="external" href="/archive/{subpath}/{loopId}" type="button" class="btn btn-outline-primary"><i class="bi bi-eye"></i></a>
                            <a rel="external" href="/print/{loopId}" type="button" class="btn btn-outline-primary"><i class="bi bi-printer"></i></a>
                        </div>
                    </td>
                </tr>
            {/each}
        </Table>
    </div>
{:else}
    <Alert look="info">Записи {suffix} не найдены.</Alert>
{/if}
