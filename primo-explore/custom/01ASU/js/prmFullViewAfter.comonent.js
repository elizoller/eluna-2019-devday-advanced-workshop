import { vid } from './viewId';

class PrmFullViewAfterController {
  constructor() {};
}

PrmFullViewAfterController.$inject = [];

export let PrmFullViewAfterConfig = {
  name: 'prmFullViewAfter',
  config: {
    bindings: { parentCtrl: '<' },
    templateUrl: `custom/${vid}/html/prmFullViewAfter.component.html`,
    controller: PrmFullViewAfterController,
  }
}
