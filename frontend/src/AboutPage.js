import React from 'react';
import './AboutPage.css';


function AboutPage() {
  return (
    <section id="about" className="bg-light">
      <div className="container px-5">
        <h2 className="text-center text-dark mb-4">About Page</h2>
        <div className='about-container'>
        <p>Movie EXP allows you to explore a vast collection of movies sourced from the Movie Database API. Discover, search, and explore movies effortlessly. Save your favorite movies for easy access later on.</p>
        <p>To get started, simply search for movies using our intuitive search feature. You can browse through movies without needing to sign in. However, to save your favorites, you'll need to create an account.</p>
        <p>If this is your first visit, don't worry! Registration is quick and easy. Once you're signed in, you'll have full access to all of Movie EXP's features. Welcome, and happy searching!</p>
      </div>
     </div>
    </section>
  );
}

export default AboutPage;
