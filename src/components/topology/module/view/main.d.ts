/// <reference types="react" />
import * as React from 'react';
import joint from '../../rappid/rappid.min';
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
    paper_widht?: number;
    paper_height?: number;
}
export interface MainState {
    showInspector: any;
}
export default class Main extends React.Component<MainProps, MainState> {
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
