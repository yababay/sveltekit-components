import { CHART_TOOLS_ID, CHART_TOOLS_TOGGLER_ID } from "../../../types/constants"

export const prepareTools = () => {
    const toolsPanel = document.getElementById(CHART_TOOLS_ID)
    if(!(toolsPanel instanceof HTMLElement)) throw 'no chart tools panel'

    const toggler = document.querySelector(`#${CHART_TOOLS_TOGGLER_ID} .bi-tools`)
    if(!(toggler instanceof HTMLElement)) throw 'no chart toggler'

    let isHidden = true

    const showTools = () => {
        toolsPanel.classList.remove('tools-slideout')
        toolsPanel.classList.add('tools-slideon')
    }

    const hideTools = () => {
        toolsPanel.classList.remove('tools-slideon')
        toolsPanel.classList.add('tools-slideout')
    }

    const toggleTools = () => {
            if(isHidden) showTools()
            else hideTools()
            isHidden = !isHidden
    }

    const toggleByKey = (e: KeyboardEvent) => {
        if(!(e.key === 'OS' || e.key === 'Compose')) return
        toggleTools()
    }

    const hideByKey = (e: KeyboardEvent) => {
        if(isHidden || e.key !== 'Escape') return
        toggleTools()
    }

    document.addEventListener('keydown', hideByKey)
    document.addEventListener('keydown', toggleByKey)
    toggler.addEventListener('click', toggleTools)
}
