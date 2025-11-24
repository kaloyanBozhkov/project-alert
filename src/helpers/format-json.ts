export const formatJsonToHtml = (json: Record<string, unknown>): string => {
  const jsonString = JSON.stringify(json, null, 2);
  
  return `
<pre><code>${escapeHtml(jsonString)}</code></pre>
  `.trim();
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

