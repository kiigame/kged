import * as api from 'api'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import * as utils from 'utils/index'
import { loadRooms } from './rooms'
import { loadFurnitures } from './furnitures'
import { loadItems } from './items'
import { loadTexts } from './texts'
import { loadInteractions } from './interactions'

export const exportProject = (event) => {
    // export a zip package containing game data

    return (dispatch, getState) => {
        const zip = new JSZip();
        const state = getState()

        zip.folder('images');
        // fetch and convert placeholders to blobs and add them to the zip package
        zip.file('images/placeholder/room.png',
                 fetch(`${window.location}/assets/placeholders/room.png`).then(r => r.blob()))
        zip.file('images/placeholder/furniture.png',
                 fetch(`${window.location}/assets/placeholders/furniture.png`).then(r => r.blob()))
        zip.file('images/placeholder/item.png',
                 fetch(`${window.location}/assets/placeholders/item.png`).then(r => r.blob()))

        const roomImages = utils.extractImagesFromRooms(state.rooms.rooms)
        const furnitureImages = utils.extractImagesFromFurnitures(state.furnitures.furnitures)
        const itemImages = utils.extractImagesFromItems(state.items.items)

        // add all extracted images to the zip package
        roomImages.concat(furnitureImages, itemImages).forEach(img =>
            zip.file(`images/${img.name}`, img.file)
        )

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

        zip.generateAsync({type: 'blob'}).then(content => {
            saveAs(content, 'pelidata.zip');
        });
    }
}

function loadZipData(zip, filename, type='string') {
    // load a file from the zip package and save it as an object
    return zip.files[filename].async(type).then(data => {
        return { name: filename, data: data }
    })
}

function loadImageData(zip) {
    // load image data from the zip package
    const imageLoads = []

    zip.folder('images').forEach((path, file) => {
        if (file.dir) {
            return // directories can't be loaded
        }
        // load images as binary blob objects
        imageLoads.push(loadZipData(zip, `images/${path}`, 'blob'))
    })

    return Promise.all(imageLoads).then(data => {
        // all image files have been loaded
        const imageData = {}
        data.forEach(d => {
            imageData[d.name] = URL.createObjectURL(d.data)
        })
        return imageData
    })
}

function loadJsonData(zip, imageData) {
    // load json data from the zip package
    const jsonLoads = []

    jsonLoads.push(loadZipData(zip, 'interactions.json'))
    jsonLoads.push(loadZipData(zip, 'texts.json'))
    jsonLoads.push(loadZipData(zip, 'items.json'))
    jsonLoads.push(loadZipData(zip, 'rooms.json'))

    return Promise.all(jsonLoads).then((data) => {
        // all json files have been loaded
        const jsonData = {}
        data.forEach(d => { jsonData[d.name] = JSON.parse(d.data) })
        return jsonData
    })
}

export const importProject = (pkg) => {
    // import a zip package containing game data

    return (dispatch, getState) => {
        JSZip.loadAsync(pkg).then(zip => {
            loadImageData(zip).then(imageData => {
                loadJsonData(zip, imageData).then(jsonData => {
                    let items = jsonData['items.json']
                    items = utils.mapAssetsToItems(items, imageData)

                    let rooms = utils.extractRooms(jsonData['rooms.json'].rooms)
                    rooms = utils.mapAssetsToRooms(rooms, imageData)

                    let furnitures = utils.extractFurnitures(jsonData['rooms.json'].rooms,
                                                        jsonData['interactions.json'],
                                                        jsonData['texts.json'])
                    furnitures = utils.mapAssetsToFurnitures(furnitures, imageData)

                    // load data into the store
                    dispatch(loadItems(items))
                    dispatch(loadRooms(rooms))
                    dispatch(loadFurnitures(furnitures))
                    dispatch(loadTexts(jsonData['texts.json']))
                    dispatch(loadInteractions(jsonData['interactions.json']))
                })
            })

        })
    }
}

export const clearEvents = (event) => {
    // clear console messages

    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_EVENTS',
            payload: {
            }
        })
    }
}
