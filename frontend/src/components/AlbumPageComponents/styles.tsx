

import styled from "@emotion/styled";
import { Flex, Grid } from "@radix-ui/themes";


export const AlbumHeaderStyle = styled(Grid)`
    width: 100%;    
    margin-block:1rem;
    margin-inline:1rem;
    padding-inline:5rem;
    .blue-gradient,
    .purple-gradient,
    .gold-gradient {
        height:200px;

        i {
            font-size:64px;
            margin:1.5rem;
        }
    }
    img {
        max-width:100%;
        max-height:400px;
        object-fit:contain;
        object-position:center;
    }
    .album-name {
        font-size: 3rem; 
        text-align:end;
        margin-right:1.5rem;
        font-weight:bold;
    }
`