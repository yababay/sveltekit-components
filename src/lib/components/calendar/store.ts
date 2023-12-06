import { writable, derived, get } from "svelte/store"

const DAY_IN_MILLIS = 24 * 3600000
const today = new Date

export const MONTHS = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
]

export const choosen = writable(today)
export const nextMonth = () => current.set(new Date(get(days).slice(-1)[0].getTime() + DAY_IN_MILLIS))
export const prevMonth = () => current.set(new Date(get(days)[0].getTime() - DAY_IN_MILLIS))

export const current = writable(today)

export const days = derived(current, $current => {
    const seed = $current
    const month = seed.getMonth()
    const before = [seed]
    let current = seed
    while(current.getMonth() === month) {
        current = new Date(current.getTime() - DAY_IN_MILLIS)
        before.push(current)
    }
    before.pop()
    current = before.slice(-1)[0]
    while(current.getDay() !== 1) {
        current = new Date(current.getTime() - DAY_IN_MILLIS)
        before.push(current)
    }
    current = seed
    const after = []
    while(current.getMonth() === month) {
        current = new Date(current.getTime() + 24 * 3600000)
        after.push(current)
    }
    after.pop()
    return [...before.reverse(), ...after]
})

export const weeks = derived(days, $days => {
    const days = [...$days]
    const weeks: Date[][] = []
    while(days.length) weeks.push(days.splice(0, 7))
    return weeks
})

export const month = derived(days, $days => $days[15].getMonth())