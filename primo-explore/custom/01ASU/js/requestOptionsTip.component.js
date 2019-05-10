/*global angular */

import { vid } from './viewId';

var _dialog_open = false;

class RequestOptionsTipController {
  constructor($mdDialog, $window) {
    this.$mdDialog = $mdDialog;
    this.$window = $window;

    function showMe(event) {
      _dialog_open = true;
      $mdDialog.show({
        multiple: true,
        controller: () => {
          return {
            hide: () => {
              //console.log('hiding!');
              $mdDialog.hide();
            },
            cancel: () => {
              //console.log('closing!');
              _dialog_open = false;
              $mdDialog.cancel();
            }
          }
        },
        controllerAs: '$ctrl',
        templateUrl: `custom/${vid}/html/requestOptionsTip.html`,
        skipHide: true, // this is the key line to allow multiple dialogs!
        preserveScope: true,
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: false // Only for -xs, -sm breakpoints.
      });
    }
    $window.addEventListener("message", (event) => {
      if (!event || !event.data || event.data !== 'showRequestModal') return;
      // console.log('RequestOptionsTipController heard a message');
      if (_dialog_open) return;
      showMe(event);
    }, false);

  };

}

RequestOptionsTipController.$inject = ['$mdDialog', '$window'];

export let RequestOptionsTipConfig = {
  name: 'requestOptionsTip',
  config: {
    controller: RequestOptionsTipController,
    templateUrl: `custom/${vid}/html/requestOptionsTip.component.html`
  }
}