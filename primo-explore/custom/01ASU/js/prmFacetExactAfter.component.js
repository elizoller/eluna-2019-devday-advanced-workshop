import { vid } from './viewId';

class PrmFacetExactAfterController {
  constructor($scope, $location, searchTargets) {
    this.$scope = $scope;
    this.$location = $location;
    this.searchTargets = searchTargets;
    
    $scope.name = this.parentCtrl.facetGroup.name;
    $scope.targets = searchTargets;
    let query = $location.search().query;
    let filter = $location.search().pfilter;
    $scope.queries = Array.isArray(query) ? query : query ? [query] : false;
    $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false;
  };

}

PrmFacetExactAfterController.$inject = ['$scope', '$location', 'searchTargets'];

export let PrmFacetExactAfterConfig = {
  name: 'prmFacetExactAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmFacetExactAfterController,
    templateUrl: `custom/${vid}/html/prmFacetExactAfter.component.html`
  }
}