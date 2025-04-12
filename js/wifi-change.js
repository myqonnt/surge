const WIFI_DONT_NEED_PROXY = [$argument];

const targetMode = WIFI_DONT_NEED_PROXY.includes($network.wifi.ssid) ? 'direct' : 'rule';
const currentMode = $surge.getOutboundMode();
if (currentMode === targetMode) {
    $done();
} else {
    $surge.setOutboundMode(targetMode);
    $notification.post(
        'Surge',
        `Network changed to ${$network.wifi.ssid || 'cellular'}`,
        `use ${targetMode} mode`
    );
}
$done();

