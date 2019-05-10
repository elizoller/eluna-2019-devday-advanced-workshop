/*global angular */
import { vid } from './viewId';

class PrmSearchBarAfterController {
  constructor($element, $scope, $window) {
    this.$element = $element;
    this.$scope = $scope;
    this.$window = $window;
    this.ariaText = ""
  };

  $onInit() {
    this.parentCtrl.showTabsAndScopes = true;
    const unbind = this.$scope.$watch(() => this.parentCtrl.hasSearchResults,
      r => {
        if (r == "false") {
          this.ariaText = "Input your search here."
        } else {
          this.ariaText = "This is the search results page. Input a new search here."
        }
        this.setAriaLabel();
      }
    );


    this.$window.addEventListener("message", (event) => {
      if (!event || !event.data || !('type' in event.data) || event.data.type != 'changeAsuSearchIndex') return;
      this.parentCtrl.pFilters.targetField = event.data.newIndex;
      // console.log("updated the searchIndex to " + event.data.newIndex);
    }, false);

    // var meta = document.createElement('meta');
    // meta.name = "google-site-verification";
    // meta.content = "Cx_Y-JPNqF5t-Ntamhsh3H4sUAPUAtZTge3FXv5c6aM";
    // document.getElementsByTagName('head')[0].appendChild(meta);
  }

  $postLink() {

    let parentElement = this.$element.parent();

    // Move the search tips.
    let container = angular.element(parentElement.children()[0].children[0]);
    container.append(this.$element.children()[0]);
  };

  setAriaLabel() {
    let parentElement = this.$element.parent();
    let searchBarElement = angular.element(parentElement[0].querySelector('#searchBar'));
    searchBarElement.attr('aria-label', this.ariaText);
  }


}

PrmSearchBarAfterController.$inject = ['$element', '$scope', '$window'];

export let PrmSearchBarAfterConfig = {
  name: 'prmSearchBarAfter',
  config: {
    bindings: { parentCtrl: '<' },
    templateUrl: `custom/${vid}/html/prmSearchBarAfter.component.html`,
    controller: PrmSearchBarAfterController,
  }
}
