export const setSize = (svg: string, size: number) => svg.replace(/=\"16\"\ /g, `=\"${size}\"\ `)
