<script lang="ts">

    import Slot from './Slot.svelte'
    import type { SeoProps, BootstrapSource } from '$lib/types.js'

    export let seo: SeoProps, 
        bootstrap: BootstrapSource = 'remote',
        theme: string = 'dark'

</script>

<Slot {seo} {bootstrap} {theme} type="with-navbar" footer={false} >
    <slot />
</Slot>
