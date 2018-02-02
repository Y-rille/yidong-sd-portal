import React from 'react';
import * as _ from 'lodash';
import { Tree, Input } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export interface TreeSelectProps {
    // inquire?
    data?;
    onSearch?
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

let datas = [
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
                                'nodeLabel': 'F08',
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

const dataList = [];

const fmtDataFunc = (data) => {
    function fmtTreeData(item, ids?) {
        let loopIds = ids || [];

        if (ids) {
            loopIds = loopIds.filter(id => (parseInt(id, 10) < item.nodeId));
        }

        loopIds.push(item.nodeId);
        item.idPath = loopIds.join(',');

        if (item.children) {
            loopTreeData(item.children, loopIds)
        }

        return item;
    }

    function loopTreeData(items, ids?) {
        return items.map(item => fmtTreeData(item, ids))
    }

    return loopTreeData(data)
};

datas = fmtDataFunc(datas);

const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];

        dataList.push({
            'nodeLabel': node.nodeLabel,
            'nodeId': node.nodeId,
            'idPath': node.idPath,
            'dataType': node.dataType
        });

        if (node.children) {
            generateList(node.children);
        }
    }
};

generateList(datas);

const getParentKey = (nodeId, tree) => {
    let parentKey;

    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];

        if (node.children) {
            if (node.children.some(item => item.nodeId === nodeId)) {
                parentKey = node.nodeId;
            } else if (getParentKey(nodeId, node.children)) {
                parentKey = getParentKey(nodeId, node.children);
            }
        }
    }

    return parentKey;
};

export default class TreeSelect extends React.PureComponent<TreeSelectProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        };
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        const selectedKeys = [];

        if (e.target.value) {
            const expandedKeys = dataList.map((item) => {
                if (item.nodeLabel.indexOf(value) > -1) {
                    if (item.dataType === 2) {
                        selectedKeys.push(item.nodeId)
                    }

                    return getParentKey(item.nodeId, datas);
                }

                return null;
            }).filter((item, i, self) => item && self.indexOf(item) === i);

            this.setState({
                expandedKeys,
                searchValue: value,
                autoExpandParent: true,
            });

            let data = [];
            let ids = [];

            selectedKeys.map(key => {
                dataList.map(item => {
                    if (item.nodeId === key) {
                        ids = ids.concat(item.idPath.split(','));
                    }
                });
            });

            ids = ids.filter((item, i, self) => item && self.indexOf(item) === i);

            ids.map(id => {
                data.push(dataList.find(item => (item.nodeId === id)))
            });

            const result = {
                selectedKeys,
                data,
                searchValue: value,
            };
            if (this.props.onSearch) {
                this.props.onSearch(result)
            }
        } else {
            this.setState({
                expandedKeys: [],
                searchValue: '',
                autoExpandParent: true,
            });
            if (this.props.onSearch) {
                this.props.onSearch(null)
            }
        }
    }

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            const index = item.nodeLabel.indexOf(searchValue);
            const beforeStr = item.nodeLabel.substr(0, index);
            const afterStr = item.nodeLabel.substr(index + searchValue.length);
            const title = (item.dataType === 2 && index > -1) ? (<span>{beforeStr}<span style={{ color: '#f50' }}>{searchValue}</span>{afterStr}</span>) : <span>{item.nodeLabel}</span>;

            if (item.children) {
                return (
                    <TreeNode key={item.nodeId} title={title} dataRef={item}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode title={title} key={item.nodeId} dataRef={item} />;
        });

        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                >
                    {loop(this.props.data)}
                </Tree>
            </div>
        );
    }
}