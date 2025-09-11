# 🚨 Disaster Relief AI Hub

*An offline-capable AI-powered emergency information system for disaster response and relief operations*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sujan-kowshik-jillas-projects/v0-disaster-relief-ai)

## 🎯 Overview

The **Disaster Relief AI Hub** is a comprehensive, offline-capable emergency information system designed to provide critical assistance during natural disasters and emergency situations. Built with cutting-edge AI technology and optimized for offline functionality, this application serves as a lifeline when traditional communication infrastructure fails.

## ✨ Key Features

### 🤖 AI-Powered Emergency Assistant
- **GPT-OSS-20B Integration**: Offline AI model for intelligent emergency responses
- **Natural Language Queries**: Ask questions in plain English about emergency procedures
- **Contextual Responses**: AI understands disaster scenarios and provides relevant guidance
- **Real-time Chat Interface**: Interactive conversation with emergency AI assistant

### 📚 Comprehensive Emergency Database
- **575+ Emergency Procedures**: Extensive library of life-saving protocols
- **First Aid Guidelines**: Step-by-step medical emergency procedures
- **Shelter Construction**: Detailed guides for emergency shelter building
- **Safety Protocols**: Comprehensive safety measures for various disaster types
- **Quick Reference Cards**: Instant access to critical information

### 🔄 Offline Functionality
- **Service Worker Integration**: Full offline capability with intelligent caching
- **Progressive Web App (PWA)**: Installable on mobile devices for instant access
- **Local Data Storage**: All critical information stored locally using IndexedDB
- **Sync Capabilities**: Automatic data synchronization when connection is restored
- **No Internet Required**: Fully functional without network connectivity

### 🎨 Emergency-Optimized Interface
- **High Contrast Design**: Optimized for visibility in low-light conditions
- **Large Touch Targets**: Easy navigation during high-stress situations
- **Keyboard Shortcuts**: Quick access via hotkeys (Alt+M for medical, Alt+C for emergency calls)
- **Responsive Design**: Works seamlessly on all device sizes
- **Accessibility Features**: Screen reader compatible with ARIA labels

### ⚡ Quick Action Features
- **Emergency Quick Actions Bar**: One-tap access to critical functions
- **SOS Signal Generator**: Visual and audio emergency signals
- **Emergency Contacts**: Quick dial for local emergency services
- **Location Services**: GPS coordinates for rescue operations
- **Battery Optimization**: Minimal resource usage to preserve device battery

### 📊 Real-time Status Monitoring
- **System Status Dashboard**: Monitor offline capabilities and data sync
- **Resource Availability**: Track available emergency information and tools
- **Connection Status**: Real-time network connectivity monitoring
- **Performance Metrics**: System health and response time tracking

## 🛠️ Technical Architecture

### Frontend Technologies
- **Next.js 15**: Modern React framework with App Router
- **TypeScript**: Type-safe development for reliability
- **Tailwind CSS**: Utility-first styling for rapid development
- **shadcn/ui**: Accessible component library
- **Lucide Icons**: Comprehensive icon system

### AI Integration
- **GPT-OSS-20B Model**: Open-source language model for offline deployment
- **Ollama Integration**: Local AI model serving
- **Streaming Responses**: Real-time AI response generation
- **Context Management**: Intelligent conversation history handling

### Offline Capabilities
- **Service Worker**: Advanced caching strategies
- **IndexedDB**: Client-side database for emergency data
- **PWA Manifest**: Progressive web app configuration
- **Cache-First Strategy**: Prioritize offline functionality

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal performance
- **Image Optimization**: Compressed emergency imagery
- **Bundle Analysis**: Minimized JavaScript payload
- **Memory Management**: Efficient resource utilization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with service worker support

### Installation
```bash
# Clone the repository
git clone https://github.com/sujankowshik/disaster-relief-ai.git

# Navigate to project directory
cd disaster-relief-ai

# Install dependencies
npm install

# Start development server
npm run dev
