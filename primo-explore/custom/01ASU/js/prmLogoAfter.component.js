import { vid, version } from './viewId';

class PrmLogoAfterController {  
  constructor() {
    this.vid = vid;
    this.version = version;
    this.iconLink = this.parentCtrl.iconLink;
  }
}

export let PrmLogoAfterConfig = {
  name: 'prmLogoAfter',
  config: {
    bindings: { parentCtrl: '<' },
    controller: PrmLogoAfterController,
    templateUrl: `custom/${vid}/html/prmLogoAfter.component.html`
  }
};