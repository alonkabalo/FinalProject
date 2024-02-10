import { Box, Flex, Grid } from '@radix-ui/themes';
import './App.css';
import { Routes,Route,Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideMenu from './components/Sidemenu';
import AuthPage from './pages/auth';
import SignInPage from './pages/auth/SignIn';
import SignUpPage from './pages/auth/SignUp';
import Home from './pages/home';
import FullScreen from './components/UtilComponents/FullScreen';
import SearchPage from './pages/search';
import Page from './layouts/Page';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { getUser } from './redux/userSlice';
import { Maybe, SpotifySearch } from './@Types';
import NotFound from './pages/notfound';
import { searchAlbumsAction } from './redux/spotifySearchSlice';
import AlbumPage from './pages/albums';
import FavoritesPage from './pages/favorites';
import ShareDialog from './components/ShareDialog/ShareDialog';
import PlaylistsDialog from './components/PlayListsDialog/PlaylistsDialog';
import AddPlaylistsDialog from './components/AddPlayListDialog/AddPlaylistsDialog';
import PlaylistListPage from './pages/playlists';
import PlaylistPage from './pages/playlist';
import Profile from './pages/auth/Profile';
import AboutPage from './pages/about/About';
import UserManagementPage from './pages/management/UserManagementPage';


const no_padding_pages = [
  "/albums"
]

const isNoPaddingPage = (path:string) => {
  for(var p of no_padding_pages) {
    if(path.includes(p))
      return true
  }
  return false
}
function App() {

  const token = useSelector<RootState, Maybe<string>>(state => state.userSlice.token)

  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  useEffect(() => {
    if(token) {
      dispatch(getUser())
    }
  },[token])




  return (
    <FullScreen>

    <ShareDialog/>
    <PlaylistsDialog/>
    <AddPlaylistsDialog/>
    <Grid columns={"minmax(325px, 30%) minmax(0, 70%)"} height={'100%'}>
     {/** Menu - appears in all pages */}
    <Box style={{background:'black'}} height={'100%'}>
      <SideMenu/>
    </Box>
     {/** Main Content - All website page content */}
      <Box className='main-content'>
        <Navbar/>
        <Page no_padding_page={isNoPaddingPage(location.pathname)} >
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='/auth' element={<AuthPage/>}>
              <Route path='signin' element={<SignInPage/>}/>
              <Route path='signup' element={<SignUpPage/>}/>
              <Route path='profile' element={<Profile/>}/>
            </Route>

            <Route path="/user-management" element={<UserManagementPage/>}/>
            <Route path='/search' element={<SearchPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/favorites' element={<FavoritesPage/>}/>
            <Route path='/playlists' element={<PlaylistListPage/>}/>
            <Route path='/playlist/:playListId' element={<PlaylistPage/>}/>
            <Route path='/albums/:albumId/:word' element={<AlbumPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Page>
      </Box>
  
    </Grid>
    </FullScreen>
  );
}

export default App;
