import styled from "@emotion/styled"
import { User } from "../../@Types"
import LoggedInGuard from "../../guards/LoggedInGuard"
import { updateUserImage, useUser } from "../../redux/userSlice"
import { Flex, Separator } from "@radix-ui/themes"
import PlaylistList from "../../components/PlaylistList/PlaylistList"
import { ChangeEvent, ChangeEventHandler, EventHandler, FormEvent } from "react"
import { Modal, message } from "antd"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"



const ProfileStyle = styled.div`
 h1 {
    font-size:48px;
 }
 .profile-user-name {
    margin:0;
    padding:0;
 }
 .profile-image-name {
    transform: translateY(-20px);
 }
 .profile-image-name label {
    transform: translateY(-5px);
    color:lightgray;
    opacity:0.8;
    cursor: pointer;
 }
 .profile-image-name input {
    display:none;
 }

 .profile-image  {
    
    border: 1px solid black;
    border-radius:9999px;
 }
`
function Profile() {

    const user = useUser() as User
    const dispatch = useDispatch<AppDispatch>()

    const onSubmitNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const imageFile = e.target.files[0]

        Modal.confirm({
            content:"Are you sure you want to change your profile image?",
            okText: "Save changes",
            onOk: async () => {
                try {await dispatch(updateUserImage({imageFile, userEmail: user.email})) } catch(e:any) { message.error(e) }
            }
        })
    }

    return <ProfileStyle>
           <Flex direction={'row'} align={'center'} gap={'4'}>
            <img src={user.image} className="profile-image" width={100} height={100}/>
            <Flex className="profile-image-name"  direction={'column'}>
                <h1 className="profile-user-name">{user.name}</h1>
                <label htmlFor="fileInput">Edit profile image</label>
                <input type="file" id="fileInput" onChange={onSubmitNewImage}/>
            </Flex>
           </Flex>
            <h1>My Playlists</h1>
           <br/>

           <PlaylistList/>
    </ProfileStyle>
}

export default LoggedInGuard(Profile)