<template>
  <ul class="nk-quick-nav">
    <li class="dropdown user-dropdown order-sm-first">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <div class="user-toggle" @click="toggleVisible">
          <div class="user-avatar sm">
            <span>{{ userInitials }}</span>
          </div>
          <div class="user-info d-none d-xl-block">
            <div class="user-status">{{ props.user ? props.user.role : '' }}</div>
            <div class="user-name dropdown-indicator">{{ props.user ? props.user.name : '' }}</div>
          </div>
        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1 is-light"
           :class="isVisible ? 'show' : ''">
        <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div class="user-card">
            <div class="user-avatar">
              <span>{{ userInitials }}</span>
            </div>
            <div class="user-info">
              <span class="lead-text">{{ props.user.name }}</span>
              <span class="sub-text">{{ props.user.email }}</span>
            </div>
          </div>
        </div>
        <div class="dropdown-inner">
          <ul class="link-list">
            <li>
              <RouterLink to="/profile">
                <span>Мой профиль</span>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="dropdown-inner">
          <ul class="link-list">
            <li>
              <a @click="logout">
                <span>Выход</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import {computed, ref} from "vue"
import {useStore} from 'vuex'
import router from "../../router/index.js";

const store = useStore()
const isVisible = ref(false)

function toggleVisible() {
  isVisible.value = !isVisible.value
}

function logout() {
  store.dispatch("auth/logout")
  router.push('login')
}

const props = defineProps(['user'])
const userInitials = computed(() => {
  if (props.user) return props.user.name.split(" ").map(word => word.charAt(0)).join("")
  return ''
})
</script>
<style scoped>
.link-list {
  padding: 0;
  cursor: pointer;
}

.dropdown-menu-md {
  min-width: 260px;
  max-width: 260px;
}
</style>