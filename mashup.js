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
	host: 'e7ixql68q51ilev.us.qlikcloud.com',
	prefix: '/',
	port: 443,
	isSecure: true
};

	require.config( {
	//baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
	baseUrl: 'https://' + config.host + config.prefix + 'resources'
	} );

	require( ["js/qlik"], function ( qlik ) {
		
		
		var app = qlik.openApp('831d3888-5b6f-4232-9e9e-7c1903a543ce', config); 
		app.getObject('vizlib_container','KEhtSWR');		
		app.getObject('vizlib_table_one','d683496a-6041-403a-9b9d-4747b8a681bb');		

		//app.visualization.get('jXjggH').then(function(vis){ vis.show('vizlib_table_one'); });
				
		app.getObject('CurrentSelections','CurrentSelections');		
		
	} );

