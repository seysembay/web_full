<template>
  <div class="nk-content nk-content-fluid">
    <div class="container-xl wide-xl">
      <div class="nk-content-inner">
        <div class="nk-content-body">
          <div class="nk-block-head nk-block-head-sm">
            <div class="nk-block-between">
              <div class="nk-block-head-content">
                <h3 class="nk-block-title page-title">Занятия</h3>
              </div>
            </div>
          </div>
          <div class="nk-block">
            <div class="learning_items">
              <div v-for="(lesson, lessonIndex) in lessons" class="learning_near learning-near_bar">
                <div class="learning-near__main">
                  <div class="learning-near__header learning-near__header_table">
                    <div class="learning-near__header-link">
                      <div class="learning-near__number">{{ lessonIndex + 1 }}</div>
                    </div>
                    <a href="#" class="learning-near__header-link js-learning-open" data-id="hw-0-cv-id">
                      <span class="learning-near__header-text" @click=toggleLesson(lesson)>{{ lesson.title }}</span>
                      <span class="ic ic-test-ok learning-near__header-fire"></span>
                    </a>
                  </div>
                </div>
                <div class="learning-near__content" :class="lesson.closed ? 'closed' : ''">
                  <div class="learning-near__item">
                    <h2 class="learning-near__header">Краткое содержание</h2>
                    <div class="learning-near__desc">
                      <p v-html="lesson.content"></p>
                    </div>
                  </div>
                  <div class="learning-near__item">
                    <h2 class="learning-near__header">Преподаватель</h2>
                    <div class="learning-near__desc">
                      <p>{{ lesson.teacher.name ?? '' }}</p>
                    </div>
                  </div>
                  <div class="learning-near__item">
                    <h2 class="learning-near__header">Дата и время</h2>
                    <div class="learning-near__desc">
                      <p>{{ getFormattedDate(lesson.start) }}</p>
                    </div>
                  </div>
                  <div class="learning-near__item" v-if="lesson.homeworks">
                    <h2 class="learning-near__header">Домашнее задание</h2>
                    <div class="text text_p-small text_default learning-markdown js-learning-markdown">
                      <p>{{ lesson.homeworks.title }}</p>
                    </div>
                    <div class="text text_p-small text_default text_bold">Описание домашнего задания:</div>
                    <div class="text text_p-small text_default learning-markdown js-learning-markdown">
                      <p>{{ lesson.homeworks.description }}</p>
                      <hr>
                    </div>
                    <div class="text text_p-small text_default">Рекомендуем сдать до:
                      {{ getFormattedDate(lesson.homeworks.due_date) }}
                    </div>
                    <div class="text text_p-small text_default">
                      <RouterLink :to="{name: 'Homeworks', params: {course_run: courseRun.id, current_id:lesson.homeworks.id}}">
                        <a class="btn btn-dim btn-outline-primary">Отправить ДЗ на проверку</a>
                      </RouterLink>
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
<script>
import CourserunService from "../../services/courserun.service.js";
import moment from "moment/moment.js"
import 'moment/locale/ru.js'
import _ from 'lodash'

export default {
  name: "LearningDetails",
  props: ['id'],
  data() {
    return {
      lessons: [],
      courseRun: null,
    }
  },
  methods: {
    toggleLesson(lesson) {
      let openedLesson = _.find(this.lessons, item => item.closed === false)
      if (openedLesson) {
        openedLesson.closed = !openedLesson.closed
        lesson.closed = openedLesson.id === lesson.id;
      } else lesson.closed = false
    },
    getFormattedDate(date) {
      return moment(date, "DD-MM-YYYYTHH:mm:ss").locale('ru').format('DD MMMM, dddd [в] HH:mm')
    },
    getOwnCourseRun() {
      CourserunService.getOwnCourses(this.id).then((response) => {
        this.courseRun = response.data
        this.getLessons()
      }, (error) => {
        console.error(error)
      })
    },
    getLessons() {
      CourserunService.getLessons(this.courseRun.id).then((response) => {
        this.lessons = _.map(response.data, item => {
          item.closed = true
          return item
        })
      }, (error) => {
        console.error(error)
      })
    }
  },
  mounted() {
    this.getOwnCourseRun()
  }
}
</script>
<style scoped>
.page-title {
  font: inherit;
  font-size: 35px;
  font-weight: 400;
}

.learning_near {
  font-size: 18px;
  line-height: normal;
  padding-bottom: 20px;
  position: relative;
}

.learning-near__item:not(:last-child):after {
  border: 1px dashed #adb3cc;
  bottom: 0;
  content: " ";
  left: 18px;
  position: absolute;
  top: 0;
  z-index: 1;
}

.learning-near_bar:not(:last-child):after {
  border: 1px dashed #adb3cc;
  bottom: 0;
  content: " ";
  left: 18px;
  position: absolute;
  top: 0;
  z-index: 1;
}

.learning-near__header_table {
  display: table;
}

.learning-near__header {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
  position: relative;
}

.learning-near__header-link {
  text-decoration: none;
  display: table-cell;
  vertical-align: middle;
}

.learning-near__number {
  background: #fff;
  border: 2px solid #185bdc;
  border-radius: 50%;
  display: inline-block;
  font-size: 18px;
  height: 34px;
  line-height: 34px;
  margin-right: 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  width: 34px;
  z-index: 2;
}

a.learning-near__header-link .learning-near__header-text {
  border-bottom: 2px dashed #050505;
  transition: border-bottom-color .1s ease-in-out;
}

a, a:visited {
  color: #37545c;
}

a.learning-near__header-link:hover .learning-near__header-text {
  border-bottom-color: transparent;
}

.learning-near_bar .learning-near__content {
  padding-left: 48px;
}

.learning-near__content {
  padding-top: 45px;
}

.learning-near__item {
  padding-bottom: 45px;
}

.learning-near__header {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
  position: relative;
}

.learning-near__desc {
  line-height: normal;
}

.learning-near_bar .learning-near__content .learning-near__header:before {
  background: #ffcb27;
  border-radius: 50%;
  content: " ";
  display: block;
  height: 12px;
  left: -35px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  z-index: 2;
}

.closed {
  display: none;
}

.text.text_p-small, .text_p-small {
  padding-bottom: 6px;
}

.text_default {
  font-size: 18px;
  line-height: 24px;
}

.text {
  color: #050505;
  font-family: Roboto, sans-serif;
}

.text_bold {
  font-weight: 700;
}
</style>