import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-20 pt-8">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#10B981]">
            About Boardit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering teams to collaborate and innovate through intuitive digital whiteboarding
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-[#3B82F6] to-[#10B981] mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                At Boardit, we're transforming how teams collaborate visually. Our mission is to break down 
                geographical barriers and creative blocks with an intuitive platform that feels as natural as 
                working side-by-side.
              </p>
              <p>
                We combine cutting-edge technology with human-centered design to create tools that amplify 
                your team's potential.
              </p>
            </div>
          </div>
        </section>

        {/* Story & Values */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Story Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-[#3B82F6] rounded-full flex items-center justify-center text-white mr-4">
                <span className="text-xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 2023 by a remote team frustrated with existing tools, Boardit began as a simple 
                solution to our own collaboration challenges.
              </p>
              <p>
                Today, we serve thousands of teams worldwide who trust Boardit for their most important 
                brainstorming and planning sessions.
              </p>
            </div>
          </div>

          {/* Values Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-[#10B981] rounded-full flex items-center justify-center text-white mr-4">
                <span className="text-xl">❤️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
            </div>
            <ul className="space-y-5">
              {[
                { icon: "💡", title: "Innovation", text: "Pushing boundaries of digital collaboration" },
                { icon: "🤝", title: "Teamwork", text: "We succeed when our users succeed together" },
                { icon: "🎯", title: "Focus", text: "Solving real problems with elegant solutions" },
                { icon: "🔓", title: "Transparency", text: "Open communication with our community" }
              ].map((item, index) => (
                <li key={index} className="flex">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team CTA */}
        <section className="mb-20 text-center">
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-2xl p-12 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Meet the Minds Behind Boardit</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our diverse team brings together expertise in design, engineering, and collaboration science 
              to build tools you'll love.
            </p>
            <Link
              to="/team"
              className="inline-block bg-white text-[#3B82F6] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-md"
            >
              Meet the Team
            </Link>
          </div>
        </section>

        {/* Careers Section */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 bg-[#F8FAFC] p-8 md:p-12 flex items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Journey</h2>
                <p className="text-gray-700 mb-8 text-lg">
                  We're building the future of collaboration and we'd love for you to be part of it.
                </p>
                <Link
                  to="/careers"
                  className="inline-block border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300"
                >
                  View Open Roles
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-[#EFF6FF] p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4">🚀</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Help Shape the Future</h3>
                <p className="text-gray-600">
                  We're hiring across all departments - come build with us!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;