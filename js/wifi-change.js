const args = $argument
// if args contains `,` convert to array
const WIFI_DONT_NEED_PROXY = args.includes(',') ? args.split(',') : [args];
const OLD_WIFI_SSID_KEY = 'current_wifi_ssid';
const CURRENT_WIFI_SSID = $network.wifi.ssid;

if (wifiChanged()) {
    const mode = WIFI_DONT_NEED_PROXY.includes(CURRENT_WIFI_SSID)
        ? 'direct'
        : 'rule';
    $surge.setOutboundMode(mode);
    $notification.post(
        'Surge',
        `Network changed to [${CURRENT_WIFI_SSID || 'cellular'}]`,
        `use [${mode}] mode`
    );
}
// 存储
function wifiChanged() {
    const currentWifiSSid = $persistentStore.read(OLD_WIFI_SSID_KEY);
    const changed = currentWifiSSid !== CURRENT_WIFI_SSID;
    changed && $persistentStore.write(CURRENT_WIFI_SSID, OLD_WIFI_SSID_KEY);
    return changed;
}

$done();



