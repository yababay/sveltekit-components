<script lang="ts">

    import Fieldset from '$lib/components/Fieldset.svelte'
    import { paramVisibility } from '$lib/components/store'
    import { type Writable, get } from 'svelte/store';
    import Visibility from '$lib/components/chart/Visibility.svelte'
    import type { ParamVisibility } from '$lib/types';
    import Alert from '$lib/components/Alert.svelte';

    const getFiltered = (store: Writable<ParamVisibility[]>, param: string) => {
        return get(store).filter(({name}) => name.startsWith(param))
    }

    const forStore = async () => new Promise<Writable<ParamVisibility[]>>((yep, nop) => {
        setTimeout(() => {
            if(!paramVisibility) nop('Хранилище состояний не готово')
            else yep(paramVisibility)
        }, 1000)
    })

</script>

<div class="p-3 mt-3">
    <Fieldset legend="Управление графиком">
        {#await forStore() then store}
            <ul class="list-group w-100 mb-3">
                {#each getFiltered(store, 'press_') as { name }}
                    <Visibility {name} {store}/>
                {/each}
            </ul>
            <ul class="list-group w-100">
                {#each getFiltered(store, 'temp_') as { name }}
                    <Visibility {name} {store} />
                {/each}
            </ul>
        {:catch err}
            <Alert look="danger">{err}</Alert>
        {/await}
    </Fieldset>
</div>
