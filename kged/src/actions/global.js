import * as api from 'api'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export const exportProject = (event) => {
    return (dispatch, getState) => {
        const state = getState()
        const rooms = api.exportRooms(state)
        const items = api.exportItems(state)

        const roomsToJSON = JSON.stringify(rooms, null, 4)
        const itemsToJSON = JSON.stringify(items, null, 4)

        const zip = new JSZip();
        zip.file('rooms.json', roomsToJSON);
        zip.file('items.json', itemsToJSON);
        zip.generateAsync({type: 'blob'})
        .then(content => {
            saveAs(content, 'game_data.zip');
        });
    }
}

export const importProject = (pkg) => {
    return (dispatch, getState) => {
        JSZip.loadAsync(pkg).then(zip => {
            Object.keys(zip.files).forEach(filename => {
                zip.files[filename].async('string').then(fileData => {
                    const name = zip.files[filename].name
                    const data = {
                        [name]: JSON.parse(fileData)
                    }
                    console.log('data',data)
                    console.log('name',name)
                })
            })
        })
    }
}
