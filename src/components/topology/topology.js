import { Component, createElement } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var VIM = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable"><rect class="body"/><rect class="card"/><rect class="alarm"/><text class="label"/></g>',
    defaults: _.defaultsDeep({
        type: 'VIM',
        size: {
            width: 180,
            height: 60
        },
        attrs: {
            '.': {
                magnet: false
            },
            '.label': {
                text: '',
                'ref-x': .5,
                'ref-y': .4,
                'font-size': 14,
                'text-anchor': 'middle',
                fill: '#000'
            },
            '.alarm': {
                refX: '100%',
                refX2: -10,
                refY: '100%',
                refY2: -10,
                width: 10,
                height: 10,
            },
            '.body': {
                'ref-width': '100%',
                'ref-height': '100%',
                stroke: '#00b388',
                'stroke-width': 3
            }
        }
    }, joint.shapes.basic.Generic.prototype.defaults),
    initialize: function () {
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    }
});
var Link = joint.dia.Link.extend({
    defaults: _.defaultsDeep({
        type: 'Link',
        // router: { name: 'manhattan' },
        // connector: { name: 'rounded' },
        attrs: {
            '.connection': { stroke: '#31d0c6', 'stroke-width': 3 },
            '.link-tools': { display: 'none' },
            '.marker-arrowheads': { display: 'none' },
        },
        z: -1
    }, joint.dia.Link.prototype.defaults),
    initialize: function () {
        joint.dia.Link.prototype.initialize.apply(this, arguments);
    }
});
var linkOption = function (opt) {
    var option = { attrs: { '.connection': { stroke: '#31d0c6', 'stroke-dasharray': '' } } };
    if (opt) {
        option.state = opt.state;
        option.source = {
            id: opt.source
        };
        option.target = {
            id: opt.target
        };
        switch (opt.state) {
            case 0:
                option.attrs['.connection'].stroke = '#31d0c6';
                break;
            case 1:
                option.attrs['.connection'].stroke = '#D10002';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                break;
            case 2:
                option.attrs['.connection'].stroke = '#FF9901';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                break;
            case 3:
                option.attrs['.connection'].stroke = '#DFB202';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                break;
            case 4:
                option.attrs['.connection'].stroke = '#00BFFF';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                break;
            default:
                option.attrs['.connection'].stroke = '#31d0c6';
                option.attrs['.connection']['stroke-dasharray'] = '5 2';
                break;
        }
    }
    return option;
};
var vimOption = function (opt) {
    var option = { size: {}, attrs: { '.label': {}, '.alarm': {} } };
    var dataTooltip = '';
    if (opt) {
        if (opt.id) {
            option.id = opt.id;
        }
        if (opt.bizFields) {
            option.bizFields = opt.bizFields;
        }
        if (opt.desc) {
            dataTooltip = "data-tooltip=\"" + opt.desc + "\"";
            option.markup = "<g class=\"rotatable\" " + dataTooltip + "><rect class=\"body\"/><rect class=\"card\"/><rect class=\"alarm\"/><text class=\"label\"/></g>";
        }
        if (opt.label) {
            option.attrs['.label'].text = opt.label;
        }
        switch (opt.state) {
            case 0:
                option.attrs['.alarm'].width = 0;
                option.attrs['.alarm'].height = 0;
                break;
            case 1:
                option.attrs['.alarm'].fill = '#D10002';
                break;
            case 2:
                option.attrs['.alarm'].fill = '#FF9901';
                break;
            case 3:
                option.attrs['.alarm'].fill = '#DFB202';
                break;
            case 4:
                option.attrs['.alarm'].fill = '#00BFFF';
                break;
            default:
                option.attrs['.alarm'].width = 0;
                option.attrs['.alarm'].height = 0;
                break;
        }
        switch (opt.type) {
            case 'pnc':
                option.size = {
                    width: 140,
                    height: 60
                };
                break;
            case 'pno':
                option.size = {
                    width: 80,
                    height: 40
                };
                break;
            case 'ovs':
                option.size = {
                    width: 320,
                    height: 60
                };
                break;
            case 'vnc':
                option.size = {
                    width: 20,
                    height: 20
                };
                break;
            case 'vm':
                option.size = {
                    width: 140,
                    height: 60
                };
                break;
            case 'HA':
                option.size = {
                    width: 140,
                    height: 60
                };
                break;
            default:
                break;
        }
    }
    return option;
};

