<script lang="ts">
    export let serial: number, choosen: boolean
    const label = serial < 10000 ? 'серия №' : ''
</script>

<a rel="external" class="btn btn-sm" class:btn-primary={choosen} class:btn-outline-primary={!choosen} href="/archive/by-serial/{serial}">{label}{serial}</a>

<style lang="scss">
    a {
        width: 30%;
    }
</style>
