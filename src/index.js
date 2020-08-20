import Class from "./js/Class";
import "./css/style.css";
import "./less/style.less"
import Vue from "vue"
import "animate.css"
import App from "./vue/App.vue";


console.log('---', (new Class()).foo());

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    components: { App }
}).$mount('#app')