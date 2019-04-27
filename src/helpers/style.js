import {css} from 'styled-components'
import {screenSizes} from "../constants/style";

export const media = Object.keys(screenSizes)
    .reduce((mediaPayload, label) => {
        return {
            ...mediaPayload,
            [label]: (...args) => css`
        @media (min-width: ${screenSizes[label] / 16}em) {
          ${css(...args)}
        }
      `
        };
    }, {});