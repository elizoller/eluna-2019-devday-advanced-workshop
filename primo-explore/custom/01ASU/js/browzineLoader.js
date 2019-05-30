(function () {
  "use strict";

  // Load BrowZine Adapter
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/158",
    apiKey: "a1d2656d-d27c-466f-b549-f14a645a2024",
    journalCoverImagesEnabled: true,

    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",

    acticleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",

    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",

    printRecordsIntegrationEnabled: true,
  };

  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);

})();
