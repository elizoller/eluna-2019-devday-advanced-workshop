import { vid } from './viewId';
/*global */

class LibChatController {
  constructor($scope, scriptLoaderService, $timeout) {
    this.$scope = $scope;
    this.scriptLoaderService = scriptLoaderService;
    this.$timeout = $timeout;
    this.scriptId = '02637e8fb84872365591a9301a88de79';
  }

  /*
  https://v2.libanswers.com/chati.php?hash=02637e8fb84872365591a9301a88de79&referer_title=Library%20One%20Search&referer=http%3A%2F%2Flocalhost%3A8003%2Fprimo-explore%2Fsearch%3Fvid%3D02ASU%26sortby%3Drank%26lang%3Den_US
  */

  $onInit() {
    return this.loadLibChatScript()
      .then(() => {
        console.log('LibChat widget loaded.');
        // this.$timeout(function () {
        //   // Sadly, there is a delay from when the script is loaded until
        //   // when the dom is updated.
        //   jQuery('button.libchat_online').off();
        //   jQuery('button.libchat_online').unbind();
        //   jQuery('button.libchat_online').unbind('click');
        //   const chatOnlineButton = jQuery('button.libchat_online')
        //     .on('click submit', (event) => {
        //       event.stopPropagation();
        //       alert('button.libchat_online');
        //     });
        //   console.log('LibChat online button: ', chatOnlineButton);
        //   jQuery('button.libchat_offline').unbind();
        //   const chatOfflineButton = jQuery('button.libchat_offline')
        //     .on('click submit' ,(event) => {
        //       event.stopPropagation();
        //       alert('button.libchat_offline');
        //     });
        //   console.log('LibChat offline button: ', chatOfflineButton);
        // }, 3000);        
      })
      .catch(() => console.log('ERROR: LibChat widget could not be loaded.'));
  }

  loadLibChatScript() {
    // https://region-na.libanswers.com/load_chat.php?hash=401c8c724849b1f111af48d3b5aa9d07
    const url = `https://region-na.libanswers.com/load_chat.php?hash=${this.scriptId}`;
    return this.scriptLoaderService.load(url);
  }

  $onDestroy() {
    this.scriptLoaderService.unload(this.scriptUrl, 'js');
  }

}

LibChatController.$inject = ['$scope', 'scriptLoaderService', '$timeout'];

export let LibChatConfig = {
  name: 'libChat',
  config: {
    controller: LibChatController,
    templateUrl: `custom/${vid}/html/libChat.component.html`,
  }
}