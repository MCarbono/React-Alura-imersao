import React from 'react';
import QuizScreen from '../../src/screens/Quiz';
import { ThemeProvider } from 'styled-components';

export default function QuizDaGaleraPage({ dbExterno }){
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                bg={dbExterno.bg}
            />
        </ThemeProvider>
        );
}

export async function getServerSideProps(context){
    const [projectName, gitHubUser] = context.query.id.split('___')
   
    try {
        const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
        .then((respostaDoServer) => {
            if(respostaDoServer.ok){
                return respostaDoServer.json();
            }
            throw new Error('Falha em pegar os dados');
    
        }).then((respostaConvertidaEmObjeto) =>  respostaConvertidaEmObjeto)
        .catch((err) => {
            console.log(err);
        });
    
        console.log('dbExterno', dbExterno);
    
        return {
            props: {
                dbExterno,
            },
        };
    } catch(err){
        throw new Error(err);
    }
}