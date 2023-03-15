	
	//    CONFIGURATION 

	const TENANT = 'support.us.qlikcloudgov.com'; 
	const APPID = '5908ef1b-fc38-4d81-bbbf-c46a7b1237db'; // *** CHANGE AS NEEDED THEN PROCEED TO LINE 75 FOR MASHUP OBJECT CONFIG ***
	const WEBINTEGRATIONID = 'Mm96Y7FJbRgW9f50grpGEXJGV0YITgEP';	
		
	//    MAIN 

	(async function main() {
		const isLoggedIn = await qlikLogin();
		const loadedCapabilitiesAssets = await loadCapabilitiesAssets();
		const app = await doCapabilities(APPID);	
	})();	
	
	//    QCG LOGIN

	async function qlikLogin() {
		function isLoggedIn() {
			return fetch(`https://${TENANT}/api/v1/users/me`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'qlik-web-integration-id': WEBINTEGRATIONID
				},
			}).then(response => {
				return response.status === 200;
			});
		}
		return isLoggedIn().then(loggedIn =>{
			if (!loggedIn) {
				window.location.href = `https://${TENANT}/login?qlik-web-integration-id=` + WEBINTEGRATIONID + "&returnto=" + location.href;
				throw new Error('not logged in');
			}
		});
	}
	
	// LOAD & RENDER CAPABILITIES - THIS ELIMINATES NEED TO ADD QLIK-STYLES.CSS AND REQUIRE.JS TO THE HTML FILE

	async function loadCapabilitiesAssets() {
		const cssUrl = `https://${TENANT}/resources/autogenerated/qlik-styles.css`;
		const requireUrl = `https://${TENANT}/resources/assets/external/requirejs/require.js`;
		return $.when(
			$('head').append(`<link rel="stylesheet" type="text/css" href="${cssUrl}">`),
			$.getScript(requireUrl)
		);
	}

	async function doCapabilities(appId) {	
		
		var config = {
			host: TENANT,
			prefix: "/",
			port: 443,
			isSecure: true,
			webIntegrationId: WEBINTEGRATIONID
		};
		
		require.config({
			config: {
				text: { useXhr: function (url, protocol, hostname, port) { return true; } }
			},
			baseUrl: 'https://' + config.host + (config.port ? ':' + config.port : '') + config.prefix + 'resources',
			webIntegrationId: WEBINTEGRATIONID
		});

		//  MASHUP OBJECT CONFIGURATION 
		
		requirejs(["js/qlik"], (qlik) => {		
			const app = qlik.openApp(appId, config);
			
			app.getObject('CurrentSelections','CurrentSelections');
			app.getObject('sof_container','fFqQuT');		
			//app.getObject('bar_chart','MXAQHeM');
				
			
			//APPLY THEME
			qlik.theme.apply('theme-colorbrewer');

		}); // requirejs
		
	}; // doCapabilities
