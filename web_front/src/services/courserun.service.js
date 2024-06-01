import api from './api'

class CourserunService {
    getOwnCourses(data) {
        return api.get('/owncourserun/' + data + '/')
    }

    getLessons(data) {
        return api.get(`/getLessons/`, {
            params: {
                course_run_id: data
            }
        })
    }
    getOwnHomeworks(data) {
        return api.get(`/ownhomeworks/`, {
            params: {
                course_run_id: data
            }
        })
    }
}

export default new CourserunService()