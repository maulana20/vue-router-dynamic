const routes = [
	{ path: 'dashboard', component: { template: '<div>dashboard</div>' } },
	{ path: 'login', component: { template: '<div>login</div>' } },
	{ path: 'administration', children: [ { path: 'user', component: { template: '<div>administration - user</div>' } } ] }
]
