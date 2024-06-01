import api from './api'

class HomeworkService {
    getSubmissions(data) {
        return api.get(`/hw-submission/${data}/`)
    }
}

export default new HomeworkService()