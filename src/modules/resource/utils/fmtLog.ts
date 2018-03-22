import * as _ from 'lodash'

function fmtLog(str) {
    // let _str = `Nov 21 10:05:22 188.103.18.24  #ILO 4: 11/21/2017 02:04 Server reset.
    //             Nov 21 10:05:22 188.103.18.24  #ILO 4: 11/21/2017 02:04 Server power restored.
    //             Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
    //             Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
    //             Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
    //             Nov 21 10:05:56 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
    //             Nov 21 10:05:56 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
    //             Nov 21 10:05:58 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
    //             Nov 21 10:05:58 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
    //             Nov 21 10:05:59 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
    //             Nov 21 10:05:59 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
    //             Nov 21 10:06:01 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
    //             Nov 21 10:06:01 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
    //             Nov 21 10:06:03 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.`
    let patt1 = /\S+\b.*\d\d\:\d\d\:\d\d/
    let patt2 = /(\d{1,3}\.){3}\d{1,3}/
    let patt3 = /\#\S+\b.*\d(?=\:\s)/
    let patt4 = /\d{1,2}\/\S+\b.*/
    let data = []
    let arr = str.split(/\n/)
    arr.map(function (item, index) {
        let _item = {
            generated_at: item.match(patt1)[0],
            IP: item.match(patt2)[0],
            hostname: item.match(patt3)[0],
            message: item.match(patt4)[0]
        }
        data.push(_item)
    })
    return data
}

export default fmtLog