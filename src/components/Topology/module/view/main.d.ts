/// <reference types="react" />
import * as React from 'react';
export interface MainProps {
    animate?: boolean;
    width?: number;
    height?: number;
    drawGrid?: boolean;
    rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
    onDblclick?: Function;
    data: any;
    center?: boolean;
    zoomToFit?: boolean;
    paper_width?: number;
    paper_height?: number;
    cid?: string;
}
export default class Main extends React.Component<MainProps, any> {
    paperContainer: HTMLDivElement;
    btn_zoomin: HTMLDivElement;
    btn_zoomout: HTMLDivElement;
    graph: joint.dia.Graph;
    commandManager: joint.dia.CommandManager;
    paper: joint.dia.Paper;
    snaplines: joint.ui.Snaplines;
    paperScroller: joint.ui.PaperScroller;
    static defaultProps: MainProps;
    /**
     * 数据传递动画
     */
    doAnimate(): void;
    /**
     * 数据解析
     * @param data 拓扑数据
     */
    parseData(data: any): void;
    initializePaper(): void;
    zoomIn(): void;
    zoomOut(): void;
    constructor(props: MainProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
