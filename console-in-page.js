/**
 * console-in-page-js
 * 
 * @version 1.0.0
 * @license MIT
 * @author @valerrkaaa
 * @repository https://github.com/valerrkaaa/console-in-page-js
 * 
 * @description
 * Intercepts console methods and outputs them onto the webpage.
 * 
 * @installation
 * ```html
 * <!-- Basic usage -->
 * <script src="console-in-page.js"></script>
 * 
 * <!-- With configuration -->
 * <script 
 *   src="console-in-page.js" 
 *   data-position="top-right"
 *   data-theme="light"
 *   data-auto-open="true"
 *   data-button-color="dark">
 * </script>
 * ```
 * 
 * @configuration
 * | Attribute         | Values                                         | Default  |
 * |-------------------|------------------------------------------------|----------|
 * | data-position     | top-left, top-right, bottom-left, bottom-right | top-left |
 * | data-auto-open    | true, false                                    | false    |
 * | data-theme        | dark, light                                    | dark     |
 * | data-button-color | dark, light                                    | light    |
 * 
 * MIT License
 * 
 * Copyright (c) 2026 valerrkaaa
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * 
 */

const currentScript = document.currentScript;
const config = {
    position: currentScript?.dataset.position || "top-left",
    buttonColor: currentScript?.dataset.buttonColor || "light",
    autoOpen: currentScript?.dataset.autoOpen === "true",
    theme: currentScript?.dataset.theme || "dark"
};

const themeSettings = {
    dark: {
        backgroundColor: "#1e1e1e",
        textColor: "#d4d4d4",
        borderColor: "rgba(255, 255, 255, 0.1)",
        logColor: "#d4d4d4",
        warnColor: "#ffd54f",
        assertColor: "#ce93d8",
        debugColor: "#90caf9",
        errorColor: "#ff6b6b",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)"
    },
    light: {
        backgroundColor: "#f5f5f5",
        textFieldBg: "#ffffff",
        textColor: "#333333",
        borderColor: "rgba(0, 0, 0, 0.1)",
        logColor: "#333333",
        warnColor: "#856404",
        assertColor: "#6a1b9a",
        debugColor: "#0c5460",
        errorColor: "#721c24",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
    }
};

const currentTheme = themeSettings[config.theme];

const navContainer = document.createElement("div");
navContainer.id = "console-container";
document.body.appendChild(navContainer);

const buttonContainer = document.createElement("div");
buttonContainer.style.position = "fixed";
buttonContainer.style.zIndex = "1001";
buttonContainer.style.display = "flex";
buttonContainer.style.gap = "5px";

function applyPosition(position) {
    switch(position) {
        case "top-left":
            buttonContainer.style.top = "1px";
            buttonContainer.style.left = "1px";
            buttonContainer.style.right = "auto";
            buttonContainer.style.bottom = "auto";
            break;
        case "top-right":
            buttonContainer.style.top = "1px";
            buttonContainer.style.right = "1px";
            buttonContainer.style.left = "auto";
            buttonContainer.style.bottom = "auto";
            break;
        case "bottom-left":
            buttonContainer.style.bottom = "1px";
            buttonContainer.style.left = "1px";
            buttonContainer.style.top = "auto";
            buttonContainer.style.right = "auto";
            break;
        case "bottom-right":
            buttonContainer.style.bottom = "1px";
            buttonContainer.style.right = "1px";
            buttonContainer.style.top = "auto";
            buttonContainer.style.left = "auto";
            break;
        default:
            buttonContainer.style.top = "1px";
            buttonContainer.style.left = "1px";
    }
}

applyPosition(config.position);
navContainer.appendChild(buttonContainer);

const showConsoleButton = document.createElement("div");
showConsoleButton.id = "show-console-button";
showConsoleButton.style.backgroundColor = config.buttonColor === "dark" ? "#333" : "white";
showConsoleButton.style.color = config.buttonColor === "dark" ? "white" : "black";
showConsoleButton.style.border = "1px solid black";
showConsoleButton.style.padding = "5px 10px";
showConsoleButton.textContent = "Открыть консоль";
showConsoleButton.style.borderRadius = "5px";
showConsoleButton.style.cursor = "pointer";
showConsoleButton.style.fontFamily = "Arial, sans-serif";
showConsoleButton.style.fontSize = "14px";
buttonContainer.appendChild(showConsoleButton);

