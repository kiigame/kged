import * as api from 'api'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { loadRooms } from './rooms'
import { loadItems } from './items'
import { filterFurnitures, extractFurnitures } from 'utils/index'
import { loadFurnitures } from './furnitures'

export const exportProject = (event) => {
    return (dispatch, getState) => {
        const state = getState()
        const rooms = api.exportRooms(state)
        const items = api.exportItems(state)
        const interactions = api.exportInteractions(state)

        const roomsToJSON = JSON.stringify({rooms: rooms}, null, 4)
        const itemsToJSON = JSON.stringify(items, null, 4)
        const interactionsToJSON = JSON.stringify(interactions, null, 4)

        const zip = new JSZip();
        zip.file('rooms.json', roomsToJSON);
        zip.file('items.json', itemsToJSON);
        zip.file('interactions.json', interactionsToJSON);
        zip.generateAsync({type: 'blob'})
        .then(content => {
            saveAs(content, 'game_data.zip');
        });
    }
}

export const importProject = (pkg) => {
    return (dispatch, getState) => {
        JSZip.loadAsync(pkg).then(zip => {
            let files = Object.keys(zip.files)
            let interactionFile = zip.files['interactions.json']
            let interactionData
            (async () => {
                return await interactionFile.async('string').then(data => {interactionData = JSON.parse(data)})
            })()
            files.forEach(filename => {
                zip.files[filename].async('string').then(fileData => {
                    const name = zip.files[filename].name.trim()
                    const data = JSON.parse(fileData)
                    switch(name) {
                        case 'rooms.json':
                            const rooms = filterFurnitures(data.rooms)
                            const furnitures = extractFurnitures(data.rooms, interactionData)
                            dispatch(loadRooms(rooms))
                            dispatch(loadFurnitures(furnitures))
                            break
                        case 'items.json':
                            dispatch(loadItems(data))
                            break
                        default:
                            console.log('Unrecognized file:',name)
                    }
                })
            })
        })
    }
}
