import * as React from 'react';
import * as _ from 'lodash';
import { Collapse, List } from 'antd';

import styles from './index.less';

const Panel = Collapse.Panel;

export interface SearchResultPanelProps {
    result?
}

export default class SearchResultPanel extends React.Component<SearchResultPanelProps, any> {
    fmtData(selectedIds, data) {
        let list = [];
        let groups = {};

        selectedIds.map(id => {
            const temp = data.find(item => (item.nodeId === id));
            const tempPath = temp.idPath.split(',');

            tempPath.pop();

            if (!groups[tempPath]) {
                groups[tempPath] = [];
            }

            groups[tempPath].push(temp)
        });

        _.forEach(groups, function (value, key) {
            list.push({
                title: key.split(','),
                description: groups[key]
            })
        });

        list = list.map(item => {
            item.title = this.getTitle(item.title, data);

            return item;
        });

        return list;
    };

    getTitle(list, data) {
        let title = [];

        list.map(id => {
            const temp = data.find(item => (item.nodeId === id));
            title.push(temp.nodeLabel)
        });

        return title.join(' / ')
    };

    ListDescription({ list }) {
        return list.map((item, index) => {
            return <a key={index} style={{ marginRight: '20px' }}>{item.nodeLabel}</a>
        });
    };
    render() {
        let { result } = this.props
        if (!result) {
            return null;
        }
        return (
            <div className={styles.warpper}>
                <div className={styles.header}>
                    <p>搜索关键字：{result.searchValue}</p>
                    <p>共搜索到 {result.selectedKeys.length} 条数据</p>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.fmtData(result.selectedKeys, result.data)}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={this.ListDescription.bind(item.description)}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}