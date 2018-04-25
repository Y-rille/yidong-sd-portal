import * as React from 'react';
import * as _ from 'lodash';
import qs from 'querystringify'
import { Icon, Breadcrumb, Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;
import styles from '../style/index.less'
import UUID from 'uuid'
import shallowDiffers from '../utils/shallowDiffers'
import matchMoTypeKeyAndRoute from '../utils/matchMoTypeKeyAndRoute'
import { Topology } from '../../../components/Topology/topology.js'
import '../../../components/Topology/topology.css'

class Home extends React.Component<any, any> {
    topoTimer: any
    topoStateTimer: any
    constructor(props) {
        super(props);
        let { pimId } = this.props.match.params
        this.state = {
            pimId: pimId,
            topo: null
        }
    }
    getTopo(cb?) {
        let { pimId } = this.state
        let dsname = 'imdsTopoPIM'
        this.props.actions.getTopo(dsname, { moInstId: pimId }, (data, err) => {
            if (data) {
                if (cb) { cb() }
            }
        })
    }
    getTopoState() {
        let { pimId } = this.state
        let dsname = 'imdsTopoPIM'
        this.props.actions.getTopoState(dsname, { moInstId: pimId }, (data, err) => {
            if (data) {
                let nextTopoNodes = data && data.nodes ? _.keyBy(data.nodes, 'id') : {}
                let { topo } = this.state
                let prevTopoNodes = topo && topo.nodes ? _.keyBy(topo.nodes, 'id') : {}
                if (shallowDiffers(nextTopoNodes, prevTopoNodes) || !topo) {
                    this.setState({
                        topo: data
                    })
                }
            }
        })
    }
    nodeDblClick(data) {
        if (data && data.model && data.model.attributes && data.model.attributes.bizFields && data.model.attributes.bizFields.ifRedirect) {
            let { moMgrType, moMgrId, moTypeKey, moInstId, hostType } = data.model.attributes.bizFields
            let hostTypePath = hostType ? `/${hostType}/` : ''
            this.props.history.push(`/resource/${moMgrType}/${moMgrId}/${matchMoTypeKeyAndRoute(moTypeKey.toLocaleLowerCase())}/${hostTypePath}info/${moInstId}?active=topo`)
        }
    }
    refreshHandler() {
        this.getTopo()
    }
    componentWillMount() {
        this.getTopo(this.getTopoState())
    }
    componentDidMount() {
        let timer = setInterval(() => {
            this.getTopo()
        }, 300000)
        let topoStateTimer = setInterval(() => {
            this.getTopoState()
        }, 5000)
    }
    componentWillUnmount() {
        clearInterval(this.topoTimer)
        clearInterval(this.topoStateTimer)
    }
    topoBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="reload"
                    onClick={this.refreshHandler.bind(this)}
                >刷新</Button>
            </div>
        )
    }
    renderTopo() {
        let { topo } = this.state
        if (topo) {
            let { id } = this.props.match.params
            let w = document.querySelector('.Pane2').clientWidth - 96
            let h = window.innerHeight - 240
            let flag = topo.nodes && topo.nodes.length > 20 ? true : false
            let { name } = qs.parse(this.props.location.search)
            return (
                <Tabs
                    size="small"
                    tabBarExtraContent={this.topoBtns()}
                    animated={false}>
                    <TabPane tab="">
                        <div style={{ marginTop: '10px' }}>
                            <div className={styles.legend}>
                                <div><span></span>严重</div>
                                <div><span></span>重要</div>
                                <div><span></span>次重</div>
                                <div><span></span>提示</div>
                            </div>
                            <Topology
                                key={UUID.v1()}
                                data={topo}
                                width={w}
                                height={h}
                                center={flag}
                                zoomToFit={flag}
                                cid={`HOST_${id}`}
                                onDblclick={this.nodeDblClick.bind(this)} />
                        </div>
                    </TabPane>
                </Tabs>
            )
        }
    }
    render() {
        let { name } = qs.parse(this.props.location.search)
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>网络拓扑</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>物理资源</Breadcrumb.Item>
                        <Breadcrumb.Item>{name}</Breadcrumb.Item>
                        <Breadcrumb.Item>网络拓扑</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '2px 20px 20px' }}>
                    <div className={styles.topoTab}>
                        {this.renderTopo()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;