# X Changelog

## 2.0.0

### x

- Allow using parent node of script as initial selector
- Fix `script`s not loading when adding them to the DOM with `html()`
- `append()` and `prepend()` now use x markup more
- Add `removeClass()` to, well, remove a class from a DOM node

### xAct

- **BREAKING CHANGE** -  It now takes code as an argument instead of a DOM query

### Meta

- Update the node package lock file

### Notes

- It has come to my attention that according to the semantic versioning spec the current major should be 0 because the API will probably change a lot and x is still development. I don't want to break anything more besides that rule, so I won't decrement the major version. 
- Also, this release is 2.x.x because of, well, semver :D

## 1.0.2

### Testing

- Use `jest-dom` for testing DOM to improve tests

### x

- Add `style()` function to set/get styles from a DOM node
- Add `hover()` event listener
- Improve `click()` for touch devices
- Add `on()` for custom event listeners
- Add `rmOn()` to remove event listeners created with `on()`

## 1.0.1

### Testing

- Move to snapshot testing for xAct

### xAct

- Stop trimming whitespace
- Allow assigning variables

### Meta

- Start writing documentation
- Create this changelog
- Set up chat on Gitter ([here](https://gitter.im/thexproject/Lobby))
- Get jsDelivr working
- Set up Codacy (code quality reviews)