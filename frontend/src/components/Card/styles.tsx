import styled from '@emotion/styled'


export const CardGallery = styled.div`
    display:flex;
    gap: 1rem;
    overflow-x:scroll;
    ::-webkit-scrollbar {
        height: 10px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.55); 
    }
    ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`

export const StyledCard = styled.div`
    display:flex;
    flex-direction:column;
    min-width:150px;
    img {
        max-width:100%;
    }

    .title {
        font-weight:bold;
    }
    .desc {
        font-size:14px;
    }
`