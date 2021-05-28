import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import SignIn from '../components/login/sign-in.vue'
import SignUp from '../components/login/sign-up.vue'
import UserAccount from '../components/login/user-account.vue'
import WhereToExplore from '../components/explore/where-to-explore.vue'
import ExploreOptionsList from '../components/explore/explore-options-list.vue'
import ExploreSplashPage from '../components/explore/explore-splash-page.vue'
import Explore from '../components/explore/explore.vue'
import Vouchers from '../components/explore/vouchers.vue'
import Updates from '../components/updates/updates.vue'
import ActivityInfoPage from '../components/explore/activity-info.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    props(route) {
      return { isForgotPassword: route.query.forgotPassword }
    }
  },
  {
    path: '/explore-splash-page',
    name: 'explore-splash-page',
    component: ExploreSplashPage
  },
  {
    path: '/where-to-explore',
    name: 'where-to-explore',
    component: WhereToExplore
  },
  {
    path: '/explore-options-list',
    name: 'explore-options-list',
    component: ExploreOptionsList
  },
  {
    path: '/explore',
    name: 'explore',
    component: Explore
  },
  {
    path: '/vouchers',
    name: 'vouchers',
    component: Vouchers
  },
  {
    path: '/updates',
    name: 'updates',
    component: Updates
  },
  {
    path: '/activity-info',
    name: 'activity-info',
    component: ActivityInfoPage
  },
  {
    path: '/user-account',
    name: 'user-account',
    component: UserAccount
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
