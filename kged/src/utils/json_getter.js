import * as api from 'api'

export class JSONGetter {
    // overrides the engine's JSONGetter class to
    // load game data from the Redux store

    constructor(state) {
        this.rooms = { rooms: api.exportRooms(state, true) }
        this.items = api.exportItems(state, true)
        this.character = {frames: api.exportCharacter(state, true), "animations": {"speak": {"id": "speak", "frames":[{"node": "Puhe1", "duration": "0.3"},{"node": "Puhe2", "duration": "0.3"} ]},"idle": {"id": "idle", "frames":[{"node": "Idle1", "duration": "8.7"},{"node": "Idle2", "duration": "0.2"} ]},}}
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
            case 'character.json':
                data = JSON.stringify(this.character)
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
