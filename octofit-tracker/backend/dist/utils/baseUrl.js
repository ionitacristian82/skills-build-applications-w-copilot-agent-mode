"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = void 0;
const getApiBaseUrl = (port = 8000) => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-${port}.app.github.dev`
        : `http://localhost:${port}`;
};
exports.getApiBaseUrl = getApiBaseUrl;
