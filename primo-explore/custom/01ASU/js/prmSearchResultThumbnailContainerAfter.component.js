class PrmSearchResultThumbnailContainerAfterController {
  constructor($http) {
    var vm = this;
    this.newThumbnail = '';
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
