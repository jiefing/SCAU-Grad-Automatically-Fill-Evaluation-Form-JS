# SCAU-Grad-Automatically-Fill-Evaluation-Form-JS

华南农业大学研究生教务管理系统，自动填写评教表

🤖 一键自动填写评教表，提高效率，节省时间！

## 功能特点

- ✅ 自动识别评教页面
- ✅ 智能填写单选按钮（默认最高分）
- ✅ 自动填写下拉选择框
- ✅ 随机生成文本评价
- ✅ 美观的浮动控制按钮
- ✅ 填写前确认提示
- ✅ 支持自定义配置

## 安装方法

### 1. 安装 Tampermonkey

首先需要在浏览器中安装 Tampermonkey 扩展：

- **Chrome/Edge**: [Chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
- **Safari**: [Mac App Store](https://apps.apple.com/app/tampermonkey/id1482490089)

### 2. 安装脚本

点击下面的链接安装脚本：

**[点击安装 SCAU 研究生评教表自动填写脚本](https://raw.githubusercontent.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS/main/scau-grad-auto-fill.user.js)**

或者：

1. 点击浏览器中的 Tampermonkey 图标
2. 选择「添加新脚本」
3. 复制 [scau-grad-auto-fill.user.js](scau-grad-auto-fill.user.js) 文件的内容
4. 粘贴到编辑器中
5. 点击「文件」->「保存」

## 使用方法

1. 登录华南农业大学研究生教务管理系统
2. 进入评教页面
3. 页面右上角会出现「🤖 自动填写评教表」按钮
4. 点击按钮，确认后自动填写
5. **请务必检查填写内容后再手动提交**

## 配置选项

可以在脚本中修改以下配置（编辑脚本文件中的 `CONFIG` 对象）：

```javascript
const CONFIG = {
    // 默认评分（1-5分，5分为最高）
    defaultScore: 5,
    // 自动填写延迟（毫秒）
    fillDelay: 500,
    // 是否自动提交（建议保持 false，手动检查后提交）
    autoSubmit: false,
    // 文本评价内容（可自定义）
    textComments: [
        '老师教学认真负责，课程内容充实，受益匪浅。',
        '教学方法得当，注重理论与实践结合。',
        '老师授课思路清晰，重点突出，值得肯定。'
    ]
};
```

## 注意事项

⚠️ **重要提示**：

1. 本脚本仅用于学习和提高效率，请确保评价内容真实反映您的学习体验
2. 脚本默认填写最高分，如需修改请在填写后手动调整
3. **强烈建议在自动填写后检查内容，然后手动提交**
4. 请勿过度依赖自动化工具，认真对待教学评价

## 兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 更新日志

### v1.0.0 (2026-01-06)

- 🎉 首次发布
- ✨ 支持自动填写单选、下拉、文本框
- ✨ 添加浮动控制按钮
- ✨ 支持自定义配置

## 问题反馈

如果您在使用过程中遇到问题，请：

1. 查看浏览器控制台是否有错误信息
2. 确认脚本已启用
3. 在 [Issues](https://github.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS/issues) 中提交问题

## 许可证

[MIT License](LICENSE)

## 免责声明

本脚本仅供学习交流使用，使用者应当遵守学校相关规定，对使用本脚本产生的一切后果自行负责。

---

⭐ 如果这个脚本对您有帮助，欢迎 Star 支持！
