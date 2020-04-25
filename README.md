Requires tweaking to work in each individual scenario, but built as a proof of concept to allow people to use phones on a wifi connection to act as wireless tally lights for a blackmagic ATEM switcher

Uses the settings.js file to select ATEM IP address

to start just webpage tally use "npm start" and access it an a webpage on a phone or pc at http://[SERVERADDRESS] to select your camera number from the dropdown

to start with ATEM remote control page "node atem.js -r", access on "http://[SERVERADDRESS]/remote"

index.html uses an labelled array to remap the atem inputs to simple names in whatever order is most usable for camera ops/to match the multiview (i.e. we don't use hdmi cameras much so patch them to later inputs and bump up SDI)

Uses socket.io library so possibilty of expansion to work with wireless arduino units
