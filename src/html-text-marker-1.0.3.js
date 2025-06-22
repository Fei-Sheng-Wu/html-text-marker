/**
 * @typedef {Object} HtmOptions
 * @property {string[]} whitelist - the list of accepted element tag names in uppercase, CSS selectors, or * to represent all elements
 * @property {string[]} blacklist - the list of unaccepted element tag names in uppercase, CSS selectors, or * to represent all elements
 * @property {(element:HTMLElement) => boolean} selector - the custom predicate to determine whether an element is accepted
 */

/**
 * The default options provided by html-text-marker.
 * @type {HtmOptions}
 */
const htmDefaultOptions = {
    whitelist: ['*'],
    blacklist: [],
    selector: undefined
};

/**
 * Update all occurrences of the provided text with a custom format.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {string} format - the custom format to update the text to, where {0} is replaced by the text
 * @param {Object} options - the custom options to follow
 */
function htmCustomizeAll(element, text, format, options) {
    for (var child = element.firstChild, childNext; child !== null; child = childNext) {
        childNext = child.nextSibling;

        if (child.nodeType === Node.TEXT_NODE) {
            if (!(child.nodeValue.includes(text))) {
                continue;
            }

            if (options) {
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

            var template = document.createElement('div');
            template.innerHTML = child.nodeValue.replaceAll(text, format.replaceAll('{0}', text));
            for (var templateChild = template.firstChild, templateChildNext; templateChild !== null; templateChild = templateChildNext) {
                templateChildNext = templateChild.nextSibling;
                element.insertBefore(templateChild, child);
            }
            element.removeChild(child);

            continue;
        }

        htmCustomizeAll(child, text, format, options);
    }
}

/**
 * Highlight all occurrences of the provided text.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {Object} options - the custom options to follow
 */
function htmHiglightAll(element, text, options) {
    htmCustomizeAll(element, text, '<mark>{0}</mark>', options);
}

/**
 * Bold all occurrences of the provided text.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {Object} options - the custom options to follow
 */
function htmBoldAll(element, text, options) {
    htmCustomizeAll(element, text, '<b>{0}</b>', options);
}

/**
 * Italicize all occurrences of the provided text.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {Object} options - the custom options to follow
 */
function htmItalicizeAll(element, text, options) {
    htmCustomizeAll(element, text, '<i>{0}</i>', options);
}

/**
 * Underline all occurrences of the provided text.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {Object} options - the custom options to follow
 */
function htmUnderlineAll(element, text, options) {
    htmCustomizeAll(element, text, '<u>{0}</u>', options);
}

/**
 * Hyperlink all occurrences of the provided text.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {string} link - the link to use
 * @param {Object} options - the custom options to follow
 */
function htmLinkAll(element, text, link, options) {
    htmCustomizeAll(element, text, '<a href="' + link + '">{0}</a>', options);
}

/**
 * Delete all occurrences of the provided text.
 * @param {HTMLElement} element - the root element to find the provided text in
 * @param {string} text - the text to match with
 * @param {Object} options - the custom options to follow
 */
function htmDeleteAll(element, text, options) {
    htmCustomizeAll(element, text, '', options);
}
