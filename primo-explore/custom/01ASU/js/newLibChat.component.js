import { vid } from './viewId';

const CHAT = 'Chat', HELP = 'Help';

class NewLibChatController {
  constructor($scope, $timeout, $interval, $window, $http) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.$window = $window;
    this.$http = $http;
    this.scriptId = '02637e8fb84872365591a9301a88de79';
    this.wigetId = '9612';
    $scope.name = CHAT;
  }

  $onInit() {
    this.getUpdatedName().then(n => this.$scope.name = n);
    const INTERVAL_MS = 3 * 60 * 1000; // 3 minutes;
    // const nextTick = () => // add a random number of milliseconds between 0 and 60*1000
    //  (INTERVAL_MS - (new Date().getTime() % INTERVAL_MS)) + (Math.floor(Math.random() * 60000));
    const timerFunction = () => {
      this.getUpdatedName()
      .then(n => {
        this.$scope.name = n;
        this.$timeout(timerFunction, INTERVAL_MS);
      });
    }
    this.$timeout(timerFunction, INTERVAL_MS);

    // const testingUpdateName = () => {
    //   const d = new Date();
    //   const s = d.getUTCSeconds();
    //   this.$scope.name = (Math.floor(s / 10) % 2) ? CHAT : HELP;
    // }
    // this.$interval(testingUpdateName, 5*1000);
  }

  buttonClick() {
    if (this.$scope.name === CHAT) {
      this.openChat();
    } else {
      this.openHelp();
    }

    // Although it would make sense to open the window
    // only after we update the status, this could result the new
    // window being blocked by a popup blocker.
    this.getUpdatedName().then(n => this.$scope.name = n);
  }

  /**
   * Note: This promise always resolves, even for errors. Also note,
   * we must 'unset' the header field 'X-From-ExL-API-Gateway' that
   * Primo has configured AngularJS to automatically add to every
   * request through the $http service.  If we don't, the pre-flight
   * OPTIONS requsest for CORS with libanswers.com will fail.
   */
  getUpdatedName() {
    // console.log('NewLibChatController.getUpdatedName()');
    // e.g. https://api2.libanswers.com/1.0/chat/widgets/status/9612
    // { "online": true }
    const url = `https://api2.libanswers.com/1.0/chat/widgets/status/${this.wigetId}`;
    return this.$http({
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-From-ExL-API-Gateway': undefined
      },
      url: url
    }).then(resp => {
      const data = resp['data'];
      // if (new Date().getUTCMinutes() > 23) return HELP;
      return (data && data['online']) ? CHAT : HELP;
    }).catch(err => {
      console.error('Problem getting chat status', err);
      return this.$scope.name;
    });
  }

  openChat() {
    console.log(`opening chat`);
    const settings = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no'
      + 'resizable=yes, copyhistory=no, width=400, height=540';
    this.$window.open(`https://v2.libanswers.com/chati.php?hash=${this.scriptId}`,
      'libchat', settings);
  }

  openHelp() {
    console.log(`opening help`);
    this.$window.open(`https://askalibrarian.asu.edu`);
  }


  // https://cascade2.libchat.com/widget_status
  /*
  https://v2.libanswers.com/chati.php?hash=02637e8fb84872365591a9301a88de79&referer_title=Library%20One%20Search&referer=http%3A%2F%2Flocalhost%3A8003%2Fprimo-explore%2Fsearch%3Fvid%3D02ASU%26sortby%3Drank%26lang%3Den_US
  */

}

NewLibChatController.$inject = ['$scope', '$timeout', '$interval', '$window', '$http'];

export let NewLibChatConfig = {
  name: 'newLibChat',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: NewLibChatController,
    templateUrl: `custom/${vid}/html/newLibChat.component.html`,
  }
}
