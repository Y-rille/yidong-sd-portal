import * as request from 'superagent';

class ConfigAPI {
    getConfig() {
        return new Promise((resolve, reject) => {
            let req = request.get('/api/act/common')
            req.timeout(60000)
            req.end((err, res) => {
                if (err || !res || !res.body || res.body.error) {
                    reject(err)
                } else {
                    resolve(res.body)
                }
            })
        })
    }
}

export default new ConfigAPI();