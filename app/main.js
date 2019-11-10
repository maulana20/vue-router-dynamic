const app = new Vue({
	components: {
		'app-view': { template: ' ' }
	},
	mounted: function()
	{
		window.location.href = '/#/login'
		$(window).on('hashchange', function () {
			this.$appRouter.route(window.location.hash.slice(1))
		}.bind(this))
	}
})

var router = new Router(app, routes)
app.$mount('#app')
