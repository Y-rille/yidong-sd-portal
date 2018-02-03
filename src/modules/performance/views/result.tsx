import * as React from 'react';
import { Collapse, List } from 'antd';
import * as _ from 'lodash';

export interface ResultProps {
  match?
  history?
  datas?: object
}

export default class Result extends React.Component<ResultProps, any> {
  componentWillMount() {
  }
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
        return <a key={index} style={{ marginRight: '20px' }}>{item.nodeLabel}</ a>
    });
};

  render() {
    // console.log(this.props.datas, '=========datas')
    if (this.props.datas) {
      let datas: any = this.props.datas
      return (
        <div>
            <div>
                <p>搜索关键字：{datas.searchValue}</p >
                <p>共搜索到 {datas.selectedKeys.length} 条数据</p >
            </div>
            <List
                itemLayout="horizontal"
                dataSource={this.fmtData(datas.selectedKeys, datas.data)}
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
      );
    } else {
      return <div></div>
    }
  }
}
