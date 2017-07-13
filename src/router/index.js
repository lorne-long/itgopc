import Vue from 'vue';
import VueRouter from 'vue-router';
import maps from './map';
import filters from './hook/beforEach';

Vue.use(VueRouter);
const router = new VueRouter({
	//mode: 'history', //路由的 history 模式，
	'linkActiveClass': 'active',
	routes: [...maps]
});
router.beforeEach(filters);
export default router;
