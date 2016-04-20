/**
 * component
 * @author jackie Lin <dashi_lin@163.com>
 */

import React from 'react';
import Request from './request';

let request = new Request();

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.beforeInit();
        this.displayName = 'Component';
        this.afterInit();
    }

    beforeInit() {
        this.request = request;
    }

    afterInit() {
    }
};

export default Component;
