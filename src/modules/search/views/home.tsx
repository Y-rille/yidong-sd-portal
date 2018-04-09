import * as React from 'react';
import * as _ from 'lodash';
import { Layout, Input, Tabs, Spin } from 'antd';
const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
import CompactTable from '../../../components/CompactTable'
import qs from 'querystringify'

export interface HomeProps {
    params?
    goSearch?
    location?
    history?

}
class Home extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props);
        let { query } = qs.parse(this.props.location.search)
        this.state = {
            query: query ? query : ''
        }
    }
    searchHandler = (value) => {
        this.props.history.push(`/search?query=${value}`)
    }
    onTab(key) { }
    componentWillReceiveProps(nextProps) {
        let prev_query = this.state.query
        let { query } = qs.parse(nextProps.location.search)
        if (query !== prev_query) {
            this.setState({
                query: query
            })
        }
    }
    renderTable() {
        return (
            <CompactTable />
        )
    }

    render() {
        let { query } = this.state
        return (
            <Layout>
                <Header style={{ background: '#f2f2f2', padding: '0 200px' }}>
                    <Search
                        key={Math.random()}
                        style={{ width: '800px' }}
                        placeholder="请输入您要搜索的内容"
                        enterButton="搜索"
                        defaultValue={query}
                        onSearch={this.searchHandler.bind(this)}
                    />
                </Header>
                <Content style={{ background: '#fff', padding: '0 200px', minHeight: window.innerHeight - 128 }} >
                    <Tabs size="small" onChange={this.onTab.bind(this)} animated={false} style={{ marginTop: '10px' }} >
                        <TabPane tab="服务器" key="server">
                            <div style={{ margin: '20px 0' }}>
                                {this.renderTable()}
                            </div>
                        </TabPane>
                        <TabPane tab="防火墙" key="firewall">
                            <div style={{ margin: '20px 0' }}>
                                {this.renderTable()}
                            </div>
                        </TabPane>
                        <TabPane tab="交换机" key="switchboard">
                            <div style={{ margin: '20px 0' }}>
                                {this.renderTable()}
                            </div>
                        </TabPane>
                        <TabPane tab="磁阵" key="magnetic">
                            <div style={{ margin: '20px 0' }}>
                                {this.renderTable()}
                            </div>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        );
    }
}

export default Home;