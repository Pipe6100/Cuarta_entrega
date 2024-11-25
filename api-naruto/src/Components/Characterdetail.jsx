import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import { db } from '../Firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Swal from 'sweetalert2';
import './CharacterDetail.css';
import Loading from './Loading';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://dattebayo-api.onrender.com/characters/${id}`);
                console.log("Datos del personaje:", response.data); 
                setCharacter(response.data);
            } catch (error) {
                console.error("Error fetching character:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    const handleFavorite = async () => {
        if (character) {
            const result = await Swal.fire({
                title: '¿Agregar a favoritos?',
                text: "¿Deseas continuar?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#FF6D00',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, agregar',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                try {
                    await addDoc(collection(db, 'favorites'), {
                        name: character.name,
                        birthday: character.personal.birthdate,
                    });

                    Swal.fire({
                        title: '¡Agregado!',
                        text: 'El personaje ha sido agregado a tus favoritos.',
                        icon: 'success',
                        confirmButtonColor: '#FF6D00',
                        confirmButtonText: 'Ver Favoritos'
                    }).then(() => {
                        navigate('/favorites');
                    });
                } catch (error) {
                    console.error("Error al agregar a favoritos:", error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al agregar el personaje. Inténtalo nuevamente.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'Cerrar'
                    });
                }
            }
        }
    };

    if (loading) return <Loading />;

    return (
        <Container maxWidth="md" className="character-detail-container">
            <Link to="/" className="back-button">← Regresar</Link>
            <Typography variant="h3" className="character-title">{character.name}</Typography>
            
            {}
            <Carousel showThumbs={false} className="character-carousel">
                {character.images && character.images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={character.name} />
                    </div>
                ))}
            </Carousel>
            
            <div className="button-info-container">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFavorite}
                    startIcon={<FavoriteIcon />}
                    className="favorite-button"
                >
                    Agregar a Favoritos
                </Button>
            </div>
    
            
            <div className="character-info">
                <Typography variant="body1" color="text.secondary">
                    Cumpleaños: {character.personal.birthdate ? character.personal.birthdate : "No disponible"}
                </Typography>
            </div>
    
            <div className="character-info">
                <Typography variant="body1" color="text.secondary">
                    Género: {character.personal.sex ? character.personal.sex : "No disponible"}
                </Typography>
            </div>
    
            <div className="character-info">
                <Typography variant="body1" color="text.secondary">
                    Madre: {character.family?.mother ? character.family.mother : "No disponible"}
                </Typography>
            </div>
    
            <div className="character-info">
                <Typography variant="body1" color="text.secondary">
                    Padre: {character.family?.father ? character.family.father : "No disponible"}
                </Typography>
            </div>
    
            <div className="character-info">
                <Typography variant="body1" color="text.secondary">
                    Debut en Manga: {character.debut?.manga ? character.debut.manga : "No disponible"}
                </Typography>
            </div>
    
            <div className="character-info">
                <Typography variant="body1" color="text.secondary">
                    Registro Ninja: {character.rank?.ninjaRegistration ? character.rank.ninjaRegistration : "No disponible"}
                </Typography>
            </div>
            
        </Container>
    );
    
};

export default CharacterDetail;
