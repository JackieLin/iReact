/**
 * http 请求
 * @author jackie Lin <dashi_lin@163.com>
 */
'use strict';

// 没有使用第三方库，为了要兼容微信，修改了一点源代码
import axios from '../vendor/axios/dist/axios';

class Request {
    constructor() {
        this.axios = axios;
        this.configs = {
            url: '',
            headers: {},
            timeout: 1000,
            withCredentials: false,
            responseType: 'json',
        };

        this.config(this.configs);
    }

    config(config) {
        this.configs = Object.assign(this.configs, config);
        // this.axios(this.configs);
        return this.configs;
    }

    geneConfig(config) {
        if(!config) {
            return;
        }

        return Object.assign(config, this.configs);
    }

    ajax(url, config) {
        config.url = url || '';

        return this.axios(config).then(function(res) {
            return res.data || {};
        }).catch(function (res) {
            console.log(res);
            return res;
        });
    }

    all(promises, done) {
        done = done || function() {};
        this.axios.all(promises).then(this.axios.spread((...data) => {
            return done.apply(null, data);
        }));
    }

    get(url, params) {
        var config = {
            params: params || {}
        };

        config = this.geneConfig(config);

        return this.ajax(url, config);
    }

    post(url, data) {        
        var config = {
            method: 'post',
            data: data || {}
        };

        config = this.geneConfig(config);

        return this.ajax(url, config);
    }
}

module.exports = Request;
