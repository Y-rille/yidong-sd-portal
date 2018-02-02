import React from 'react';
import * as _ from 'lodash';
import { Tree, Input } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export interface TreeSelectProps {
    // inquire?
    data?;
    onSearch?
    onSelect?
    dExpandedKeys?
}

let datas = []

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
            expandedKeys: this.props.dExpandedKeys ? this.props.dExpandedKeys : [],
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

    onSelect(selectedKeys, e: { selected: boolean, selectedNodes, node, event }) {
        if (this.props.onSelect) {
            this.props.onSelect(selectedKeys[0])
        }
    }

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            const index = item.nodeLabel.indexOf(searchValue);
            const beforeStr = item.nodeLabel.substr(0, index);
            const afterStr = item.nodeLabel.substr(index + searchValue.length);
            const title = (item.dataType === 2 && index > -1) ? (<span>{beforeStr}<span style={{ color: '#f50' }}>{searchValue}</span>{afterStr}</span>) : <span>{item.nodeLabel}</span>;
            let selectable = (item.dataType === 2)
            if (_.indexOf(this.props.dExpandedKeys, item.nodeId) > -1) {
                selectable = false
            }
            if (item.children) {
                return (
                    <TreeNode key={item.nodeId} title={title} dataRef={item} selectable={selectable}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode title={title} key={item.nodeId} dataRef={item} selectable={selectable} />;
        });
        return (
            <div className="treeSelect">
                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={this.onSelect.bind(this)}
                    selectedKeys={this.props.dExpandedKeys}
                >
                    {loop(this.props.data)}
                </Tree>
            </div>
        );
    }
}