import React, {useState} from 'react'
import Layout from '../components/Layout'
import { supabase } from '../database/Database'
import {useAuth} from '../Auth/auth'

const Profile = () => {
    const auth = useAuth();
    const [image, setImage] = useState(null)
    const [username, setUsername] = useState("")
    const [website, setWebsite] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [message, setMessage] = useState("")

    // This method stores the file in a bucket 
    // Then it saves the url in the profile table 
    const handleSubmit = async (e) => {
        e.preventDefault()
        let avatarUrl = ""


        if(image) {
            const {data, error} = await supabase.storage.from("avatars").upload(`${Date.now()}_${image.name}`, image)

            if(error) {
                console.log(error)
            }
            if(data) {
                setAvatarUrl(data.Key)
                avatarUrl = data.Key
                console.log(data)
            }
        }

        // With upsert, if profile exist it updates it and if not it will insert a new row
        const {data, error} = await supabase.from("profiles").upsert({
            id: auth.user.id,
            username: username,
            website: website,
            avatar_url: avatarUrl
        })

        if(error){
            console.log(error)
        }
        if(data){
            setMessage("Profile has been updated!")
        }



    }

    return (
        <Layout>
            {message && message}

            <h1>Profile</h1>

            {avatarUrl ? <img src={`https://vkmtcvqheexcvbnvlamo.supabase.co/storage/v1/object/public/${avatarUrl}`} width={200} alt=""/> : "No avatar set"}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="avatar">Choose Avatar: </label>
                    <input 
                        type="file" 
                        accept={"img/*"}
                        onChange={e => setImage(e.target.files[0])}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        onChange={e => setUsername(e.target.value)} 
                        value={username} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input 
                        type="text" 
                        onChange={e => setWebsite(e.target.value)} 
                        value={website}
                    />
                    
                </div>
                <div className="form-group">
                    <button type={"submit"}> Save Profile! </button>
                </div>
            </form>
        </Layout>
    )
}

export default Profile
