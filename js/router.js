import {test_article,main_nav,css,photo_list,search_data} from "./data/demo.js"
// import {signin,signup,home_index} from "./login.js"
import {forgetpassword, signin,signup}  from "./component/login.js"
import {home,footer,nav}  from "./component/home.js"
import {hotel2,hotel,attraction2,attraction,activity2,activity, restaurant2, restaurant, article2, article} from "./component/subpage.js"
import {user} from "./component/user.js"
import {show} from "./component/show.js"

let routes = [
	{
		path:'/',
		redirect:'/home',
	},
	{
		path:'/signin',
		components:{
			main:signin
		},
		meta: {
			stylesheet: 'signin'
		},
	},
	{
		path:'/forget',
		components:{
			main:forgetpassword
		},
		meta: {
			stylesheet: 'signin'
		},
	},
	{
		path:'/signup',
		components:{
			main:signup
		},
		meta: {
			stylesheet: 'signin'
		},
	},
	{
		path:'/user',
		components:{
			nav:nav,
			main:user,
			footer:footer
		},
		meta: {
			requiresAuth: true , 
			stylesheet: 'style2'
		},
	},
	{
		path:'/attraction/:id',
		components:{
			nav:nav,
			main:show,
			footer:footer
		},
		meta: {
			stylesheet:'view'
		},
	},
	{
		path:'/restaurant/:id',
		components:{
			nav:nav,
			main:show,
			footer:footer
		},
		meta: {
			stylesheet:'view'
		},
	},
	{
		path: '/home',
		redirect:'/home/article',
		components:{
			nav:nav,
			main:home,
			footer:footer
		},
		meta: {
			stylesheet: 'home'
		},
		children:[
			{
				path:"article",
				components:{
					a:article,
					b:article2
				}
			},
			{
				path:"activity",
				components:{
					a:activity,
					b:activity2
				}
			},
			{
				path:"attraction",
				components:{
					a:attraction,
					b:attraction2
				}
			},
			{
				path:"hotel",
				components:{
					a:hotel,
					b:hotel2
				}
			},
			{
				path:"restaurant",
				components:{
					a:restaurant,
					b:restaurant2
				}
			},
		]
	},
	{
		path: "*",
		redirect: "/",
	},
]

let router = new VueRouter({
	routes
})


const cssElement = document.getElementById('stylesheet')
const stylesheets = {
	home: '/style/style2.css',
	user: '/style/style2.css',
	signin: '/style/style_login.css',
	view: '/style/view.css',
}
const defaultStylesheet = stylesheets.home
router.beforeEach((to, from, next) => {
	if (to.meta.stylesheet !== from.meta.stylesheet) {
		cssElement.href = stylesheets[to.meta.stylesheet] || defaultStylesheet
	}
	firebase.auth().onAuthStateChanged((user)=>{
		if(user){
			localStorage.setItem("isLogin","true")
			localStorage.setItem("uid",user.uid)
		}
	})
	next();
})



export {router}
