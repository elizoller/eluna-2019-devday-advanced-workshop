/*global angular */

import { vid } from './viewId';

class SearchTipsController {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  };

  /**
   * Pops up a modal containing Primo search tips.
   */
  showSearchTips(event) {
    this.$mdDialog.show({
      controller: () => {
        return {
          hide: () => this.$mdDialog.hide(),
          cancel: () => this.$mdDialog.cancel(),
        }
      },
      controllerAs: '$ctrl',
      templateUrl: `custom/${vid}/html/searchTips.html`,
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

}

SearchTipsController.$inject = ['$mdDialog'];

export let SearchTipsConfig = {
  name: 'searchTips',
  config: {
    controller: SearchTipsController,
    templateUrl: `custom/${vid}/html/searchTips.component.html`
  }
}