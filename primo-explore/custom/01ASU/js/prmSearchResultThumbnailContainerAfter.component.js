import { browzineNodeServer } from './browzineNodeServer.constant';

class PrmSearchResultThumbnailContainerAfterController {
  constructor($http) {
    var vm = this;
    this.newThumbnail = '';
    
    // checking for item property as this seems to impact virtual shelf
    //   browse (for reasons as yet unknown)
    if (this.parentCtrl.item && this.parentCtrl.item.pnx.addata.issn) {
      this.issn = this.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
      const journalURL = browzineNodeServer + "/journals?ISSN=" + this.issn;
      $http.jsonp(journalURL, { jsonpCallbackParam: 'callback' }).then(function (response) {
        if (response.data.data["0"] && response.data.data["0"].browzineEnabled) {
          // console.log(`found: ${JSON.stringify(response.data.data["0"])}`);
          vm.newThumbnail = response.data.data["0"].coverImageUrl;
        }
      }, function (error) {
        console.log(error);
      });
    }
  };

  $doCheck(changes) {
    if (this.parentCtrl.selectedThumbnailLink) {
      if (this.newThumbnail != '') {
        this.parentCtrl.selectedThumbnailLink.linkURL = this.newThumbnail;
      }
    }
  }
}
PrmSearchResultThumbnailContainerAfterController.$inject = ['$http'];

export let PrmSearchResultThumbnailContainerAfterConfig = {
  name: 'prmSearchResultThumbnailContainerAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchResultThumbnailContainerAfterController,
  }
}