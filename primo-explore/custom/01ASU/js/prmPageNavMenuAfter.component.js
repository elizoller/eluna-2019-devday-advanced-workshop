/**
 * This is needed so that External Search facets still appear
 * after loading extra pages of results.
 */

class PrmPageNavMenuAfterController {
  constructor(externalSearchService) {
    this.externalSearchService = externalSearchService;
    console.log('PrmPageNavMenuAfterController.constructor()')
  }

  $onInit() {
    if (this.externalSearchService.controller) {
      this.externalSearchService.addExtSearch();
    }
  }
}

PrmPageNavMenuAfterController.$inject = ['externalSearchService'];

export let PrmPageNavMenuAfterConfig = {
  name: 'prmPageNavMenuAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmPageNavMenuAfterController,
  }
}