import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import {Link} from 'react-router-dom'
import styled from '@emotion/styled'
import { useUser } from "../../redux/userSlice";
import { ListBulletIcon } from '@radix-ui/react-icons'

const SideMenuStyled = styled(Grid)`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    .inner {
        margin-inline:.5rem;
        padding:1rem;

    }
    .top {
    }
        
    .link {
        text-decoration:none;
        color:white;
    }

    .bottom {
        color:white;
        position:absolute;
        bottom:0;
        width:100%;
        text-align:center;
        padding:2rem;
        font-weight: bold;
    }

    i {
        color:white;
    }
`

export default function SideMenu() {
    const user = useUser()
    return <Container height={'100%'} style={{position:'relative'}}>
        <SideMenuStyled rows={'30% 70%'}>
            <Box className="top" >
                <Flex className="inner" direction={'column'} align={'start'} gap={'4'}>
                    <Flex direction={'row'} gap={'3'} align={'center'}>
                        <i className="fas fa-normal fa-house"></i>
                        <Link className="link" to="/">Home page</Link>
                    </Flex>

                    <Flex direction={'row'} gap={'3'} align={'center'}>
                        <i className="fas fa-normal fa-search"></i>
                        <Link className="link" to="/search">Search page</Link>
                    </Flex>

                    
                    {user  && <>
                    
                        <Flex direction={'row'} gap={'3'} align={'center'}>
                         <i className="fa-solid fa-heart"></i>
                         <Link className="link" to="/favorites">Favorites</Link>
                         </Flex>
                        <Flex direction={'row'} gap={'3'} align={'center'}>
                            <ListBulletIcon color="white"/>
                            <Link className="link" to="/playlists">Playlists</Link>
                        </Flex>
                    </>}
                </Flex>
            </Box>

            <Box className="bottom">
                &copy; 2024. Alon Kabalo. All rights reserved.
            </Box>

            </SideMenuStyled>
    </Container>
}