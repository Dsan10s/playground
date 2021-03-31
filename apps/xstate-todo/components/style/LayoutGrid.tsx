import styled from 'styled-components'

export interface LayoutGridProps {
  columns?: (string | number)[]
  rows?: (string | number)[]
  columnGap?: string | number
  rowGap?: string | number
  centerVertically?: boolean
  centerHorizontally?: boolean
  template?: string[][]
}

export const LayoutGrid = styled.div<LayoutGridProps>`
  display: grid;
  height: 100%;
  ${({ columns }) => {
    const cssVal = columns?.length
      ? columns.map(mapper).join(' ')
      : mapper('1fr')
    return `grid-template-columns: ${cssVal};`
  }}
  ${({ rows }) => {
    const cssVal = rows?.length ? rows.map(mapper).join(' ') : mapper('1fr')
    return `grid-template-rows: ${cssVal};`
  }}
  ${({ columnGap }) => {
    if (columnGap === undefined) {
      return ''
    }
    const cssVal = mapper(columnGap)
    return `grid-column-gap: ${cssVal};`
  }}
  ${({ rowGap }) => {
    if (rowGap === undefined) {
      return ''
    }
    const cssVal = mapper(rowGap)
    return `grid-row-gap: ${cssVal};`
  }}
  ${({ centerVertically }) => (centerVertically ? 'align-items: center;' : '')}
  ${({ centerHorizontally }) =>
    centerHorizontally ? 'justify-content: center;' : ''}
  ${({ template }) => {
    if (template === undefined) {
      return ''
    }
    const templateString = template.map((s) => `"${s.join(' ')}"`).join('\n')
    return `grid-template-areas: ${templateString};`
  }}
`

function mapper(val: string | number) {
  if (val === '1fr') {
    return 'minmax(0, 1fr)'
  }
  return typeof val === 'number' ? `${val}px` : val
}
