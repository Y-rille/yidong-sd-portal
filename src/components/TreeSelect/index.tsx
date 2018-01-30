import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

export interface TreeSelectProps {
    // inquire?
    data?
}
const treeData = [{
    title: '0-0',
    key: '0-0',
    children: [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0' },
        { title: '0-0-0-1', key: '0-0-0-1' },
        { title: '0-0-0-2', key: '0-0-0-2' },
      ],
    }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0' },
        { title: '0-0-1-1', key: '0-0-1-1' },
        { title: '0-0-1-2', key: '0-0-1-2' },
      ],
    }, {
      title: '0-0-2',
      key: '0-0-2',
    }],
  }, {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  }, {
    title: '0-2',
    key: '0-2',
  }]

const datas = [
    {
        'nodeLabel': '物理资源树',
        'nodeId': '1001',
        'nodeName': 'PhysicalResource',
        'lablePath': '物理资源树',
        'dataType': 0,
        'children': [
            {
                'nodeLabel': '萧山产业园',
                'nodeId': '2001',
                'nodeName': 'DataCenter',
                'lablePath': '物理资源树/萧山产业园',
                'dataType': 1,
                'queryUri': '/datashare-svr/api/moinst/1/querydata',
                'queryMethod': 'POST',
                'children': [
                    {
                        'nodeLabel': '机柜G08',
                        'nodeId': '3001',
                        'nodeName': 'CABINET',
                        'lablePath': '物理资源树/萧山产业园/机柜G08',
                        'dataType': 1,
                        'queryField': 'CABINET',
                        'queryValue': '机柜G08',
                        'queryUri': '/datashare-svr/api/moinst/2/querydata',
                        'queryMethod': 'POST',
                        'children': [
                            {
                                'nodeLabel': 'G08',
                                'nodeId': '4001',
                                'nodeName': 'G08-hpeDL380-COMP09',
                                'lablePath': '物理资源树/萧山产业园/机柜G08/G08-hpeDL380-COMP09',
                                'dataType': 2,
                                'queryUri': '/datashare-svr/api/moinst/3/4',
                                'queryMethod': 'GET'
                            },
                            {
                                'nodeLabel': 'G08-hpe',
                                'nodeId': '4002',
                                'nodeName': 'G08-hpeDL380-COMP10',
                                'lablePath': '物理资源树/萧山产业园/机柜G08/G08-hpeDL380-COMP10',
                                'dataType': 2,
                                'queryUri': '/datashare-svr/api/moinst/3/5',
                                'queryMethod': 'GET'
                            }							
                        ]
                    }
                ]
            },
            {
              'nodeLabel': '萧山产业园',
              'nodeId': '2002',
              'nodeName': 'DataCenter',
              'lablePath': '物理资源树/萧山产业园',
              'dataType': 1,
              'queryUri': '/datashare-svr/api/moinst/1/querydata',
              'queryMethod': 'POST',
              'children': [
                  {
                      'nodeLabel': '机柜G08',
                      'nodeId': '3002',
                      'nodeName': 'CABINET',
                      'lablePath': '物理资源树/萧山产业园/机柜G08',
                      'dataType': 1,
                      'queryField': 'CABINET',
                      'queryValue': '机柜G08',
                      'queryUri': '/datashare-svr/api/moinst/2/querydata',
                      'queryMethod': 'POST',
                      'children': [
                          {
                              'nodeLabel': 'G08',
                              'nodeId': '4003',
                              'nodeName': 'G08-hpeDL380-COMP09',
                              'lablePath': '物理资源树/萧山产业园/机柜G08/G08-hpeDL380-COMP09',
                              'dataType': 2,
                              'queryUri': '/datashare-svr/api/moinst/3/4',
                              'queryMethod': 'GET'
                          },
                          {
                              'nodeLabel': 'G08-hpe',
                              'nodeId': '4004',
                              'nodeName': 'G08-hpeDL380-COMP10',
                              'lablePath': '物理资源树/萧山产业园/机柜G08/G08-hpeDL380-COMP10',
                              'dataType': 2,
                              'queryUri': '/datashare-svr/api/moinst/3/5',
                              'queryMethod': 'GET'
                          }							
                      ]
                  }
              ]
            }		
        ]
    },
    {
      'nodeLabel': '萧山产业园',
      'nodeId': '1002',
      'nodeName': 'DataCenter',
      'lablePath': '物理资源树/萧山产业园',
      'dataType': 1,
      'queryUri': '/datashare-svr/api/moinst/1/querydata',
      'queryMethod': 'POST',
      'children': [
          {
              'nodeLabel': '机柜G08',
              'nodeId': '2011',
              'nodeName': 'CABINET',
              'lablePath': '物理资源树/萧山产业园/机柜G08',
              'dataType': 1,
              'queryField': 'CABINET',
              'queryValue': '机柜G08',
              'queryUri': '/datashare-svr/api/moinst/2/querydata',
              'queryMethod': 'POST',
              'children': [
                  {
                      'nodeLabel': 'G08',
                      'nodeId': '3011',
                      'nodeName': 'G08-hpeDL380-COMP09',
                      'lablePath': '物理资源树/萧山产业园/机柜G08/G08-hpeDL380-COMP09',
                      'dataType': 2,
                      'queryUri': '/datashare-svr/api/moinst/3/4',
                      'queryMethod': 'GET'
                  },
                  {
                      'nodeLabel': 'G08-hpe',
                      'nodeId': '3012',
                      'nodeName': 'G08-hpeDL380-COMP10',
                      'lablePath': '物理资源树/萧山产业园/机柜G08/G08-hpeDL380-COMP10',
                      'dataType': 2,
                      'queryUri': '/datashare-svr/api/moinst/3/5',
                      'queryMethod': 'GET'
                  }							
              ]
          }
      ]
  }	
]

export default class TreeSelect extends React.PureComponent<TreeSelectProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleClick() {
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.nodeLabel} key={item.nodeId} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode title={item.nodeLabel} key={item.nodeId} dataRef={item} />;
        });
      }
      render() {
        return (
          <Tree autoExpandParent>
            {this.renderTreeNodes(datas)}
          </Tree>
        );
      }
}