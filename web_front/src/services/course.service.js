import api from './api'

class CourseService {
    getCourses() {
        return api.get('/courses/')
    }
    getCourse(data) {
        return api.get('/course/'+ data + '/')
    }
    getOwnCourses() {
        return api.get('/owncourses/')
    }
}

export default new CourseService()