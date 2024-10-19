const RED = [
    "#FF0000",
    "#FFA07A",
    "#F08080",
    "#FFC0CB",
    '#FA8072', //Salmon	#FA8072	250, 128, 114
    '#E9967A', //DarkSalmon	#E9967A	233, 150, 122
    '#FFA07A', //LightSalmon	#FFA07A	255, 160, 122
    '#DC143C', //Crimson	#DC143C	220, 20, 60
    '#B22222', //FireBrick	#B22222	178, 34, 34
    '#8B0000', //DarkRed	#8B0000	139, 0, 0
    '#FFC0CB', //Pink	#FFC0CB	255, 192, 203
    '#FFB6C1', //LightPink	#FFB6C1	255, 182, 193
    '#FF69B4', //HotPink	#FF69B4	255, 105, 180
    '#FF1493', //DeepPink	#FF1493	255, 20, 147
    '#C71585', //MediumVioletRed	#C71585	199, 21, 133
    '#DB7093', //PaleVioletRed	#DB7093	219, 112, 147
    '#FF7F50', //Coral	#FF7F50	255, 127, 80
    '#FF6347', //Tomato	#FF6347	255, 99, 71
    '#FF4500', //OrangeRed	#FF4500	255, 69, 0
    '#FF8C00', //DarkOrange	#FF8C00	255, 140, 0
    '#FFA500', //Orange	#FFA500	255, 165, 0
    '#FFD700', //Gold	#FFD700	255, 215, 0
    '#FFFF00', //Yellow	#FFFF00	255, 255, 0*/
]

const BLUE = [
    '#000CD0',
    '#00BFFF',
    '#87CEFA',
    '#4169E1', //RoyalBlue	#4169E1	65, 105, 225
    '#0000FF', //Blue	#0000FF	0, 0, 255
    '#0000CD', //MediumBlue	#0000CD	0, 0, 205
    '#00008B', //DarkBlue	#00008B	0, 0, 139
    '#00FFFF', //Cyan	#00FFFF	0, 255, 255
    '#E0FFFF', //LightCyan	#E0FFFF	224, 255, 255
    '#AFEEEE', //PaleTurquoise	#AFEEEE	175, 238, 238
    '#7FFFD4', //Aquamarine	#7FFFD4	127, 255, 212
    '#40E0D0', //Turquoise	#40E0D0	64, 224, 208
    '#48D1CC', //MediumTurquoise	#48D1CC	72, 209, 204
    '#00CED1', //DarkTurquoise	#00CED1	0, 206, 209
    '#5F9EA0', //CadetBlue	#5F9EA0	95, 158, 160
    '#4682B4', //SteelBlue	#4682B4	70, 130, 180
    '#B0C4DE', //LightSteelBlue	#B0C4DE	176, 196, 222
    '#B0E0E6', //PowderBlue	#B0E0E6	176, 224, 230
    '#ADD8E6', //LightBlue	#ADD8E6	173, 216, 230
    '#87CEEB', //SkyBlue	#87CEEB	135, 206, 235
    '#87CEFA', //LightSkyBlue	#87CEFA	135, 206, 250
    '#00BFFF', //DeepSkyBlue	#00BFFF	0, 191, 255
    '#1E90FF', //DodgerBlue	#1E90FF	30, 144, 255
    '#6495ED', //CornflowerBlue	#6495ED	100, 149, 237
    '#7B68EE', //MediumSlateBlue	#7B68EE	123, 104, 238
]

function* RedColors() {
    let count = 0
    while(true){
        yield RED[count++]
        if(count >= RED.length) count = 0
    }
}

function* BlueColors() {
    let count = 0
    while(true){
        yield BLUE[count++]
        if(count >= BLUE.length) count = 0
    }
}

const redColors = RedColors()
const blueColors = BlueColors()

const getColor = (gen: Generator<string, void, unknown>): string => {
    const next = gen.next()
    if(next.done) throw 'no more colors'
    return next.value
}

export const getRed = (): string => getColor(redColors)
export const getBlue = (): string => getColor(blueColors)
