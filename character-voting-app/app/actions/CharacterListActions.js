import alt from '../alt';

class CharacterListActions {
    constructor() {
        this.generateActions(
            'getCharactersSuccess',
            'getCharactersFail'
        );
    }

    getCharacters(payload) {
        let url = '/api/characters/top';
        let params = {
            race: payload.race,
            bloodline: payload.bloodline
        }

        if (payload.category === 'female') {
            params.gender = 'female';
        } else if (payload.category === 'male') {
            params.gender = 'male';
        }

        if (payload.category === 'shame') {
            url = '/api/characters/shame';
        }

        let fetchUrl = new URL(url);
        Object.keys(params).forEach(key => {
            fetchUrl.searchParams.append(key, params[key])
        })

        fetch(fetchUrl)
        .then((data) => data.json())
        .then((data) => {
            this.actions.getCharactersSuccess(data)
        })
        .catch((err) => {
            this.actions.getCharactersFail(err)
        });
    }
}

export default alt.createActions(CharacterListActions);