import { inst, version, vid } from './viewId';
window.jQuery = require("jquery");

import { PrmExploreMainAfterConfig } from './prmExploreMainAfter.component';
// import { PrmExploreFooterAfterConfig } from './prmExploreFooterAfter.component';
import { PrmFullViewAfterConfig } from './prmFullViewAfter.comonent';
import { PrmLogoAfterConfig } from './prmLogoAfter.component';
import { PrmSearchBarAfterConfig } from './prmSearchBarAfter.component';
import { PrmFacetAfterConfig } from './prmFacetAfter.component';
import { PrmPageNavMenuAfterConfig } from './prmPageNavMenuAfter.component';
import { PrmFacetExactAfterConfig } from './prmFacetExactAfter.component';
import { GoogleAnalyticsService } from './googleAnalytics.service';
import { ScriptLoaderService } from './scriptLoader.service';
import { ExternalSearchService } from './externalSearch.service';
import { RequestOptionsTipConfig } from './requestOptionsTip.component';
import { searchTargets } from './externalSearch.value';
import { SearchTipsConfig } from './searchTips.component';
import { LibChatConfig } from './libChat.component';
import { NewLibChatConfig } from './newLibChat.component';
import { PrmSearchBookmarkFilterAfterConfig } from './prmSearchBookmarkFilterAfter.component';
import '@orbis-cascade/primo-explore-custom-actions';

import 'primo-explore-hathitrust-availability';
import 'primo-explore-browzine';
import './browzineLoader';
import 'primo-explore-unpaywall';
import { PrmSearchResultAvailabilityLineAfterConfig } from './prmSearchResultAvailabilityLineAfter.component'
import { PrmSearchResultListAfterConfig } from './prmSearchResultListAfter.component'
import { PrmSearchResultThumbnailContainerAfterConfig } from './prmSearchResultThumbnailContainerAfter.component';
import { PrmNoSearchResultAfterConfig } from './prmNoSearchResultAfter.component';
import { PrmBreadcrumbsAfterConfig } from './prmBreadcrumbsAfter.component';
// import { PrmFavoritesAfterConfig } from './prmFavoritesAfter.component';
import { PrmTabsAndScopesSelectorAfterConfig } from './prmTabsAndScopesSelectorAfter.component';
import { PrmSearchAfterConfig } from './prmSearchAfter.component';
import { PrmFinesAfterConfig } from './prmFinesAfter.component';
import { PrmFinesOverviewAfterConfig } from './prmFinesOverviewAfter.component';

console.log(`${inst} customizations version: ${version}, view id: ${vid}`);

/*global angular */
// define angularjs module */
angular.module('viewCustom', [
  'ngIdle', 'angularLoad', 'angularLoadMonkeyPatched', 'ngMaterial', 'hathiTrustAvailability', 'customActions', 'browzineMod', 'bulibUnpaywall']).constant('unpaywallConfig', {
    "email": "ezoller@asu.edu",
    "showOnResultsPage": true,
    "showVersionLabel": true,
    "logToConsole": true,
    "showDebugTable": false,
    "publishEvents": true
  });

