<script lang="ts">
    import { base } from '$app/paths'
    export let title: string, subtitle: string;
    const href = `${base}/`
</script>

<nav>
    <h1><a {href}>{title}</a></h1>
    <p><span>{subtitle}</span></p>
</nav>
