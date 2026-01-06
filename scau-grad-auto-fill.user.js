// ==UserScript==
// @name         SCAU研究生评教表自动填写
// @name:en      SCAU Graduate Evaluation Form Auto-Fill
// @namespace    https://github.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS
// @version      1.0.0
// @description  华南农业大学研究生教务管理系统，自动填写评教表
// @description:en  Automatically fill evaluation forms for South China Agricultural University Graduate Education Management System
// @author       jiefing
// @match        *://yjsxt.scau.edu.cn/*
// @match        *://*.scau.edu.cn/*/evaluation/*
// @icon         https://www.scau.edu.cn/favicon.ico
// @grant        none
// @license      MIT
// @homepage     https://github.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS
// @supportURL   https://github.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS/issues
// @updateURL    https://raw.githubusercontent.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS/main/scau-grad-auto-fill.user.js
// @downloadURL  https://raw.githubusercontent.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS/main/scau-grad-auto-fill.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 配置项
    const CONFIG = {
        // 默认评分（1-5分，5分为最高）
        defaultScore: 5,
        // 自动填写延迟（毫秒）
        fillDelay: 500,
        // 是否自动提交
        autoSubmit: false,
        // 文本评价内容
        textComments: [
            '老师教学认真负责，课程内容充实，受益匪浅。',
            '教学方法得当，注重理论与实践结合。',
            '老师授课思路清晰，重点突出，值得肯定。'
        ]
    };

    // 工具函数：延迟执行
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 工具函数：随机选择数组中的一个元素
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // 检测页面是否为评教页面
    function isEvaluationPage() {
        const keywords = ['评教', '评价', 'evaluation', '教学评价'];
        const pageText = document.body.innerText;
        const pageTitle = document.title;
        
        return keywords.some(keyword => 
            pageText.includes(keyword) || pageTitle.includes(keyword)
        );
    }

    // 填写单选按钮/复选框
    async function fillRadioButtons() {
        const radioGroups = {};
        const radios = document.querySelectorAll('input[type="radio"]');
        
        // 按name分组
        radios.forEach(radio => {
            const name = radio.name;
            if (!radioGroups[name]) {
                radioGroups[name] = [];
            }
            radioGroups[name].push(radio);
        });

        // 为每组选择最高分（通常是最后一个或第一个选项）
        for (const [name, group] of Object.entries(radioGroups)) {
            if (group.length > 0) {
                // 尝试找到值为最高分的选项
                let targetRadio = group.find(r => 
                    r.value == CONFIG.defaultScore || 
                    r.value == '5' || 
                    r.value == 'A' ||
                    r.value == '优秀'
                );
                
                // 如果没找到，选择最后一个（通常是最高分）
                if (!targetRadio) {
                    targetRadio = group[group.length - 1];
                }
                
                if (targetRadio && !targetRadio.checked) {
                    targetRadio.checked = true;
                    targetRadio.click();
                    await delay(100);
                }
            }
        }
    }

    // 填写下拉选择框
    async function fillSelectBoxes() {
        const selects = document.querySelectorAll('select');
        
        for (const select of selects) {
            if (select.options.length > 0) {
                // 选择最后一个非空选项（通常是最高分）
                let selectedIndex = select.options.length - 1;
                
                // 跳过空值或"请选择"选项
                while (selectedIndex > 0 && 
                       (!select.options[selectedIndex].value || 
                        select.options[selectedIndex].text.includes('请选择'))) {
                    selectedIndex--;
                }
                
                select.selectedIndex = selectedIndex;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                await delay(100);
            }
        }
    }

    // 填写文本框
    async function fillTextAreas() {
        const textareas = document.querySelectorAll('textarea');
        
        for (const textarea of textareas) {
            if (!textarea.value || textarea.value.trim() === '') {
                const comment = randomChoice(CONFIG.textComments);
                textarea.value = comment;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                textarea.dispatchEvent(new Event('change', { bubbles: true }));
                await delay(100);
            }
        }
    }

    // 填写文本输入框
    async function fillTextInputs() {
        const inputs = document.querySelectorAll('input[type="text"]');
        
        for (const input of inputs) {
            // 跳过已填写的和特殊输入框（如验证码、姓名等）
            if (!input.value && 
                !input.readOnly && 
                !input.disabled &&
                !input.placeholder.includes('姓名') &&
                !input.placeholder.includes('学号') &&
                !input.placeholder.includes('验证码')) {
                
                const comment = randomChoice(CONFIG.textComments);
                input.value = comment;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                await delay(100);
            }
        }
    }

    // 主填写函数
    async function autoFillForm() {
        console.log('开始自动填写评教表...');
        
        try {
            await fillRadioButtons();
            console.log('单选按钮填写完成');
            
            await delay(CONFIG.fillDelay);
            await fillSelectBoxes();
            console.log('下拉框填写完成');
            
            await delay(CONFIG.fillDelay);
            await fillTextAreas();
            console.log('文本框填写完成');
            
            await delay(CONFIG.fillDelay);
            await fillTextInputs();
            console.log('输入框填写完成');
            
            console.log('表单填写完成！');
            
            // 如果启用自动提交
            if (CONFIG.autoSubmit) {
                await delay(1000);
                const submitBtn = document.querySelector('button[type="submit"], input[type="submit"], button:contains("提交")');
                if (submitBtn) {
                    console.log('准备提交表单...');
                    submitBtn.click();
                }
            } else {
                alert('表单已自动填写完成，请检查后手动提交！');
            }
        } catch (error) {
            console.error('自动填写过程中出错：', error);
            alert('自动填写失败，请手动填写！');
        }
    }

    // 创建控制按钮
    function createControlButton() {
        const button = document.createElement('button');
        button.innerHTML = '🤖 自动填写评教表';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 12px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        `;
        
        button.onmouseover = () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        };
        
        button.onmouseout = () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        };
        
        button.onclick = () => {
            if (confirm('确定要自动填写评教表吗？\n\n注意：\n1. 所有评分将设置为最高分\n2. 文本评价将随机选择\n3. 请在提交前检查填写内容')) {
                autoFillForm();
            }
        };
        
        document.body.appendChild(button);
    }

    // 初始化
    function init() {
        // 检查是否为评教页面
        if (!isEvaluationPage()) {
            console.log('当前页面不是评教页面，脚本待机中...');
            return;
        }
        
        console.log('检测到评教页面，加载自动填写功能...');
        
        // 等待页面完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createControlButton);
        } else {
            createControlButton();
        }
    }

    // 启动脚本
    init();

})();
