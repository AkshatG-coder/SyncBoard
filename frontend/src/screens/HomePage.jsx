import { Link } from "react-router-dom";
import React from "react";

import { Client } from 'appwrite';
import { account } from "../lib/appwrite";
const client = new Client();
client.setProject('67eb8659001df40188ed');

async function handleLoginG(){
  account.createOAuth2Session(
    'google',
    'http://localhost:3000 ',
    'http://localhost:3000/fail'
  )
}


const HomePage = () => {
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    dark: '#1E293B',
    darker: '#0F172A',
    text: '#1E293B',
    textLight: '#64748B'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <button onClick={handleLoginG}>Sign in with Google</button>

      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6 text-[#1E293B]">
            Welcome to Boardit
          </h1>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Collaborate in real-time with our interactive whiteboard platform
          </p>
          <div className="mt-10 space-x-4">
            <Link
              to="/register"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="border border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F1F5F9]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center text-[#1E293B]">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Collaboration",
                desc: "Work together seamlessly with instant updates",
                icon: "🔄"
              },
              {
                title: "Intuitive Tools",
                desc: "Easy-to-use drawing and annotation tools",
                icon: "✏️"
              },
              {
                title: "Secure & Private",
                desc: "End-to-end encrypted whiteboards",
                icon: "🔒"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#1E293B]">
                  {feature.title}
                </h3>
                <p className="text-[#64748B]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>



  );
};

export default HomePage;