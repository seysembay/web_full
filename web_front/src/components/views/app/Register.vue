<script setup>

</script>

<template>
  <div class="nk-main">
    <div class="nk-wrap nk-wrap-nosidebar">
      <div class="nk-content ">
        <div class="nk-split nk-split-page nk-split-md">
          <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white"
               style="width: 100%;">
            <div class="absolute-top-right d-lg-none p-3 p-sm-5">
              <a href="#" class="toggle btn btn-white btn-icon btn-light" data-target="athPromo"><em
                  class="icon ni ni-info"></em></a>
            </div>
            <div class="nk-block nk-block-middle nk-auth-body">
              <div class="nk-block-head">
                <div class="nk-block-head-content">
                  <h5 class="nk-block-title">Register</h5>
                  <div class="nk-block-des">
                    <p>Create new account</p>
                  </div>
                </div>
              </div>
              <form @submit.prevent="handleRegister" autocomplete="off">
                <div class="form-group">
                  <label class="form-label">Username</label>
                  <input v-model="user.username" type="text" class="form-control form-control-lg" required
                         placeholder="Enter your username">
                </div>
                <div class="form-group">
                  <label class="form-label">First name</label>
                  <input v-model="user.first_name" type="text" class="form-control form-control-lg"
                         required placeholder="Enter your first name">
                </div>
                <div class="form-group">
                  <label class="form-label">Last name</label>
                  <input v-model="user.last_name" type="text" class="form-control form-control-lg"
                         required placeholder="Enter your last name">
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input v-model="user.email" type="text" class="form-control form-control-lg" required
                         placeholder="Enter your email address">
                </div>
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <div class="form-control-wrap">
                    <input v-model="user.password" type="password" class="form-control form-control-lg"
                           required placeholder="Enter your password">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Confirm password</label>
                  <div class="form-control-wrap">
                    <input v-model="user.password2" type="password" class="form-control form-control-lg"
                           required placeholder="Enter your password again">
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-lg btn-primary btn-block">Register</button>
                </div>
              </form>
              <div class="form-note-s2 pt-4">Already have an account ?
                <RouterLink to="login">Sign in instead</RouterLink>
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

<style scoped>

</style>