angular.module('viewCustom')
  .value('searchTargets', searchTargets)
  .value('hathiTrustIconPath', `custom/${vid}/img/hathitrust.svg`)
  .service('googleAnalyticsService', GoogleAnalyticsService)
  .service('scriptLoaderService', ScriptLoaderService)
  .service('externalSearchService', ExternalSearchService)
  .component(PrmExploreMainAfterConfig.name, PrmExploreMainAfterConfig.config)
  // .component(PrmExploreFooterAfterConfig.name, PrmExploreFooterAfterConfig.config)
  .component(PrmFullViewAfterConfig.name,
    PrmFullViewAfterConfig.config)
  .component(RequestOptionsTipConfig.name, RequestOptionsTipConfig.config)
  .component(PrmLogoAfterConfig.name, PrmLogoAfterConfig.config)
  .component(NewLibChatConfig.name, NewLibChatConfig.config)
  .component(LibChatConfig.name, LibChatConfig.config)
  .component(PrmSearchBookmarkFilterAfterConfig.name, PrmSearchBookmarkFilterAfterConfig.config)
  .component(SearchTipsConfig.name, SearchTipsConfig.config)
  .component(PrmFacetAfterConfig.name, PrmFacetAfterConfig.config)
  .component(PrmPageNavMenuAfterConfig.name, PrmPageNavMenuAfterConfig.config)
  .component(PrmFacetExactAfterConfig.name, PrmFacetExactAfterConfig.config)
  .component(PrmSearchBarAfterConfig.name, PrmSearchBarAfterConfig.config)
  .component(PrmSearchResultAvailabilityLineAfterConfig.name,
    PrmSearchResultAvailabilityLineAfterConfig.config)
  .component(PrmSearchResultListAfterConfig.name,
    PrmSearchResultListAfterConfig.config)
  .component(PrmSearchResultThumbnailContainerAfterConfig.name,
    PrmSearchResultThumbnailContainerAfterConfig.config)
  .component(PrmNoSearchResultAfterConfig.name, PrmNoSearchResultAfterConfig.config)
  .component(PrmBreadcrumbsAfterConfig.name, PrmBreadcrumbsAfterConfig.config)
  .component(PrmTabsAndScopesSelectorAfterConfig.name, PrmTabsAndScopesSelectorAfterConfig.config)
  .component(PrmSearchAfterConfig.name, PrmSearchAfterConfig.config)
  .component(PrmFinesAfterConfig.name, PrmFinesAfterConfig.config)
  .component(PrmFinesOverviewAfterConfig.name, PrmFinesOverviewAfterConfig.config)
 // .component(PrmFavoritesAfterConfig.name, PrmFavoritesAfterConfig.config)


angular.module('viewCustom')
  .component('prmActionListAfter', { template: '<sms-action />' }).value('smsOptions', {
    smsAction: {
      name: 'send_sms',
      label: 'Text Me',
      index: 2,
      icon: {
        icon: 'ic_smartphone_24px',
        iconSet: 'hardware',
        type: 'svg',
      },
    },
  })

angular.module('viewCustom')
  .run(['$rootScope', ($rootScope) => {
    $rootScope.vid = vid; // Can now get view id anywhere with $root.vid
  }])
  .run(['googleAnalyticsService', (googleAnalyticsService) => {
    let trackingId = 'UA-107598712-1';
    googleAnalyticsService.initialize(trackingId)
      .then(() => googleAnalyticsService.trackPageViews())
      .catch((err) => {
        console.error('There was a problem initializing Google Anayltics.', err);
      });
  }]);

//window.appConfig['system-configuration']['Session Timeout'] = "180"; // 3 hours
//console.log(`Session Timeout: ${window.appConfig['system-configuration']['Session Timeout']} mins`);

// angular.module('viewCustom')
//   .config(['IdleProvider', function(IdleProvider) {
//     const secs = 3 * 60 * 60; // 3 hours
//     console.log(`IdleProvider.idle(${secs})  ${secs} secs = ${secs/60} mins`);
//     IdleProvider.idle(secs);
//   }]);

// angular.module('primo-explore.security')
//   .factory('SessionTimeoutService', SessionTimeoutService);
// function SessionTimeoutService(Idle) {
//   let service = {
//     // Add your functions here
//     // parseItem:parseItem
//     isSessionExpired: isSessionExpired,
//     startSession: startSession
//   };
//   return service;

//   function startSession() {
//     console.log('primo-explore.security.SessionTimeoutService.startSession() called');
//     //Idle.watch();
//   }

//   function isSessionExpired() {
//     console.log('primo-explore.security.SessionTimeoutService.isSessionExpired() called');
//     return Idle.isExpired();
//   }

// }
// SessionTimeoutService.$inject = ['Idle'];

// Include ES2015 components here
require('./angularLoadMonkeyPatched');
require('./twilioSendSms');
// < !--Google Tag Manager-- >
(function (w, d, s, l, i) {
w[l] = w[l] || []; w[l].push({
  'gtm.start':
    new Date().getTime(), event: 'gtm.js'
}); var f = d.getElementsByTagName(s)[0],
  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-TD3VB52');
  // <!--End Google Tag Manager-- >
