import React, { useEffect, useState } from 'react';

//import db from '../../../db.json';
import Widget from '../../components/Widget';

import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import Button from '../../components/Button';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';

function LoadingWidget(){
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  )
}

function ResultWidget({ results }){
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
             resultAtual === true ? somatoriaAtual++ : somatoriaAtual
             return somatoriaAtual;
          }, 0)} 
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result_${index}`}>
              {`#${index + 1} Resultado: `} 
              {result === true ? 'Acertou' : 'Errou '} 
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({ 
  question, 
  totalQuestions, 
  questionIndex, 
  onSubmit, 
  addResult 
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = useState();
  const questionId = `questionId_${questionIndex}`
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
 
  return (
    <Widget>
          <Widget.Header>
            <h3>
              {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
            </h3>
          </Widget.Header>
          <img alt="Descrição"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover'
            }} 
             src={question.image} 
            />
          <Widget.Content>
            <h2>
              {question.title}
            </h2>
            <p>
              {question.description}
            </p>

            <AlternativesForm onSubmit={(e) => {
              e.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => {
                addResult(isCorrect)
                onSubmit();
                setIsQuestionSubmited(false);
                setSelectedAlternative(undefined);
              }, 3 * 1000)
            }}>

              {question.alternatives.map((alternative, alternativeIndex) => {
                const alternativeId = `alternative_${alternativeIndex}`
                const alternativeStatus = isCorrect ? 'SUCCESS': 'ERROR';
                const isSelected = selectedAlternative === alternativeIndex;
                return (
                  <Widget.Topic 
                    as="label" 
                    htmlFor={alternativeId} 
                    key={alternativeId}
                    data-selected={isSelected}
                    data-status={isQuestionSubmited && alternativeStatus}
                  >

                    <input 
                      style={{ display: 'none'}}
                      id={alternativeId} 
                      type="radio"
                      name={questionId} 
                      onChange={() => setSelectedAlternative(alternativeIndex)}
                    />
                    {alternative}
                  </Widget.Topic>
                );
               })}
              
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>
              {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
              {isQuestionSubmited && !isCorrect && <p>Você errou...</p>}
            </AlternativesForm>
          </Widget.Content>
        </Widget>
  )
}
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizPage( { externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[currentQuestion];
  const bg = externalBg;

  function addResult(result){
    setResults([
      ...results,
      result
    ])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, []);

  function handleSubmit(){
    const nextQuestion = questionIndex + 1;
    if(nextQuestion < totalQuestions){
      setCurrentQuestion(questionIndex + 1);
    } else {
       setScreenState(screenStates.RESULT)
    }  
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState ===  screenStates.QUIZ && (
          <QuestionWidget 
            question={question} 
            questionIndex = {questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}