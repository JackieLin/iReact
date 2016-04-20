/**
 * 入口文件
 * @author jackie Lin <dashi_lin@163.com>
 */
'use strict';
// view 信息
import View from './view';
import {Router, Route, Link} from 'react-router';
import reactDom from 'react-dom';
import React from 'react';
import Component from './component';
import Request from './request';
import validator from './validator'

module.exports = {
    View: View,
    Component: Component,
    React: React,
    Router: Router,
    Route: Route,
    Link: Link,
    reactDom: reactDom,
    Request: Request,
    validator: validator
};
