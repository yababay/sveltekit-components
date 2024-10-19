import { prepareChart } from './chart'
import { prepareControls } from './controls'
import { prepareTools } from './tools'

window.onload = () => {
    prepareTools()
    const pathes: Map<string, d3.Selection<SVGPathElement, unknown, null, undefined>> = prepareChart()
    prepareControls(pathes)
}
