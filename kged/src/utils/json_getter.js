export class JSONGetter {
    getJSON(file) {
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
                return '{}'
        }
        return JSON.stringify(file)
    }
}
