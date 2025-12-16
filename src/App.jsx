// App.jsx
import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HomeScreen from './components/HomeScreen';
import ConsentScreen from './components/ConsentScreen';
import ChatWindow from './components/ChatWindow';
import './App.css';


function App() {
const [stage, setStage] = useState('loading');


const handleLoadingFinish = () => setStage('home');
const handleStart = () => setStage('consent');
const handleConsent = () => setStage('chat');


return (
<div className="app-container">
{stage === 'loading' && <LoadingScreen onFinish={handleLoadingFinish} />}
{stage === 'home' && <HomeScreen onStart={handleStart} />}
{stage === 'consent' && <ConsentScreen onAccept={handleConsent} />}
{stage === 'chat' && <ChatWindow />}
</div>
);
}


export default App;