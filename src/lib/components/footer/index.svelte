<script lang="ts">
    import type { FooterProps } from "$lib/types.js";
    export let props: FooterProps
    const { author, title, license, url } = props
    const year = new Date().getFullYear()
</script>

<footer>
    {#if license}
        <a href={url}>{title}</a> 
        <span>&nbsp;by&nbsp;</span> 
        <a href="https://github.com/yababay">{author}</a> 
        <span>&nbsp;is licensed under&nbsp;</span> 
        {#if license === "CC_BY-NC_4.0"}
            <a href="http://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank">
                <span>CC BY-NC 4.0</span>
            </a>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1">
        {/if}
    {:else}
        &copy;&nbsp;{year}&nbsp;{author}
    {/if}
</footer>
