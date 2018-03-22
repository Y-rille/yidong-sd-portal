import * as React from 'react';
import * as _ from 'lodash';
import { Collapse, Button, Form, Row, Col, Input, Spin } from 'antd';
import DynamicPropertiesCollapseForm from '../DynamicPropertiesCollapseForm'

const Panel = Collapse.Panel;
const FormItem = Form.Item;

interface DynamicPropertiesCollapseProps {
    attributes: Array<object>;
    data: object;
    editData?
    loading?
}
interface DynamicPropertiesPanelState {
}

const conversion = (attributes, data) => {
    let temp = {
        groups: [],
        list: []
    };

    data.columns.map((item, index) => {
        const key = data.headers[index];
        const values = data.values[0][index];
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

export default class DynamicPropertiesCollapse extends React.PureComponent<DynamicPropertiesCollapseProps> {
    constructor(props) {
        super(props);
        this.state = {
            data: conversion(this.props.attributes, this.props.data)
        };
    }
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
                data: conversion(this.props.attributes, nextprops.data)
            })
        }
    }
    render() {
        // console.log(this.props.data, '=======this.props.data')
        if (this.state.data) {
            return (
                <div className="dynamicPropertiesPanel" style={{ 'padding': '20px 0' }}>
                    <Collapse defaultActiveKey={['0', '1', '2']}>
                        {
                            this.state.data.groups.map((group, index) => {
                                let sindex = index.toString()
                                const formData = this.state.data.list.filter(item => (item.attributeGroup === group && item.visible))
                                return <Panel
                                    header={group}
                                    key={sindex}
                                    style={{ 'margin-bottom': '20px' }}
                                >
                                    <DynamicPropertiesCollapseForm data={formData} editData={this.handleEditData.bind(this)}/>
                                </Panel>
                            })
                        }
                    </Collapse>

                </div>
            )
        }
    }
}
