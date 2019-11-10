import * as api from 'api'
import { saveAs } from 'file-saver'
var JSZip = require('jszip')

export const exportProject = (event) => {
    return (dispatch, getState) => {
        const state = getState()
        const rooms = api.exportRooms(state)
        const items = api.exportItems(state)

        const roomsToJSON = JSON.stringify(rooms, null, 4)
        const itemsToJSON = JSON.stringify(items, null, 4)

        var zip = new JSZip();
        zip.file("rooms.json",roomsToJSON);
        zip.file("items.json",itemsToJSON);
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            saveAs(content, "game_data.zip");
        });
        //

    }
}

export const importProject = (event) => {
    return (dispatch, getState) => {
        JSZip.loadAsync(event).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
                zip.files[filename].async('string').then(function (fileData) {
                    var name = zip.files[filename].name
                    var data = {
                        [name]: JSON.parse(fileData)
                    }
                    console.log('data',data)
                    console.log('name',name)
                })
            })
        })
    }
}
