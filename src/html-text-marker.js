function thCustomizeAll(element, text, format, options) {
    for (var child = element.firstChild; child !== null; child = child.nextSibling) {
        if (child.nodeType === Node.TEXT_NODE && element.innerHTML) {
            if (options && element.innerHTML.includes(text)) {
                if (options.whitelist && !(options.whitelist.includes('*') || options.whitelist.includes(element.nodeName)
                    || options.whitelist.some(function (selector) { return element.matches(selector); }))) {
                    continue;
                }
                if (options.blacklist && (options.blacklist.includes('*') || options.blacklist.includes(element.nodeName)
                    || options.blacklist.some(function (selector) { return element.matches(selector); }))) {
                    continue;
                }
                if (options.selector && !options.selector(element)) {
                    continue;
                }
            }

            element.innerHTML = element.innerHTML.replaceAll(text, format.replaceAll('{0}', text));
            continue;
        }

        thCustomizeAll(child, text, format, options);
    }
}

function thHiglightAll(element, text, options) {
    thCustomizeAll(element, text, '<mark>{0}</mark>', options);
}

function thBoldAll(element, text, options) {
    thCustomizeAll(element, text, '<b>{0}</b>', options);
}

function thItalicizeAll(element, text, options) {
    thCustomizeAll(element, text, '<i>{0}</i>', options);
}

function thUnderlineAll(element, text, options) {
    thCustomizeAll(element, text, '<u>{0}</u>', options);
}

function thLinkAll(element, text, link, options) {
    thCustomizeAll(element, text, '<a href="' + link + '">{0}</a>', options);
}

function thDeleteAll(element, text, options) {
    thCustomizeAll(element, text, '', options);
}