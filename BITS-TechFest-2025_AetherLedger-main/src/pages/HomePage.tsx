import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Wind, BarChart, Leaf } from 'lucide-react';

export const HomePage: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;
      
      // Clear existing particles
      container.innerHTML = '';
      
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation duration
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Recreate particles on window resize
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);
  
  const features = [
    {
      icon: <BarChart className="h-12 w-12 text-primary-600" />,
      title: 'Emission Tracking',
      description: 'Calculate and monitor your carbon footprint with our intuitive dashboard.',
    },
    {
      icon: <Wind className="h-12 w-12 text-primary-600" />,
      title: 'Dispersion Forecast',
      description: 'Predict where emissions will travel using satellite data and wind patterns.',
    },
    {
      icon: <Shield className="h-12 w-12 text-primary-600" />,
      title: 'Protection Planning',
      description: 'Deploy targeted air purification measures to protect vulnerable communities.',
    },
    {
      icon: <Leaf className="h-12 w-12 text-primary-600" />,
      title: 'Environmental Impact',
      description: 'Quantify your positive environmental impact through defensive measures.',
    },
  ];
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20">
        <div ref={particlesRef} className="particles-container" />
        
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Track emissions. <br />
                <span className="text-primary-600">Predict</span> their path. <br />
                <span className="text-secondary-600">Protect</span> your people.
              </h1>
              <p className="mb-8 text-xl text-dark-600">
                AetherLedger helps you monitor carbon emissions, forecast their movement, and
                strategically deploy air purification measures to protect vulnerable communities.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Earth view from space showing atmosphere"
                className="rounded-xl object-cover shadow-2xl"
                style={{ maxHeight: '500px' }}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-4xl font-bold"
            >
              How AetherLedger Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-dark-600"
            >
              Our platform combines cutting-edge technology with environmental science to create a comprehensive
              emissions management system.
            </motion.p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="mb-4 rounded-full bg-primary-100 p-3 inline-flex">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-dark-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-4xl font-bold text-white"
            >
              Ready to make a difference?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-lg text-primary-100"
            >
              Join thousands of individuals and organizations who are taking control of their
              environmental impact and protecting vulnerable communities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/dashboard" className="btn bg-white text-primary-900 hover:bg-primary-50">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};