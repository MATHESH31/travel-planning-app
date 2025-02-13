import { Button, Input, InputLabel } from "@mui/material";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState } from "react";

const InputField = ({ setPlaces, setIsLoading }) => {
    const [mood, setMood] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        await getPlaces();
    }
    
    const getPlaces = async () => {
        try {
            let prompt = `Generate a JSON array of only three objects, where each object represents a famous travel destination, suitable for a ${mood} trip, and includes the following properties: 'place', 'bestTime', 'currentClimate' and 'budget' (should be in INR).`;
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const result = await model.generateContent(prompt);

            const placeArray = JSON.parse(result.response.text().substring(8, result.response.text().length - 3));

            const imagePromises = placeArray.map(async (place) => {
                const imageUrl = await getImage(place.place);
                return { ...place, imageUrl };
            });

            const updatedPlaceArray = await Promise.all(imagePromises);

            setPlaces(updatedPlaceArray);
            setIsLoading(false);


        } catch (error) {
            alert(`error: ${error}`);
            console.error(error);
        }
    }

    const getImage = async (placeName) => {
        const unsplashUrl = `https://api.unsplash.com//search/photos?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}&query=`

        try {
            const response = await fetch(unsplashUrl + placeName);
            const data = await response.json();
            return data.results[0].urls.small;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '5%'
        }}>
            <InputLabel sx={{
                fontSize: "30px"
            }}>Enter your mood :</InputLabel>
            <Input type="text" required={true} autoFocus sx={{
                marginLeft: '2%',
                width: '20%'
            }} onChange={(e) => setMood(e.target.value)} />
            <Button onClick={handleClick} variant="contained" sx={{ marginLeft: '2%' }}>Find places</Button>
        </div>
    )
}

export default InputField;