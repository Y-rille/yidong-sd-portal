// let tree = [
//     {
//         "nodeLabel": "数据中心1",
//         "nodeId": "1",
//         "nodeName": "数据中心1",
// 		"nodeType": "DataCenter",
//         "labelPath": "数据中心1",
//         "dataType": 0,
//         "children": [
//             {
//                 "nodeLabel": "机房1",
//                 "nodeId": "1",
//                 "nodeName": "机房1",
// 				"nodeType": "MachineRoom",
//                 "labelPath": "数据中心1/机房1",
//                 "dataType": 0,
// 				 "children": [
// 				 {
// 					"nodeLabel": "机柜1",
// 					"nodeId": "1",
// 					"nodeName": "机柜1",
// 					"nodeType": "CABINET",
// 					"labelPath": "数据中心1/机房1/机柜1",
// 					"dataType": 0
// 				 },
// 				 {
// 					"nodeLabel": "机柜2",
// 					"nodeId": "2",
// 					"nodeName": "机柜2",
// 					"nodeType": "CABINET",
// 					"labelPath": "数据中心1/机房1/机柜2",
// 					"dataType": 0
				 
// 				 }
// 				 ]
//             },
//             {
//                 "nodeLabel": "机房2",
//                 "nodeId": "2",
//                 "nodeName": "机房2",
// 				"nodeType": "MachineRoom",
//                 "labelPath": "数据中心1/机房2",
//                 "dataType": 0,
// 				 "children": [
// 				 {
				 
// 				 }
// 				 ]
//             }
//         ]
//     },
//     {
//         "nodeLabel": "数据中心2",
//         "nodeId": "2",
//         "nodeName": "数据中心2",
// 		"nodeType": "DataCenter",
//         "labelPath": "数据中心2",
//         "dataType": 0,
//         "children": [
//             {
//                 "nodeLabel": "机房3",
//                 "nodeId": "3",
//                 "nodeName": "机房3",				
// 				"nodeType": "MachineRoom",
//                 "labelPath": "数据中心2/机房3",
//                 "dataType": 0
//             }
//         ]
//     }
// ]



function formatDataCenter(data) {
    for (var i in data) {
        data[i].label=data[i].nodeLabel
        data[i].value = data[i].nodeId
        if (!data[i].children || data[i].children.length===0) {
            continue;
        } else {
            formatDataCenter(data[i].children);
        }
    }
    return data
}
export default formatDataCenter
