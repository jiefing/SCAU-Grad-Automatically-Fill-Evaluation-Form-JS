// ==UserScript==
// @name         SCAU研究生教务系统自动评教
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  用于华南农业大学研究生教务系统评教
// @author       jtfing
// @match        https://yjsglxt.scau.edu.cn/*TeachEvalGrade.aspx*
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';

    function addFillButton() {
        if (!document.getElementById('contentParent_drpTjkc')) {
            console.log('Not the evaluation page. No button added.');
            return;
        }

        const textElement = document.createElement('div');
        textElement.innerText = '自动填充';  
        Object.assign(textElement.style, {
            position: 'fixed',
            top: '50px',
            right: '10px',
            zIndex: '9999',
            padding: '15px',
            backgroundColor: '#FF0000',
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold',
            border: '2px solid white',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            textAlign: 'center',
        });

        document.body.appendChild(textElement);

        textElement.addEventListener('click', function() {
            fillForm();
            saveForm();
        });
    }

    function fillForm() {
        document.getElementById('contentParent_drpTjkc').value = '1'; // 推荐该课: 是
        document.getElementById('contentParent_drpZtpj').value = '非常满意'; // 总体评价: 非常满意
        document.getElementById('contentParent_drpXsb').value = '4/4'; // 学时比例 4/4

        document.getElementById('contentParent_txtKcyd').value = '课程内容丰富，教师讲解生动，收获很大。';
        document.getElementById('contentParent_txtPjyj').value = '无建议，继续保持。';

        const dropdowns = document.querySelectorAll('select[id^="contentParent_dgData_drpPfdj_"]');
        dropdowns.forEach((dropdown, index) => {
            dropdown.value = (index === dropdowns.length - 1) ? '90' : '100';
        });

        console.log('Form filled successfully.');
    }

    function saveForm() {
        const saveButton = document.getElementById('lnkSave'); 
        if (saveButton) {
            saveButton.click();
            console.log('Save button clicked.');
        } else {
            console.log('Save button not found.');
        }
    }

    window.addEventListener('load', addFillButton);
})();
