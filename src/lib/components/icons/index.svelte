<script lang="ts">
    import { setSize } from './index.js'
    import Telegram from './Telegram.svelte'
    //import Github from '../../../../node_modules/bootstrap-icons/icons/github.svg?raw'
    //import Pencil from '../../../../node_modules/bootstrap-icons/icons/pencil.svg?raw'
    //import Home from '../../../node_modules/bootstrap-icons/icons/house.svg?raw'

    export let size: number = 24, 
    name: 
        'telegram' | 
        'github' | 
        'home' | 
        'pencil'
</script>

{#if name === 'telegram'}
    <Telegram {size} />
{/if}
