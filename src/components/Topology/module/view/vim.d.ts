declare let VIM: any;
declare let Link: any;
export interface IlinkOption {
    state?: number;
    source?: string;
    target?: string;
}
declare let linkOption: (opt: IlinkOption) => any;
export interface IvimOption {
    id?: string;
    desc?: string;
    label?: string;
    state?: number;
    type?: string;
    bizFields?: any;
    isHighlight?: boolean;
}
declare let vimOption: (opt: IvimOption) => any;
export { VIM, vimOption, Link, linkOption };
