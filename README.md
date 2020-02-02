Requires tweaking to work in each individual scenario, but built as a proof of concept

Uses the settings.js file to select ATEM IP address

to start just webpage tally with "npm start" and access it an a webpage on a phone or pc at http://localhost to select your camera number from the dropdown

to start with remote control page "node atem.js -r", access on "http://localhost/remote"

index.html uses an labelled array to remap the atem inputs to simple names in whatever order is most usable for camera ops/to match the multiview (i.e. we don't use hdmi cameras much so patch them to later inputs and bump up SDI)