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
