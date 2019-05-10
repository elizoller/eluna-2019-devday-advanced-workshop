import { vid } from './viewId';

export let original_facets = [];

class PrmSearchResultListAfterController {
  constructor() {
    this.prev_facets = [];
    this.prev_mfacets = [];
    this.dismissed = false;
  };

  $onInit() {
    var vm = this;
    this.showAlertBanner = false;
    this.hideAlertBanner();

    var query_obj = vm.parentCtrl.searchService.getSearchObject()
    if (query_obj.scope == "Course_Reserves" || query_obj.tab == "course_reserves") {
      this.initAlertBanner("Find course reserves held in the library below.  For additional reserves, learn more <b><a href='https://lib.asu.edu/access/reserves' target='_blank'>about ASU Library Reading Lists</a></b>.")
    }
    var split_query = query_obj.query.split(",")
    if (query_obj.scope != "Course_Reserves") {
      var string_query = split_query[split_query.length - 1];
      var re = /[a-zA-Z]{2,3}(\s?)[0-9]{3}/
      if (string_query.match(re)) {
        this.initAlertBanner("Looking for Course Reserves? Learn more <b><a href='https://lib.asu.edu/access/reserves' target='_blank'>about ASU Library Reading Lists</a></b>.")
      }
    }

    if (angular.isArray(this.parentCtrl.searchService.searchFieldsService.prevFacets)){
      this.prev_facets = this.parentCtrl.searchService.searchFieldsService.prevFacets;
    } else {
      this.prev_facets = [this.parentCtrl.searchService.searchFieldsService.prevFacets];
    }
    if (angular.isArray(this.parentCtrl.searchService.searchFieldsService.prevMFacets)) {
      this.prev_mfacets = this.parentCtrl.searchService.searchFieldsService.prevMFacets;
    } else {
      this.prev_mfacets = [this.parentCtrl.searchService.searchFieldsService.prevMFacets];
    }
    var i = 0;
    angular.forEach(this.prev_facets, function(val){
      if (vm.parentCtrl.$stateParams['facet'] && vm.parentCtrl.$stateParams['facet'].indexOf(val) > -1){
        vm.prev_facets.splice(i, 1);
      }
      i++;
    });
    var i = 0;
    if (Array.isArray(this.prev_mfacets)){
      angular.forEach(this.prev_mfacets, function (val) {
        if (val){
          if (val.slice(-2).match(",\d")) {
            val = val.slice(0, -2);
          }
          if (vm.parentCtrl.$stateParams['facet'] && vm.parentCtrl.$stateParams['facet'].indexOf(val) > -1) {
            vm.prev_mfacets.splice(i, 1);
          }
          i++;
        } else {
          let indx = vm.prev_mfacets.indexOf(val);
          if (indx > -1){
            vm.prev_mfacets.splice(indx, 1);
          }
        }
      });
    }
    angular.forEach(this.prev_mfacets, function (val) {
        vm.prev_facets << val;
    });
    this.prev_facets = this.parentCtrl.searchService.getFacetsFromUrl(this.prev_facets);
    this.prev_mfacets = this.parentCtrl.searchService.getFacetsFromUrl(this.prev_mfacets, true);
  }

  $postLink(){
    if (this.parentCtrl.facetService.isFrbrSearch() && this.hasFacets() && !this.dismissed) {
      angular.element(document.getElementById('frbr_facet_restore')).removeClass('hide');
      let main = angular.element(document.getElementById('mainResults'));
      let frbr_facets = angular.element(document.getElementById('frbr_facet_restore'));
      console.log(frbr_facets)
      if (main && frbr_facets) {
        main.prepend(frbr_facets);
      }
      if (!Array.isArray(this.parentCtrl.$stateParams['facet'])) {
        original_facets = this.prev_facets;
        var vm = this;
        angular.forEach(this.prev_mfacets, function (val) {
          original_facets << val;
        });
      }
    } else {
      angular.element(document.getElementById('frbr_facet_restore')).addClass('hide');
    }
  }

  addPreFrbrFacet(event, facet){
    var facetString = facet.name+","+facet.type+","+facet.value;
    this.parentCtrl.facetService.facetSearch({ facet: facetString});
  }

  dismissFrbrFacets(){
    this.dismissed = true;
    angular.element(document.getElementById('frbr_facet_restore')).addClass('hide');
  }

  getFacetLabel(facet){
    if (facet){
      if (facet.label.indexOf(".") !== -1) {
        if (facet.displayValue.indexOf("|") !== -1) {
          let farr = facet.displayValue.split("|,|");
          return farr.join("-");
        }
        return facet.displayValue;
      } else {
        return facet.label
      }
    }
    return;
  }

  initAlertBanner(msg) {
    this.showAlertBanner = true;
    this.alertBanner = this.parentCtrl.searchService.alertService.create(0);
    this.alertBanner.show(msg, false);
    let alert = angular.element(document.getElementsByTagName("prm-search-result-list-after")[0]);
    let top = angular.element(document.getElementsByClassName("topbar-wrapper")[0]);
    top.append(alert);
  }

  hideAlertBanner(){
    this.showAlertBanner = false;
    var results = angular.element(document.getElementsByTagName("prm-search-result-list")[0]);
    var results_after = angular.element(document.getElementsByTagName("prm-search-result-list-after")[0])
    if (results_after.parent() != results){
      results.append(results_after);
      this.showAlertBanner = false;
      angular.element(document.getElementById("reservesBanner")).css("display", "none");
    }
  }

  hasFacets(){
    let pf = true;
    let pmf = true;
    if (this.prev_facets == undefined){
      pf = false;
    }
    if (this.prev_facets == []){
      pf = false;
    }
    if (this.prev_facets.length < 1){
      pf = false;
    }
    if (this.prev_facets == [undefined]){
      pf = false;
    }
    if (this.prev_facets.indexOf() !== -1) {
      pf = false;
    }

    if (this.prev_mfacets == undefined) {
      pmf = false;
    }
    if (this.prev_mfacets == []) {
      pmf = false;
    }
    if (this.prev_mfacets.length < 1) {
      pmf = false;
    }
    if (this.prev_mfacets == [undefined]) {
      pmf = false;
    }
    if (this.prev_mfacets.indexOf() !== -1){
      pmf = false;
    }
    if (pf || pmf){
      return true;
    }
  }


}

export let PrmSearchResultListAfterConfig = {
  name: 'prmSearchResultListAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchResultListAfterController,
    templateUrl: `custom/${vid}/html/prmSearchResultListAfter.component.html`
  }
}
