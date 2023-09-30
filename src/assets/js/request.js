export default class Request {
    urls = {
        'getVacanciesURL': 'http://127.0.0.1:8000/api/v1/vacancy/',
        'getSpecialityURL': 'http://127.0.0.1:8000/api/v1/speciality/',
    }
    getVacanciesData(url, params) {
        let rUrl = ''
        if (url) {
            rUrl = url
        }else{
            rUrl = this.urls.getVacanciesURL
        }
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    url: rUrl,
                    method: 'GET',
                    dataType: 'json',
                    data: params,

                    success: function (data) {
                        resolve(data)
                    },
                    error: function (error) {
                        reject(error)
                    }
                }
            )
        })
    }

    getSearchFormItem(url) {
        return new Promise((resolve, reject) => {
            $.ajax(
                {
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                    data: {},

                    success: function (data) {
                        resolve(data.results)
                    },
                    error: function (error) {
                        reject(error)
                    }
                }
            )
        })
    }
}