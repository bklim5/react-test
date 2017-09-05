import alt from '../alt';
import CharacterListActions from '../actions/CharacterListActions';

class CharacterListStore {
    constructor() {
        this.bindActions(CharacterListActions);
        this.characters = [];
    }

    onGetCharacterSuccess(data) {
        this.characters = data;
    }

    onGetCharactersFail(err) {
        toastr.error(err);
    }
}

export default alt.createStore(CharacterListStore);