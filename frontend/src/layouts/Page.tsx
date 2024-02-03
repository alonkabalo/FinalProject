import { Container } from "@radix-ui/themes"
import styled from '@emotion/styled'
export default styled.div<{no_padding_page:boolean}>`
    padding :${props => props.no_padding_page ? '0px': '1rem'};
`