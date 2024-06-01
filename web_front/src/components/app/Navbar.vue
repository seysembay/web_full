<template>
  <div class="nk-header nk-header-fluid is-theme">
    <div class="container-xl wide-xl">
      <div class="nk-header-wrap">
        <div class="nk-header-brand">
          <img src="/src/assets/logo.png" alt="logo" class="my_logo">
        </div>
        <div class="nk-header-menu" data-content="headerNav">
          <ul class="nk-menu nk-menu-main ui-s2">
            <li class="nk-menu-item has-sub" :class="courseLinksActive ? 'active' : ''">
              <a href="#" class="nk-menu-link nk-menu-toggle" data-original-title="" title="">
                <span class="nk-menu-text">Обучение</span>
              </a>
              <ul class="nk-menu-sub" style="display: block;">
                <router-link
                    v-for="link in courseLinks"
                    :to="link.to"
                    custom
                    v-slot="{ href, route, navigate, isActive, isExactActive }"
                >
                  <li class="nk-menu-item" :class="isActive ? 'active' : ''" @click="navigate">
                    <a :href="href" class="nk-menu-link">
                      <span class="nk-menu-text">{{ link.title }}</span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
            <li class="nk-menu-item has-sub" :class="infoLinksActive ? 'active' : ''">
              <a href="#" class="nk-menu-link nk-menu-toggle" data-original-title="" title="">
                <span class="nk-menu-text">Информация</span>
              </a>
              <ul class="nk-menu-sub">
                <router-link
                    v-for="link in infoLinks"
                    :to="link.to"
                    custom
                    v-slot="{ href, route, navigate, isActive, isExactActive }"
                >
                  <li class="nk-menu-item" :class="isActive ? 'active' : ''" @click="navigate">
                    <a :href="href" class="nk-menu-link">
                      <span class="nk-menu-text">{{ link.title }}</span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
        <div class="nk-header-tools">
          <NavUser v-if="loggedIn" :user="user"></NavUser>
          <NavAuth v-else></NavAuth>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import NavUser from "./NavUser.vue"
import NavAuth from "./NavAuth.vue"
import {ref} from "vue"
import {useRoute} from "vue-router"
import {computed} from "vue"
import _ from 'lodash'
import {useStore} from 'vuex'
import {jwtDecode} from "jwt-decode"

const store = useStore()
const courseLinksArr = ref([
  {to: '/', title: 'Курсы'},
  {to: '/mycourses', title: 'Мои курсы'},
])

const infoLinks = ref([
  {to: '/about', title: 'О нас'},
  {to: '/contacts', title: 'Контакты'},
])

const courseLinks = computed(() => {
  if (loggedIn.value) return courseLinksArr.value
  else return _.filter(courseLinksArr.value, item => item.to !== '/mycourses')
})
const route = useRoute();
const loggedIn = computed(() => store.getters['auth/loggedIn'])
const courseLinksActive = computed(() => {
  let active = _.find(courseLinks.value, item => item.to === route.path)
  return !!active
})
const infoLinksActive = computed(() => {
  let active = _.find(infoLinks.value, item => item.to === route.path)
  return !!active
})

const user = computed(() => loggedIn ? jwtDecode(store.getters['auth/user'].access) : null)
</script>

<style scoped>
.my_logo {
  cursor: pointer;
  width: 37px;
}
</style>