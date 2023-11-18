<script lang="ts">
    import { page } from '$app/stores'
    import type { MenuItem } from '$lib/types.js'

    let { pathname } = $page.url
    if(!pathname.trim()) pathname = '/'

    export let menu: MenuItem[], brand: string, theme: string = 'dark'
</script>

<nav
    class="navbar navbar-expand-lg bg-primary"
    data-bs-theme={theme}
>
    <div class="container-fluid">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="navbar-brand" href="/">
            <img src="/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            {brand}
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-text"
            aria-controls="navbar-text"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbar-text">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                {#each menu as {title, href, items} }
                    {#if items}
                        <li class="nav-item dropdown">   
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {title}
                            </a>
                            <ul class="dropdown-menu">
                                {#each items as { title, href } }
                                <li>
                                    <a {href} class="dropdown-item">{title}</a>
                                </li>
                                {/each}
                            </ul>
                        </li>
                    {:else}
                        <li class="nav-item">
                            <a {href} class="nav-link" class:active={href === pathname}>{title}</a>
                        </li>
                    {/if} 
                {/each}
            </ul>
        </div>
    </div>
</nav>
