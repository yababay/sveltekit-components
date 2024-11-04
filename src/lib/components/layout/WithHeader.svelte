<script lang="ts">

    import './styles/with-header.scss'

</script>

<div class="layout-with-header">
    
    <header>
        <slot name="header" />
    </header>

    <main>
        <slot />
    </main>

</div>
