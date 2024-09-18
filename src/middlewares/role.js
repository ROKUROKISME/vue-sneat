export default function role({ to, from, next }) {
    const userRole = 'User';
    if (to.meta.roles && !to.meta.roles.includes(userRole)) next({ name: 'dashboard' });
    else next();
}