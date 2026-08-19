import '@testing-library/jest-dom'

// jsdom doesn't implement the PointerEvent constructor, which @base-ui/react
// components (e.g. Radio) rely on internally for click/keyboard activation.
// Polyfill it as a thin wrapper around MouseEvent so those components work
// under jsdom-based tests.
if (typeof window !== 'undefined' && typeof window.PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params)
    }
  }

  // @ts-expect-error -- partial polyfill, sufficient for test environment use.
  window.PointerEvent = PointerEventPolyfill
}
