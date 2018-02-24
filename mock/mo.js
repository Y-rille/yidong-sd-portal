/**
 * 资源实例活动告警查询
 */
let activealarms = {
  path: '/datashare-svr/api/mo/:moTypeId/activealarms',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "notificationId": "-806287021",
          "objectName": "VIM hpe host D04-hpeDL380-COMP04",
          "alarmType": "equipmentAlarm",
          "nativeAlarmType": "4",
          "probableCause": "'Data' Interface failed.",
          "nativeProbableCause": "300.002",
          "perceivedSeverity": "1",
          "objectType": "VIM hpe host D04-hpeDL380-COMP04",
          "alarmID": "300.002",
          "specificProblem": "300.002",
          "alarmSeverity": "1",
          "alarmSeverityText": "严重告警",
          "alarmFrequency": "11477",
          "raiseTime": "2017-10-13 06:51:50",
          "lastRaiseTime": "2017-10-17 07:06:13",
          "alarmSource": "VIM",
          "alarmSourceId": "188.103.19.2",
          "additionInfo": "alarmTitle===业务接口错误或者业务接口降级\nalarmStatus===活动告警\nalarmType===300.002\norigSeverity===Critical\neventTime===2017-10-13T06:51:50Z\nalarmId===35c19e46164112c0f27c4c72c0356d19\nmsgSeq===127373\nspecificProblemID===300.002\nspecificProblem==='Data' Interface failed.\nneUID===serialid is empty\nneName===D04-hpeDL380-COMP04\nneType===host\nobjectUID===serialid is empty\nobjectName===D04-hpeDL380-COMP04\nobjectType===host\nlocationInfo===system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=D04-hpeDL380-COMP04.interface=a13dd4c0-0362-4a11-a8e4-0157b3b3407e\naddInfo===trapOid:1.3.6.1.4.1.731.1.1.1.1.0.1;wrsAlarmActiveIndex:;wrsAlarmActiveUuid:;wrsAlarmActiveAlarmId:300.002;wrsAlarmActiveEntityInstanceId:system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=D04-hpeDL380-COMP04.interface=a13dd4c0-0362-4a11-a8e4-0157b3b3407e;wrsAlarmActiveDateAndTime:07-e1-0a-0d-06-33-32-00-2b-00-00;wrsAlarmActiveAlarmSeverity:4;wrsAlarmActiveReasonText:'Data' Interface failed.;wrsAlarmActiveEventType:4;wrsAlarmActiveProbableCause:29;wrsAlarmActiveProposedRepairAction:Check cabling and far-end port configuration and status on adjacent equipment.;wrsAlarmActiveServiceAffecting:1;wrsAlarmActiveSuppressionAllowed:0;\nPVFlag===vim\n",
          "vendorName": "HPE",
          "receiveTime": "2017-10-13 14:52:08",
          "alarmUuid": "0000d1f6e3a7a29a2bee790d417ae939",
          "moDetailInfo": "system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=D04-hpeDL380-COMP04.interface=a13dd4c0-0362-4a11-a8e4-0157b3b3407e",
          "raiseTimestamp": 1507848710000,
          "alarmTitle": "业务接口错误或者业务接口降级",
          "alarmLevel": "一级告警"
        }, {
          "notificationId": "-1213667985",
          "objectName": "VIM hpe vm VIM-NORTH-02",
          "alarmType": "equipmentAlarm",
          "nativeAlarmType": "4",
          "probableCause": "Instance VIM-NORTH-02 owned by NFVO+ has failed on host D19-hwRH2288-COMP10",
          "nativeProbableCause": "700.001",
          "perceivedSeverity": "1",
          "objectType": "vm",
          "alarmID": "700.001",
          "specificProblem": "700.001",
          "alarmSeverity": "1",
          "alarmSeverityText": "严重告警",
          "alarmFrequency": "0",
          "eventType": "1",
          "raiseTime": "2017-10-31 09:12:26",
          "lastRaiseTime": "2017-10-31 09:12:26",
          "alarmSource": "VIM",
          "alarmSourceId": "188.103.19.2",
          "additionInfo": "alarmTitle===虚拟机创建失败\nalarmStatus===活动告警\nalarmType===700.001\norigSeverity===Critical\neventTime===2017-10-31T01:12:26Z\nalarmId===17dd50224db17214539c9a8838e80929\nmsgSeq===303373\nspecificProblemID===700.001\nspecificProblem===Instance VIM-NORTH-02 owned by NFVO+ has failed on host D19-hwRH2288-COMP10\nneUID===adfb4cde-a194-430a-b437-6ac1e448dee2\nneName===VIM-NORTH-02\nneType===vm\nobjectUID===adfb4cde-a194-430a-b437-6ac1e448dee2\nobjectName===VIM-NORTH-02\nobjectType===vm\nlocationInfo===system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.tenant=bb794632-afd3-449d-b5f2-583f16de55eb.instance=adfb4cde-a194-430a-b437-6ac1e448dee2\naddInfo===trapOid:1.3.6.1.4.1.731.1.1.1.1.0.1;wrsAlarmActiveIndex:;wrsAlarmActiveUuid:;wrsAlarmActiveAlarmId:700.001;wrsAlarmActiveEntityInstanceId:system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.tenant=bb794632-afd3-449d-b5f2-583f16de55eb.instance=adfb4cde-a194-430a-b437-6ac1e448dee2;wrsAlarmActiveDateAndTime:07-e1-0a-1f-01-0c-1a-00-2b-00-00;wrsAlarmActiveAlarmSeverity:4;wrsAlarmActiveReasonText:Instance VIM-NORTH-02 owned by NFVO+ has failed on host D19-hwRH2288-COMP10;wrsAlarmActiveEventType:3;wrsAlarmActiveProbableCause:45;wrsAlarmActiveProposedRepairAction:The system will attempt recovery- no repair action required;wrsAlarmActiveServiceAffecting:1;wrsAlarmActiveSuppressionAllowed:1;\nPVFlag===vim\n",
          "vendorName": "HPE",
          "receiveTime": "2017-10-31 11:45:56",
          "alarmUuid": "015256125180362b5d3f9be76b65b8d4",
          "moDetailInfo": "system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.tenant=bb794632-afd3-449d-b5f2-583f16de55eb.instance=adfb4cde-a194-430a-b437-6ac1e448dee2",
          "raiseTimestamp": 1509412346000,
          "alarmTitle": "虚拟机创建失败",
          "alarmLevel": "二级告警",
          "alarmVersion": "4",
          "alarmExplainAssist": "无",
          "reportGroup": "否",
          "businessEffect": "可能业务受影响",
          "deviceEffect": "可能设备局部故障",
          "logicalSubtype": "计算",
          "logicalType": "虚拟化",
          "alarmCategory": "虚拟机告警",
          "alarmExplain": "虚拟机创建失败，平台会自动恢复，无需干预",
          "deviceType": "虚拟化",
          "standObjectType": "虚拟化"
        }, {
          "notificationId": "1354450509",
          "objectName": "VIM hpe host controller-0",
          "alarmType": "equipmentAlarm",
          "nativeAlarmType": "4",
          "probableCause": "controller-0 'ntpd' process has failed. Manual recovery is required.",
          "nativeProbableCause": "200.006",
          "perceivedSeverity": "3",
          "objectType": "host",
          "alarmID": "200.006",
          "specificProblem": "200.006",
          "alarmSeverity": "3",
          "alarmSeverityText": "次要告警",
          "alarmFrequency": "521",
          "raiseTime": "2017-10-11 22:01:30",
          "lastRaiseTime": "2017-10-05 12:28:09",
          "alarmSource": "VIM",
          "alarmSourceId": "188.103.19.2",
          "additionInfo": "alarmTitle===一个或多个\n程序异常，且不能恢复\nalarmStatus===活动告警\nalarmType===200.006\norigSeverity===Minor\neventTime===2017-10-11T14:01:30Z\nalarmId===173b38a3fcae32db0c5aa293e9e65b8\nmsgSeq===110487\nspecificProblemID===200.006\nspecificProblem===controller-0 'ntpd' process has failed. Manual recovery is required.\nneUID===serialid is empty\nneName===controller-0\nneType===host\nobjectUID===serialid is empty\nobjectName===controller-0\nobjectType===host\nlocationInfo===system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=controller-0.process=ntpd\naddInfo===trapOid:1.3.6.1.4.1.731.1.1.1.1.0.3;wrsAlarmActiveIndex:;wrsAlarmActiveUuid:;wrsAlarmActiveAlarmId:200.006;wrsAlarmActiveEntityInstanceId:system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=controller-0.process=ntpd;wrsAlarmActiveDateAndTime:07-e1-0a-0b-0e-01-1e-00-2b-00-00;wrsAlarmActiveAlarmSeverity:2;wrsAlarmActiveReasonText:controller-0 'ntpd' process has failed. Manual recovery is required.;wrsAlarmActiveEventType:7;wrsAlarmActiveProbableCause:0;wrsAlarmActiveProposedRepairAction:If problem consistently occurs after Host is locked and unlocked then contact next level of support for root cause analysis and recovery.;wrsAlarmActiveServiceAffecting:1;wrsAlarmActiveSuppressionAllowed:1;\nPVFlag===vim\n",
          "vendorName": "HPE",
          "receiveTime": "2017-10-24 15:48:51",
          "alarmUuid": "016d5ddd4f95336e9e70b370b07667da",
          "moDetailInfo": "system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=controller-0.process=ntpd",
          "raiseTimestamp": 1507730490000,
          "alarmTitle": "一个或多个程序异常",
          "alarmLevel": "二级告警",
          "alarmVersion": "4",
          "alarmExplainAssist": "无",
          "reportGroup": "否",
          "businessEffect": "可能业务受影响",
          "deviceEffect": "可能设备局部故障",
          "logicalSubtype": "网络",
          "logicalType": "虚拟化",
          "alarmCategory": "运维告警",
          "alarmExplain": "一个或多个程序异常,请联系技术支持人员，并lock该物理机",
          "deviceType": "虚拟化",
          "standObjectType": "虚拟化"
        }, {
          "notificationId": "1666381456",
          "objectName": "VIM hpe host controller-1",
          "alarmType": "equipmentAlarm",
          "nativeAlarmType": "4",
          "probableCause": "Filesystem exceeded; threshold: 70%, actual: 70.00%.",
          "nativeProbableCause": "100.104",
          "perceivedSeverity": "3",
          "objectType": "HOST",
          "alarmID": "100.104",
          "specificProblem": "100.104",
          "alarmSeverity": "3",
          "alarmSeverityText": "次要告警",
          "alarmFrequency": "0",
          "eventType": "1",
          "raiseTime": "2017-11-12 15:40:24",
          "lastRaiseTime": "2017-11-12 15:40:24",
          "alarmSource": "VIM",
          "alarmSourceId": "188.103.19.2",
          "additionInfo": "alarmTitle===文件系统占用率异常\nalarmStatus===活动告警\nalarmType===100.104\norigSeverity===Minor\neventTime===2017-11-12T07:40:24Z\nalarmId===89bec01a57bf929ee51de99da9cad5c3\nmsgSeq===960580\nspecificProblemID===100.104\nspecificProblem===Filesystem exceeded; threshold: 70%, actual: 70.00%.\nneUID===serialid is empty\nneName===controller-1\nneType===host\nobjectUID===serialid is empty\nobjectName===controller-1\nobjectType===host\nlocationInfo===system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=controller-1.filesystem=/var/log\naddInfo===trapOid:1.3.6.1.4.1.731.1.1.1.1.0.3;wrsAlarmActiveIndex:;wrsAlarmActiveUuid:;wrsAlarmActiveAlarmId:100.104;wrsAlarmActiveEntityInstanceId:system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=controller-1.filesystem=/var/log;wrsAlarmActiveDateAndTime:07-e1-0b-0c-07-28-18-00-2b-00-00;wrsAlarmActiveAlarmSeverity:2;wrsAlarmActiveReasonText:Filesystem exceeded- threshold- 70%, actual- 70.00%.;wrsAlarmActiveEventType:7;wrsAlarmActiveProbableCause:50;wrsAlarmActiveProposedRepairAction:Monitor and if condition persists, contact next level of support.;wrsAlarmActiveServiceAffecting:0;wrsAlarmActiveSuppressionAllowed:1;\nPVFlag===vim\n",
          "vendorName": "HPE",
          "receiveTime": "2017-11-12 15:39:48",
          "alarmUuid": "081c9059bd830b90909711afa77672aa",
          "moDetailInfo": "system=fc348d85-39ad-43ed-bfef-5a30a7325a0a.host=controller-1.filesystem=/var/log",
          "raiseTimestamp": 1510472424000,
          "alarmTitle": "文件系统占用率异常",
          "special": "NFVI",
          "alarmLevel": "三级告警",
          "alarmVersion": "4",
          "alarmExplainAssist": "无",
          "reportGroup": "否",
          "businessEffect": "无影响",
          "deviceEffect": "无影响",
          "logicalSubtype": "计算",
          "logicalType": "虚拟化",
          "alarmCategory": "资源告警",
          "alarmExplain": "文件系统占用率异常,观察是否会重复出现，如果出现，请 尝试增加卷组大小",
          "deviceType": "虚拟化",
          "standObjectType": "虚拟化"
        }
      ]
    }
  }
}

