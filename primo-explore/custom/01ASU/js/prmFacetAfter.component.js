import { vid } from './viewId';
/*global jQuery*/

class PrmFacetAfterController {
  constructor(externalSearchService, $element, $timeout, $scope) {
    this.externalSearchService = externalSearchService;
    this.$element = $element;
    this.$timeout = $timeout;
    this.$scope = $scope;
  };

  $onInit() {
    const unbind = this.$scope.$watchCollection(() => this.parentCtrl.facetService.results,
      r => {
        if (r.length > 0) {
          this.externalSearchService.controller = this.parentCtrl;
          this.externalSearchService.addExtSearch();
          unbind();
        }
      }
    );
  };


  $postLink() {
    // let prmFacet = this.$element.parent();
    this.$timeout(function () {
      // At the time $postLink is called, the contents of prm-facet do not
      // exist yet. Putting this in a timeout is a workaround.
      let div = jQuery('prm-facet md-checkbox:has(span[translate="expandresults"])').parent();
      let expMyResBtn = jQuery('.expand-my-results-button-tip');
      if (div && div.length > 0 && expMyResBtn && expMyResBtn.length > 0) {
        div.append(expMyResBtn);
      } else if (expMyResBtn) {
        expMyResBtn.remove();
      }
    }, 1);
  };
}

PrmFacetAfterController.$inject = ['externalSearchService', '$element', '$timeout', '$scope'];

export let PrmFacetAfterConfig = {
  name: 'prmFacetAfter',
  config: {
    bindings: { parentCtrl: '<' },
    templateUrl: `custom/${vid}/html/expandMyResultsTip.html`,
    controller: PrmFacetAfterController,
  }
}
