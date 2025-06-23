/**
 * @typedef {Object} HTMOptions
 * @property {string[]} whitelist - the list of accepted element tag names, CSS selectors, or * to represent all elements
 * @property {string[]} blacklist - the list of unaccepted element tag names, CSS selectors, or * to represent all elements
 * @property {(element:HTMLElement) => boolean} selector - the custom predicate to determine whether an element is accepted
 * @property {boolean} directChildrenOnly - whether to only process the direct children of the root element
 */

/**
 * The default options provided by html-text-marker.
 * @type {HTMOptions}
 */
const htmDefaultOptions = {
    whitelist: ['*'],
    blacklist: ['base', 'head', 'link', 'meta', 'script', 'style', 'title'],
    selector: undefined,
    directChildrenOnly: false
};

/**
 * Update all occurrences of the given text with a custom format.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {string} format - the custom format to update the text to, where {0} is replaced by the text
 * @param {HTMOptions} options - the custom options to follow
 */
function htmCustomizeAll(element, text, format, options) {
    options = options || htmDefaultOptions;

    for (var child = element.firstChild, childNext; child !== null; child = childNext) {
        childNext = child.nextSibling;

        if (child.nodeType === Node.TEXT_NODE) {
            if (!(child.nodeValue.includes(text))) {
                continue;
            }

            if (options.whitelist && !(options.whitelist.includes('*') || options.whitelist.includes(element.nodeName.toLowerCase())
                || options.whitelist.some(function (selector) { return element.matches(selector); }))) {
                continue;
            }
            if (options.blacklist && (options.blacklist.includes('*') || options.blacklist.includes(element.nodeName.toLowerCase())
                || options.blacklist.some(function (selector) { return element.matches(selector); }))) {
                continue;
            }
            if (options.selector && !options.selector(element)) {
                continue;
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

        if (!options.directChildrenOnly) {
            htmCustomizeAll(child, text, format, options);
        }
    }
}

/**
 * Highlight all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {HTMOptions} options - the custom options to follow
 */
function htmHighlightAll(element, text, options) {
    htmCustomizeAll(element, text, '<mark>{0}</mark>', options);
}

/**
 * Bold all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {HTMOptions} options - the custom options to follow
 */
function htmBoldAll(element, text, options) {
    htmCustomizeAll(element, text, '<b>{0}</b>', options);
}

/**
 * Italicize all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {HTMOptions} options - the custom options to follow
 */
function htmItalicizeAll(element, text, options) {
    htmCustomizeAll(element, text, '<i>{0}</i>', options);
}

/**
 * Underline all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {HTMOptions} options - the custom options to follow
 */
function htmUnderlineAll(element, text, options) {
    htmCustomizeAll(element, text, '<u>{0}</u>', options);
}

/**
 * Strikethrough all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {HTMOptions} options - the custom options to follow
 */
function htmStrikethroughAll(element, text, options) {
    htmCustomizeAll(element, text, '<s>{0}</s>', options);
}

/**
 * Hyperlink all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {string} link - the link to use
 * @param {HTMOptions} options - the custom options to follow
 */
function htmLinkAll(element, text, link, options) {
    htmCustomizeAll(element, text, '<a href="' + link + '">{0}</a>', options);
}

/**
 * Style all occurrences of the given text as headings.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {number} level - the level of heading
 * @param {HTMOptions} options - the custom options to follow
 */
function htmHeadingAll(element, text, level, options) {
    htmCustomizeAll(element, text, '<h' + level + '>{0}</h' + level + '>', options);
}

/**
 * Remove all occurrences of the given text.
 * @param {HTMLElement} element - the root element to find the given text in
 * @param {string} text - the text to match with
 * @param {HTMOptions} options - the custom options to follow
 */
function htmRemoveAll(element, text, options) {
    htmCustomizeAll(element, text, '', options);
}
