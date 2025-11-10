import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getFirestore, collection, addDoc, getDocs, 
    onSnapshot, doc, updateDoc, deleteDoc, orderBy, query 
} from 'firebase/firestore';

// ---------------------------------------------------------------------
// CONFIGURAÇÃO DO FIREBASE
// ---------------------------------------------------------------------
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// COLOQUE AQUI AS CREDENCIAIS DO SEU PROJETO FIREBASE
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const textsCollectionRef = collection(db, "texts");
const resultsCollectionRef = collection(db, "results");

// ---------------------------------------------------------------------
// COMPONENTE PRINCIPAL: App
// ---------------------------------------------------------------------
export default function App() {
    // Estado para controlar a "rota" ou "tela" atual
    const [view, setView] = useState('HOME'); // HOME, ALUNO_NAME_ENTRY, ALUNO_EXAM, ALUNO_RESULTS, PROFESSOR_DASHBOARD
    
    // Estado global da aplicação
    const [studentName, setStudentName] = useState('');
    const [lastResult, setLastResult] = useState(null);

    // Roteador simples
    const renderView = () => {
        switch (view) {
            case 'HOME':
                return <HomeScreen setView={setView} />;
            case 'ALUNO_NAME_ENTRY':
                return <AlunoNameEntry setView={setView} setStudentName={setStudentName} />;
            case 'ALUNO_EXAM':
                return <AlunoExam setView={setView} studentName={studentName} setLastResult={setLastResult} />;
            case 'ALUNO_RESULTS':
                return <AlunoResults setView={setView} lastResult={lastResult} />;
            case 'PROFESSOR_DASHBOARD':
                return <ProfessorDashboard setView={setView} />;
            default:
                return <HomeScreen setView={setView} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Navbar />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
                {renderView()}
            </main>
        </div>
    );
}

// ---------------------------------------------------------------------
// COMPONENTES AUXILIARES
// ---------------------------------------------------------------------

/**
 * Navbar superior
 */
function Navbar() {
    return (
        <nav className="bg-[#0C2340] shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-white text-xl font-bold">Simulados PósCom UFBA</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

/**
 * Tela Inicial: Seleção de Aluno ou Professor
 */
function HomeScreen({ setView }) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#0C2340] mb-6">Plataforma de Simulados</h1>
            <p className="text-lg text-gray-700 mb-8">Por favor, selecione seu perfil para continuar:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={() => setView('ALUNO_NAME_ENTRY')}
                    className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors"
                >
                    👨‍🎓 Sou Aluno
                </button>
                <button
                    onClick={() => setView('PROFESSOR_DASHBOARD')}
                    className="w-full sm:w-auto bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-800 transition-colors"
                >
                    👩‍🏫 Sou Professor
                </button>
            </div>
        </div>
    );
}

/**
 * Tela 2: Aluno insere o nome
 */
function AlunoNameEntry({ setView, setStudentName }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length < 3) {
            setError('Por favor, insira seu nome completo.');
            return;
        }
        setStudentName(name.trim());
        setView('ALUNO_EXAM');
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-[#0C2340] mb-6">Iniciar Simulado</h2>
            <p className="text-gray-700 mb-4">Seu nome será usado para registrar sua nota no final.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        id="studentName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Clara Santos"
                    />
                </div>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-[#007A33] text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-90 transition-colors"
                >
                    Começar
                </button>
                <button
                    onClick={() => setView('HOME')}
                    className="w-full mt-4 bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Voltar
                </button>
            </form>
        </div>
    );
}

/**
 * Tela 3: Aluno fazendo o exame
 */
function AlunoExam({ setView, studentName, setLastResult }) {
    const [loading, setLoading] = useState(true);
    const [texts, setTexts] = useState([]); // Os 4 textos sorteados
    const [allQuestions, setAllQuestions] = useState([]); // Array de 20 questões
    const [currentQ, setCurrentQ] = useState(0); // Índice da questão atual (0-19)
    const [timer, setTimer] = useState(270); // 4:30 minutos
    const [userAnswers, setUserAnswers] = useState(Array(20).fill(null));
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState('');

    // Hook para carregar os textos do DB
    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const querySnapshot = await getDocs(textsCollectionRef);
                let allTexts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                if (allTexts.length < 4) {
                    setError('Não há textos suficientes no banco de dados. Contate o professor.');
                    setLoading(false);
                    return;
                }
                
                // Embaralhar e pegar 4 textos
                const shuffled = allTexts.sort(() => 0.5 - Math.random());
                const selectedTexts = shuffled.slice(0, 4);
                setTexts(selectedTexts);

                // Achatar as 20 questões
                let flatQuestions = [];
                selectedTexts.forEach((text, textIndex) => {
                    text.questions.forEach((q, qIndex) => {
                        flatQuestions.push({
                            ...q,
                            textId: text.id,
                            textContent: text.text_content,
                            textTitle: `TEXTO ${textIndex + 1}`
                        });
                    });
                });
                setAllQuestions(flatQuestions);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar textos:", err);
                setError('Erro ao carregar o simulado. Tente novamente.');
                setLoading(false);
            }
        };
        fetchTexts();
    }, []);

    // Hook para o timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    handleNextQuestion(true); // true = time ran out
                    return 270;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval); // Limpa o timer
    }, [currentQ]);

    // Função para avançar ou finalizar
    const handleNextQuestion = (isTimeout = false) => {
        // 1. Salvar a resposta
        let answer = null;
        if (isTimeout) {
            answer = 'TIMEOUT';
        } else if (selectedOption) {
            answer = selectedOption;
        }
        
        const newAnswers = [...userAnswers];
        newAnswers[currentQ] = answer;
        setUserAnswers(newAnswers);

        // 2. Limpar seleção
        setSelectedOption(null);

        // 3. Avançar ou Finalizar
        if (currentQ < 19) {
            setCurrentQ(prev => prev + 1);
            setTimer(270); // Reseta o timer
        } else {
            // Chegou ao fim
            finishExam(newAnswers);
        }
    };

    // Função para finalizar o exame
    const finishExam = async (finalAnswers) => {
        setLoading(true); // Mostrar loading
        let correctCount = 0;
        
        const details = allQuestions.map((q, index) => {
            const isCorrect = (finalAnswers[index] === q.correct_option);
            if (isCorrect) correctCount++;
            return {
                question_text: q.question,
                answered: finalAnswers[index],
                correct_option: q.correct_option,
                is_correct: isCorrect
            };
        });

        const score = correctCount * 0.5;
        const resultData = {
            student_name: studentName,
            score: score,
            correct: correctCount,
            wrong: 20 - correctCount,
            date: new Date(),
            details: details
        };

        // Salvar no Firestore
        try {
            await addDoc(resultsCollectionRef, resultData);
            setLastResult(resultData); // Passa o resultado para a próxima tela
            setView('ALUNO_RESULTS');
        } catch (err) {
            console.error("Erro ao salvar resultado:", err);
            setError("Erro ao salvar seu resultado. Tente novamente.");
            setLoading(false);
        }
    };

    // --- Renderização ---
    
    if (loading) {
        return <div className="text-center text-lg font-semibold">Carregando simulado...</div>;
    }
    
    if (error) {
        return (
            <div className="text-center text-red-600 font-semibold p-8 bg-white rounded-lg shadow-xl">
                <p>{error}</p>
                <button
                    onClick={() => setView('HOME')}
                    className="mt-4 bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Voltar
                </button>
            </div>
        );
    }
    
    if (allQuestions.length === 0) return null; // Ainda carregando

    const q = allQuestions[currentQ];
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Coluna do Texto */}
            <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                    <h2 className="text-xl font-bold text-[#0C2340] mb-4 border-b pb-2">{q.textTitle}</h2>
                    <div className="prose max-w-none h-96 overflow-y-auto pr-2" dangerouslySetInnerHTML={{ __html: q.textContent.replace(/\n/g, '<br />') }}>
                    </div>
                </div>
            </div>
            
            {/* Coluna da Questão */}
            <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-[#0C2340]">Questão {currentQ + 1} de 20</span>
                        <div className="text-xl font-bold text-red-600">
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-lg text-gray-800 mb-4">{q.question}</p>
                        <div className="space-y-3">
                            {q.options.map((option, index) => {
                                const letter = String.fromCharCode(65 + index); // A, B, C...
                                return (
                                    <label key={index} className={`flex items-center p-3 rounded-md border cursor-pointer ${selectedOption === letter ? 'bg-blue-100 border-blue-400' : 'border-gray-200 hover:bg-gray-100'}`}>
                                        <input
                                            type="radio"
                                            name={`question_${currentQ}`}
                                            value={letter}
                                            checked={selectedOption === letter}
                                            onChange={() => setSelectedOption(letter)}
                                            className="mr-3"
                                        />
                                        <span className="text-gray-800"><span className="font-semibold">({letter})</span> {option}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={() => handleNextQuestion(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                        >
                            {currentQ === 19 ? 'Finalizar Prova' : 'Próxima Questão'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Tela 4: Aluno vê o resultado
 */
function AlunoResults({ setView, lastResult }) {
    if (!lastResult) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto text-center">
                <p>Erro ao carregar o resultado.</p>
                <button
                    onClick={() => setView('HOME')}
                    className="mt-4 bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Voltar ao Início
                </button>
            </div>
        );
    }

    const { score, correct } = lastResult;
    const passed = score >= 7.0;

    return (
        <section className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Simulado Finalizado!</h2>
            
            <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? `✅ Aprovado(a)!` : `⚠️ Reprovado(a)`}
            </div>
            
            <div className={`text-6xl font-extrabold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {score.toFixed(1)}
            </div>
            
            <p className="text-lg text-gray-700 mb-6">
                Você acertou {correct} de 20 questões.
            </p>
            
            <button 
                onClick={() => setView('HOME')} 
                className="bg-[#0C2340] text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-opacity-90 transition-colors"
            >
                Voltar ao Início
            </button>
        </section>
    );
}

// ---------------------------------------------------------------------
// COMPONENTES DO PROFESSOR
// ---------------------------------------------------------------------

/**
 * Dashboard Principal do Professor (com abas)
 */
function ProfessorDashboard({ setView }) {
    const [tab, setTab] = useState('TEXTOS'); // TEXTOS, RESULTADOS

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-[#0C2340]">Painel do Professor</h2>
                <button
                    onClick={() => setView('HOME')}
                    className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Voltar
                </button>
            </div>

            {/* Abas */}
            <div className="flex border-b mb-6">
                <button
                    onClick={() => setTab('TEXTOS')}
                    className={`py-2 px-4 font-semibold ${tab === 'TEXTOS' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                    Banco de Textos
                </button>
                <button
                    onClick={() => setTab('RESULTADOS')}
                    className={`py-2 px-4 font-semibold ${tab === 'RESULTADOS' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                    Resultados dos Alunos
                </button>
            </div>

            {/* Conteúdo das Abas */}
            <div>
                {tab === 'TEXTOS' && <ProfessorTexts />}
                {tab === 'RESULTADOS' && <ProfessorResults />}
            </div>
        </div>
    );
}

/**
 * Aba: Gerenciamento de Textos
 */
function ProfessorTexts() {
    const [texts, setTexts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingText, setEditingText] = useState(null); // null =
    const [showForm, setShowForm] = useState(false);

    // Carregar textos (onSnapshot para tempo real)
    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(query(textsCollectionRef, orderBy("title")), (snapshot) => {
            setTexts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            console.error("Erro ao carregar textos: ", error);
            setLoading(false);
        });
        return () => unsubscribe(); // Limpa o listener
    }, []);

    const handleEdit = (text) => {
        setEditingText(text);
        setShowForm(true);
    };
    
    const handleAddNew = () => {
        setEditingText(null); // Limpa o formulário
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este texto e suas 5 questões?")) {
            try {
                await deleteDoc(doc(db, "texts", id));
            } catch (error) {
                console.error("Erro ao deletar texto: ", error);
                alert("Erro ao excluir texto.");
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingText(null);
    };

    if (loading) return <p>Carregando textos...</p>;

    return (
        <div>
            {!showForm ? (
                <>
                    <button
                        onClick={handleAddNew}
                        className="mb-6 bg-[#007A33] text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Adicionar Novo Texto
                    </button>
                    <div className="space-y-4">
                        {texts.map(text => (
                            <div key={text.id} className="border rounded-lg p-4 flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{text.title}</h4>
                                    <p className="text-sm text-gray-600 italic mt-1">
                                        {text.text_content.substring(0, 150)}...
                                    </p>
                                </div>
                                <div className="flex-shrink-0 flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(text)}
                                        className="bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-md hover:bg-blue-700"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(text.id)}
                                        className="bg-red-600 text-white text-sm font-medium py-1 px-3 rounded-md hover:bg-red-700"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <AddEditTextForm existingText={editingText} onFormClose={handleFormClose} />
            )}
        </div>
    );
}

/**
 * Formulário para Adicionar ou Editar Textos
 */
function AddEditTextForm({ existingText, onFormClose }) {
    const [title, setTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [questions, setQuestions] = useState(
        Array(5).fill({ question: '', options: ['', '', '', '', ''], correct_option: 'A' })
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Preencher o formulário se estiver editando
    useEffect(() => {
        if (existingText) {
            setTitle(existingText.title || '');
            setTextContent(existingText.text_content || '');
            // Garante que o array de questões tenha 5 elementos
            const loadedQuestions = existingText.questions || [];
            const fullQuestions = Array(5).fill(null).map((_, i) => ({
                question: loadedQuestions[i]?.question || '',
                options: loadedQuestions[i]?.options || ['', '', '', '', ''],
                correct_option: loadedQuestions[i]?.correct_option || 'A',
            }));
            setQuestions(fullQuestions);
        } else {
             // Reseta para um novo formulário
            setTitle('');
            setTextContent('');
            setQuestions(Array(5).fill({ question: '', options: ['', '', '', '', ''], correct_option: 'A' }));
        }
    }, [existingText]);

    const handleQuestionChange = (qIndex, field, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title || !textContent) {
            setError('Título e Texto são obrigatórios.');
            return;
        }
        
        // Validação simples (só para garantir que não está vazio)
        const hasEmptyQuestion = questions.some(q => !q.question || q.options.some(opt => !opt));
        if (hasEmptyQuestion) {
            setError('Todas as 5 questões e suas 5 opções devem ser preenchidas.');
            return;
        }

        setLoading(true);
        const data = { title, text_content: textContent, questions };

        try {
            if (existingText) {
                // Atualizar
                const docRef = doc(db, "texts", existingText.id);
                await updateDoc(docRef, data);
            } else {
                // Adicionar
                await addDoc(textsCollectionRef, data);
            }
            setLoading(false);
            onFormClose(); // Fecha o formulário
        } catch (err) {
            console.error("Erro ao salvar texto: ", err);
            setError("Erro ao salvar no banco de dados.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#0C2340]">
                {existingText ? 'Editar Texto' : 'Adicionar Novo Texto'}
            </h3>
            
            {error && <p className="text-red-600">{error}</p>}
            
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="textContent" className="block text-sm font-medium text-gray-700">Conteúdo do Texto</label>
                <textarea
                    id="textContent"
                    rows="10"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                ></textarea>
            </div>

            {/* Gerador de Questões */}
            <div className="space-y-4">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="border p-4 rounded-lg bg-gray-50">
                        <h4 className="font-semibold mb-2">Questão {qIndex + 1}</h4>
                        <input
                            type="text"
                            placeholder="Texto da Pergunta"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                            required
                        />
                        {/* Opções */}
                        {q.options.map((opt, oIndex) => {
                            const letter = String.fromCharCode(65 + oIndex);
                            return (
                                <input
                                    key={oIndex}
                                    type="text"
                                    placeholder={`Opção ${letter}`}
                                    value={opt}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md"
                                    required
                                />
                            );
                        })}
                        {/* Resposta Correta */}
                        <select
                            value={q.correct_option}
                            onChange={(e) => handleQuestionChange(qIndex, 'correct_option', e.target.value)}
                            className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onFormClose}
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#007A33] text-white py-2 px-4 rounded-md font-semibold hover:bg-opacity-90 disabled:opacity-50"
                >
                    {loading ? 'Salvando...' : (existingText ? 'Atualizar Texto' : 'Salvar Texto')}
                </button>
            </div>
        </form>
    );
}


/**
 * Aba: Visualização de Resultados
 */
function ProfessorResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carregar resultados (onSnapshot para tempo real)
    useEffect(() => {
        setLoading(true);
        const q = query(resultsCollectionRef, orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setResults(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            console.error("Erro ao carregar resultados: ", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleExportCSV = () => {
        if (results.length === 0) return;

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Nome do Aluno,Data,Nota,Acertos\n"; // Cabeçalho

        results.forEach(result => {
            const date = result.date ? result.date.toDate().toLocaleString('pt-BR') : 'N/A';
            const row = [
                `"${result.student_name}"`,
                `"${date}"`,
                result.score.toFixed(1),
                result.correct
            ].join(",");
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "resultados_simulados.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <p>Carregando resultados...</p>;

    return (
        <div>
            <button
                onClick={handleExportCSV}
                disabled={results.length === 0}
                className="mb-6 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                Exportar CSV
            </button>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acertos</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Nenhum resultado encontrado.</td>
                            </tr>
                        ) : (
                            results.map(result => {
                                const passed = result.score >= 7.0;
                                return (
                                    <tr key={result.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.student_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {result.date ? result.date.toDate().toLocaleString('pt-BR') : 'N/A'}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                                            {result.score.toFixed(1)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.correct} / 20</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {passed ? 'Aprovado' : 'Reprovado'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
