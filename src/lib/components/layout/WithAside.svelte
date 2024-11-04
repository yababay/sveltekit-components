<script lang="ts">

    import './styles/with-aside.scss'

</script>

<div class="layout-with-aside">

    <aside>
        <slot name="aside" />
    </aside>
    
    <section>
        <slot />
    </section>
</div>
