import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.characters = [];
    }

    onGetTwoCharactersSuccess(data) {
        this.characters = data;
    }

    onGetTwoCharactersFail(err) {
        toastr.error(err);
    }

    onVoteFail(err) {
        toastr.error(err);
    }


}

export default alt.createStore(HomeStore);