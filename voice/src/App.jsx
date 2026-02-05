import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [wordCounts, setWordCounts] = useState({});
  const [transcript, setTranscript] = useState('');
  const [targetWords, setTargetWords] = useState(['ram', 'radha']);
  const [customWord, setCustomWord] = useState('');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptText = result[0].transcript;
          
          if (result.isFinal) {
            finalTranscript += transcriptText + ' ';
          }
        }
        
        if (finalTranscript.trim()) {
          const text = finalTranscript.toLowerCase().trim();
          setTranscript(prev => prev + ' ' + text);
          
          // Count words
          countWords(text);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      alert('Speech recognition is not supported in your browser. Try Chrome.');
    }
  }, []);

  // Simple count function
  const countWords = (text) => {
    setWordCounts(prev => {
      const newCounts = { ...prev };
      
      targetWords.forEach(word => {
        if (word.trim()) {
          // Create regex pattern with word boundaries
          const pattern = new RegExp(`\\b${word}\\b`, 'gi');
          const matches = text.match(pattern);
          
          if (matches) {
            newCounts[word] = (newCounts[word] || 0) + matches.length;
          }
        }
      });
      
      return newCounts;
    });
  };

  const startRecording = async () => {
    try {
      // Reset counts and transcript
      setWordCounts({});
      setTranscript('');
      
      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Error starting recognition:', error);
        }
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Error stopping recognition:', error);
      }
    }
    
    setIsRecording(false);
  };

  const addCustomWord = () => {
    const trimmedWord = customWord.trim().toLowerCase();
    if (trimmedWord && !targetWords.includes(trimmedWord)) {
      // Add the new word
      setTargetWords(prev => [...prev, trimmedWord]);
      setCustomWord('');
      
      // Initialize count for the new word
      setWordCounts(prev => ({
        ...prev,
        [trimmedWord]: 0
      }));
    }
  };

  const resetCounts = () => {
    setWordCounts({});
    setTranscript('');
    setAudioURL('');
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎤 Voice Word Counter</h1>
        <p className="subtitle">Count repetitions of specific words in your speech</p>
      </header>

      <div className="container">
        {/* Recording Controls */}
        <div className="control-section">
          <h2>Recording Controls</h2>
          <div className="button-group">
            <button 
              onClick={startRecording} 
              disabled={isRecording}
              className={`record-btn ${isRecording ? 'recording' : ''}`}
            >
              {isRecording ? '🔴 Recording...' : '🎤 Start Recording'}
            </button>
            <button 
              onClick={stopRecording} 
              disabled={!isRecording}
              className="stop-btn"
            >
              ⏹️ Stop Recording
            </button>
            <button onClick={resetCounts} className="reset-btn">
              🔄 Reset All
            </button>
          </div>
          
          {isRecording && (
            <div className="recording-indicator">
              <div className="pulse"></div>
              <span>Recording in progress... Speak now</span>
            </div>
          )}
        </div>

        {/* Word Management */}
        <div className="word-section">
          <h2>Tracked Words</h2>
          <div className="word-input-group">
            <input
              type="text"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              placeholder="Add a word to track"
              className="word-input"
              onKeyPress={(e) => e.key === 'Enter' && addCustomWord()}
            />
            <button onClick={addCustomWord} className="add-btn">
              ➕ Add Word
            </button>
          </div>
          
          <div className="current-words">
            <p>Currently tracking:</p>
            <div className="word-tags">
              {targetWords.map((word, index) => (
                <span key={index} className="word-tag">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Word Count Display */}
        <div className="count-section">
          <h2>📊 Word Repetition Counts</h2>
          <div className="count-grid">
            {targetWords.map((word) => (
              <div key={word} className="count-card">
                <div className="count-number">{wordCounts[word] || 0}</div>
                <div className="count-label">{word}</div>
              </div>
            ))}
          </div>
          
          {Object.keys(wordCounts).length > 0 && (
            <div className="total-count">
              <h3>Total Words Counted: {
                Object.values(wordCounts).reduce((a, b) => a + b, 0)
              }</h3>
            </div>
          )}
        </div>

        {/* Test Example */}
        <div className="example-section" style={{marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '10px'}}>
          <h3>🎯 Test Example:</h3>
          <p>1. Click "Start Recording"</p>
          <p>2. Say: <strong>"ram ram radha ram radha"</strong></p>
          <p>3. You should see: <strong>Ram: 3</strong> and <strong>Radha: 2</strong></p>
        </div>

        {/* Audio Player */}
        {audioURL && (
          <div className="audio-section">
            <h2>🎵 Recorded Audio</h2>
            <audio controls src={audioURL} className="audio-player" />
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="transcript-section">
            <h2>📝 Transcript</h2>
            <div className="transcript-box">
              {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;