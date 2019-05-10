import { vid } from './viewId';
/*global jQuery*/

class PrmSearchAfterController {
  constructor($window) {
    this.$window = $window;
  };

  $onInit() {
    console.log("in the search after controller")
    if (this.parentCtrl.$stateParams.query == undefined) {
      // post a message to reset the search index dropdown if the query has been reset to undefined
      let messageobj = {
        'type': 'resetSearchIndex',
        'newIndex': { id: 'any', name: 'any' }
      }
      this.$window.parent.postMessage(messageobj, '*');
    }
  }
}

PrmSearchAfterController.$inject = ['$window'];

export let PrmSearchAfterConfig = {
  name: 'prmSearchAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchAfterController,
  }
}
