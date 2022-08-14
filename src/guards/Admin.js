
export default function Admin (to, from, next) {
    try {
        if (localStorage.getItem("isAdmin") === 'true') { return next() }
    } catch (e) {
    }
    next({ path: 'login' })
}