/**
 * 资源对象类型查询
 */
let motypes = {
  path: '/datashare-svr/api/mo/motypes',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "moTypeId": 1,
          "moTypeName": "主机",
          "moCategory": "DEFAULT",
          "isdynamicMo": 0,
          "moTypeEnName": "HOST",
          "moDesc": "",
          "version": "1.0",
          "state": 1
        },
        {
          "moTypeId": 2,
          "moTypeName": "虚机",
          "moCategory": "DEFAULT",
          "isdynamicMo": 0,
          "moTypeEnName": "VM",
          "moDesc": "",
          "version": "1.0",
          "state": 1
        }
      ]
    }
  }
}

/**
 * 对象属性查询
 */
let attributes = {
  path: '/datashare-svr/api/mo/:moTypeId/attributes',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "moAttributeId": 1,
          "moTypeId": 1,
          "attributeType": 0,
          "attributeName": "ID",
          "isobjectid": 1,
          "physicalTablefield": "ID",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 0,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 2,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "NAME",
          "isobjectid": 0,
          "physicalTablefield": "NAME",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 1,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 3,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "TIME",
          "isobjectid": 0,
          "physicalTablefield": "TIME",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 0,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 4,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "EXPIRY_TIME",
          "isobjectid": 0,
          "physicalTablefield": "EXPIRY_TIME",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 0,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 56,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "SerialNumber",
          "isobjectid": 0,
          "physicalTablefield": "SerialNumber",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 1,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 57,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "Hostname",
          "isobjectid": 0,
          "physicalTablefield": "Hostname",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 1,
          "attributeGroup": "基本属性"
        }
      ]
    }
  }
}


