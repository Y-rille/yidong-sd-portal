import moment from '../../../common/moment'

function getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, facts) { 
    //  格式化指标数据成一个object
    let formatkpidate = (kpidate) => { 
        let headers = kpidata.headers
        let values = kpidata.values
        let obj = {}
        for (let i = 0; i < headers.length; i++) {
            let val = []
            for (let j = 0; j < values.length; j++) {
                if (headers[i] == 'EVENT_TIMESTAMP') {
                    val.push(moment(values[j][i]).format("YYYY/MM/DD HH:mm"))
                } else { 
                    val.push(values[j][i])
                }
                
            }
            
            obj[headers[i]] = {val:val}
        }
        return obj
    }  
    // 将阈值信息合并到指标信息中
    let meragemoInstKpiThresholds = (d1, moInstKpiThresholds) => { 
        let d2 = []
        _.forEach(d1, (v, k) => { 
            let threshold = _.filter(moInstKpiThresholds, function(o) { return k==o.kpiId; })[0]
            if (threshold) { 
                v.threshold = threshold
            }
        })
        return d1
    }
    // 合并指标的一些基本信息，比如单位，标题等
    let mergeinfo = (d2, moTypeKpis) => { 
        _.forEach(d2, (v, k) => { 
            let obj = _.filter(moTypeKpis, function (o) { return k == o.kpiId; })[0];
            if (obj) { 
                v.kpiId = obj.kpiId
                v.kpiName = obj.kpiName
                v.kpiUnit = obj.kpiUnit
                v.maxValue = obj.maxValue
                v.minValue = obj.minValue
            }
        })
        return d2
    }
    // 最后格式化成组件需要的接口
    let formatdata = (d3,facts) => { 
        let rows = []
        _.forEach(facts, function(value) {
            if (_.has(d3, value)) { 
                d3[value]['x_value'] = d3['EVENT_TIMESTAMP'].val
                rows.push(d3[value])
            }
        });
        return rows
    }

    let d1 = formatkpidate(kpidata)
    let d2 = meragemoInstKpiThresholds(d1, moInstKpiThresholds)
    let d3 = mergeinfo(d2, moTypeKpis)
    let result = formatdata(d3, facts.split(","))
    return result
}
export default getKpiData
