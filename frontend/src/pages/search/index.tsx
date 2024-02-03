import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import closeIcon from '../../assets/images/icons8-close-50.png'
import searchIcon from '../../assets/images/icons8-search-50.png'
import { TextField } from "@radix-ui/themes"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Maybe, SpotifySearch } from "../../@Types"
import { search } from "../../services/spotifyService"
import MultiSearchResults from "../../components/MultiSearchResults/MultiSearchResults"
import { debounce } from "../../utils"


export const SearchInput = styled.div`
    background:rgba(50,50,50,0.5);
    border-radius:9999px;
    position:relative;
    &:hover {
        outline:1px solid gray;
    }
    width:fit-content;
    input {
        padding: 1rem;
        border:1px solid transparent;
        color:white;
        border-radius:9999px;
        &:focus {
            outline:none;
        }
        &:placeholder {
            color:white;
        }
        &:focus {
            outline:1px solid white;
        }
        position:relative;
        padding-left:48px;
        padding-right:40px;
        background:transparent;
    }
    .search-icon {
        width:20px;
        height:20px;
        position:absolute;
        top:calc(50% - 10px);
        left: 20px;
    }
    .close-icon {
        width:1rem;
        height:1rem;
        position:absolute;
        top:calc(50% - .5rem);
        right: 1rem;
        cursor:pointer;
    }
   
`

export default function SearchPage() {
    const [searchText,setSearchText] = useState<string | undefined>()
    const ref = useRef<HTMLInputElement | null>(null)
    const onSearch = (e:React.FormEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value
        if(query) {
            setSearchText(query)
        } else {
            setSearchText(undefined)
        }
    }


    
    const [searchResults,setSearchResults] = useState<Maybe<SpotifySearch.MultiSearch.SearchResults>>()
   

    const [{activate: submitSearch}] = useState(() => debounce(search)) 
    const [searching,setSearching] = useState(false)
    useEffect(() => { 
        if(searchText) {
            const searchSubmit = () => {
                submitSearch(searchText, (results) => {
                    if(results) {
                        setSearchResults(results)
                        setSearching(false)
                    }
                });
            }
            setSearching(true)
            searchSubmit()
        }else {
            setSearchResults(undefined)
        }
    }, [searchText])


    return <div>

        <SearchInput>
            <input type="text"
            ref={ref}
            name="song-name" id="song-name-input" 
            placeholder="Search something.."
            required onInput={onSearch}/> 
            <MagnifyingGlassIcon className="search-icon"/>
            {searchText && <img src={closeIcon} className="close-icon" onClick={() =>{
                 setSearchText(undefined);
                 if(ref.current)
                    ref.current.value = ""
            }}/>}
        </SearchInput>
            <br/>
            <MultiSearchResults results={searchResults} searching={searching}/>
    </div>
}