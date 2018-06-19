import * as React from 'react';
import * as _ from 'lodash';
import { Collapse, Button, Form, Row, Col, Input, Spin } from 'antd';
import DynamicPropertiesCollapseForm from '../DynamicPropertiesCollapseForm'

const Panel = Collapse.Panel;
const FormItem = Form.Item;

interface DynamicPropertiesCollapseProps {
    attributes: Array<object>
    data: object
    editData?
    loading?
    outStyle?
    dict?
    dictOptions?
}
interface DynamicPropertiesPanelState {
}

export default class DynamicPropertiesCollapse extends React.PureComponent<DynamicPropertiesCollapseProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: this.conversion(this.props.attributes, this.props.data)
        };
    }
    conversion = (attributes, data) => {
        let temp = {
            groups: [],
            list: []
        };

        data.columns.map((item, index) => {
            const key = data.headers[index];
            const values = data.values.length > 0 ? data.values[0][index] : [];
            let summary = _.find(attributes, attr => (attr.physicalTablefield === item));
            if (summary) {
                summary = _.assign({ key, values }, summary);
                summary.attributeGroup = summary.attributeGroup ? summary.attributeGroup : '其他'
                temp.list.push(summary);

                if (_.indexOf(temp.groups, summary.attributeGroup) < 0) {
                    temp.groups.push(summary.attributeGroup);
                }
            }
        });
        return temp;
    };
    handleEditData(data, cb) {
        if (this.props.editData) {
            this.props.editData(data, cb)
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.data && nextprops.data !== this.props.data) {
            this.setState({
                data: this.conversion(this.props.attributes, nextprops.data)
            })
        }
    }
    render() {
        let { data } = this.state
        let { outStyle, dict, dictOptions } = this.props
        let style = outStyle ? outStyle : { 'paddingTop': '20px' }
        let leng = data.groups.length - 1
        let defaultStyle = { 'marginBottom': '20px' }
        if (data) {
            return (
                <div className="dynamicPropertiesPanel" style={style}>
                    <Collapse defaultActiveKey={['0', '1', '2']}>
                        {
                            data.groups.map((group, index) => {
                                let sindex = index.toString()
                                let itemStyle = (sindex < leng) ? defaultStyle : { 'marginBottom': '0px' }
                                const formData = data.list.filter(item => (item.attributeGroup === group && item.visible))
                                if (formData.length) {
                                    return <Panel
                                        header={group}
                                        key={sindex}
                                        style={itemStyle}
                                    >
                                        <DynamicPropertiesCollapseForm data={formData} dictOptions={dictOptions} editData={this.handleEditData.bind(this)} />
                                    </Panel>
                                }
                            })
                        }
                    </Collapse>
                </div>
            )
        } else {
            return (
                <div style={{ height: '50px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginTop: '5px' }}>No Data</div>
                </div>
            )
        }
    }
}
