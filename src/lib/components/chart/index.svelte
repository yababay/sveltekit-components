<script lang="ts">

    import * as d3 from 'd3'
    import { onMount } from 'svelte'
    import '../../styles/chart.scss'
    import { page } from '$app/stores'
    import { CHART_DATA_ID, CHART_ID, READY_FOR_CHART } from '$lib/types/constants'
    import Tools from './Tools.svelte'
    import type { LoopAttributes } from '$lib/types/model/loop'
    import type { ChartDataAttributes } from '$lib/types/model/chart'
    import { defaultChartOptions } from '$lib/types/chart'
    import { pathes, paramVisibility } from './store'
    import { getTimestamps, setupDomainY, getValuableParams, getSubset, getValueLine } from './util';
    import { getBlue, getRed } from './colors';
    import Description from './Description.svelte';
    import { PUBLIC_WEBSOCKET_PORT } from '$env/static/public';
  
    export let 
      records: ChartDataAttributes[] = [],
      description: LoopAttributes

    let root: Element 

    const { margin } = defaultChartOptions
    const { top, right, bottom, left } = margin
    const { url } = $page
    const { pathname } = url

     onMount(() => {
        if(!records.length) return
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
        if(pathname !== '/chart') return

        const ws = new WebSocket(`ws://localhost:${PUBLIC_WEBSOCKET_PORT}`)

        ws.onopen = () => {
            ws.send(READY_FOR_CHART)
        }

        ws.onmessage = function(e) {
            const { data } = e
            updateVisualization(JSON.parse(data));
        }

        function updateVisualization(data: ChartDataAttributes) {
            console.log(data)
        }
    })

    onMount(() => {
        const descriptionDiv = document.getElementById('tzmoi-description')
        if(!(descriptionDiv instanceof HTMLElement)) return
        new Description({target: descriptionDiv, props: {description}})
    })
  </script>

  {#if records}
    <input id={CHART_DATA_ID} type="hidden" value={btoa(JSON.stringify(records))}>
  {/if}

  <svg id={CHART_ID} bind:this={root}/>

  <Tools {records} />

