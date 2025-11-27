"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJsonToHtml = void 0;
const formatJsonToHtml = (json) => {
    const jsonString = JSON.stringify(json, null, 2);
    return `
<pre><code>${escapeHtml(jsonString)}</code></pre>
  `.trim();
};
exports.formatJsonToHtml = formatJsonToHtml;
const escapeHtml = (text) => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};
//# sourceMappingURL=format-json.js.map