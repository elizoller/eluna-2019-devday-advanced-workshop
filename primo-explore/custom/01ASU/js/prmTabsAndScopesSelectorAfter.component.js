import { vid } from './viewId';
import { race } from 'q';

class PrmTabsAndScopesSelectorAfterController {
  constructor($scope, $http, $element, $compile, $window, $location) {
    this.$scope = $scope;
    this.$element = $element;
    this.$compile = $compile;
    this.$window = $window;
    this.$location = $location;
  };

  $onInit() {
    console.log("in tabs and scopes selector")
    // add a dropdown for search index selection
    // set the index dropdown if a search index has already been selected
    let selectedModel = null;
    if (this.parentCtrl.configurationUtil.searchStateService.searchObject != undefined && 'query' in this.parentCtrl.configurationUtil.searchStateService.searchObject && this.parentCtrl.configurationUtil.searchStateService.searchObject.query != undefined) {
      let currentIndex = this.parentCtrl.configurationUtil.searchStateService.searchObject.query.split(",")[0];
      console.log(currentIndex)
      if (currentIndex == 'creator') {
        selectedModel = { id: 'creator', name: 'author' }
      } else if (currentIndex == 'title') {
        selectedModel = { id: 'title', name: 'title' }
      } else {
        selectedModel = { id: 'any', name: 'keyword' }
      }
    } else {
      selectedModel = { id: 'any', name: 'keyword' }
    }

    // listen for the reset message when the query is undefined
    this.$window.addEventListener("message", (event) => {
      if (!event || !event.data || !('type' in event.data) || event.data.type != 'resetSearchIndex') return;
      let vm = this;
      this.$scope.$apply(function () {
        vm.$scope.data.model = vm.$scope.data.availableOptions[0];
      })
    }, false);

    this.$scope.data = {
      asuModel: selectedModel,
      availableOptions: [
        { id: 'any', name: 'keyword' },
        { id: 'title', name: 'title' },
        { id: 'creator', name: 'author' }
      ]
    }
  }

  $postLink() {
    // transform the scope dropdown to radio buttons
    let searchProfileRadios = angular.element(document.getElementById("searchProfileRadios"));
    let searchWrapper = angular.element(document.getElementsByClassName("search-elements-wrapper")[0]);
    searchWrapper.prepend(searchProfileRadios);
    let vm = this;
    vm.$scope.$watchCollection(() => vm.$element.parent().children()[0].children,
      r => {
        if (r && r.length > 0) {
          vm.hideScopeDropdown()
        }
      }
    );
    // let searchIndexDropdown = angular.element(document.getElementById('indexSelect'));
    // angular.element(parentElement.children()[0]).append(searchIndexDropdown);
  }

  hideScopeDropdown() {
    let parentElement = this.$element.parent();
    let searchProfileDropdown = parentElement.children()[0].children[1];
    angular.element(searchProfileDropdown).css("display", "none");
  }

  onChangeAsuIndex() {
    let messageobj = {
      'type': 'changeAsuSearchIndex',
      'newIndex': this.$scope.data.asuModel.id
    }
    this.$window.parent.postMessage(messageobj, '*');
  }

}
PrmTabsAndScopesSelectorAfterController.$inject = ['$scope', '$http', '$element', '$compile', '$window', '$location'];

export let PrmTabsAndScopesSelectorAfterConfig = {
  name: 'prmTabsAndScopesSelectorAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmTabsAndScopesSelectorAfterController,
    templateUrl: `custom/${vid}/html/prmTabsAndScopesSelectorAfter.component.html`,
  }
}
