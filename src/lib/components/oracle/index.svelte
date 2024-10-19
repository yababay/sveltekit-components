<script lang="ts">
    import { onMount } from 'svelte'
    import { writable } from 'svelte/store'
    import TagBadge from './TagBadge.svelte'
    import Autocomplete from './autocomplete.js'

    export let 
    tags: string[] = [],
    url: string = '/tags.json',
    separator: string = ',',
    name = 'tags',
    placeholder = 'вводите текст и выбирайте из списка'

    type Tagable = {label: string, value: string}

    const reactiveTags = writable<Tagable[]>()

    let badges: HTMLParagraphElement, input: HTMLInputElement, hidden: HTMLInputElement
    
    const tagsListener = (ev: Tagable, del: boolean = false) => {
        const current = $reactiveTags
        const { label } = ev
        const tag = label.trim()
        const update = del ? current.filter(t => t.label !== tag) : [...new Set([...current, ev])].sort()
        $reactiveTags = update
    }
    
    onMount(async () => {
        let users = (await fetch('/api/users').then(res => res.json())) as Tagable[]
        users = users.filter(({value}) => tags.includes(value))
        $reactiveTags = users
        const settings = {
            onSelectItem: (ev: Tagable) => {
                tagsListener(ev)
                input.value = ''
            }
        }
        Reflect.construct(Autocomplete, [input, settings])
        reactiveTags.subscribe(tags => {
            badges.innerHTML = ''
            $reactiveTags.map(({label}) => new TagBadge({target: badges, props: {tagsListener, label}}))
            hidden.value = $reactiveTags.map(el => el.value).join(separator)
        })
    })

</script>

<div class="w-100 d-flex flex-column justify-content-end wrapper">
    <p bind:this={badges} class="text-end w-100"></p>
    <input {name} type="hidden" bind:this={hidden}>
    <div class="w-100">
        <input
            data-server={url}
            type="text"
            class="form-control w-100"
            {placeholder}
            bind:this={input}
        />
    </div>
</div>
