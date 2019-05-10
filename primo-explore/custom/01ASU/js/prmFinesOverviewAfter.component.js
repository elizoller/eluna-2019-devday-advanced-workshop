class PrmFinesOverviewAfterController {

  constructor($element) {
    this.$element = $element;

  }
  $onInit() {

  }
  $postLink() {
    let link = angular.element(document.getElementById("fines-overview-link"));
    let par = angular.element(this.$element.parent().children()[0]);
    let par2 = angular.element(par.children()[0]);
    par2.after(link);
  }

}

PrmFinesOverviewAfterController.$inject = ['$element'];

export let PrmFinesOverviewAfterConfig = {
  name: 'prmFinesOverviewAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmFinesOverviewAfterController,
    template: `<a href="https://lib.asu.edu/policies/fines" target="_blank" class="layout-column tile-header" layout="column" id="fines-overview-link">Learn about fines</a>`
  }
};