const selectAllButton = document.createElement("div");
selectAllButton.id = "select-all-button";
selectAllButton.style.backgroundColor = config.buttonColor === "dark" ? "#333" : "white";
selectAllButton.style.color = config.buttonColor === "dark" ? "white" : "black";
selectAllButton.style.border = "1px solid black";
selectAllButton.style.padding = "5px 10px";
selectAllButton.textContent = "Выделить всё";
selectAllButton.style.borderRadius = "5px";
selectAllButton.style.cursor = "pointer";
selectAllButton.style.fontFamily = "Arial, sans-serif";
selectAllButton.style.fontSize = "14px";
selectAllButton.style.display = "none";
buttonContainer.appendChild(selectAllButton);

const textArea = document.createElement("div");
textArea.id = "text-area";
textArea.style.display = "none";
textArea.style.position = "fixed";
textArea.style.top = "0";
textArea.style.left = "0";
textArea.style.width = "100%";
textArea.style.height = "100%";
textArea.style.backgroundColor = currentTheme.backgroundColor;
textArea.style.zIndex = "1000";
textArea.style.overflow = "auto";
textArea.style.webkitOverflowScrolling = "touch";
navContainer.appendChild(textArea);

const contentWrapper = document.createElement("div");
contentWrapper.style.minHeight = "100%";
contentWrapper.style.display = "flex";
contentWrapper.style.flexDirection = "column";
contentWrapper.style.padding = "50px 20px 90px 20px";
contentWrapper.style.boxSizing = "border-box";
textArea.appendChild(contentWrapper);

const localConsoleTextField = document.createElement("div");
localConsoleTextField.id = "local-console";
localConsoleTextField.style.whiteSpace = "pre-wrap";
localConsoleTextField.style.wordWrap = "break-word";
localConsoleTextField.style.width = "100%";
localConsoleTextField.style.maxWidth = "1200px";
localConsoleTextField.style.paddingBottom = "20px";
localConsoleTextField.style.margin = "0 auto";
localConsoleTextField.style.color = currentTheme.textColor;
localConsoleTextField.style.fontFamily = "monospace";
localConsoleTextField.style.fontSize = "13px";
localConsoleTextField.style.lineHeight = "1.5";
localConsoleTextField.style.boxSizing = "border-box";
contentWrapper.appendChild(localConsoleTextField);

if (config.autoOpen) {
    showConsoleButton.textContent = "Скрыть";
    selectAllButton.style.display = "block";
    textArea.style.display = "flex";
}

let autoScrollEnabled = true;
textArea.addEventListener("scroll", function() {
    const isAtBottom = textArea.scrollHeight - textArea.scrollTop - textArea.clientHeight < 15;
    
    if (isAtBottom && !autoScrollEnabled) {
        autoScrollEnabled = true;
    } else if (!isAtBottom && autoScrollEnabled) {
        autoScrollEnabled = false;
    }
});

selectAllButton.addEventListener("click", function () {
    const consoleText = localConsoleTextField.innerText;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(consoleText).then(function() {
            const originalText = selectAllButton.textContent;
            selectAllButton.textContent = "Скопировано! ✓";
            selectAllButton.style.backgroundColor = "#4CAF50";
            selectAllButton.style.color = "white";
            setTimeout(() => {
                selectAllButton.textContent = originalText;
                selectAllButton.style.backgroundColor = config.buttonColor === "dark" ? "#333" : "white";
                selectAllButton.style.color = config.buttonColor === "dark" ? "white" : "black";
            }, 1500);
        }).catch(function(err) {
            console.error("Ошибка копирования: ", err);
            fallbackCopy(consoleText);
        });
    } else {
        fallbackCopy(consoleText);
    }
});

showConsoleButton.addEventListener("click", function () {
    if (textArea.style.display === "none" || textArea.style.display === "") {
        textArea.style.display = "flex";
        this.innerText = "Скрыть";
        selectAllButton.style.display = "block";
        autoScrollEnabled = true;
        scrollToBottomWithOffset();
    } else {
        textArea.style.display = "none";
        this.innerText = "Открыть консоль";
        selectAllButton.style.display = "none";
    }
});

