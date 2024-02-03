import { Container, Flex } from "@radix-ui/themes";
import {Link} from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Maybe, User } from "../../@Types";
import { signOut, useUser } from "../../redux/userSlice";
import { Modal } from "antd";
import { useCallback } from "react";
const NavbarStyled = styled.nav`
    padding:8px;
    background:black;


    .navbar-username {
        font-weight: bold;
    }
    .navbar-image {
        border: 1px solid black;
        border-radius:9999px;
    }

    .link {
        border-radius:1rem;
        color:black;
        background:white;
        padding:.5rem;
        text-decoration:none;
        cursor:pointer;
    }
    .link-profile {
        display:flex;
        align-items:center;
        gap:.5rem;
        color:white;
        text-decoration: none;
    }
`

const NavbarContainer = styled(Container)`
`

export default function Navbar() {

    const user = useUser()
    const dispatch = useDispatch<AppDispatch>()

    const startSignOutDialog = () => {
        Modal.confirm({
            title: "Sign out",
            content:"Are you sure you want to sign out",
            onOk:() =>  {
                dispatch(signOut())
            },
            okText:"Sign out"
        })
    }

    const NavbarUserControls = useCallback(() => {
        if(user) {
            return <Flex gap={'4'} align={'center'}>
                <Link className="link-profile" to="/auth/profile">
                    <img src={user.image} className="navbar-image" width={30} height={30}/>
                    <p className="navbar-username">{user.email}</p>
                </Link>
                <div className="link" onClick={startSignOutDialog}>Sign out</div>
        </Flex>
        }

        return <Flex gap={'4'}>
        <Link className="link" to="/auth/signin">Sign in</Link>
        <Link className="link" to="/auth/signup">Sign up</Link>
    </Flex>
    }, [user])

    return <NavbarStyled>
            <NavbarContainer>
                <NavbarUserControls/>
            </NavbarContainer>   
    </NavbarStyled>
}