import { saveVisibility } from "./chart"
import { CHART_TOOLS_ID } from "../../../types/constants"

export const prepareControls = (pathes: Map<string, d3.Selection<SVGPathElement, unknown, null, undefined>>) => {
    const checkboxes = document.querySelectorAll(`#${CHART_TOOLS_ID} input[type="checkbox"]`)
    for(const checkbox of checkboxes){
        const name = checkbox.getAttribute('name')
        if(typeof name !== 'string') return
        const path = pathes.get(name)
        if(!path) continue
        checkbox.addEventListener('change', (e: Event) => {
            const { target } = e
            if(!(target instanceof HTMLInputElement)) return
            const { checked } = target
            path.style('opacity', checked ? '1' : '0')
            saveVisibility(name, checked)
        })
    }
}
