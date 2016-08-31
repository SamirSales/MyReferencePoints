cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "plugin.google.maps.phonegap-googlemaps-plugin",
        "file": "plugins/plugin.google.maps/www/googlemaps-cdv-plugin.js",
        "pluginId": "plugin.google.maps",
        "clobbers": [
            "plugin.google.maps"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "plugin.google.maps": "1.3.9"
};
// BOTTOM OF METADATA
});