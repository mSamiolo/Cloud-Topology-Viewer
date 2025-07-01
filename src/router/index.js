import { createRouter, createWebHistory } from 'vue-router'
import Canvas from '../views/Canvas.vue'

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'canvas',
            component: Canvas,
        },
        {
            path: '/project',
            name: 'project',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Project.vue'),
        }, 
    ],
})

export default router

// Advantages of Lazy Loading:
//     The main bundle is smaller, so your app loads faster at the beginning.
//     Only essential code is loaded at first; other parts are loaded as needed.
//     Lazy loading splits code into smaller "chunks", improving overall performance.
//     If a user never visits /project, they never download Project.vue, saving bandwidth.
