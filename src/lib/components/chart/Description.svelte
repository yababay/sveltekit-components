<script lang="ts">

    import Fieldset from '$lib/components/Fieldset.svelte'
    import type { LoopAttributes } from '$lib/types/model/loop';
    import { getVerboseRussianDate, verboseDuration } from '$lib/util/date';
    import DescriptionItem from './DescriptionItem.svelte';

    export let description: LoopAttributes

    const { procName, userName, serialId, loopId, duration, ts } = description
    const legend = `Цикл №${loopId}`
    
</script>

<div class="chart-description">
    <Fieldset {legend} >
        <ul class="list-group">
            <DescriptionItem label="Дата начала:" value={getVerboseRussianDate(ts)} />
            <DescriptionItem label="Длительность:" value={verboseDuration(duration)} />
            <DescriptionItem label="Серия №:" value={serialId} />
            <DescriptionItem label="Тип процесса:" value={procName} />
            <DescriptionItem label="Пользователь:" value={userName} />
        </ul>
    </Fieldset>
</div>
