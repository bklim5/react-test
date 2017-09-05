import alt from '../alt';
class StatsActions {
    constructor() {
        this.generateActions(
            'getStatsSuccess',
            'getStatsFail'
        );
    }

    getStats() {
        fetch('/api/stats')
        .then((data) => data.json())
        .then((data) => {
            this.actions.getStatsSuccess(data)
        })
        .catch((err) => {
            this.actions.getStatsFail(err)
        })
    }
}

export default alt.createActions(StatsActions);