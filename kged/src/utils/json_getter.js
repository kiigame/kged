import * as api from 'api'

export class JSONGetter {
    constructor(state) {
        this.rooms = { rooms: api.exportRooms(state, true) }
        this.items = api.exportItems(state, true)
        this.interactions = api.exportInteractions(state)
        this.texts = api.exportTexts(state)

        console.log('rooms', this.rooms)
        console.log('items', this.items)
        console.log('interactions', this.interactions)
        console.log('texts', this.texts)
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
                    data = JSON.stringify(require(`../data/${file}`))
                } catch (e) {
                    data = '{}'
                }
        }

        console.log('data:', data)
        return data
    }
}
