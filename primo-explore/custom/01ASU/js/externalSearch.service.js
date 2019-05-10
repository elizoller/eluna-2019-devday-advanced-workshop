/**
 * Code modified from https://github.com/Alliance-PCJWG/primo-explore-external-search under
 * license https://github.com/alliance-pcsg/primo-explore-external-search/blob/master/LICENSE
 */

export class ExternalSearchService {
  constructor() { }

  get controller() {
    return this.prmFacetCtrl || false;
  }
  
  set controller(controller) {
    this.prmFacetCtrl = controller;
  }

  addExtSearch() {
    if (this.prmFacetCtrl.facetService &&
      this.prmFacetCtrl.facetService.results &&
      this.prmFacetCtrl.facetService.results[0] &&
      this.prmFacetCtrl.facetService.results[0].name !== 'External Search') {
      this.prmFacetCtrl.facetService.results.unshift({
        name: 'External Search',
        displayedType: 'exact',
        limitCount: 0,
        facetGroupCollapsed: false,
        values: undefined
      })
    }
  }

}
