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
    searchValue?
}
let datas = []

let dataList = [];

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

const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];

        dataList.push({
            'nodeLabel': node.nodeLabel,
            'nodeId': node.nodeId,
            'idPath': node.idPath,
            'dataType': node.dataType,
            'labelPath': node.labelPath
        });

        if (node.children) {
            generateList(node.children);
        }
    }
};

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
            result: {
                data: [],
                searchValue: '',
                selectedKeys: []
            }
        };
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    componentWillMount() {
        datas = fmtDataFunc(_.merge([{}], this.props.data))
        generateList(datas);
        if (this.props.searchValue) {
            this.onChange(null, this.props.searchValue)
        }
    }
    componentDidMount() {
        if (this.props.searchValue) {
            this.onSearch()
        }
    }

    onChange = (e, propsValue = '') => {
        const value = propsValue ? propsValue : e.target.value;
        const selectedKeys = [];

        if (value) {
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
            })

            const result = {
                selectedKeys,
                data,
                searchValue: value,
            }
            this.setState({
                result: result
            })
        } else {
            this.setState({
                expandedKeys: this.props.dExpandedKeys ? this.props.dExpandedKeys : [],
                searchValue: '',
                autoExpandParent: true,
                result: {
                    data: [],
                    searchValue: '',
                    selectedKeys: []
                }
            });
            // if (this.props.onSearch) {
            //     this.props.onSearch(null)
            // }
        }
    }

    onSelect(selectedKeys, e: { selected: boolean, selectedNodes, node, event }) {
        if (this.props.onSelect) {
            this.props.onSelect(selectedKeys[0])
        }
    }

    onSearch() {
        if (this.props.onSearch) {
            if (this.state.result) {
                let result = this.state.result
                this.props.onSearch(result)
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
                <Search className="tree-search" placeholder={this.props.searchValue ? this.props.searchValue : 'Search'} onChange={this.onChange} onSearch={this.onSearch.bind(this)} />
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