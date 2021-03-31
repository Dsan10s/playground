import styled from 'styled-components'

export interface LayoutFlexProps {
  direction?: 'row' | 'row-reverse' | 'column'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'start'
    | 'self-start'
    | 'flex-end'
    | 'end'
    | 'self-end'
    | 'center'
    | 'baseline'
  alignContent?:
    | 'normal'
    | 'flex-start'
    | 'start'
    | 'flex-end'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
  childSpacing?: string | number
  centerAllAxis?: boolean
}

export const LayoutFlex = styled.div<LayoutFlexProps>`
  display: flex;
  ${({ direction }) => {
    if (!direction) {
      return ''
    }

    return `flex-direction: ${direction};`
  }}
  ${({ wrap }) => {
    if (!wrap) {
      return ''
    }

    return `flex-wrap: ${wrap};`
  }}
  ${({ justifyContent, centerAllAxis }) => {
    if (centerAllAxis) {
      return 'justify-content: center;'
    }
    if (!justifyContent) {
      return ''
    }

    return `justify-content: ${justifyContent};`
  }}
  ${({ alignItems, centerAllAxis }) => {
    if (centerAllAxis) {
      return 'align-items: center;'
    }
    if (!alignItems) {
      return ''
    }

    return `align-items: ${alignItems};`
  }}
  ${({ alignContent }) => {
    if (!alignContent) {
      return ''
    }

    return `align-content: ${alignContent};`
  }}

  ${({ direction = 'row', childSpacing }) => {
    if (!childSpacing) {
      return ''
    }

    if (direction === 'row' || direction === 'row-reverse') {
      return `
        & > *:not(:first-child) {
          margin-left: ${mapper(childSpacing)};
        }
      `
    } else if (direction === 'column') {
      return `
        & > *:not(:first-child) {
          margin-top: ${mapper(childSpacing)};
        }
      `
    }
  }}
`

function mapper(val: string | number) {
  return typeof val === 'number' ? `${val}px` : val
}
