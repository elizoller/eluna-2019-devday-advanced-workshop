const config = require("../config");

angular.module('viewCustom').component('smsAction', {
  require: {
    prmActionCtrl: '^prmActionList'
  },
  controller: ['customActions', 'smsOptions', function (customActions, smsOptions) {
    var _this2 = this;

    this.$onInit = function () {
      if (_this2.prmActionCtrl.item.delivery.holding.length > 0) {
        _this2.prmActionCtrl.actionLabelNamesMap[smsOptions.smsAction.name] = smsOptions.smsAction.label
        _this2.prmActionCtrl.actionIconNamesMap[smsOptions.smsAction.name] = smsOptions.smsAction.name
        _this2.prmActionCtrl.actionIcons[smsOptions.smsAction.name] = smsOptions.smsAction.icon
        customActions.addAction(smsOptions.smsAction, _this2.prmActionCtrl);
        return customActions.addAction(smsOptions.smsAction, _this2.prmActionCtrl);
      }
    };


    this.$onDestroy = function () {
      return customActions.removeAction(smsOptions.smsAction, _this2.prmActionCtrl);
    };
  }]
});

angular.module('viewCustom').component('twilioSendSms', {
  bindings: {
    item: '<',
    finishedSmsEvent: '&',
  },
  template: `
  <div class="send-actions-content-item" layout="row">
    <md-content layout-wrap layout-padding layout-fill>
          <div ng-show="$ctrl.finished" class="bar {{$ctrl.resultClass}}-bar">
            <strong>{{$ctrl.resultMessage}}</strong>
          </div>
          <form name="$ctrl.smsForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.sendSms($event);" ng-hide="$ctrl.finished">
              <div layout="row" class="layout-full-width" layout-align="center center">
                  <div flex="20" flex-sm="10" hide-xs></div>
                  <div class="form-focus service-form" layout-padding flex>
                      <div layout-margin>
                          <div layout="column">
                              <h4 class="md-subhead">Standard message and data rates may apply.</h4>
                              <md-input-container class="underlined-input md-required"><label>Phone number:</label>
                                  <input ng-model="$ctrl.phoneNumber" name="phoneNumber" type="text" required ng-pattern="$ctrl.telRegEx">
                                  <div ng-messages="$ctrl.smsForm.phoneNumber.$error" role="alert">
                                      <div ng-message="required">phone number must be provided</div>
                                      <div ng-message="pattern">phone number is invalid</div>
                                  </div>
                              </md-input-container>
                              <md-input-container class="md-required underlined-input" ng-hide="hideItems">
                              <label >Choose An Item:</label>
                                <md-select ng-model="selectedItem" name="selectedItem" required ng-model-options="{trackBy: '$value.$$hashKey' }">
                                  <md-option ng-repeat="x in holdings" ng-value="{{x}}" value="{{x.$$hashKey}}" ng-selected="x.$$hashKey == $ctrl.selectedItem.$$hashKey">
                                    {{x.mainLocation}} - {{x.subLocation}} {{x.callNumber}}
                                  </md-option>
                                </md-select>
                              </md-input-container>
                              <md-input-container class="underlined-input" ng-if="$ctrl.isCaptcha()">
                                  <div vc-recaptcha key="$ctrl.getCaptchaPublicKey()" on-success="$ctrl.setResponse(response)"></div>
                                  <span class="recaptcha-error-info" ng-show="$ctrl.smsForm.$submitted && ($ctrl.smsForm.recaptchaResponse.$invalid || $ctrl.smsForm.$error.recaptcha.length)">
                                    <span translate="captcha.notselected"></span>
                                  </span>
                              </md-input-container>
                          </div>
                      </div>
                  </div>
                  <div flex="20" flex-sm="10" hide-xs></div>
              </div>
              <div layout="row">
                  <div layout="row" layout-align="center" layout-fill>
                      <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Send the result by SMS">
                          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon><span translate="email.popup.link.send"></span></md-button>
                  </div>
              </div>
          </form>
      </md-content>
  </div>
  <prm-send-email ng-hide="true"></prm-send-email>
  <twilio-send-sms-after parent-ctrl="$ctrl"></twilio-send-sms-after>
  `,
  controller: ['$scope', 'smsOptions', '$http', '$window', '$timeout', function ($scope, smsOptions, $http, $window, $timeout) {
    this.$onInit = () => {
      console.log("in the twilio controller")
      $window.ga('send', 'event', 'SMS', 'button click');
      $scope.$watch('$$childTail.$ctrl', (ctrl) => this.sendEmailService = ctrl.sendEmailService)
      $scope.holdings = this.item.delivery.holding;
      $scope.hideItems = false;
      this.selectedItem = undefined
      this.finished = false;
      if ($scope.holdings.length == 1) {
        this.selectedItem = $scope.holdings[0];
        $scope.hideItems = true;
      }
      $scope.item_info = this.item.pnx.display.title[0];
      this.phoneNumber = ''
      this.telRegEx = /^\d{0,3}( |-)?\d{3}( |-)?\d{3}( |-)?\d{4}$/
      this.validItem = () => {
        let selectedId = this.selectedItem;
        if (selectedId == undefined) {
          selectedId = this.smsForm.selectedItem.$$rawModelValue;
        }
        let selected_item = this.item.delivery.holding.filter(function (obj) {
          return obj['@id'] == selectedId['@id'];
        })
        if (selected_item && selected_item != [] && selected_item != undefined && selected_item != {}) {
          return true
        } else {
          return false
        }
      }
    }
    this.validate = () => this.telRegEx.test(this.phoneNumber) && this.validItem()
    // this.isCaptcha = () => window.appConfig['system-configuration']['Activate Captcha [Y/N]'] == 'Y'
    // this.getCaptchaPublicKey = () => window.appConfig['system-configuration']['Public Captcha Key']
    this.isCaptcha = () => true;
    this.getCaptchaPublicKey = () => "6LcR0gkUAAAAAJnIxomwXcXBfvx3nWbZuJgFyl3n";
    this.setResponse = (response) => this.gCaptchaResponse = response
    this.sendSms = (event) => {
      if (this.validate()) {
        let selectedId = this.selectedItem;
        if (selectedId == undefined) {
          selectedId = this.smsForm.selectedItem.$$rawModelValue;
        }
        let selected_item = this.item.delivery.holding.filter(function (obj) {
          return obj['@id'] == selectedId['@id'];
        })
        if (Array.isArray(selected_item)) {
          selected_item = selected_item[0];
        }
        let item_string = selected_item.mainLocation + " - " + selected_item.subLocation + " " + selected_item.callNumber;
        if (this.phoneNumber.length == 10) {
          this.phoneNumber = "1" + this.phoneNumber;
        }
        console.log(160 - item_string.length);
        const avail_for_title = 160 - item_string.length;
        let message = "";
        const short_title = $scope.item_info.substring(0, avail_for_title);
        item_string = item_string.trim()
        console.log("truncated title", short_title);
        message = "\"" + short_title + "\" " + item_string;
        console.log("total message is", message);
        const aws_url = config.prod.aws_url;
        const req = {
          method: "POST",
          url: aws_url,
          headers: {
            "content-type": "application/json",
            "x-api-key": config.prod.aws_api_key
          },
          data: {
            "to": '+' + this.phoneNumber,
            "message": message
          }
        }
        const vm = this;
        $http(req).then(function (data) {
          vm.finished = true;
          vm.resultMessage = "Message sent";
          vm.resultClass = "success";
          console.log(data);
          console.log("successful api call to aws");
        })
          .catch(function (err) {
            vm.finished = true;
            vm.resultMessage = "Message could not be sent";
            vm.resultClass = "error";
            console.log(err);
            console.log("no dice - could not reach aws");
          }).finally(() => {
            $timeout(function () { vm.finishedSmsEvent() }, 2000);
          })
      } else {
        console.log("the form was not valid")
        // this.finishedSmsEvent();
      }
    }
  }]
}).run(['$templateCache', 'smsOptions', function ($templateCache, smsOptions) {
  $templateCache.put('components/search/actions/actionContainer/action-container.html', `
    <twilio-send-sms ng-if="($ctrl.actionName==='${smsOptions.smsAction.name}' && $ctrl.item.delivery.holding.length>0)" finished-sms-event="$ctrl.throwCloseTabsEvent()" item="::$ctrl.item"></twilio-send-sms>
	  <prm-send-email ng-if="($ctrl.actionName==='E-mail')" (finished-email-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [selected-ids]="::$ctrl.selectedIds" [toggleform]="::$ctrl.toggleActionCotent" [user]="::''"></prm-send-email><prm-citation ng-if="($ctrl.actionName==='Citation')" [item]="::$ctrl.item"></prm-citation><prm-permalink ng-if="($ctrl.actionName==='Permalink')" [item]="::$ctrl.item" [selected-ids]="::$ctrl.selectedIds"></prm-permalink><prm-print-item ng-if="($ctrl.actionName==='Print')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item"></prm-print-item><prm-endnote ng-if="($ctrl.actionName==='EndNote')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item"></prm-endnote><prm-easybib ng-if="($ctrl.actionName==='EasyBib')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item"></prm-easybib><prm-refworks ng-if="($ctrl.actionName==='RefWorks')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item"></prm-refworks><prm-export-ris ng-if="($ctrl.actionName==='RISPushTo')" [item]="::$ctrl.item" [selected-ids]="::$ctrl.selectedIds"></prm-export-ris><prm-export-bibtex ng-if="($ctrl.actionName==='BibTeXPushTo')" [item]="::$ctrl.item" [selected-ids]="::$ctrl.selectedIds"></prm-export-bibtex><prm-leganto ng-if="($ctrl.actionName==='Leganto')" (finished-leganto-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-leganto><prm-mendeley ng-if="($ctrl.actionName==='Mendeley')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item"></prm-mendeley><prm-action-container-after parent-ctrl="$ctrl"></prm-action-container-after>`)
}])