/**
 * 对象关系查询
 */
let relations = {
  path: '/datashare-svr/api/mo/:moTypeId/relations',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "relationId": 1,
          "relationName": "磁阵与存储池",
          "relationType": 2,
          "relationDesc": "",
          "leftMoType": 3,
          "rightMoType": 4,
          "version": "1.0",
          "state": 0
        },
        {
          "relationId": 2,
          "relationName": "磁阵与磁盘",
          "relationType": 2,
          "relationDesc": "",
          "leftMoType": 3,
          "rightMoType": 5,
          "version": "1.0",
          "state": 0
        },
        {
          "relationId": 3,
          "relationName": "磁阵与控制器",
          "relationType": 2,
          "relationDesc": "",
          "leftMoType": 3,
          "rightMoType": 6,
          "version": "1.0",
          "state": 0
        }
      ]
    }
  }
}

/**
 * 对象实例列表查询
 */
let querydata = {
  path: '/datashare-svr/api/moinst/:moTypeId/querydata',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": {
        "headers": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "SerialNumber",
          "Hostname"
        ],
        "columns": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "SerialNumber",
          "Hostname"
        ],
        "values": [
          [
            401,
            "D04-hpeDL380-COMP09",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W3CF",
            "6CU725W3CF",
            "D04-hpeDL380-COMP09"
          ],
          [
            400,
            "D04-hpeDL380-COMP08",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W39D",
            "6CU725W39D",
            "D04-hpeDL380-COMP08"
          ],
          [
            399,
            "D03-hpeDL380-COMP06",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W39J",
            "6CU725W39J",
            "D03-hpeDL380-COMP06"
          ],
          [
            398,
            "D04-hpeDL380-COMP04",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W3JN",
            "6CU725W3JN",
            "D04-hpeDL380-COMP04"
          ],
          [
            397,
            "D03-hpeDL380-COMP03",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W3KW",
            "6CU725W3KW",
            "D03-hpeDL380-COMP03"
          ]
        ],
        "nbVals": 5,
        "offset": 0,
        "totalCount": 100
      }
    }
  }
}

