import alt from '../alt';
import StatsActions from '../actions/StatsActions';
import { assign } from 'underscore';

class StatsStore {
    constructor() {
        this.bindActions(StatsActions);
        this.leadingRace = { race: 'Unknown', count: 0 };
        this.leadingBloodline = { bloodline: 'Unknown', count: 0 };
        this.amarrCount = 0;
        this.caldariCount = 0;
        this.gallenteCount = 0;
        this.minmatarCount = 0;
        this.totalVotes = 0;
        this.femaleCount = 0;
        this.maleCount = 0;
        this.totalCount = 0;
    }

    onGetStatsSuccess(data) {
        assign(this, data);
    }

    onGetStatsFail(err) {
        toastr.error(err);
    }
}

export default alt.createStore(StatsStore);