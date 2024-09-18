import VueCookies from "vue-cookies";
export default (to, from, next) => {

    const userRole = 'Admin';
    const isLogin = $cookies.get("jwt");

    if ((to.name === "login" || to.name === "registerlogin") && isLogin) next({ name: 'dashboard' });
    if (to.meta.requiresAuth && !isLogin) next({ name: "login" });
    else next();
}

