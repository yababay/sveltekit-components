<script lang="ts">
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte'
    import { PUBLIC_TAGGER_URL } from '$env/static/public'
    import Autocomplete from './autocomplete'
    import TagBadge from './TagBadge.svelte'

    export let tags: string[] = []

    const reactiveTags = writable(Array.isArray(tags) && tags.length && tags.sort() || [])

    let tagBadges: HTMLParagraphElement, tagsInput: HTMLInputElement, hiddenTags: HTMLInputElement
    
    const tagsListener = (tag: string, del: boolean = false) => {
        const current = $reactiveTags
        const update = del ? current.filter(t => t !== tag) : [...new Set([...current, tag])].sort()
        $reactiveTags = update
    }

    const updateTags = () =>  {
        tagsListener(tagsInput.value.trim())
        tagsInput.value = ''
    }

    onMount(() => {
        const settings = {
            onSelectItem: () => {
                updateTags()
            }
        }
        Reflect.construct(Autocomplete, [tagsInput, settings])
        reactiveTags.subscribe(tags => {
            tagBadges.innerHTML = ''
            tags.map(text => new TagBadge({target: tagBadges, props: {tagsListener, text}}))
            hiddenTags.value = tags.join(' ')
        })
    })

    function tagUp(e: KeyboardEvent){
        if(e.code !== 'ArrowUp') return
        updateTags()
    }
</script>

<section class="w-100">
    <p bind:this={tagBadges} class="mb-2 tag-bagdes"></p>
    <div class="mb-2">
        <input name="tags" type="hidden" bind:this={hiddenTags}>
        <input
            data-server={PUBLIC_TAGGER_URL}
            type="text"
            class="form-control"
            placeholder="выберите или введите тэги"
            bind:this={tagsInput}
            on:keydown={tagUp}
        />
    </div>
</section>

<style>
    .tag-bagdes::before {
        content: 'Тэги: ';
        margin: .5rem;
    }
</style>
