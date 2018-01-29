import React from 'react';

export interface InstrumentPanelProps {
   
}

/**
 * 仪表盘
 * 
 * @export
 * @class InstrumentPanel
 * @extends {React.PureComponent<InstrumentPanelProps, any>}
 */

export default class InstrumentPanel extends React.PureComponent<InstrumentPanelProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <div>仪表盘</div>
        );
    }

}