/**
 * 对象实例详情查询
 */
let moinst = {
  path: '/datashare-svr/api/moinst/:moTypeId/:moInstId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": {
        "headers": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "接口版本",
          "资源池系统标识",
          "ChassisType",
          "磁阵资产编号",
          "磁阵制造商",
          "磁阵型号",
          "磁阵序列号",
          "磁阵来源",
          "磁阵投入生产运行时间",
          "磁阵License信息",
          "磁阵软件版本",
          "磁阵运行状态",
          "磁阵资产状态"
        ],
        "columns": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "Version",
          "VimId",
          "ChassisType",
          "AssetTag",
          "Manufacturer",
          "Model",
          "SerialNumber",
          "PropertySource",
          "PutIntoProductionTime",
          "License",
          "SoftwareVersion",
          "OperationingStatus",
          "PropertyState"
        ],
        "values": [
          [
            7,
            "ZJHZ-NFV3-C-SQ5-3F-C03-hwDA5600-STOR01",
            "",
            "",
            "1081",
            "1081",
            "2.0",
            "1ea72c1b-fc85-4a99-adf8-7488c46d2a07",
            "DiskArray",
            "assetTg",
            "huawei",
            "5600_V3",
            "210235980510H6000012",
            "Property",
            "99days",
            "",
            "3.20.06.102",
            "OK",
            "Used"
          ],
        ]
      }
    }
  }
}

