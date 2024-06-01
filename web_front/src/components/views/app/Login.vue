<template>
  <div class="nk-main ">
    <div class="nk-wrap nk-wrap-nosidebar">
      <div class="nk-content ">
        <div class="nk-split nk-split-page nk-split-md">
          <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white"
               style="width: 100%;">
            <div class="nk-block nk-block-middle nk-auth-body">
              <div class="nk-block-head">
                <div class="nk-block-head-content">
                  <h5 class="nk-block-title">Sign-In</h5>
                  <div class="nk-block-des">
                    <p>Access WD using your email and password.</p>
                  </div>
                </div>
              </div>
              <form @submit.prevent="handleLogin">
                <div class="form-group">
                  <div class="form-label-group">
                    <label class="form-label">Username</label>
                  </div>
                  <input v-model="user.username" type="text" class="form-control form-control-lg"
                         placeholder="Enter your username">
                </div>
                <div class="form-group">
                  <div class="form-label-group">
                    <label class="form-label">Password</label>
                  </div>
                  <div class="form-control-wrap">
                    <input v-model="user.password" type="password" class="form-control form-control-lg"
                           placeholder="Enter your password">
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-lg btn-primary btn-block">Sign in</button>
                </div>
              </form>
              <div class="form-note-s2 pt-4">New on our platform?
                <RouterLink to="/register">Create an account</RouterLink>
              </div>
            </div>
            <div class="nk-block nk-auth-footer">
              <div class="nk-block-between">
                <ul class="nav nav-sm">
                  <li class="nav-item">
                    <a class="nav-link" href="#">Terms &amp; Condition</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Privacy Policy</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Help</a>
                  </li>
                </ul>
              </div>
              <div class="mt-3">
                <p>© 2019 DashLite. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";
import { useStore } from 'vuex'
import {useRouter} from "vue-router"

const router = useRouter()
const store = useStore()
const user = ref({
  username: '',
  password: ''
})
const message = ref('')
const loading = ref(true)

function handleLogin() {
  message.value = ""
  loading.value = true
  store.dispatch("auth/login", user.value).then(
      (data) => {
        message.value = data.message
        loading.value = false
        router.push('/')
      },
      (error) => {
        message.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        loading.value = false
      }
  )
}
</script>
<style scoped>

</style>