import { vid } from './viewId';

class PrmFavoritesAfterController {

  constructor() {

  }
  $onInit() {
    this.initSavedSearchBanner();
  }

  initSavedSearchBanner() {
    const msg = "Your saved searches will be cleared in mid-December due to a system upgrade. Please take note of any searches you would like to re-save after the upgrade or <a href='https://lib.asu.edu/systems/help/request?subject=Request%20for%20Primo%20Saved%20Searches' target='_blank'>submit a request for a list of your saved searches</a>."
    this.showFavoritesBanner = true;
    this.alertBanner = this.parentCtrl.favoritesService.searchService.alertService.create(0);
    this.alertBanner.show(msg, false);
    let alert = angular.element(document.getElementsByTagName("prm-favorites-after")[0]);
    let top = angular.element(document.getElementsByClassName("topbar-wrapper")[0]);
    top.append(alert);
  }

  $onDestroy() {
    let alert = angular.element(document.getElementsByTagName("prm-favorites-after")[0]);
    alert.remove();
  }

}

PrmFavoritesAfterController.$inject = [];

export let PrmFavoritesAfterConfig = {
  name: 'prmFavoritesAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmFavoritesAfterController,
    templateUrl: `custom/${vid}/html/prmFavoritesAfter.component.html`
  }
};