/**
 * 关联对象实例查询
 */
let morel = {
  path: '/datashare-svr/api/morel/:moInstId/:relaitonId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": {
        "headers": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "接口版本",
          "资源池系统标识",
          "ChassisType",
          "磁阵资产编号",
          "磁阵制造商",
          "磁阵型号",
          "磁阵序列号",
          "磁阵来源",
          "磁阵投入生产运行时间",
          "磁阵License信息",
          "磁阵软件版本",
          "磁阵运行状态",
          "磁阵资产状态"
        ],
        "columns": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "Version",
          "VimId",
          "ChassisType",
          "AssetTag",
          "Manufacturer",
          "Model",
          "SerialNumber",
          "PropertySource",
          "PutIntoProductionTime",
          "License",
          "SoftwareVersion",
          "OperationingStatus",
          "PropertyState"
        ],
        "values": [
          [
            7,
            "ZJHZ-NFV3-C-SQ5-3F-C03-hwDA5600-STOR01",
            "",
            "",
            "1081",
            "1081",
            "2.0",
            "1ea72c1b-fc85-4a99-adf8-7488c46d2a07",
            "DiskArray",
            "assetTg",
            "huawei",
            "5600_V3",
            "210235980510H6000012",
            "Property",
            "99days",
            "",
            "3.20.06.102",
            "OK",
            "Used"
          ],
          [
            6,
            "ZJHZ-NFV3-B-XSCYY1H2F-D02-hwIPSAN5600-STOR01",
            "",
            "",
            "1043",
            "1043",
            "2.0",
            "1ea72c1b-fc85-4a99-adf8-7488c46d2a07",
            "DiskArray",
            "assetTag",
            "huawei",
            "5600_V3",
            "210235980510H6000014",
            "Property",
            "55days",
            "",
            "3.20.03.201",
            "OK",
            "Used"
          ]
        ],
        "nbVals": 10,
        "offset": 0,
        "totalCount": 2
      }
    }
  }
}

