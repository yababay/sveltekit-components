<script lang="ts">

    import Checkbox from '$lib/components/input/Checkbox.svelte';
    import type { ParamVisibility } from '$lib/types';

    export let name: string

    const item: ParamVisibility = {name: '', checked: true, color: '' }

    const getNumber = () => {
        const arr = /(\d+)$/.exec(name)
        if(!arr) throw 'bad param name'
        const [ _, d ] = arr
        if(!d || isNaN(+d)) throw 'not a digit'
        return +d + ''
    }

    const label = name
        .replace('temp',  'Температура')
        .replace('press', 'Давление')
        .replace('_', ' ')
        .replace(/\d+/, getNumber())

</script>

<li class="list-group-item"><Checkbox {label} {name} checked={true} /></li>
