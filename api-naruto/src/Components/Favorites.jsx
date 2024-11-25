import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './Favorites.css';
import Loading from './Loading';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'favorites'));
                const favList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setFavorites(favList);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    if (loading) return <Loading />;

    return (
        <Container maxWidth="md" className="favorites-container">
            <Link to="/" className="back-button">← Regresar</Link>
            <Typography variant="h4" gutterBottom className="favorites-title">Favoritos</Typography>
            {favorites.length === 0 ? (
                <Typography variant="body1" className="no-favorites-text">
                    No hay favoritos agregados aún.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {favorites.map((fav) => (
                        <Grid item xs={12} sm={6} key={fav.id}>
                            <Card className="favorite-card">
                                <CardContent>
                                    <Typography variant="h6" className="favorite-title">{fav.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Cumpleaños: {fav.birthday}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Favorites;
