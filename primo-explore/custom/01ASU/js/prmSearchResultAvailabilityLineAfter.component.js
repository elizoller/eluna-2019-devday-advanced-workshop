import { vid } from './viewId';
import { browzineNodeServer } from './browzineNodeServer.constant';

class PrmSearchResultAvailabilityLineAfterController {
  constructor($scope, $http) {
    var vm = this;
    $scope.book_icon = `custom/${vid}/img/browzine_open_book_icon.png`;
    if (vm.parentCtrl.result.pnx.addata.doi && vm.parentCtrl.result.pnx.display.type[0] == 'article') {
      vm.doi = vm.parentCtrl.result.pnx.addata.doi[0] || '';
      var articleURL = browzineNodeServer + "/articles?DOI=" + vm.doi;
      // console.log(`Browzine searching for ${articleURL}`);
      $http.jsonp(articleURL, { jsonpCallbackParam: 'callback' }).then(function (response) {
        // console.log(`  received ${JSON.stringify(response.data,null,2)}`);
        $scope.article = response.data;
      }, function (error) {
        console.log(error);
      });
    }
    if (vm.parentCtrl.result.pnx.addata.issn && vm.parentCtrl.result.pnx.display.type[0] == 'journal') {
      vm.issn = vm.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
      var journalURL = browzineNodeServer + "/journals?ISSN=" + vm.issn;
      // console.log(`Browzine searching for ${journalURL}`);
      $http.jsonp(journalURL, { jsonpCallbackParam: 'callback' }).then(function (response) {
        // console.log(`  received ${JSON.stringify(response.data, null, 2)}`);
        $scope.journal = response.data;
      }, function (error) {
        console.log(error);
      });
    }
  };

}
PrmSearchResultAvailabilityLineAfterController.$inject = ['$scope', '$http'];

export let PrmSearchResultAvailabilityLineAfterConfig = {
  name: 'prmSearchResultAvailabilityLineAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchResultAvailabilityLineAfterController,
    templateUrl: `custom/${vid}/html/prmSearchResultAvailabilityLineAfter.component.html`
  }
}