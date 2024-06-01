<template>
  <div class="homework">
    <div class="homework-titles">
      <div class="homework-title" v-for="(homework, homeworkIndex) in homeworks"
           :class="homework.id === activeHomeworkId ? 'active' : ''">
        <div class="homework-title-text" @click="setCurrent(homework.id)">
          {{ homeworkIndex + 1 }}. {{ homework.title }}
        </div>
      </div>
    </div>
    <div class="homework-body" v-if="currentHomework">
      <div class="hb-head">
        ДЗ: {{ currentHomework.title }}<br>
        <div>Статус: {{ currentSubmission ? getStatus(currentSubmission.status) : 'Не сдано' }}</div>
      </div>
      <div class="hb-body">
        <div class="homework-chat__items" v-if="submissions.length">
          <div class="homework-chat__item" v-for="submission in submissions">
            <div class="homework-chat__item-content">
              <div class="homework-chat__item-content-box">
                <div class="homework-chat__actor">{{ submission.student.name }}
                  <div class="homework-chat__item-date">{{ getFormattedDate(submission.submission_date) }}</div>
                </div>
                <div class="homework-chat__item-text">{{ submission.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hb-footer">
        <div class="homework-chat__input">
          <textarea class="homework-chat__input__textarea" placeholder="Напишите сообщение"></textarea>
          <f-icon class="i-icon" :icon="['fas', 'paper-plane']"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CourserunService from "../../../services/courserun.service.js"
import HomeworkService from "../../../services/homework.service.js";
import _ from 'lodash'
import moment from "moment/moment.js"
import 'moment/locale/ru.js'

export default {
  name: "Homeworks",
  props: ['course_run', 'current_id'],
  data() {
    return {
      activeHomeworkId: null,
      homeworks: [],
      submissions: [],
    }
  },
  methods: {
    getFormattedDate(date) {
      return moment(date, "DD-MM-YYYYTHH:mm:ss").locale('ru').format('DD.MM.YYYY в HH:mm:ss')
    },
    getStatus(status) {
      switch (status) {
        case 'submitted':
          return 'Отправлен на проверку'
        case 'returned':
          return 'Возвращен на доработку'
        case 'approved':
          return 'Принят'
        default:
          return 'Ошибка'
      }
    },
    getSubmissions() {
      HomeworkService.getSubmissions(this.activeHomeworkId).then((response) => {
        this.submissions = response.data ? response.data : []
      }, (error) => {
        console.error(error)
      })
    },
    setCurrent(id) {
      this.activeHomeworkId = id
    },
    getOwnHomeworks(id) {
      CourserunService.getOwnHomeworks(id).then((response) => {
        console.log(response)
        this.homeworks = response.data
      }, (error) => {
        console.error(error)
      })
    }
  },
  computed: {
    currentHomework() {
      return _.find(this.homeworks, item => item.id === this.activeHomeworkId)
    },
    currentSubmission() {
      return this.submissions.length ? _.last(this.submissions) : null
    },
  },
  watch: {
    activeHomeworkId() {
      this.getSubmissions()
    },
  },
  mounted() {
    this.activeHomeworkId = +this.current_id
    this.getOwnHomeworks(this.course_run)
    this.getSubmissions()
  }
}
</script>

<style scoped>
.homework {
  display: flex;
  background: white;
  height: 92vh;
}

.homework-titles {
  width: 25%;
  border-right: 1px solid #ededed;
}

.homework-body {
  width: 75%;
  height: 100%;
}

.homework-title {
  border-bottom: 1px solid #ededed;
  padding: 5px;
  cursor: pointer;
}

.homework-title:hover {
  background: #ededed;
}

.homework-title-text {
  font: inherit;
  color: #050505;
  font-size: 14px;
  padding-right: 10px;
  width: 100%;
}

.active {
  background: #ededed;
}

.hb-head {
  background-color: rgba(28, 156, 61, .5);
  font: inherit;
  color: #050505;
  font-size: 24px;
  padding: 0 15px;
  height: 10%;
  border-bottom: 1px solid #ededed;
}

.hb-body {
  height: 80%;
  border-bottom: 1px solid #ededed;
}

.homework-chat__items {
  box-sizing: border-box;
  flex-grow: 100;
  min-width: 0;
  overflow: auto;
  padding: 0 10px;
  width: 100%;
}

.homework-chat__item {
  padding: 5px 0;
  position: relative;
}

.homework-chat__item-content {
  display: table-row;
  font-size: 14px;
  margin: 0 0 0 auto;
  max-width: 510px;
  text-align: left;
  white-space: pre-line;
  word-break: break-word;
}

.homework-chat__item-content-box {
  display: table-cell;
  vertical-align: top;
}

.homework-chat__actor {
  color: #4882f1;
  font-size: 12px;
  padding-bottom: 2px;
}

.homework-chat__item-date {
  color: #232323;
  display: inline-block;
  font-size: 12px;
  padding: 0 5px;
  text-align: right;
}

.homework-chat__item-text {
  background: #f8f8f8;
  border-radius: 4px;
  padding: 6px 10px;
}

.homework-chat__input {
  display: flex;
  align-items: center;
}

.i-icon {
  width: 30px;
  height: 30px;
  color: #29347a;
  padding: 10px;
  cursor: pointer;
}

.homework-chat__input__textarea {
  width: 90%;
  margin: 10px;
  max-height: 190px;
  overflow: auto;
  overflow-wrap: break-word;
}
</style>