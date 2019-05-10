import { vid } from './viewId';

class PrmNoSearchResultAfterController {
    constructor() {
        this.vid = vid;
    };
    getSearchTerm(){
        return this.parentCtrl.term;
    }
}

PrmNoSearchResultAfterController.$inject = [];

export let PrmNoSearchResultAfterConfig = {
    name: 'prmNoSearchResultAfter',
    config: {
        bindings: { parentCtrl: '<' },
        templateUrl: `custom/${vid}/html/prmNoSearchResultAfter.component.html`,
        controller: PrmNoSearchResultAfterController,
    }
}
