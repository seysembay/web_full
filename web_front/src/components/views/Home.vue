<template>
  <div class="nk-content nk-content-fluid">
    <div class="container-xl wide-xl">
      <div class="nk-content-inner">
        <div class="nk-content-body">
          <div class="nk-block-head nk-block-head-sm">
            <div class="nk-block-between">
              <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Курсы</h3>
                <div class="nk-block-des text-soft">
                  <p>Кол-во курсов {{courses.length}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="nk-block">
            <div class="row g-gs">
              <div class="col-sm-6 col-lg-4 col-xxl-3" v-for="course in courses">
                <div class="card card-bordered h-100 card-hover">
                  <div class="card-inner">
                    <div class="project">
                      <div class="project-head">
                        <router-link class="project-title" :to="{name: 'Course', params: {id:course.id}}">
                          <div class="user-avatar sq bg-orange" style="width: 180px">
                            <span>{{ course.name }}</span>
                          </div>
                        </router-link>
                      </div>
                      <div class="project-details">
                        <p>{{ course.description }}</p>
                      </div>
                      <div class="project-meta">
                        <span class="badge badge-dim badge-light text-gray">
                          <span>{{ course.duration }} {{ course.duration_unit }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import CourseService from "../../services/course.service.js";

const courses = ref([])

function getCourses() {
  CourseService.getCourses().then((response) => {
    courses.value = response.data
  }, (error) => {
    console.error(error)
  });
}

onMounted(() => {
  getCourses()
})
</script>
<style scoped>
.card-hover:hover {
  cursor: pointer;
  background: aquamarine;
}
</style>