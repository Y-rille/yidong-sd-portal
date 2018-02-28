import React from 'react';
import PropTypes from 'prop-types';
import './index.aless';

export interface LogShineProps {

}

export default class LogShine extends React.PureComponent<any, any> {
    fetchEvents: any
    eventList: any
    searchQueryInput: any
    constructor(props) {
        super(props);
        this.state = {
            systemID: this.props.systemID,
            groupID: this.props.groupID,
            query: this.props.query,
            minID: null,
            maxID: null,
            follow: true,
            status: null,
            loading: false,
            errorMsg: null,
            events: this.props.events
        };
    }
    static propTypes = {
        height: PropTypes.string,
        width: PropTypes.string,
        query: PropTypes.string,
        follow: PropTypes.bool,
        delay: PropTypes.number,
        systemID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        groupID: PropTypes.number,
        showTopToolbar: PropTypes.bool,
        backgroundColor: PropTypes.string,
        dateTimeColor: PropTypes.string,
        systemColor: PropTypes.string,
        programColor: PropTypes.string,
        messageColor: PropTypes.string,
        topToolbarBackgroundColor: PropTypes.string,
        rowFormat: PropTypes.func
    }
    static defaultProps = {
        height: '500px',
        width: '100%',
        query: null,
        follow: true,
        delay: 10,
        systemID: null,
        groupID: null,
        showTopToolbar: false,
        backgroundColor: '#252830',
        dateTimeColor: '#e4d836',
        systemColor: '#1bc98e',
        programColor: '#9f86ff',
        messageColor: '#ffffff',
        topToolbarBackgroundColor: '#1bc98e',
        rowFormat: null
    }
    scrollBottom() {
        this.eventList.scrollTop = this.eventList.scrollHeight;
    }
    submitQueryKeyUp = (event) => {
        if (event.key === 'Enter') {
            let searchQueryInput = this.searchQueryInput
            this.setState({ events: [], query: searchQueryInput.value }, this.fetchEvents);
        }
    }
    followStatusClicked = (event) => {
        this.setState({ follow: !this.state.follow });
    }
//     正则修改日志字符串  
//     fmtData = (data) => {
//         let _str =`Nov 21 10:05:22 188.103.18.24  #ILO 4: 11/21/2017 02:04 Server reset.
// Nov 21 10:05:22 188.103.18.24  #ILO 4: 11/21/2017 02:04 Server power restored.
// Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
// Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
// Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
// Nov 21 10:05:56 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
// Nov 21 10:05:56 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
// Nov 21 10:05:58 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
// Nov 21 10:05:58 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
// Nov 21 10:05:59 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
// Nov 21 10:05:59 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
// Nov 21 10:06:01 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
// Nov 21 10:06:01 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
// Nov 21 10:06:03 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.`

// let patt1 = /\S+\b.*\d\d\:\d\d\:\d\d/
// let patt2 = /(\d{1,3}\.){3}\d{1,3}/
// let patt3 = /\#\S+\b.*\d(?=\:\s)/
// let patt4 = /\d{1,2}\/\S+\b.*/

// let info = []
// let arr = _str.split(/\n/)

// arr.map(function(item,index){
//     let _info = {
//         generated_at: item.match(patt1)[0],
//         IP: item.match(patt2)[0],
//         hostname:item.match(patt3)[0],
//         message:item.match(patt4)[0]
//     }
//     info.push(_info)
// })
// console.log(info,'===========info')
//     }
    systemClicked = (event) => {
        let systemID = event.currentTarget.getAttribute('data-system-id');
        if (systemID) {
            this.setState({ events: [], systemID: systemID, query: null }, this.fetchEvents)
        };
    }
    programClicked = (event) => {
        let systemID = event.currentTarget.getAttribute('data-system-id');
        let program = event.currentTarget.getAttribute('data-program');
        if (systemID && program) {
            this.setState({ events: [], systemID: systemID, query: `program:${program}` }, this.fetchEvents)
        };
    }
    componentWillReceiveProps(nextProps) {
        let { events } = this.state
        this.setState({
            events: nextProps.events
        }, this.scrollBottom)
    }
    render() {
        let li;
        let topToolbar;
        let followBtnText = !this.state.follow ? 'Follow: OFF' : 'Follow: ON'
        let followBtnClassName = !this.state.follow ? 'LogShine follow-icon pointer' : 'LogShine follow-icon pointer'

        if (this.state.loading) {
            // li = <li className="event"
            //     style={{ color: this.props.messageColor }}>
            //     Fetching...
            //    </li>
        } else {
            li = this.state.events.map((event) => {
                return (
                    <li className="event" key={event.id}>
                        <time className="date"
                            style={{ color: this.props.dateTimeColor }}>
                            {event.generated_at}
                        </time>
                        <span className="system">
                            <a className="pointer"
                                style={{ color: this.props.systemColor }}
                                data-system-name={event.source_name}
                                data-system-id={event.source_id}>
                                ({event.hostname})
                                </a>
                        </span>
                        <span className="program">
                            <a className="pointer"
                                style={{ color: this.props.programColor }}
                                data-system-name={event.source_name}
                                data-system-id={event.source_id}
                                data-program={event.program}>
                                [{event.program}]
                                </a>
                        </span>
                        <span style={{ color: this.props.messageColor }}
                            className="message">
                            {event.message}
                        </span>
                    </li>
                );
            })
        }
        // else {
        //     li = <li className=" LogShine event"
        //         style={{ color: this.props.messageColor }}>
        //         {this.state.errorMsg}
        //     </li>
        // }

        if (this.props.showTopToolbar === true) {
            topToolbar = (
                <div className="toolbar top-toolbar" style={{ backgroundColor: this.props.topToolbarBackgroundColor }}>
                    <div className="search">
                        <div className="query-wrapper">
                            <input id="search-query-input"
                                ref={(node) => { this.searchQueryInput = node }}
                                className="input text"
                                type="text"
                                placeholder="Enter search terms…"
                                value={this.props.query || undefined}
                                onKeyUp={this.submitQueryKeyUp}
                                readOnly={this.props.query ? true : false}
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                            />
                        </div>
                    </div>
                    <div className="follow-status">
                        <a id="follow-status-btn"
                            className={followBtnClassName}
                            onClick={this.followStatusClicked}>
                            {followBtnText}
                        </a>
                    </div>
                </div>
            )
        }
        return (
            <div className="LogShine" style={{ width: this.props.width }}>
                {topToolbar}
                <ul className="events event-list"
                    style={{ height: this.props.height, backgroundColor: this.props.backgroundColor }}
                    ref={(node) => { this.eventList = node }}>
                    {li}
                </ul>
            </div>
        );
    }
}