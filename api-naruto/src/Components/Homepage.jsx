import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Loading from './Loading';

const HomePage = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get('https://dattebayo-api.onrender.com/characters');
                if (Array.isArray(response.data.characters)) {
                    setCharacters(response.data.characters);
                } else {
                    console.error("La respuesta no contiene un array en 'characters':", response.data);
                    setCharacters([]);
                }
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) return <Loading />;

    return (
        <Container maxWidth="lg" className="home-container">
            <div className="header-container">
                <Typography variant="h4" className="home-title">
                    Personajes de Naruto
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/favorites"
                    className="favorite-link-button"
                >
                    Ver Favoritos
                </Button>
            </div>
            <Grid container spacing={3}>
                {characters.map((character) => (
                    <Grid item xs={12} key={character.id}>
                        <Card className="character-card-horizontal">
                            <CardMedia
                                component="img"
                                className="character-image-horizontal"
                                image={character.images[0]}
                                alt={character.name}
                            />
                            <CardContent className="character-content-horizontal">
                                <div className="character-name-container">
                                    <Typography variant="h6" className="character-name">
                                        {character.name}
                                    </Typography>
                                </div>
                                <Button
                                    variant="contained"
                                    className="detail-button"
                                    component={Link}
                                    to={`/character/${character.id}`}
                                >
                                    Ver Detalles
                                </Button>
                            </CardContent>



                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;