/**
 * 资源树图查询
 */
let querytree = {
  path: '/datashare-svr/api/querytree/:parTreeId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return [
      {
        "nodeLabel": "厂家资源树",
        "nodeId": "1",
        "nodeName": "verdorRes",
        "labelPath": "厂家资源树",
        "dataType": 0,
        "children": [
          {
            "nodeLabel": "主机",
            "nodeId": "2",
            "nodeName": "HOST",
            "labelPath": "厂家资源树/主机",
            "dataType": 1,
            "queryUri": "/datashare-svr/api/moinst/1/querydata",
            "queryMethod": "POST",
            "children": [
              {
                "nodeLabel": "华为",
                "nodeId": "3",
                "nodeName": "VENDOR",
                "labelPath": "厂家资源树/主机/华为",
                "dataType": 1,
                "queryParams": {
                  "VENDOR": "华为"
                },
                "queryUri": "/datashare-svr/api/moinst/1/querydata",
                "queryMethod": "POST",
                "children": [
                  {
                    "nodeLabel": "D04-hpeDL380-COMP09",
                    "nodeId": "4",
                    "nodeName": "D04-hpeDL380-COMP09",
                    "labelPath": "厂家资源树/主机/华为/D04-hpeDL380-COMP09",
                    "dataType": 2,
                    "bizFields": {
                      "moTypeId": "1",
                      "moDimensionId": "T_HOST",
                      "moInstId": "4",
                      "moTypeEnName": "HOST"
                    },
                    "queryUri": "/datashare-svr/api/moinst/1/4",
                    "queryMethod": "GET"
                  },
                  {
                    "nodeLabel": "D04-hpeDL380-COMP19",
                    "nodeId": "5",
                    "nodeName": "D04-hpeDL380-COMP19",
                    "labelPath": "厂家资源树/主机/华为/D04-hpeDL380-COMP19",
                    "dataType": 2,
                    "bizFields": {
                      "moTypeId": "2",
                      "moDimensionId": "T_HOST",
                      "moInstId": "5",
                      "moTypeEnName": "HOST"
                    },
                    "queryUri": "/datashare-svr/api/moinst/1/4",
                    "queryMethod": "GET"
                  }
                ]
              },
              {
                "nodeLabel": "IBM",
                "nodeId": "6",
                "nodeName": "VENDOR",
                "labelPath": "厂家资源树/主机/IBM",
                "dataType": 1,
                "queryParams": {
                  "VENDOR": "IBM"
                },
                "queryUri": "/datashare-svr/api/moinst/1/querydata",
                "queryMethod": "POST",
                "children": [
                  {
                    "nodeLabel": "D04-hpeDL380-COMP20",
                    "nodeId": "7",
                    "nodeName": "D04-hpeDL380-COMP20",
                    "labelPath": "厂家资源树/主机/IBM/D04-hpeDL380-COMP0920",
                    "dataType": 2,
                    "bizFields": {
                      "moTypeId": "3",
                      "moDimensionId": "T_HOST",
                      "moInstId": "7",
                      "moTypeEnName": "HOST"
                    },
                    "queryUri": "/datashare-svr/api/moinst/1/4",
                    "queryMethod": "GET"
                  },
                  {
                    "nodeLabel": "D04-hpeDL380-COMP29",
                    "nodeId": "8",
                    "nodeName": "D04-hpeDL380-COMP29",
                    "labelPath": "厂家资源树/主机/IBM/D04-hpeDL380-COMP29",
                    "dataType": 2,
                    "bizFields": {
                      "moTypeId": "4",
                      "moDimensionId": "T_HOST",
                      "moInstId": "8",
                      "moTypeEnName": "HOST"
                    },
                    "queryUri": "/datashare-svr/api/moinst/1/4",
                    "queryMethod": "GET"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}


module.exports = {
  activealarms,
  motypes,
  attributes,
  relations,
  querydata,
  moinst,
  morel,
  querytree
}