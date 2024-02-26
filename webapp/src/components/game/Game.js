import React, { useState, useRef, useEffect } from 'react';
import {Button, Box, Container, CssBaseline,Typography,} from "@mui/material";
import './Game.css';

export const Game = () => {
    const token = "eyDVhZGFkODgtMjUyiaWTQQ8";

    const [pregunta, setPregunta] = useState(null);
    const [respuestas, setRespuestas] = useState(null);
    const [correcta, setCorrecta] = useState(null);

    const boxRefs = useRef([]);

    const startNewGame = async () => {
        try {
          const response = await fetch("/api/game/new", {
            "token": token 
          });
  
          const result = await response.json();
        } catch (error) {
          console.error("Error al obtener datos de la API:", error);
        }
    };

    const nextQuestion = async () => {
        try {
          const response = await fetch("/api/game/next", {
            "token": token 
          });
  
          const result = await response.json();
          setPregunta(result.title);
          setRespuestas(result.awnsers);
        } catch (error) {
          console.error("Error al obtener datos de la API:", error);
        }
    };

    const awnser = async (awnser) => {
        try {
          const response = await fetch("/api/game/awnser", {
            "token": token,
            "awnser": "Arzew"
          });
  
          const result = await response.json();
          setCorrecta(result);
        } catch (error) {
          console.error("Error al obtener datos de la API:", error);
        }
    };

    const comprobarPregunta = () => {

        boxRefs.current.forEach((boxRef, indice) => {
            if(boxRef.dataset.state === "selected"){
                if(boxRef.dataset.question === correcta){
                    alert("Pregunta acertada");
                }else{
                    alert("Pregunta fallada");
                }
                boxRef.dataset.state = "unselected";
            }
        });


        nextQuestion();
        awnser();
    };

    const seleccionarRespuesta = (element) => {
        boxRefs.current.forEach((boxRef, indice) => {
            boxRef.dataset.state = "unselected";
        });
        
        element.target.dataset.state = "selected";

    };

    startNewGame();
    nextQuestion();
    awnser();

  return (
    <Container
        component="main"
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
        className="min-h-screen flex justify-center align-middle"
    >
        <Container
            className="bg-white rounded-lg"
            component="main"
            maxWidth="sm"
        >
            <CssBaseline />
            <Box
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    {pregunta}
                </Typography>
            </Box>
            <Box sx={{
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ul>
                    {
                        respuestas.map((respuesta, indice) => {
                            return (
                                <Box data-question={respuesta} data-state='unselected'
                                 sx={{
                                    padding: 1,
                                    margin: 1,
                                    border: '2px solid blue',
                                    borderRadius: '10px',
                                }}
                                onClick={e => seleccionarRespuesta(e)}
                                ref={(e) => (boxRefs.current[indice] = e)}
                            >
                                <li key={indice}>
                                {respuesta}
                                </li>
                            </Box>
                            
                            )
                        })
                    }
                </ul>
            </Box>
            <Box sx={{
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "right",
                }}
            >
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ e => comprobarPregunta()}
                >
                    Comprobar
                </Button>
            </Box>
        </Container>
    </Container>
  )
}

export default Game;