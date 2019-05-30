import { vid } from './viewId';

class PrmExploreMainAfterController {

  constructor($scope, $window, $interval, Idle, IdleLocalStorage) {
    this.$scope = $scope;
    this.$window = $window;
    this.$interval = $interval;
    this.Idle = Idle;
    this.IdleLocalStorage = IdleLocalStorage;

    //console.log(`prmExploreMainAfter controller custructor`);
    $scope.events = [];

    //$scope.$on('IdleStart', function () {
      // console.log('IdleStart event received, user has gone idle...');
    //});

    //$scope.$on('IdleWarn', function (e, countdown) {
      //console.log(`IdleWarn event received, seconds until autologout: ${countdown}`);
      // follows after the IdleStart event, but includes a countdown until the user is considered timed out
      // the countdown arg is the number of seconds remaining until then.
      // you can change the title or display a warning dialog from here.
      // you can let them resume their session by calling Idle.watch()
    //});

  }

  $onInit() {
    // console.log("prmExploreMainAfter $onInit");
    this.initIdleLogic();
    //this.initAlertBanner();
    // this.initResourceSharingLogic();
  }

  initAlertBanner() {
    const msg = "Due to a vendor outage, some of our external resources are not currently " +
      "being indexed. The ability to narrow searches using the right menu as well as " +
      "logging out is also being compromised. We are working on correcting the issue with " +
      "our vendor."
    this.showAlertBanner = true;
    this.alertBanner = this.parentCtrl.searchService.alertService.create(0);
    this.alertBanner.show(msg, false);
    console.log(msg);
    let alert = angular.element(document.getElementsByTagName("prm-explore-main-after")[0]);
    let top = angular.element(document.getElementsByClassName("topbar-wrapper")[0]);
    top.append(alert);
  }

  initIdleLogic() {
    // console.log("initIdleLogic()");
    if (!this.parentCtrl.searchService || !this.parentCtrl.searchService.userSessionManagerService) return;
    let usm = this.parentCtrl.searchService.userSessionManagerService;
    // console.log(`UserSessionManagerService`, usm);
    // console.log(`  Idle Config: running? ${this.Idle.running()}, isExpired? ${this.Idle.isExpired()}`
    //   + `, getIdle(): ${this.Idle.getIdle()}`);
    // console.log(`    IdleLocalStorage.get('expiry') ${JSON.stringify(this.IdleLocalStorage.get('expiry'))} `);
    let orig_usm_logout = usm.logout;
    usm.logout = (sessionTimeout) => {
      // console.log(`Intercept: UserSessionManagerService.logout(sessionTimeout = ${sessionTimeout})`);
      // console.log(`  calling original logout method...`);
      orig_usm_logout.bind(usm)(sessionTimeout);
    }
    let orig_usm_userLogout = usm.userLogout;
    usm.userLogout = (sessionTimeout, doRedirect, sessionTimeoutUrl) => {
      // console.log(`Intercept UserSessionManagerService.userLogout(` +
      //   `sessionTimeout = ${sessionTimeout}, doRedirect = ${doRedirect},` +
      //   ` sessionTimeoutUrl = ${sessionTimeoutUrl})`);
      // console.log(`  calling original userLogout, but with doRedirect set to false`);
      orig_usm_userLogout.bind(usm)(sessionTimeout, false, sessionTimeoutUrl);
    }

    // $interval(() => {
    //   console.log(`Idle Config: running? ${this.Idle.running()}, isExpired? ${this.Idle.isExpired()}`
    //     + `, getIdle(): ${this.Idle.getIdle()}`);
    //   console.log(`   IdleLocalStorage.get('expiry') ${JSON.stringify(this.IdleLocalStorage.get('expiry'))} `);
    //   console.log(`   calling Idle.watch()...`);
    //   this.Idle.watch();
    //   console.log(`   IdleLocalStorage.get('expiry') ${JSON.stringify(this.IdleLocalStorage.get('expiry'))} `);
    // }, 2*60*1000);
  }

  initResourceSharingLogic() {
    console.log('initResourceSharingLogic()');
    if (false && this.$window.localStorage.getItem('redirectToAlmaRsForm') &&
      JSON.parse(this.$window.localStorage.getItem('redirectToAlmaRsForm'))['forward'] == true &&
      this.parentCtrl.searchService.jwtUtilService.getPdsHandle() != "") {
      console.log("  it is true and we need to redirect now");
      this.$window.location = this.getUresolverUrl();
    }
    this.showAlmaRsForm = true;
    if (this.parentCtrl.searchService.jwtUtilService.getPdsHandle() == "") {
      console.log("  user not signed in")
      this.AlmaRsAlert = this.parentCtrl.searchService.alertService.create(1);
      const msg = `If you are unable to find what you are looking for, please `
        + `sign in and request it from an external library.`;
      this.AlmaRsAlert.show(msg, false);
      this.$window.localStorage.setItem('redirectToAlmaRsForm', JSON.stringify({ "forward": true }));
    } else {
      console.log("  not blank - the user is signed in")
      this.AlmaRsAlert = this.parentCtrl.searchService.alertService.create(0);
      var href = this.getUresolverUrl();
      const msg = `If you are unable to find what you are looking for, please `
        + `<a href='${href}' target='_blank'>request it from an external library</a>.`;
      console.log(msg);
      this.AlmaRsAlert.show(msg, false);
      //console.log(JSON.parse(this.$window.localStorage.getItem('redirectToAlmaRsForm'))['forward'])
      //this.$window.localStorage.setItem('redirectToAlmaRsForm', JSON.stringify({ "forward": false }));
    }
    /*global angular*/
    let alert = angular.element(document.getElementsByTagName("prm-explore-main-after")[0]);
    let top = angular.element(document.getElementsByClassName("topbar-wrapper")[0]);
    top.append(alert);
  }

  getUresolverUrl() {
    const pdsHandle = this.parentCtrl.searchService.jwtUtilService.getPdsHandle();
    const url = `https://arizona-asu.userservices.exlibrisgroup.com/view/uresolver`
      + `/01ASU_INST/openurl?vid=${vid}&svc_dat=getit`
      + `&directResourceSharingRequest=true&svc.profile=getit`
      + `&pds_handle=${pdsHandle}`;
    return url;
  }

}

PrmExploreMainAfterController.$inject =
  ['$scope', '$window', '$interval', 'Idle', 'IdleLocalStorage'];

export let PrmExploreMainAfterConfig = {
  name: 'prmExploreMainAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmExploreMainAfterController,
    templateUrl: `custom/${vid}/html/prmExploreMainAfter.component.html`
  }
};
