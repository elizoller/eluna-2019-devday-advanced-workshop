# Repository for asu-primo #

This repository contains all customizations for Arizona State Univeristy Library's
Primo deployment.

## Running the Primo developent environment ##

* Download the Primo Development Environment and follow instructions from 'https://github.com/ExLibrisGroup/primo-explore-devenv'

* Check out this repository 'https://bitbucket.org/asulibraries/asu_primo' with desired view name under `primo-explore-devenv/primo-explore/custom`.
  For example, the view name could be by `03ASU` in which case this repository would be located at `primo-explore-devenv/primo-explore/custom/03ASU`.

* from your primo-explore-devenv root run `gulp run --view <vid> --browserify --proxy https://search.lib.asu.edu` where `<vid>` is the name of the view id such as `01ASU`

* To test against the Primo Sandbox instead, change proxy parameter
  to `https://arizona-asu-primosb.hosted.exlibrisgroup.com` for example
  `gulp run --view 02ASU --browserify --proxy https://arizona-asu-primosb.hosted.exlibrisgroup.com`

* go to 'http://localhost:8003/primo-explore/search?vid=<vid>' in a browser.  For example
`http://localhost:8003/primo-explore/search?vid=02ASU`


## Packaging customizations for deployment ##

* from your primo-explore-devenv root `gulp create-package` then select the view you are packaging

* this will create a zip in your packages/ folder which can be uploaded through the Primo Back Office


## Deploying a customization package ##

* If you are off campus, you can use SSH SOCKS forwarding and FireFox to access Primo Back Office by doing the following:

  * Assume you have a campus machine with hostname `<remote>`.  Assume remote has
  ssh server setup and local machine has an ssh client.

  * From the local machine, type `ssh -D 8080 <username>@<remote>`.  Note
  port could be 8080 or any other unused port of your choice.

  *  Open FireFox settings, and navigate to Advanced > Connection > Settings

  * Choose the 'Manual proxy configuration' radio button.  Set 'HTTP Proxy' to localhost with Port 8080.  Set 'SOCKS Host' to '127.0.0.1' with Port 8080.

  * Click 'OK' and you should now be able to access Primo Backoffices.

  * Be sure to change back to 'No Proxy' when you are finished.


## Our repository Git conventions ##

* Change directory to `primo-explore/custom/01ASU` (or whatever the name of your view directory is)

* git push or pull as desired

* Note that you must be in the view directory in order for this to work or else you will be connecting to the git repo for the devenv

* All new development work should be done in the 'develop' branch

* New features should branch from 'develop' and me merged back into 'develop' (and deleted) upon completion.

* Master is meant to reflect whatever is currently deployed in production.  It is assumed to be well-tested and safe to deploy into production at any time.


This repository now depends on two additional modules:
1. Browzine - https://github.com/asulibraries/browzine
  a. This is a wrapper around Browzine's integration that allows for multiple customizations to the prmSearchResultAvailabilityLine (https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/pages/79200260/Ex+Libris+Primo+Integration)
2. Unpaywall - forked from BU - https://github.com/asulibraries/primo-explore-bu
  a. In the packages/unpaywall directory
  b. Modifications that allow for multiple customizations to the prmSearchResultAvailabilityLine component
