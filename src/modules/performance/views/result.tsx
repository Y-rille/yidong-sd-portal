import * as React from 'react';
import { Collapse, List } from 'antd';
import * as _ from 'lodash';
import { Button } from 'antd';
import styles from '../style/index.less'

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
    })
    list = list.map(item => {
      item.description = _.uniq(item.description)

      return item;
    })

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
    })
}
goDetail(e) {
  // console.log(e.currentTarget.getAttribute('data-key'), '==========>godetail')
  let { match, history } = this.props
  let nodeId = e.currentTarget.getAttribute('data-key')
  history.push(`${match.url}/${nodeId}`)
}

renderList(data) {
    // console.log(data, '===============> fdata')
    let dataSource = this.fmtData(data.selectedKeys, data.data)
    let fmtResData = []
    dataSource.map((item, index) => {
      item.description.map((innerItem) => {
        fmtResData.push({
          title: item.title,
          description: innerItem.nodeLabel,
          nodeId: innerItem.nodeId
        })
      })
    })
    
    return (
      <List
      itemLayout="horizontal"
      dataSource={fmtResData}
      renderItem={item => (
        <List.Item
        actions={[<a onClick={this.goDetail.bind(this)} data-key={item.nodeId} key={item.nodeId}>查看详情</a>]}>
          <List.Item.Meta
            title={item.title}
            description={item.description}            
          />
        </List.Item>
      )}
    />
    )
}

render() {
    if (this.props.datas) {
      let datas: any = this.props.datas
      return (
        <div className={styles.result}>
            <div className={styles.resultTitle}>
                <p>搜索关键字：{datas.searchValue}</p >
                <p>共搜索到 {_.uniq(datas.selectedKeys).length} 条数据</p >
            </div>
            <hr/>
            <div className={styles.resultList}>
              {this.renderList(datas)}
            </div>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}