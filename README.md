# PROXYME
💻 A command line interface (CLI) to setup a proxy server for:
- Proxy server setup
- Packets forwarding
- Port forwarding
- Traffics monitoring

🔵 During development phase, sometimes we want to test local environment measures how it behaves on production environment.
Proxyme cuts back time on creating a self-signed certificate yourself (for establishing secure connection aka HTTPS you know it right?), reconfiguring your proxy server with a bunch of code... through a CLI with simple inputs.

This CLI fits these real-life development scenarios:

✅ You want to mock any API served at localhost to an actual domain.

✅ You want to to test several features before deploying to Heroku or any cloudbase hosting which have technologies requires HTTPS connection such as Web Workers or Application Cache. Proxyme can mock this in your local machine.

✅ You want to bypass CORS policies set by a certain server. Specifically, you want to request to example.api.com but it only allows requests from some certain origins (domains). You can mock a whitelisted doamin with self-signed certificates generated by Proxyme and request to the API normally. 

## Installation:
```npm i -g coccoc-proxyme```
``` proxyme --init ```

### Usage:
``` proxyme ```

## Explanation:
``` proxyme --help ```

```
proxyme [Options]
Options:
  --init         Init proxyme
  --publicPath   Set your proxyme public path, where to generate necessary files - default ./
  --proxyHost    Your proxy host - default 0.0.0.0
  --proxyPort    Your proxy port - RANDOM
  --debugHost    Your debug host - default 0.0.0.0
  --debugPort    Your debug port - default 2300
  --pac          Your PAC (Proxy Auto-Config) URL - default 6970
  --configPath   Your config path
  --profilePath  Your profile contain rules path
  --certDir      Your certificate directory - should be in ./certs
  -V, --version  output the version number
  -h, --help     output usage information
```

```--init```: Generate proxyme settings in the current folder, you can also specify publicPath where it generates necessary files. Default: ```./```
After init, the proxyme settings will be like this:

```--publicPath```:
Where you wants to generate settings

```--pac```: 
(Optional) Your Proxy Auto Config URL. For example: http://0.0.0.0:6970/index.pac

```--debugHost``` ```debugPort```: 
Host and port for setup web GUI monitoring/debug toool.

```--profile```: 
Your proxyme profile configuration. The ```default.json``` has already generated for you when init:
Currently PROXYME only supports level 1 path

## Configuration File Structure:
```
certs
config
└── config.json
profiles
└── default.json

```

### config/config.json (Follow this format):
``` 
{
	"rules": {
		"example.com": [
			{
				"somepath": [
					{},
					{
						"host": "",
						"port": null
					}
				]
			},
			{
				"host": "",
				"port": null,
			}
		]
	}
}
```

```example.com```: is the targeted domain. Eg. abc.com

```somepath```: is the next level path. Eg: abc.com/posts

```host```: is the target host you want to direct to

```port```: is the targeted port you want to direct to

### profiles/default.json (Follow this format):
```
{
	"pac": "",
	"proxyHost": "0.0.0.0",
	"proxyPort": 6969,
	"debugHost": "0.0.0.0",
	"debugPort": 2300,
	"certDir": "[your-init-directory]/.http-mitm-proxy/certs/ca.pem"
}
```
The default for certificate directory ```[your-init-directory]/.http-mitm-proxy/certs/ca.pem```, 
For custom certificates, navigate to ```certs```. Place a new pair of cert and key with this format.
```
[host]-cert.pem
[host]-key.pem
```
* Proxy forwarding:
It's simple, add ```directWithoutRewrite: true``` in your profiles.
For example:
```
{
  "host": "example.com",
  "port: 6754
  "directWithoutRewrite": true
}
```
Proxyme can forward your trafficts to host and port above.


