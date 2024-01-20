import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!userInput.trim()) {
      return;
    }
  
    // Add user's message to the chat
    setMessages([...messages, { role: 'user', content: userInput }]);
    setUserInput('');
  
    try {
      // Make API request to the chatbot API with user input
      const response = await fetch('https://healthbybyteblitz.twilightparadox.com/api/auth/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
  
        // Extract relevant information from the response
        const chatbotPoints = [];
  
        // Loop over the points and add them to the chat
        for (let i = 1; i <= 5; i++) {
          const pointKey = `Point ${i}`;
          if (result.fulfillmentText[pointKey]) {
            chatbotPoints.push(result[pointKey]);
          }
        }
  
        // Add chatbot's responses to the chat
        setMessages([...messages, { role: 'assistant', content: chatbotPoints.join('\n\n') }]);
  
        // Scroll to the bottom of the chat
        scrollViewRef.current.scrollToEnd({ animated: true });
      } else {
        console.error('Error in API response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white',marginBottom:40 }}>
      {/* Chat messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              flexDirection: message.role === 'assistant' ? 'row-reverse' : 'row',
              marginBottom: 8,
            }}
          >
            {message.role === 'assistant' && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#4CAF50',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Image
                  source={require('../assets/images/mortar.png')}
                  style={{ width: 20, height: 20, tintColor: 'white' }}
                />
              </View>
            )}
            <View
              style={{
                maxWidth: '70%',
                padding: 10,
                borderRadius: 8,
                backgroundColor: message.role === 'assistant' ? '#4CAF50' : '#E0E0E0',
              }}
            >
              <Text style={{ color: message.role === 'assistant' ? 'white' : 'black' }}>
                {message.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* User input */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
          }}
          value={userInput}
          placeholder="Type your message..."
          onChangeText={(text) => setUserInput(text)}
        />
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#4CAF50',
            borderRadius: 8,
          }}
          onPress={sendMessage}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatbotScreen;