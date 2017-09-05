import alt from '../alt';

class FooterActions {
    constructor() {
        this.generateActions(
            'getTopCharactersSuccess',
            'getTopCharactersFail'
        );
    }

    getTopCharacters() {
        fetch('/api/characters/top')
        .then((data) => data.json())
        .then((data) => {
            this.actions.getTopCharactersSuccess(data)
        })
        .catch((err) => {
            this.actions.getTopCharactersFail(err)
        });
    }
}

export default alt.createActions(FooterActions);