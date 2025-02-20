import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AddProperty from '@/views/AddProperty.vue'
import PropertyDetails from '@/views/PropertyDetails.vue'
import UpdateProperty from '@/views/UpdateProperty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/add-property',
      name: 'add-property',
      component: AddProperty,
    },
    {
      path: '/properties/:id',
      name: 'PropertyDetails',
      component: PropertyDetails,
    },
    {
      path: '/edit-properties/:id',
      name: 'UpdateProperty',
      component: UpdateProperty,
    },
  ],
})

export default router
