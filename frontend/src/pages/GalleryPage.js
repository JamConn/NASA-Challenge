import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

function GalleryPage() {
    const [epicImages, setEpicImages] = useState([]);
    const [marsImages, setMarsImages] = useState([]);
    const [currentEpicIndex, setCurrentEpicIndex] = useState(0);
    const [currentMarsIndex, setCurrentMarsIndex] = useState(0);
    const [loadingEpic, setLoadingEpic] = useState(true);
    const [loadingMars, setLoadingMars] = useState(true);
    const [errorEpic, setErrorEpic] = useState(null);
    const [errorMars, setErrorMars] = useState(null);

    useEffect(() => {
        fetchEpicImages();
        fetchMarsImages();
    }, []);

    useEffect(() => {
        const epicInterval = setInterval(() => {
            setCurrentEpicIndex((prevIndex) => (prevIndex + 1) % epicImages.length);
        }, 3000);

        return () => clearInterval(epicInterval);
    }, [epicImages.length]);

    const fetchEpicImages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/epic-images');
            setEpicImages(response.data);
            setLoadingEpic(false);
        } catch (error) {
            setErrorEpic('Error fetching EPIC images');
            setLoadingEpic(false);
        }
    };

    const fetchMarsImages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mars-rover-images'); 
            setMarsImages(response.data);
            setLoadingMars(false);
        } catch (error) {
            setErrorMars('Error fetching Mars Rover images');
            setLoadingMars(false);
        }
    };

    if (loadingEpic) return <p>Loading EPIC images...</p>;
    if (loadingMars) return <p>Loading Mars Rover images...</p>;

    const currentEpicImage = epicImages[currentEpicIndex];
    const currentMarsImage = marsImages[currentMarsIndex];

    return (
        <Container>

            <h2>Earth</h2>
            {currentEpicImage && (
                <Card>
                    <CardMedia
                        component="img"
                        height="700"
                        image={`https://epic.gsfc.nasa.gov/archive/natural/${currentEpicImage.date.split(" ")[0].split("-").join("/")}/png/${currentEpicImage.image}.png`}
                        alt="EPIC Image"
                    />

                </Card>
            )}

            <h2>Mars Rover</h2>
            {currentMarsImage && (
                <Card>
                    <CardMedia
                        component="img"
                        height="700"
                        image={currentMarsImage.img_src}
                        alt="Mars Rover"
                    />
                    <CardContent>
                        <Typography variant="h5" >Date: {currentMarsImage.earth_date}</Typography>
                    </CardContent>
                </Card>
            )}
            
            <Button onClick={() => setCurrentMarsIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : marsImages.length - 1))}>
                Previous Image
            </Button>
            <Button onClick={() => setCurrentMarsIndex((prevIndex) => (prevIndex + 1) % marsImages.length)}>
                Next Image
            </Button>
        </Container>
    );
}

export default GalleryPage;