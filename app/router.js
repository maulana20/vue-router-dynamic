function Router(app, routes_config)
{
	this.__generateRoutes = function (prefix, routes) {
		for (var i in routes) {
			this.routes[prefix + '/' + routes[i].path] = routes[i]
			
			if (routes[i].children) this.__generateRoutes(prefix + '/' + routes[i].path, routes[i].children)
			
			this.routes[prefix + '/' + routes[i].path].path = (prefix + '/' + routes[i].path).slice(1)
		}
	}
	this.routes = {}
	this.__generateRoutes('', routes_config)
	
	this.__app = app
	this.__app.$appRouter = this
	
	this.route = function (path)
	{
		this.__app.$options.components['app-view'] = { template: "<div class='text-center'>Loading</div>" }
		this.__app.$forceUpdate()
		
		var route_config = this.routes[path]
		if (!route_config) route_config = MatchDynamicRoute(this.routes, path)
		
		console.log(route_config.component)
		this.__app.$options.components['app-view'] = route_config.component
		this.__app.$forceUpdate()
	}
}

function MatchDynamicRoute(routes, route)
{
	for (var attr in routes) {
		if (attr.indexOf(':') >= 0 && MatchRegExpRoute(attr, (routes[attr].props_config || {}), route)) return routes[attr]
	}
	
	return { component: { template: '<div>404</div>' } }
}

function MatchRegExpRoute(route, config, path)
{
	var regexp_route = []
	
	for (var i in route.split('/')) {
		if (route.split('/')[i].indexOf(':') >= 0) {
			if (i == route.split('/').length - 1) {
				regexp_route.push(config[route.split('/')[i].slice(1)] + '$')
			} else {
				regexp_route.push(config[route.split('/')[i].slice(1)])
			}
		} else {
			regexp_route.push(route.split('/')[i])
		}
	}
	
	regexp_route = regexp_route.join('/')
	
	return (path.match(regexp_route)) ? true : false
}
