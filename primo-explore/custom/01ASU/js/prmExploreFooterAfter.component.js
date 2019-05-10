import { vid } from './viewId';

class PrmExploreFooterAfterController {

  constructor() {

  }

  $onInit() {
    console.log("in the footer")
  }



}

PrmExploreFooterAfterController.$inject =
  [];

export let PrmExploreFooterAfterConfig = {
  name: 'prmExploreFooterAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmExploreFooterAfterController,
    templateUrl: `custom/${vid}/html/prmExploreFooterAfter.component.html`
  }
};
