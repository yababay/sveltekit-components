<script lang="ts">

    import { page } from '$app/stores'
    import Tabs from '$lib/components/tabs/index.svelte'
    import Calendar from '$lib/components/calendar/index.svelte'
    import { choosen } from '$lib/components/calendar/store'
    import SerialBadge from './SerialBadge.svelte';

    type TabId =  'current' | 'calendar' | 'series' 

    const tabs = [
        ['calendar', 'По дате'],
        ['series', 'По серии'],
    ]

    export let series: number[]

    const { url } = $page
    const { pathname } = url
    const bySerial = pathname.includes('by-serial')

    const getActive = (): TabId => bySerial ? 'series' : 'calendar'

    const parsedDate = /.*\/by-date\/(\d\d\d\d-\d\d-\d\d).*/.exec(pathname)

    if(Array.isArray(parsedDate)) $choosen = new Date(parsedDate[1])

    const parsedSerial = /.*\/by-serial\/(\d+).*/.exec(pathname) || []

    const [ _,  serialId ] = parsedSerial

    const withDescription = /.*\d\/\-?\d+$/.test(pathname)

</script>

    <Tabs {tabs} active={getActive()}>
        <div slot="tab-1">
            <h6>Выбор цикла по дате</h6>
            <Calendar />
        </div>
        <div slot="tab-2">
            <h6>Выбор цикла по номеру серии</h6>
            <div class="serial-holder">
                <div class="mt-3 ms-3 d-flex justify-content-start gap-2 flex-wrap">
                    {#each series as serial}
                        <SerialBadge {serial} choosen={serial === +serialId} />
                    {/each}
                </div>
            </div>
        </div>
    </Tabs>
    {#if withDescription}
        <div id="tzmoi-description" class="me-3 mt-5"></div>
    {/if}

<style lang="scss">
    h6 {
        text-align: center;
        margin: 1.5rem auto .8rem auto;
    }
    .serial-holder {
        max-height: 70vh;
        overflow-y: auto;
    }
</style>
