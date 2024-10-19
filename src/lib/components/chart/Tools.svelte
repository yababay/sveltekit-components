<script lang="ts">
    
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import Fieldset from '$lib/components/Fieldset.svelte'
    import Visibility from './Visibility.svelte'
    import { getValuableParams } from './util';
    import type { ChartDataAttributes } from '$lib/types/model/chart';

    export let records: ChartDataAttributes[]

    let toolsPanel: HTMLDivElement
    let toggler: HTMLButtonElement

    const { url } = $page
    const { pathname } = url
    const arr = /^(.*)\/[^\/]+$/.exec(pathname) || []
    const [ _, back ] = arr

    const params: string[] = getValuableParams(records)

    const getFiltered = (param: string) => {
        return params.filter(name => name.startsWith(param))
    }

    let isHidden = true

    const showTools = () => {
        toolsPanel.classList.remove('tools-slideout')
        toolsPanel.classList.add('tools-slideon')
    }

    const hideTools = () => {
        toolsPanel.classList.remove('tools-slideon')
        toolsPanel.classList.add('tools-slideout')
    }

    const toggleTools = () => {
        if(isHidden) showTools()
        else hideTools()
        isHidden = !isHidden
    }

    const toggleByKey = (e: KeyboardEvent) => {
        if(!(e.key === 'OS' || e.key === 'Compose')) return
        toggleTools()
    }

    const hideByKey = (e: KeyboardEvent) => {
        if(isHidden || e.key !== 'Escape') return
        toggleTools()
    }

    onMount(() => {
        document.addEventListener('keydown', hideByKey)
        document.addEventListener('keydown', toggleByKey)
    })

</script>

<div class="tools-slideout tzmoi-tools" bind:this={toolsPanel}>
    <div class="p-3">
        <Fieldset legend="Управление графиком">
            <ul class="list-group w-100 mb-3">
                {#each getFiltered('press_') as name }
                    <Visibility {name} />
                {/each}
            </ul>
            <ul class="list-group w-100">
                {#each getFiltered('temp_') as name}
                    <Visibility {name} />
                {/each}
            </ul>
        </Fieldset>
    </div>
</div>

<div class="btn-group btn-group-sm mt-2 me-2 tzmoi-tools-toggler" role="group" aria-label="Действия">
    <a rel="external" href={back || '/'} type="button" class="btn btn-outline-primary" title="Вернуться к списку"><i class="bi bi-arrow-left-circle"></i></a>
    <a rel="external" href="/chart" type="button" class="btn btn-outline-primary" title="К текущему процессу"><i class="bi bi-eye"></i></a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <button class="btn btn-outline-primary" title="Увеличить фрагмент графика"><i class="bi bi-zoom-in" on:click={() => alert('Ага, щас. Бегу и тапочки теряю.')}></i></button>
    <button class="btn btn-outline-primary" title="Показать/скрыть инструменты" bind:this={toggler} on:click={toggleTools}><i class="bi bi-tools"></i></button>
</div>

<style lang="scss">
    .tzmoi-tools {
        margin-top: 27px;
    }
</style>