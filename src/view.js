/**
 * view
 * @author jackie Lin <dashi_lin@163.com>
 */
'use strict';

import React from 'react';
import Component from './component';

class View extends Component {

    init() {
        this.$el = this.refs.view;
    }

    componentDidMount() {
        this.init();

        let self = this.props.context || this;

        if(this.props.datas) {
            let datas = this.props.datas();
            this.getDatas(datas, self);
        }
    }

    renderData() {
        return {};
    }

    constructor(props) {
        super(props);
        this.displayName = 'View';
    }

    getDatas(datas={}, context) {
        let keys = [];
        let promises = [];
        let result = {};

        for(let key in datas) {
            if(datas.hasOwnProperty(key)) {
                keys.push(key);
                promises.push(datas[key]);
            }
        }

        if(keys.length) {
            this.request.all(promises, (...datas) => {
                keys.forEach((v, i) => {
                    result[v] = datas[i];
                });
                context.setState(result);
            });
        }
    }

    render() {
        return <div className="view" ref="view" style={this.props.style}>{this.props.children}</div>;
    }
};

module.exports = View;
