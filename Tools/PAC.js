/**
 * pac script for SwitchyOmage
 *
 * devlopment use whistle or fiddle
 * gwf use ss or other cross wall tool
 */
 
const URLS = {
    dev: 'PROXY whistle_proxy_ip:8899;',
    // PROXY, not HTTP or SOCKS5
    gwf: 'PROXY shadowsocks_proxy_ip:1080;',
    direct: 'DIRECT;',
}
const domains = new Map([
  ['devlopment.com', 'dev'],
  ['google.com', 'gwf'],
])
function FindProxyForURL(url, host) {
  let lastPosition = host.lastIndexOf('.')
  do {
    let suffixDomain = host.slice(lastPosition + 1)
    if (domains.has(suffixDomain)) {
        return URLS[domains.get(suffixDomain)]
    } else {
       lastPosition = host.lastIndexOf('.', lastPosition - 1)
    }
  } while (lastPosition > -1)

  return URLS.direct;
}
