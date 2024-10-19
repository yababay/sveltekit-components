/*import * as d3 from 'd3'
import { CHART_DATA_ID, CHART_ID } from '../../../types/constants'
import { type MeasurementAttributes } from '../../../types/model/measurement'
import { defaultChartOptions } from '../../../types/chart'
import { ScaleLinear } from 'd3'
import { getBlue, getRed } from '../colors'
import { getValuableParams } from './util'

export const PARAM_VISIBILITY_KEY = 'param-visibility'

const paramVisibility: Map<string, boolean> = new Map()

export const getVisibility = (key: string) => paramVisibility.get(key)

export const saveVisibility = (key: string, checked: boolean ) => {
    paramVisibility.set(key, checked)
    localStorage.setItem(PARAM_VISIBILITY_KEY, JSON.stringify(Array.from(paramVisibility.entries())))
}

const fromStore = localStorage.getItem(PARAM_VISIBILITY_KEY)

if(fromStore){
    const arr = JSON.parse(fromStore)
    if(Array.isArray(arr)) {
        for(const item of arr){
            if(!Array.isArray(item)) continue
            const [ key, value ] = item
            if(!(typeof key === 'string' && typeof value === 'boolean')) continue
            paramVisibility.set(key, value)
        }
    }
} 

const { margin } = defaultChartOptions
const { top, right, bottom, left } = margin

const DELTA_PRESS = .2
const DELTA_TEMP = .15

const getValueLine = (x: d3.ScaleTime<number, number, never>, y: d3.ScaleLinear<number, number, never>, data: [number, number][]) => {
    const fn = d3.line()
        .x(([ts]) => x(ts))
        .y(([_, v]) => y(v))
        .curve(d3.curveBasis)
    return fn(data)
}

const getTimestamps = (records: MeasurementAttributes[]): Date[] => records.map(({ts}) => new Date(ts))

const withDelta = (min: number, max: number, isPressure: boolean = true) => {
    const delta = (max - min) * (isPressure ? DELTA_PRESS : DELTA_TEMP)
    return [min - delta, max + delta]
}


const getSubset = (records: MeasurementAttributes[], key: string):[number, number][] => {
    return records.map(measurement => {
        const ts = new Date(measurement.ts)
        const errorMessage = `no value in subset ${ts} for key ${key}`
        const value = Reflect.get(measurement, key)
        if(typeof value !== 'number') throw `${errorMessage} ${JSON.stringify(measurement)}`
        return [ts.getTime(), value]
    })
}

const getLimits = (records: MeasurementAttributes[]) => {
    return records.reduce((acc, el) => {
        const [TEMP_MIN, PRESS_MIN, TEMP_MAX, PRESS_MAX] = acc
        let tempMin = TEMP_MIN, tempMax = TEMP_MAX, pressMin = PRESS_MIN, pressMax = PRESS_MAX
        for(const key of Reflect.ownKeys(el)){
            if(typeof key !== "string") continue
            const value = Reflect.get(el, key)
            if(key.startsWith("temp") && value <= tempMin) tempMin = value
            if(key.startsWith("press") && value <= pressMin) pressMin = value
            if(key.startsWith("temp") && value >= tempMax) tempMax = value
            if(key.startsWith("press") && value >= pressMax) pressMax = value
        }
        return [tempMin, pressMin, tempMax, pressMax]

    }, [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 
        Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]) as [number, number, number, number]
}

const setupDomainY = (records: MeasurementAttributes[], height: number): { yTemp: ScaleLinear<number, number, never>, yPress: ScaleLinear<number, number, never> } => {
    const limits = getLimits(records)
    const [pressMin, pressMax] = withDelta(limits[1], limits[3])
    const [tempMin, tempMax] = withDelta(limits[0], limits[2], false)
    const rangeYTemp = d3.scaleLinear().range([height || 0, 0])
    const rangeYPress = d3.scaleLinear().range([height || 0, 0])
    const yTemp = rangeYTemp.domain([tempMin, tempMax])
    const yPress = rangeYPress.domain([pressMin, pressMax])
    return {yTemp, yPress}
}

export const prepareChart = () => {
    const pathes = new Map<string, d3.Selection<SVGPathElement, unknown, null, undefined>>()
    try {
        const root = document.querySelector(`#${CHART_ID}`)
        if(!(root instanceof Element)) throw 'bad root element (html)'
        const input = document.querySelector(`#${CHART_DATA_ID}`)
        if(!(input instanceof HTMLInputElement)) throw 'bad data input'
        let { value } = input
        if(typeof value !== 'string') throw 'bad records (1)'
        value = atob(value)
        if(typeof value !== 'string') throw 'bad records (2)'
        const records = JSON.parse(value) as MeasurementAttributes[]
        if(!(Array.isArray(records) && records.length)) throw 'bad records (3)'
        const { clientWidth, clientHeight } = root
        const width = clientWidth - left - right
        const height = clientHeight - top - bottom 
        const timestamps = getTimestamps(records)
        const [ tsmin ] = timestamps
        const tsmax = timestamps.slice(-1)[0]
        const rangeX = d3.scaleTime().range([0, width || 0])
        const x = rangeX.domain([tsmin, tsmax])
        const axisX = d3.axisBottom
        const { yPress, yTemp } = setupDomainY(records, height)

        const graphics = d3.select(root)
            .append("g")
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${left},${top})`) 
        graphics              
            .append("g")
            .attr('id', 'axis-x')
            .attr("transform", `translate(0,${height})`)
            .call(axisX<Date>(x).tickFormat(d3.timeFormat("%H:%M:%S")))
            .selectAll("text")
            .attr("transform", "translate(-10,15)rotate(-45)")
        graphics
            .append("g").call(d3.axisLeft(yPress))
        graphics
            .append("g")
            .call(d3.axisRight(yTemp))
            .attr("transform", `translate(${width}, 0)`)

        const params = getValuableParams(records)

        for(const param of params) {
            const isTemperature = param.startsWith('temp_')
            const visibility = paramVisibility.get(param)
            let checked = typeof visibility !== 'boolean' || visibility
            const color = isTemperature ? getRed() : getBlue()
            const data = getSubset(records, param)
            const path = graphics.append("path")
                .attr("id", param)
                .attr("class", "line")
                .attr("d", getValueLine(x, isTemperature ? yTemp : yPress, data))
                .style("fill", "none")
                .style("stroke", color)
                .style("stroke-width", "2px")
                .style('opacity', checked ? '1' : '0')

            pathes.set(param, path)
        }
        return pathes
    }
    catch(err) {
        console.log(err)
        return pathes
    }
}
*/

let a = 1