import { readFile } from 'fs/promises'

export async function getIcon (name: string) {
    const path = `./node_modules/bootstrap-icons/icons/${name}.svg`
    return await readFile(path, 'utf8')
}
