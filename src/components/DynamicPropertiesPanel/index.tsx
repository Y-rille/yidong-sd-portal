import * as React from 'react';
import * as _ from 'lodash';
import { Collapse, Button, Form, Row, Col, Input } from 'antd';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

const NORMALTEXT = '编 辑';
const EDITORTEXT = '提 交';

interface DynamicPropertiesPanelProps {
    attributes: Array<object>;
    data: object;
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
        let summary = _.find(attributes, attr => (attr.attributeName === item));

        if (summary) {
            summary = _.assign({key, values}, summary);
            temp.list.push(summary);

            if (_.indexOf(temp.groups, summary.attributeGroup) < 0) {
                temp.groups.push(summary.attributeGroup);
            }
        }
    });

    return temp;
};

const PanelButton = ({group, target, list, action}) => {
    const data = list.filter(item => (item.attributeGroup === group && item.visible));
    let isEditor = false;

    if (_.find(data, {ediable: 1})) {
        isEditor = true;
    }

    if (isEditor) {
        return (
            <div style={{textAlign: 'right', paddingTop: '16px', borderTop: '1px solid #eee'}}>
                <Button onClick={(evt) => {
                    evt.stopPropagation();
                    action(evt.target, target)
                }} type="primary">{NORMALTEXT}</Button>
            </div>
        )
    }

    return null;
};

const PanelItem = ({group, list}) => {
    let items = [];
    const data = list.filter(item => (item.attributeGroup === group && item.visible));

    data.map((item, i) => (
        items.push(
            <Col span={12} key={i}>
                <FormItem label={item.key}>
                    {item.ediable ? <Input defaultValue={item.values} readOnly={true} name={item.attributeName}/> : <p>{item.values}</p>}
                </FormItem>
            </Col>
        )
    ));

    return items;
};

export default class DynamicPropertiesPanel extends React.PureComponent<DynamicPropertiesPanelProps, DynamicPropertiesPanelState> {
    constructor(props) {
        super(props);
        this.state = {
            data: conversion(this.props.attributes, this.props.data)
        };
        this.editor = this.editor.bind(this);
    }

    componentDidMount() {
    }

    editor(btn, target) {
        const form = document.getElementById(`form.${target}`);

        if (btn.textContent === NORMALTEXT) {
            btn.textContent = EDITORTEXT;
            for (let i = 0; i < form.length; i++) {
                form[i].removeAttribute('readOnly');
            }
        } else {
            let query = {};

            btn.textContent = NORMALTEXT;
            for (let i = 0; i < form.length; i++) {
                form[i].setAttribute('readOnly', true);
                query[form[i].name] = form[i].value;
            }

            //    query is update params
        }
    }

    render() {
        return (
            <div className="dynamicPropertiesPanel" style={{padding: '20px'}}>
                {
                    this.state.data.groups.map((group, index) => (
                        <Collapse defaultActiveKey={['0']}>
                            <Panel
                                header={group}
                                key={index}
                            >
                                <Form id={`form.${index}`} className="ant-advanced-search-form">
                                    <Row gutter={24}>
                                        <PanelItem group={group} list={this.state.data.list}/>
                                    </Row>
                                </Form>
                                <PanelButton group={group} list={this.state.data.list} target={index} action={this.editor}/>
                            </Panel>
                        </Collapse>
                    ))
                }
            </div>
        )
    }
}