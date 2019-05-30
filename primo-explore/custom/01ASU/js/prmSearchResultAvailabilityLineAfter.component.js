import { vid } from './viewId';

class PrmSearchResultAvailabilityLineAfterController {
  constructor($scope, $http) {
    this.$scope = $scope;
  };

  $onInit(){

  }
}
PrmSearchResultAvailabilityLineAfterController.$inject = ['$scope', '$http'];

export let PrmSearchResultAvailabilityLineAfterConfig = {
  name: 'prmSearchResultAvailabilityLineAfter',
  config: {
    // require: {
    //   prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
    // },
    bindings: { parentCtrl: '<' },
    controller: PrmSearchResultAvailabilityLineAfterController,
    templateUrl: `custom/${vid}/html/prmSearchResultAvailabilityLineAfter.component.html`
  }
}
