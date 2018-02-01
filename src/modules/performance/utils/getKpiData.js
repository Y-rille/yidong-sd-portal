// // 指标列表
// let moTypeKpis = {
//     "code": 1,
//     "data": [
//       {
//         "kpiId": 6,
//         "kpiName": "主机.网络端口接收速率",
//         "kpiRealName": "网络端口接收速率",
//         "mogrpId": 1,
//         "kpiDesc": "计算节点必选，所有业务端口接收速率的总和（1B=8b）",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "Mbps",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "NicReceiveRate",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "1024",
//         "state": 1
//       },
//       {
//         "kpiId": 5,
//         "kpiName": "主机.网络端口发送速率",
//         "kpiRealName": "网络端口发送速率",
//         "mogrpId": 1,
//         "kpiDesc": "计算节点必选，所有业务端口发送速率的总和（1B=8b）",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "Mbps",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "NicTransferRate",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "1024",
//         "state": 1
//       },
//       {
//         "kpiId": 3,
//         "kpiName": "主机.总内存",
//         "kpiRealName": "总内存",
//         "mogrpId": 1,
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "MB",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "RamTotal",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "131072",
//         "state": 1
//       },
//       {
//         "kpiId": 2,
//         "kpiName": "主机.内存使用率",
//         "kpiRealName": "内存使用率",
//         "mogrpId": 1,
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "%",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "RamUtil",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "100",
//         "state": 1
//       },
//       {
//         "kpiId": 1,
//         "kpiName": "主机.CPU使用率",
//         "kpiRealName": "CPU使用率",
//         "mogrpId": 1,
//         "kpiDesc": "总CPU使用率/CPU数量",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "%",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "CpuUtil",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "100",
//         "state": 1
//       },
//       {
//         "kpiId": 4,
//         "kpiName": "主机.可用内存",
//         "kpiRealName": "可用内存",
//         "mogrpId": 1,
//         "kpiDesc": "",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "MB",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "RamUsed",
//         "mogrpCnname": "主机",
//         "mogrpEnname": "HOST",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "131072",
//         "state": 1
//       }
//     ]
// }
// // 对象实例阈值
// let moInstKpiThresholds = {
//     "code": 1,
//     "data": [
//       {
//         "thresholdId": 1,
//         "kpiId": 5,
//         "criticalThresholdOperator": ">",
//         "criticalThresholdValue": "40",
//         "majorThresholdOperator": ">",
//         "majorThresholdValue": "30",
//         "minorThresholdOperator": ">",
//         "minorThresholdValue": "20",
//         "normalThresholdOperator": ">",
//         "normalThresholdValue": "-1",
//         "state": 1
//       }
//     ]
// }
// // 指标数据
// let kpidate = {
//     "headers": [
//         "EVENT_TIMESTAMP",
//         "T_HOST",
//         "4",
//         "5"
//     ],
//     "values": [
//         [
//             1514977200000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             2111
//         ],
//         [
//             1514978100000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             2343
//         ],
//         [
//             1514979000000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             17644
//         ],
//         [
//             1514979900000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             13211
//         ],
//         [
//             1514980800000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514981700000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514982600000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514982600000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             13072
//         ],
//         [
//             1514983500000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514984400000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514985300000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514986200000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ],
//         [
//             1514987100000,
//             "D03-hpeDL380-COMP04",
//             13072,
//             34222
//         ]
//     ],
//     "status": "OK",
//     "nbVals": 13,
//     "timeColumn": "EVENT_TIMESTAMP",
//     "statusInfo": "",
//     "offset": 0,
//     "totalCount": 13
// }

function getKpiData(moTypeKpis,moInstKpiThresholds,kpidate) { 
    // 格式化指标数据
    let formatkpidate = (kpidate) => { 
        let kpidate_headers = kpidate.headers
        let kpidate_values = kpidate.values
        let data = []
        for (let i = 2; i < kpidate_headers.length; i++) {
            let d = {}
            d.kpiId = kpidate_headers[i]
            let x_value = []
            let val = []
            for (let j = 0; j < kpidate_values.length; j++) { 
                x_value.push(kpidate_values[j][0])
                val.push(kpidate_values[j][i])
            }
            d.x_value = x_value
            d.val = val
            data.push(d)
        }
        return data
    }    
    //将阈值信息合并到指标信息中
    let  meragemoInstKpiThresholds = (d1,moInstKpiThresholds) => { 
        let y_data = moInstKpiThresholds.data
        d1.forEach(item => { 
            item.threshold = _.filter(y_data, function(o) { return item.kpiId==o.kpiId; })[0];
        })
        return d1
    }
    // 合并指标的一些基本信息，比如单位，标题等
    let mergeinfo = (d2, moTypeKpis) => { 
        let b_data = moTypeKpis.data
        d2.forEach(item => { 
            let obj = _.filter(b_data, function (o) { return item.kpiId == o.kpiId; })[0];
            item.kpiName = obj.kpiName
            item.kpiUnit = obj.kpiUnit
            item.maxValue = obj.maxValue
            item.minValue = obj.minValue
        })
        return d2
    }
    let d1 = formatkpidate(kpidate)
    let d2 = meragemoInstKpiThresholds(d1, moInstKpiThresholds)
    let result = mergeinfo(d2, moTypeKpis)
    return result
}
export default getKpiData