var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        return _super.call(this, props) || this;
    }
    /**
     * 数据传递动画
     */
    Main.prototype.doAnimate = function () {
        var graph = this.graph;
        var paper = this.paper;
        graph.on('signal', function (cell, data) {
            if (cell instanceof joint.dia.Link) {
                if (cell.attributes.state == 0) {
                    var targetCell_1 = graph.getCell(cell.get('target').id);
                    var s = paper.findViewByModel(cell);
                    s.sendToken(V('circle', { r: 7, fill: 'green' }).node, 1000, function () {
                        targetCell_1.trigger('signal', targetCell_1);
                    });
                }
            }
            else {
                var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
                _.each(outboundLinks, function (link) {
                    link.trigger('signal', link);
                });
            }
        });
        var sources = [];
        var targets = [];
        _.map(graph.getLinks(), function (link) {
            sources.push(link.get('source').id);
            targets.push(link.get('target').id);
        });
        var triggers = _.sortedUniq(_.difference(sources, targets));
        function simulate() {
            return setInterval(function () {
                _.map(triggers, function (trigger) {
                    var targetCell = graph.getCell(trigger);
                    targetCell.trigger('signal', targetCell);
                });
            }, 3000);
        }
        simulate();
    };
    /**
     * 数据解析
     * @param data 拓扑数据
     */
    Main.prototype.parseData = function (data) {
        var _this = this;
        if (data.nodes) {
            _.map(data.nodes, function (node) {
                new VIM(vimOption(node)).addTo(_this.graph);
            });
            if (data.links) {
                _.map(data.links, function (link) {
                    new Link(linkOption(link)).addTo(_this.graph);
                });
            }
        }
    };
    Main.prototype.initializePaper = function () {
        var _this = this;
        var graph = this.graph = new joint.dia.Graph;
        this.commandManager = new joint.dia.CommandManager({ graph: graph });
        var paper = this.paper = new joint.dia.Paper({
            // el: this.paperContainer,
            width: this.props.paper_widht,
            height: this.props.paper_height,
            gridSize: 10,
            drawGrid: this.props.drawGrid,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true,
        });
        this.parseData(this.props.data);
        // let pnc1 = new VIM(vimOption({
        //   desc: '物理网卡1',
        //   label: '物理网卡1',
        //   type: 'pnc',
        //   state: 2,
        // }));
        // let pnc2 = new VIM(vimOption({
        //   desc: '物理网卡2',
        //   label: '物理网卡2',
        //   state: 3,
        // }));
        // let pno1 = new VIM(vimOption({
        //   desc: '物理网口1',
        //   label: '物理网口1',
        //   type: 'pno',
        //   state: 3,
        // }));
        // let pno2 = new VIM(vimOption({
        //   desc: '物理网口2',
        //   label: '物理网口2',
        //   type: 'pno',
        //   state: 3,
        // }));
        // let pno3 = new VIM(vimOption({
        //   desc: '物理网口3',
        //   label: '物理网口3',
        //   type: 'pno',
        //   state: 3,
        // }));
        // let ovs = new VIM(vimOption({
        //   desc: '交换机',
        //   label: '交换机',
        //   type: 'ovs',
        //   state: 0,
        // }));
        // let vnc1 = new VIM(vimOption({
        //   desc: '虚拟网卡1',
        //   label: '',
        //   type: 'vnc',
        //   state: 2,
        // }));
        // let vnc2 = new VIM(vimOption({
        //   desc: '虚拟网卡2',
        //   label: '',
        //   type: 'vnc',
        //   state: 2,
        // }));
        // let vnc3 = new VIM(vimOption({
        //   desc: '虚拟网卡3',
        //   label: '',
        //   type: 'vnc',
        //   state: 2,
        // }));
        // let vnc4 = new VIM(vimOption({
        //   desc: '虚拟网卡4',
        //   label: '',
        //   type: 'vnc',
        //   state: 2,
        // }));
        // let vnc5 = new VIM(vimOption({
        //   desc: '虚拟网卡5',
        //   label: '',
        //   type: 'vnc',
        //   state: 2,
        // }));
        // let vm1 = new VIM(vimOption({
        //   desc: '虚拟机1',
        //   label: '虚拟机1',
        //   type: 'vm',
        //   state: 0,
        // }));
        // let vm2 = new VIM(vimOption({
        //   desc: '虚拟机2',
        //   label: '虚拟机2',
        //   type: 'vm',
        //   state: 0,
        // }));
        // let vm3 = new VIM(vimOption({
        //   desc: '虚拟机3',
        //   label: '虚拟机3',
        //   type: 'vm',
        //   state: 1,
        // }));
        // let vm4 = new VIM(vimOption({
        //   desc: '虚拟机4',
        //   label: '虚拟机4',
        //   type: 'vm',
        //   state: 0,
        // }));
        // pnc1.addTo(graph);
        // pnc2.addTo(graph);
        // pno1.addTo(graph);
        // pno2.addTo(graph);
        // pno3.addTo(graph);
        // ovs.addTo(graph);
        // vnc1.addTo(graph);
        // vnc2.addTo(graph);
        // vnc3.addTo(graph);
        // vnc4.addTo(graph);
        // vnc5.addTo(graph);
        // vm1.addTo(graph);
        // vm2.addTo(graph);
        // vm3.addTo(graph);
        // vm4.addTo(graph);
        // // new Link(linkOption(
        // //   {
        // //     source: {
        // //       id: pnc1.id,
        // //     },
        // //     target: {
        // //       id: pno1.id,
        // //     },
        // //     state: 0
        // //   }
        // // )).addTo(graph);
        // new Link(linkOption(
        //   {
        //     "source": pnc1.id,
        //     "target": pno1.id,
        //     "state": 1,
        //   }
        // )).addTo(graph);
        // new Link({
        //   source: {
        //     id: pnc1.id,
        //   },
        //   target: {
        //     id: pno3.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: pnc2.id,
        //   },
        //   target: {
        //     id: pno2.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: pno1.id,
        //   },
        //   target: {
        //     id: ovs.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: pno2.id,
        //   },
        //   target: {
        //     id: ovs.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: pno3.id,
        //   },
        //   target: {
        //     id: ovs.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: ovs.id,
        //   },
        //   target: {
        //     id: vnc1.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: ovs.id,
        //   },
        //   target: {
        //     id: vnc2.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: ovs.id,
        //   },
        //   target: {
        //     id: vnc3.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: ovs.id,
        //   },
        //   target: {
        //     id: vnc4.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: ovs.id,
        //   },
        //   target: {
        //     id: vnc5.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: vnc1.id,
        //   },
        //   target: {
        //     id: vm1.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: vnc2.id,
        //   },
        //   target: {
        //     id: vm1.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: vnc3.id,
        //   },
        //   target: {
        //     id: vm2.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: vnc4.id,
        //   },
        //   target: {
        //     id: vm3.id,
        //   }
        // }).addTo(graph);
        // new Link({
        //   source: {
        //     id: vnc5.id,
        //   },
        //   target: {
        //     id: vm4.id,
        //   }
        // }).addTo(graph);
        // let vm20: any = []
        // for (let i = 0; i < 20; i++) {
        //   let vm = new VIM(vimOption({
        //     desc: '虚拟机',
        //     label: '虚拟机',
        //     type: 'vm',
        //     state: 0,
        //   }));
        //   vm.addTo(graph);
        //   vm20.push(vm)
        // }
        // for (let i = 0; i < 40; i++) {
        //   let vnc = new VIM(vimOption({
        //     desc: '虚拟网卡',
        //     label: '',
        //     type: 'vnc',
        //     state: 0,
        //   }));
        //   vnc.addTo(graph)
        //   new Link({
        //     source: {
        //       id: ovs.id,
        //     },
        //     target: {
        //       id: vnc.id,
        //     }
        //   }).addTo(graph);
        //   if (i <= 10) {
        //     new Link({
        //       source: {
        //         id: vnc.id,
        //       },
        //       target: {
        //         id: vm20[i].id,
        //       }
        //     }).addTo(graph);
        //   }
        //   if (i > 10 && i < 20) {
        //     new Link({
        //       source: {
        //         id: vnc.id,
        //       },
        //       target: {
        //         id: vm20[i].id,
        //       }
        //     }).addTo(graph);
        //   }
        //   if (i >= 20 && i <= 30) {
        //     new Link({
        //       source: {
        //         id: vnc.id,
        //       },
        //       target: {
        //         id: vm3.id,
        //       }
        //     }).addTo(graph);
        //   }
        //   if (i > 30 && i <= 40) {
        //     new Link({
        //       source: {
        //         id: vnc.id,
        //       },
        //       target: {
        //         id: vm4.id,
        //       }
        //     }).addTo(graph);
        //   }
        // }
        // Signaling.
        // ----------
        if (this.props.animate) {
            this.doAnimate();
        }
        // this.snaplines = new joint.ui.Snaplines({ paper: paper });
        var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            cursor: 'grab'
        });
        paper.on('blank:pointerdown', paperScroller.startPanning);
        $(this.paperContainer).append(paperScroller.el);
        var graphBBox = joint.layout.DirectedGraph.layout(graph, {
            nodeSep: 50,
            edgeSep: 80,
            marginX: 100,
            marginY: 20,
            rankSep: 100,
            rankDir: this.props.rankDir,
        });
        paperScroller.render();
        if (this.props.center) {
            paperScroller.center();
        }
        if (this.props.zoomToFit) {
            paperScroller.zoomToFit();
        }
        new joint.ui.Tooltip({
            target: '[data-tooltip]'
        });
        paper.on('cell:pointerdblclick', function (cellView) {
            if (_this.props.onDblclick) {
                _this.props.onDblclick(cellView);
            }
        });
        this.btn_zoomin.onclick = this.zoomIn.bind(this);
        this.btn_zoomout.onclick = this.zoomOut.bind(this);
    };
    Main.prototype.zoomIn = function () {
        this.paperScroller.zoom(0.2, { max: 2 });
    };
    Main.prototype.zoomOut = function () {
        this.paperScroller.zoom(-0.2, { min: 0.2 });
    };
    Main.prototype.componentDidMount = function () {
        this.initializePaper();
    };
    Main.prototype.render = function () {
        var _this = this;
        return (createElement("div", { className: "Topology", style: { width: this.props.width, height: this.props.height } },
            createElement("div", { className: "topology-app" },
                createElement("div", { className: "app-body" },
                    createElement("div", { ref: function (node) { _this.btn_zoomin = node; }, id: "btn-zoomin", className: "btn" }, "+"),
                    createElement("div", { ref: function (node) { _this.btn_zoomout = node; }, id: "btn-zoomout", className: "btn" }, "-"),
                    createElement("div", { className: "paper-container", ref: function (node) { _this.paperContainer = node; } })))));
    };
    Main.defaultProps = {
        animate: true,
        width: 800,
        height: 600,
        paper_widht: 1000,
        paper_height: 1000,
        drawGrid: false,
        rankDir: 'TB',
        data: {},
        center: false,
        zoomToFit: false
    };
    return Main;
}(Component));

var init = function (mountNodeId, opt) {
    if (mountNodeId === void 0) { mountNodeId = 'root'; }
    render(createElement(Main, { animate: opt.animate, data: opt.data, onDblclick: opt.onDblclick }), document.getElementById(mountNodeId));
};

export { init, Main as Topology };
