import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget'; 
import Link from '../src/components/Link'; 
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';

export default function Home(){
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: .5 }}
            variants={{
              show: {opacity: 1},
              hidden: { opacity: 0},
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={e => {
                e.preventDefault();
                router.push(`/quiz?name=${name}`)
                // router manda para a próxima página
              }}>
                <Input 
                  name="nomeDoUsuario"
                  onChange={e => {
                  setName(e.target.value)
                 }} 
                  placeholder="Escreva aqui seu nome"
                />

                <Button 
                  type="submit" 
                  name={name} 
                  disabled={name.length === 0}>
                  Jogar
                </Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
             as={motion.section}
             transition={{ delay: .5, duration: .5 }}
             variants={{
               show: {opacity: 1, y: '0'},
               hidden: { opacity: 0, y: '100%' },
             }}
             initial="hidden"
             animate="show"
          >
            <Widget.Header>
              <h1>Quizes da Galera</h1>
            </Widget.Header>
            <Widget.Content>
              <ul>
                 {db.external.map((linkExterno) => {
                   const [projectName, gitHubUser] = linkExterno
                      .replace(/https:\/\//g, '')
                      .replace(/.vercel.app\//g,'')
                      .split('.')
                return (
                  <li key={linkExterno}>
                    <Widget.Topic 
                      as={Link}
                      href={`/quiz/${projectName}___${gitHubUser}`}
                    >
                      {`${gitHubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
              </ul>
             
            </Widget.Content>
          </Widget>
          <Footer 
             as={motion.section}
             transition={{ delay: 1.5, duration: .5 }}
             variants={{
               show: {opacity: 1},
               hidden: { opacity: 0},
             }}
             initial="hidden"
             animate="show"
          />
      </QuizContainer>
      <GitHubCorner projectUrl="teste"/>
    </QuizBackground>
  )
}
