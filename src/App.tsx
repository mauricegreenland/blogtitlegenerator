import React from 'react';
import { Header } from './components/Header';
import { TitleGenerator } from './components/TitleGenerator';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <Header />
      <main className="my-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl text-neutral-darkest mb-4">Eye-catching Blog Titles in Seconds!</h2>
          <p className="text-neutral-mediumGray text-lg">
            Need new blog post titles? Try our free Blog Title Generator for catchy, SEO-friendly ideas in seconds. Get creative titles with just one click!
          </p>
        </div>
        <TitleGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;