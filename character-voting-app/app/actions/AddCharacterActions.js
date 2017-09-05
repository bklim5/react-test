import alt from '../alt';

class AddCharacterActions {
    constructor() {
        this.generateActions(
            'addCharacterSuccess',
            'addCharacterFail',
            'updateName',
            'updateGender',
            'invalidName',
            'invalidGender'
        );
    }

    addCharacter(name, gender) {
        fetch('/api/characters', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                gender: gender
            })
        })
        .then((resp) => {
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp.json(); 
        })
        .then((data) => {
            this.actions.addCharacterSuccess(data.message);
        })
        .catch((err) => {
            this.actions.addCharacterFail(err);
        })
    }
}

export default alt.createActions(AddCharacterActions);