window.onerror = function (message, source, lineno, colno, error) {
    const errorMessage = `Ошибка: ${message} в ${source}:${lineno}:${colno}`;
    if (error) {
        console.error(errorMessage, error);
    } else {
        console.error(errorMessage);
    }
    return true;
};

function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    
    const originalText = selectAllButton.textContent;
    selectAllButton.textContent = "Скопировано! ✓";
    selectAllButton.style.backgroundColor = "#4CAF50";
    selectAllButton.style.color = "white";
    setTimeout(() => {
        selectAllButton.textContent = originalText;
        selectAllButton.style.backgroundColor = config.buttonColor === "dark" ? "#333" : "white";
        selectAllButton.style.color = config.buttonColor === "dark" ? "white" : "black";
    }, 1500);
}

function addConsoleMessage(level, color, args) {
    if (localConsoleTextField) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString() + '.' + String(now.getMilliseconds()).padStart(3, '0');
        let levelColor = color;
        let textColor = currentTheme.textColor;
        
        switch(level) {
            case 'Log':
                levelColor = "#4CAF50";
                textColor = config.theme === 'dark' ? "#d4d4d4" : "#333333";
                break;
            case 'Warning':
                levelColor = "#FFC107";
                textColor = config.theme === 'dark' ? "#ffd54f" : "#856404";
                break;
            case 'Assert':
                levelColor = "#9C27B0";
                textColor = config.theme === 'dark' ? "#ce93d8" : "#6a1b9a";
                break;
            case 'Debug':
                levelColor = "#2196F3";
                textColor = config.theme === 'dark' ? "#90caf9" : "#0c5460";
                break;
            case 'Error':
                levelColor = "#f44336";
                textColor = config.theme === 'dark' ? "#ff6b6b" : "#721c24";
                break;
        }
        
        let messageHtml = `<div style="margin-bottom: 8px; border-bottom: 1px solid ${currentTheme.borderColor}; padding-bottom: 4px;"><span style="color: ${levelColor}; font-weight: bold;">[${timestamp}] [${level}]</span>`;
        
        args.forEach(function (arg) {
            let formattedValue;
            try {
                if (typeof arg === "object" && arg !== null) {
                    formattedValue = formatValue(arg);
                    formattedValue = formattedValue.replace(/\n/g, '<br>');
                } else {
                    formattedValue = JSON.stringify(arg);
                }
            } catch (e) {
                formattedValue = String(arg);
            }
            messageHtml += `<span style="color: ${textColor};"> ${formattedValue}</span>`;
        });
        
        messageHtml += `</div>`;
        
        localConsoleTextField.innerHTML += messageHtml;
        
        scrollToBottomWithOffset();
    }
}

function formatValue(value, indent = 0) {
    const spaces = "  ".repeat(indent);
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        const items = value.map(item => `${spaces}  ${formatValue(item, indent + 1)}`).join(",\n");
        return `[\n${items}\n${spaces}]`;
    }
    if (typeof value === "object") {
        if (Object.keys(value).length === 0) return "{}";
        const items = Object.entries(value).map(([k, v]) => `${spaces}  ${k}: ${formatValue(v, indent + 1)}`).join(",\n");
        return `{\n${items}\n${spaces}}`;
    }
    return String(value);
}

function scrollToBottomWithOffset() {
    if (textArea && textArea.style.display !== 'none' && autoScrollEnabled) {
        requestAnimationFrame(() => {
            textArea.scrollTop = textArea.scrollHeight - textArea.clientHeight;
        });
    }
}

original_consoleLog = console.log;
console.log = function (...args) {
    addConsoleMessage('Log', '#4CAF50', args);
    return original_consoleLog.apply(this, args);
};

original_consoleWarn = console.warn;
console.warn = function (...args) {
    addConsoleMessage('Warning', '#FFC107', args);
    return original_consoleWarn.apply(this, args);
};

original_consoleAssert = console.assert;
console.assert = function (...args) {
    addConsoleMessage('Assert', '#9C27B0', args);
    return original_consoleAssert.apply(this, args);
};

original_consoleDebug = console.debug;
console.debug = function (...args) {
    addConsoleMessage('Debug', '#2196F3', args);
    return original_consoleDebug.apply(this, args);
};

original_consoleError = console.error;
console.error = function (...args) {
    addConsoleMessage('Error', '#f44336', args);
    return original_consoleError.apply(this, args);
};