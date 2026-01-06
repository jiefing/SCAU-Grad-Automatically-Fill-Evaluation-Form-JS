# 贡献指南 / Contributing Guide

感谢您考虑为本项目做出贡献！

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议：

1. 检查 [Issues](https://github.com/jiefing/SCAU-Grad-Automatically-Fill-Evaluation-Form-JS/issues) 中是否已有相关问题
2. 如果没有，创建一个新的 Issue
3. 清晰描述问题或建议，最好包含：
   - 问题的详细描述
   - 复现步骤（如果是 bug）
   - 期望的行为
   - 实际的行为
   - 浏览器版本和 Tampermonkey 版本
   - 截图（如果适用）

### 提交代码

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 代码规范

- 使用 ES6+ 语法
- 遵循现有的代码风格
- 添加必要的注释（中文或英文）
- 确保代码通过语法检查
- 测试您的更改

### 提交信息规范

使用清晰的提交信息：

- `feat: 添加新功能`
- `fix: 修复 bug`
- `docs: 更新文档`
- `style: 代码格式调整`
- `refactor: 重构代码`
- `test: 添加测试`
- `chore: 其他更改`

## 开发指南

### 本地测试

1. 在 Tampermonkey 中创建新脚本
2. 复制 `scau-grad-auto-fill.user.js` 的内容
3. 访问评教页面进行测试
4. 检查浏览器控制台的输出

### 调试技巧

- 在浏览器开发者工具的 Console 中查看日志
- 使用 `debugger;` 语句设置断点
- 修改 `CONFIG` 对象测试不同配置
- 测试各种表单元素类型

## 行为准则

- 尊重他人
- 保持友善和专业
- 接受建设性的批评
- 关注对社区最有利的事情

## 问题？

如有任何问题，欢迎：
- 创建 Issue
- 发起 Discussion

感谢您的贡献！ 🎉
