/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: 'koa48q35agc9ri4.us.qlikcloudgov.com',
	prefix: '/',
	port: 443,
	isSecure: window.location.protocol === "https:",
	webIntegrationId: 'Mm96Y7FJbRgW9f50grpGEXJGV0YITgEP'
};
//Redirect to login if user is not logged in
async function login() {
      function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'qlik-web-integration-id': config.webIntegrationId,
          },
        }).then(response => {
          return response.status === 200;
        });
      }
      return isLoggedIn().then(loggedIn => {
        if (!loggedIn) {	  
            window.location.href = "https://"+config.host+"/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in');
        }
      });
    }
login().then(() => {
    require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
} );			

require( ["js/qlik"], function ( qlik ) {
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
    //open apps -- inserted here --
	var app = qlik.openApp( '5908ef1b-fc38-4d81-bbbf-c46a7b1237db', config );
	
    //get objects -- inserted here --
	app.visualization.get('fFqQuT').then(function(vis){
    vis.show("QV01");	
	} );
    
    //get objects -- inserted here --
	app.visualization.get('fFqQuT').then(function(vis){
    vis.show("QV02");	
	} );	
		
} );});
