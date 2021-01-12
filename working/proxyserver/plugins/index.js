module.exports = function plugins(ctx, proxy) {
  function switchHTTPS(bool) {
 ctx.isSSL = bool;
 ctx.proxyToServerRequestOptions.rejectUnauthorized = false;
 ctx.proxyToServerRequestOptions.agent = bool ? proxy.httpsAgent : proxy.httpAgent;
  }
  const url = ctx.clientToProxyRequest.url;
  console.log('===========>', url);
	const portOrig = ctx.proxyToServerRequestOptions.port;
if (url.match(/search-static/)) {
		//switchHTTPS(false);
switchHTTPS(false);
	ctx.proxyToServerRequestOptions.host = 'localhost';
	ctx.proxyToServerRequestOptions.port = 3000;
}
if (url.match(/search?/)) {
				switchHTTPS(false);
					ctx.proxyToServerRequestOptions.host = 'localhost';
					ctx.proxyToServerRequestOptions.port = 3000;
}

// if (url.match('ntp.json|/qc_demo|/composer')) {
//         console.log('composer', ctx.proxyToServerRequestOptions.port, ctx.proxyToServerRequestOptions.host);
//       //                ctx.proxyToServerRequestOptions.host = 'frontend-virt.dev.itim.vn';
//       ctx.proxyToServerRequestOptions.host = 'metasearcher1v.dev.itim.vn';
//       ctx.proxyToServerRequestOptions.port = 8944;
//         ctx.isSSL = false;
//         ctx.proxyToServerRequestOptions.agent = proxy.httpAgent;
// }

if (url.match(/composer/)) {
	switchHTTPS(true);
    // ctx.proxyToServerRequestOptions.host = 'frontend-for-qc-virt.dev.itim.vn'; // qc staging dev
    // ctx.proxyToServerRequestOptions.host = 'frontend-virt.dev.itim.vn'; // staging dev
    ctx.proxyToServerRequestOptions.host = 'coccoc.com';
  	ctx.proxyToServerRequestOptions.port = 443;
}	
if (url.match(/log/)) {
}
if (url.match(/ntp.json/)) {
	switchHTTPS(true);
	ctx.proxyToServerRequestOptions.host = 'coccoc.com';
	ctx.proxyToServerRequestOptions.port = 443;
}

    proxy.onWebSocketError(function(ctx, err) {
   reject(err);
   console.log(err);
  });
}