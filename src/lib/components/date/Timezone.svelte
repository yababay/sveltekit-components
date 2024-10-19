<script lang="ts">
    import TIMEZONES from './TIMEZONES.txt?raw'

    export let name: string

    const getNum = (s: string) => parseInt((/.*\+(\d+)\)$/.exec(s.trim()) ?? [])[1]) || 0
    const timezones = TIMEZONES.split('\n')
        .map(el => el.trim())
        .filter(el => /^\S+\s[А-Я]/.test(el))
        .sort((a, b) => {
            const aNum = getNum(a)
            const bNum = getNum(b)
            return aNum - bNum
        })
        .map(el => /^([\w\/]+)\s+(.*)$/.exec(el) ?? [])
        .map(([_, value, label]) => ({value, label}))
        .filter(({value, label}) => value && label)
</script>

<select class="form-select" aria-label="Timezones" {name}>
    {#each timezones as {value, label} }
        <option {value}>{label}</option>
    {/each}
</select>
