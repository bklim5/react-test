import alt from '../alt';

class CharacterActions {
    constructor() {
        this.generateActions(
            'reportSuccess',
            'reportFail',
            'getCharacterSuccess',
            'getCharacterFail'
        )
    }

    getCharacter(characterId) {
        fetch(`/api/characters/${characterId}`)
        .then((data) => data.json())
        .then((data) => {
            this.actions.getCharacterSuccess(data)
        })
        .catch((err) => {
            this.actions.getCharacterFail(err)
        })
    }

    report(characterId) {
        fetch('/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                characterId: characterId
            })
        })
        .then(() => {
            this.actions.reportSuccess()
        })
        .catch((err) => {
            this.actions.reportFail(err)
        })
    }
}

export default alt.createActions(CharacterActions);