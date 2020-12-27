import { QuestionType, QuizType } from './../Types/quiz_types';

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5) //it is used to shuffle an array

export const getQuizDetails = async (totalQuestions: number, level: string): Promise<QuizType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    let { results } = await res.json();
    const quiz: QuizType[] = results.map((questionObj: QuestionType) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer)) // here in options first inocreect options are concated with right answer, hence completing all options then shuffle the array.
        }
    })
    return quiz;
}