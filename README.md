# html-text-marker

> An efficient and customizable HTML content formatter by updating all occurrences of provided text with predefined formats or fully custom HTML markups. Extremely simple to rapidly highlight, bold, italicize, underline, hyperlink, or delete specific texts from any given webpage with adaptable options. Written in vanilla JS with high compatibility.

## Quick Start

Highlight all occurrences of "text" on the webpage:

```js
htmHighlightAll(document.body, 'text')
```

Highlight all occurrences of "text" under a specific HTML element `element`:

```js
htmHighlightAll(element, 'text')
```

Use custom options as an optional last parameter to select accepted child HTML elements:

```js
htmHighlightAll(document.body, 'text', {
    //Disallow all <p> elements and elements with "example" class
    blacklist: ['P', '.example']
})
```

Predefined formatters for the basic uses include:

```js
htmHighlightAll(element, 'text')
htmBoldAll(element, 'text')
htmItalicizeAll(element, 'text')
htmUnderlineAll(element, 'text')
htmLinkAll(element, 'text', 'www.example.com')
htmDeleteAll(element, 'text')
```

Format text in a custom manner, where every `{0}` in the provided format is replaced by the provided text:

```js
htmCustomizeAll(element, 'text', '<b>{0}</b>(<i>auto replaced by <u>html-text-marker</u></i>)')
```

## Preview

| Original | `htmHiglightAll(document.body, 'HTML')` |
| :---: | :---: |
| ![Original Webpage](https://github.com/Fei-Sheng-Wu/html-text-marker/blob/master/screenshot-original.png) | ![Formatted Webpage](https://github.com/Fei-Sheng-Wu/html-text-marker/blob/master/screenshot-formatted.png) |

## License

This project is under the [MIT License](https://github.com/Fei-Sheng-Wu/html-text-marker/blob/master/LICENSE.txt).
