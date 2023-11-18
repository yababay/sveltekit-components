<script lang="ts">
    import '../../styles/layouts/dummy.scss'
    import type { SeoProps, BootstrapSource } from '$lib/types.js';
    import Slot from './Slot.svelte'

    export let seo: SeoProps, 
        bootstrap: BootstrapSource = 'remote',
        theme: string = 'dark'

</script>

<Slot {seo} type="simple" {bootstrap} {theme} >
    <slot />
</Slot>
