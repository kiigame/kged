const initialState = {
    character: [
                    {
                        attrs: {
                            id: 'Idle1',
                            url: 'assets/placeholders/character_idle_1.png',
                            category: 'character',
                            "x": 764,
                            "y": 443,
                            visible: true
                        },
                        className: 'Image'
                    },
                    {
                        attrs: {
                            id: 'Idle2',
                            url: 'assets/placeholders/character_idle_2.png',
                            category: 'character',
                            "x": 764,
                            "y": 443,
                            visible: false
                        },
                        className: 'Image'
                    },
                    {
                        attrs: {
                            id: 'Puhe1',
                            url: 'assets/placeholders/character_speak_1.png',
                            category: 'character',
                            "x": 764,
                            "y": 443,
                            visible: false
                        },
                        className: 'Image'
                    },
                    {
                        attrs: {
                            id: 'Puhe2',
                            url: 'assets/placeholders/character_speak_2.png',
                            category: 'character',
                            "x": 764,
                            "y": 443,
                            visible: false
                        },
                        className: 'Image'
                    }
                ],
    activeCharacter: undefined
}
function character(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_CHARACTER':
            return {
                ...state,
                character: action.payload.character
            }

        case 'SET_CHARACTER_IMAGE':
            const id = action.payload.characterId
            const filePath = action.payload.filePath
            const objUrl = action.payload.objectUrl

            return {
                ...state,
                character: state.character.map(character =>
                    character.attrs.id === id
                    ? { ...character, attrs: { ...character.attrs, src: 'images/' + filePath, url: objUrl } }
                    : character
                )
            }

        case 'SET_ACTIVE_CHARACTER':
            return {
                ...state,
                activeCharacter: action.payload.id
            }

        default:
            return state
    }
}

export default character
