import Models from './OdooRpc';

export default class GameTeamPlayer extends Models {
    constructor(...args) {
        super(...args);
        this.model = 'og.igame.team.player';
    }

    get_matches(){
        this.exec('get_matches', {}, []);
    }
}
