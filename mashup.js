/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
//var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	//host: window.location.hostname,
	//prefix: prefix,	
	//port: window.location.port,	
	//isSecure: window.location.protocol === "https:"	
	host: 'qlikviz.epa.gov',
	prefix: '/',
	port: 443,
	isSecure: true
};

	require.config( {
	//baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
	baseUrl: 'https://' + config.host + config.prefix + 'resources'
	} );

	require( ["js/qlik"], function ( qlik ) {
		
		
		var app = qlik.openApp('abc53df2-5891-4a11-adb1-b76b97117af5', config); 
		app.getObject('vizlib_container','EFeqkz');		
		app.getObject('vizlib_table_one','jXjggH');		

		//app.visualization.get('jXjggH').then(function(vis){ vis.show('vizlib_table_one'); });
				
		app.getObject('CurrentSelections','CurrentSelections');		
		
	} );

