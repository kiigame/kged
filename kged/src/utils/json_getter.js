import * as api from 'api'

export class JSONGetter {
    constructor(state) {
        this.rooms = { rooms: api.exportRooms(state, true) }
        this.items = api.exportItems(state, true)
        this.interactions = api.exportInteractions(state)
        this.texts = api.exportTexts(state)
    }

    getJSON(file) {
        let data
        switch (file) {
            case 'rooms.json':
                data = JSON.stringify(this.rooms)
                break;
            case 'items.json':
                data = JSON.stringify(this.items)
                break;
            case 'interactions.json':
                data = JSON.stringify(this.interactions)
                break;
            case 'texts.json':
                data = JSON.stringify(this.texts)
                break;
            case 'legends.json':
                data = '[]'
                break;
            default:
                try {
                    // try to load data from default assets
                    data = JSON.stringify(require(`../data/${file}`))
                } catch (e) {
                    data = '{}'
                }
        }

        return data
    }
}
