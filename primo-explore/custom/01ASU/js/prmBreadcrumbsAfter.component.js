import { original_facets } from './prmSearchResultListAfter.component';


class PrmBreadcrumbsAfterController {
  constructor() {
  };

  $onInit() {
    var vm = this;
    let original_facet_strings = [];
    vm.parentCtrl.removeFacet = (cur) => {
      if (cur.persistent) {
        vm.parentCtrl.removeStickyFacet(cur);
      }
      let facetString = cur.name + "," + cur.type + "," + cur.value;
      if (cur.name == "frbrgroupid") {
        angular.forEach(original_facets, function (fac) {
          const fstr = fac['name'] + "," + fac['type'] + "," + fac['value'];
          original_facet_strings.push(fstr);
        });
        if (original_facets != [] && original_facets != vm.parentCtrl.searchService.searchFieldsService.prevFacets) {
          vm.parentCtrl.searchService.searchFieldsService.prevFacets = original_facet_strings;
        }
      }
      vm.parentCtrl.facetService.facetSearch({ facet: facetString, remove: true });
    }
  }



}

export let PrmBreadcrumbsAfterConfig = {
  name: 'prmBreadcrumbsAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmBreadcrumbsAfterController,
  }
}
