import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getTwoCharactersSuccess',
            'getTwoCharactersFail',
            'voteFai;'
        );
    }

    getTwoCharacters() {
        fetch('/api/characters')
        .then((data) => data.json())
        .then((data) => {
            this.actions.getTwoCharactersSuccess(data);
        })
        .catch((err) => {
            this.actions.getTwoCharactersFail(err);
        })
    }

    vote(winner, loser) {
        fetch('/api/characters', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                winner: winner,
                loser: loser
            })
        })
        .then(() => {
            this.actions.getTwoCharacters();
        })
        .catch((err) => {
            this.actions.voteFail(err);
        })
    }
}

export default alt.createActions(HomeActions);