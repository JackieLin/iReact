/**
 * 表单操作
 * @author jackie Lin <dashi_lin@163.com>
 * @Date 2016-2-2 11:36
 */
'use strict';

import React from 'react';

import utils from './utils';

/**
 * 路由规则
 */
export class Rules {
    constructor() {
        this.rules = {};
        this.initRules();
    }

    initRules() {
        this.addRule('required', (ele, msg='不能为空') => {
            return {
                status: ele.value.trim().length > 0,
                msg: msg
            };
        });

        this.addRule('maybe', (ele) => {
            return {
                status: true
            };
        });
    }


    /**
     * 注册规则
     */
    addRule(key, rule) {
        this.rules[key] = rule;
    }
};

export class Tip {
    constructor(el) {
        // 根节点
        this.$el = el;
        this.initErrorTip();
    }

    initErrorTip() {
        var $tip = document.createElement('div');
        $tip.classList.add('ui', 'red', 'label', 'popup', 'transition', 'bottom', 'left', 'hide');

        this.$el.appendChild($tip);

        this.$tip = $tip;

        return $tip;
    }

    setPosition(offset) {
        this.$tip.style.top = offset.top;
        this.$tip.style.left = offset.left;
    }

    hide() {
        this.$tip.classList.remove('show');
    }

    timeout(time) {
        window.setTimeout(() => {
            this.hide();
        }, time);
    }

    show($el, msg) {
        let offset = {
            left: $el.offsetLeft,
            top: $el.offsetTop
        }

        this.$tip.classList.add('show');
        this.$tip.innerHTML = msg;
        this.setPosition(offset);
    }
}

/**
 * 验证信息
 * {
 *    name: {
 *      ele: ele,
 *      rule: 'isNumber 'dsadsa' | isMobile'
 *    }
 * }
 */
export class Validator {
    constructor(validators={}, rules={}) {
        this.validators = validators;
        this.rules = rules;
        this.checks = {};
        this.parseValidator();
    }

    initTip($el=document.body) {
        if(!this.tip) {
            this.tip = new Tip($el);
        }

        return this.tip;
    }

    /**
     * isNumber '不是数字' | isMobile
     * {
     *      name: [{rule: rule, args: args}]
     * }
     */
    parseValidator() {
        for(var name in this.validators) {
            if(this.validators.hasOwnProperty(name)) {
                this.checks[name] = [];
                let validator = this.validators[name];
                let rules = (validator.rule || '').split('|').filter((v) => {
                    return v.trim().length > 0;
                });

                if(rules.length) {
                    rules.forEach((v) => {
                        let args = v.split(' ').filter((v) => {
                            return v.trim().length > 0;
                        });

                        let ruleName = args[0];
                        let rule = this.rules[args[0]];

                        if(rule) {
                            args.shift();
                            args.unshift(validator.ele);

                            this.checks[name].push({
                                rule: rule,
                                args: args
                            });
                        }
                    });
                } else {
                    // 不输入验证规则，表示不验证，只需要获取值就可以了
                    this.checks[name].push({
                        rule: this.rules['maybe'],
                        args: [validator.ele]
                    });
                }
            }
        }
    }

    /**
     * 检查表单信息
     */
    check(name) {
        let result = {};

        let checkEle = (name) => {
            let result = {};
            let data = this.checkEle(name);

            if(data && name) {
                result[name] = data;
            } else {
                result[name] = false;
            }

            return result;
        };

        // 检查全部元素
        if(!name) {
           for(let name in this.checks) {
                Object.assign(result, checkEle(name));
           }
        } else {
            Object.assign(result, checkEle(name));
        }

        // 全部验证失败
        let isFalse = false;
        for(let key in result) {
            if(result[key] === false) {
                isFalse = true;
                break;
            }
        }

        if(isFalse) {
            result = false;
        }

        return result;
    }

    checkEle(name) {
        let isPass = true;
        let element;
        let result = {};

        if(!name) {
            return false;
        }

        if(this.checks[name].length) {
            element = this.checks[name][0].args[0];
        }
        
        // 检查特定元素
        this.checks[name].forEach((v) => {
            // let args = utils.clone(v.args);
            let res = v.rule.apply(this, v.args);

            if (res.status !== true) {
                isPass = false;
                this.tip.show(v.args[0], res.msg);
                return false;
            } else {
                this.tip.hide();
            }
        });

        return (isPass && element) ? element.value : false;
    }
};

export default {
    rules: Rules,
    validator: Validator,
    tip: Tip
};
