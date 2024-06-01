<template>
  <div class="nk-content nk-content-fluid">
    <div class="container-xl wide-xl">
      <div class="nk-content-inner" v-if="course">
        <div class="nk-content-body">
          <div class="components-preview">
            <div class="nk-block-head nk-block-head-lg wide-sm">
              <div class="nk-block-head-content">
                <h2 class="nk-block-title fw-normal">{{ course.name }}</h2>
                <div class="nk-block-des">
                  <p class="lead">{{ course.description }}</p>
                  <p class="lead">
                    <b>Длительность: {{ course.duration }}</b>
                    <b v-if="course.duration_unit === 'months'"> месяцев</b>
                    <b v-else-if="course.duration_unit === 'weeks'"> недель</b>
                    <b v-else> лет</b>
                  </p>
                  <p v-if="courseruns.length" class="lead">Потоки: </p>
                  <div v-for="run in courseruns">
                    <p class="lead">Дата начала: {{ run.start_date.substring(0, 11) }} Дата завершения:
                      {{ run.end_date.substring(0, 11) }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label class="form-label">Введите ФИО</label>
                <div class="form-control-wrap">
                  <input type="text" class="form-control" placeholder="ФИО">
                </div>
                <label class="form-label">Введите Email</label>
                <div class="form-control-wrap">
                  <input type="email" class="form-control" placeholder="email">
                </div>
                <label class="form-label">Введите мобильный телефон</label>
                <div class="form-control-wrap">
                  <input type="tel" class="form-control" placeholder="телефон">
                </div>
              </div>
              <button class="btn btn-dim btn-outline-secondary">Записаться на курс</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref, onMounted, onBeforeMount} from "vue";
import CourseService from "../../../services/course.service.js";

export default {
  name: "CourseDetails",
  props: ['id'],
  data() {
    return {
      course: null,
      courseruns: [],
    }
  },
  methods: {
    getCourse() {
      CourseService.getCourse(this.id).then((response) => {
        this.course = response.data.course
        this.courseruns = response.data.courseruns
      }, (error) => {
        console.error(error)
      });
    }
  },
  mounted() {
    this.getCourse()
  }
}
</script>
<style scoped>

</style>