import * as api from 'api'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { loadRooms } from './rooms'
import { loadItems } from './items'
import { loadTexts } from './texts'
import { filterFurnitures, extractFurnitures, extractImagesFromRooms, extractImagesFromFurnitures, extractImagesFromItems } from 'utils/index'
import { loadFurnitures } from './furnitures'

export const exportProject = (event) => {
    return (dispatch, getState) => {
        const zip = new JSZip();
        const state = getState()

        const roomImages = extractImagesFromRooms(state.rooms.rooms)
        const furnitureImages = extractImagesFromFurnitures(state.furnitures.furnitures)
        const itemImages = extractImagesFromItems(state.items.items)

        zip.folder("images");

        zip.file("images/placeholder/room.png",fetch(`${window.location}/assets/placeholders/room.png`).then(r => r.blob()))
        zip.file("images/placeholder/furniture.png",fetch(`${window.location}/assets/placeholders/furniture.png`).then(r => r.blob()))
        zip.file("images/placeholder/item.png",fetch(`${window.location}/assets/placeholders/item.png`).then(r => r.blob()))

        roomImages.forEach(i => {
            zip.file(`images/${i.name}`, i.file)
        })
        furnitureImages.forEach(i => {
            zip.file(`images/${i.name}`, i.file)
        })
        itemImages.forEach(i => {
            zip.file(`images/${i.name}`, i.file)
        })


        const rooms = api.exportRooms(state)
        const items = api.exportItems(state)
        const interactions = api.exportInteractions(state)
        const texts = api.exportTexts(state)

        const roomsToJSON = JSON.stringify({rooms: rooms}, null, 4)
        const itemsToJSON = JSON.stringify(items, null, 4)
        const interactionsToJSON = JSON.stringify(interactions, null, 4)
        const textsToJSON = JSON.stringify(texts, null, 4)

        zip.file('rooms.json', roomsToJSON);
        zip.file('items.json', itemsToJSON);
        zip.file('interactions.json', interactionsToJSON);
        zip.file('texts.json', textsToJSON);
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
            let interactionData
            (async () => {
                return await zip.files['interactions.json'].async('string').then(data => {interactionData = JSON.parse(data)})
            })()
            let textData
            (async () => {
                return await zip.files['texts.json'].async('string').then(data => {textData = JSON.parse(data)})
            })()
            files.forEach(filename => {
                let file = zip.files[filename]
                if (file.dir) {
                    return
                } else if (filename.endsWith('.json')) {
                    file.async('string').then(fileData => {
                        const name = zip.files[filename].name.trim()
                        const data = JSON.parse(fileData)
                        switch(name) {
                            case 'rooms.json':
                                const rooms = filterFurnitures(data.rooms)
                                const furnitures = extractFurnitures(data.rooms, interactionData, textData)
                                dispatch(loadRooms(rooms))
                                dispatch(loadFurnitures(furnitures))
                                break
                            case 'items.json':
                                dispatch(loadItems(data))
                                break
                            case 'texts.json':
                                dispatch(loadTexts(data))
                                break
                            default:
                                console.log('Unrecognized file:', name)
                        }
                    })
                } else {
                    console.log('image?', file)
                }
            })
        })
    }
}
