class PrmFinesAfterController {

  constructor($element) {
    this.$element = $element;

  }
  $onInit() {
  }

}

PrmFinesAfterController.$inject = ['$element'];

export let PrmFinesAfterConfig = {
  name: 'prmFinesAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmFinesAfterController,
    template: `<a href="https://lib.asu.edu/policies/fines" target="_blank" class="layout-column tile-header" layout="column" id="fines-link">Learn about fines</a>`
  }
};
