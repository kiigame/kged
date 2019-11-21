export class JSONGetter {
    constructor(state) {
        console.log('jsongetter constructor. state:', state)
    }

    getJSON(file) {

        let data = require(`../data/${file}`)
        console.log('file:', file, 'data:', data)

        switch (file) {
            case 'rooms.json':
                break
            case 'items.json':
                break
            case 'interactions.json':
                break
            case 'texts.json':
                break
            case 'legends.json':
                return '[]'
            default:
                try {
                    return JSON.stringify(require(`../data/${file}`))
                } catch (e) {
                    return '{}'
                }
        }
        return JSON.stringify(data)
    }
}
