import {createWebHistory, createRouter} from 'vue-router'

import Home from "../components/views/Home.vue";
import About from "../components/views/About.vue";
import Contacts from "../components/views/Contacts.vue";
import Login from "../components/views/app/Login.vue";
import Homeworks from "../components/views/app/Homeworks.vue";
import Register from "../components/views/app/Register.vue";
import CourseDetails from "../components/views/Course/CourseDetails.vue";
import LearningDetails from "../components/views/LearningDetails.vue";
import Profile from "../components/views/app/Profile.vue";
const MyCourses = () => import("../components/views/Course/MyCourses.vue")


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About},
        {path: '/contacts', component: Contacts},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/contacts', component: Contacts},
        {path: '/profile', component: Profile},
        {path: '/mycourses', component: MyCourses},
        {path: '/course/:id', name: 'Course', props: true, component: CourseDetails},
        {path: '/learning/:id', name: 'Learning', props: true, component: LearningDetails},
        {path: '/homeworks/:course_run/:current_id', name: 'Homeworks', props:true, component: Homeworks},
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')
    if (authRequired && !loggedIn) {
        next('/login')
    } else {
        next()
    }
})
export default router