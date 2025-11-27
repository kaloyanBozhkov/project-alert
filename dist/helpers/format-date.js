"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateHumanReadable = void 0;
const formatDateHumanReadable = (isoString) => {
    const date = new Date(isoString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    };
    return date.toLocaleString('en-US', options);
};
exports.formatDateHumanReadable = formatDateHumanReadable;
//# sourceMappingURL=format-date.js.map