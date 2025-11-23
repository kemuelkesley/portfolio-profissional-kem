import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Globe, 
  Database, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown,
  ExternalLink,
  Sparkles,
  Download, 
  ChevronLeft,
  ChevronRight,
  X,
  Briefcase,
  Calendar,
  GraduationCap, 
  CheckCircle2,
  Brackets, 
  Code, 
  Coffee, 
  Leaf, 
  Box, 
  Server, 
  GitBranch,   
} from 'lucide-react';

import { Icon } from "@iconify/react";


import ContactForm from './components/ContactForm';
import Background from './components/Background';
import { Project, Experience } from './types';

// Hook para detectar visibilidade na tela
function useOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Animar apenas uma vez
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
}

// Componente de item de experiência individual
const ExperienceItem: React.FC<{ exp: Experience; idx: number; onClick: (exp: Experience) => void }> = ({ exp, idx, onClick }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  const isRightSide = idx % 2 === 0;

  return (
    <div 
      ref={ref}
      onClick={() => onClick(exp)}
      className={`relative flex flex-col md:flex-row gap-8 items-center transition-all duration-1000 ease-out cursor-pointer group
        ${isRightSide ? 'md:flex-row-reverse' : ''}
        ${isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 translate-y-12 md:translate-y-0 ${isRightSide ? 'md:translate-x-24' : 'md:-translate-x-24'}`
        }
      `}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-vivid-purple border-4 border-gray-900 shadow-lg shadow-purple-500/50 md:-translate-x-1/2 translate-y-2 z-10 mt-1.5 md:mt-0 group-hover:scale-150 group-hover:bg-vivid-cyan transition-all duration-300" />

      {/* Content Card */}
      <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl group-hover:border-vivid-cyan/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-vivid-cyan/10 group-hover:-translate-y-1">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-vivid-cyan text-sm font-bold uppercase tracking-wider">
              {exp.type === 'Work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
              {exp.period}
            </div>
            <ExternalLink size={14} className="text-gray-500 group-hover:text-white transition-colors" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-vivid-purple transition-colors">{exp.role}</h3>
          <h4 className="text-gray-400 font-medium mb-4 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            {exp.company}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {exp.description}
          </p>
          <div className="mt-4 text-xs text-gray-500 font-medium">Clique para ver detalhes</div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const titles = ["Futuro Engenheiro de Software", "Desenvolvedor FullStack"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Title animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollProjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust scroll amount
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  

  // Projetos Pessoais
  const projects: Project[] = [
    {
      id: 1,
      title: "HelpDesk",
      description: "Plataforma de abertura e fechamento de chamados.",
      longDescription: "Helpdesk é um aplicativo de gerenciamento de tickets projetado para otimizar as operações de suporte técnico, permitindo Usuários poderão abrir e fechar chamados, rastrear instalações de equipamentos em condomínios e registrar quem realizou essas operações O aplicativo também captura dados essenciais para alimentar um sistema de Big Data, auxiliando na análise e melhoria dos serviços.",
      tech: ["Python", "HTML", "CSS", "Bootstrap", "SQL Server"],
      image: "assets/images-project/helpdesk.png",
      githubUrl: "https://github.com/kemuelkesley/helpdesk-faculdade?tab=readme-ov-file",
      liveUrl: "https://helpdesk-libk.onrender.com/login/"
    },
    {
      id: 2,
      title: "College extension",
      description: "Projeto criado para extensão universitária.",
      longDescription: "O Projeto Extensionista é uma solução de intranet desenvolvida para empresas que desejam manter seus funcionários informados sobre as últimas novidades Regulamentos, cursos e eventos internos. O sistema permite que os administradores publiquem notícias e anúncios em uma área administrativa dedicada Acessível apenas por usuários autorizados. Isso garante que os funcionários possam acessar facilmente essas atualizações e se manter informados sobre o que está acontecendo dentro da empresa. O projeto também inclui um sistema de autenticação, garantindo acesso seguro e controlado.",
      tech: ["Python", "HTML", "CSS", "Javascript", "Bootstrap", "SQL-Server", "GIT", "AWS"],
      image: "assets/images-project/empresa.jpg",
      githubUrl: "https://github.com/kemuelkesley/projeto-extensionista-faculdade?tab=readme-ov-file",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Todo-list",
      description: "App criado para gerenciamento de tarefas.",
      longDescription: "O objetivo deste projeto foi criar uma aplicação CRUD para colocar em prática alguns aprendizados importantes Este projeto foi desenvolvido para praticar conceitos de desenvolvimento web através da criação de um aplicativo simples de avaliação de alunos O principal objetivo do aplicativo é calcular a média das notas de um aluno e determinar se ele foi aprovado ou reprovado Foi construído utilizando HTML , CSS , JavaScript , jQuery e MDBootstrap para fornecer uma interface responsiva e amigável",
      tech: ["Python", "Django", "HTML", "CSS", "MDBootstrap", "SQLite", "Jquery"],
      image: "assets/images-project/todolist.webp",
      githubUrl: "https://github.com/kemuelkesley/todo-list_django",
      liveUrl: "#"
    },
    {
      id: 4,
      title: "APP-Notas",
      description: "Desenvolvidos para aplicar técnicas de manipulação do Doom.",
      longDescription: "Este projeto foi desenvolvido para aplicar técnicas de manipulação do DOM com JavaScript e jQuery, criando um aplicativo simples que calcula duas notas, exibe a média e indica se o aluno foi aprovado ou reprovado O aplicativo foi desenvolvido usando HTML , CSS , JavaScript e jQuery , com foco em design responsivo, interatividade e funcionalidade amigável ao usuário.",
      tech: ["HTML", "CSS", "JavaScript", "Jquery"],
      image: "assets/images-project/app-notas.png",
      githubUrl: "https://github.com/kemuelkesley/app-notas",
      liveUrl: "https://kemuelkesley.github.io/app-notas/"
    },
    {
      id: 5,
      title: "Calk-brinks",
      description: "Criado para um processo seletivo para desenvolvedor front-end.",
      longDescription: "Este projeto foi um desafio desenvolvido para uma candidatura a um emprego na área de desenvolvimento web, onde eu precisava criar um algoritmo que determinasse o tipo de lente mais adequado para um cliente, com base em se a sua prescrição era do tipo X ou Y",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "assets/images-project/calc-brinks.png",
      githubUrl: "https://github.com/kemuelkesley/app-notas",
      liveUrl: "https://kemuelkesley.github.io/calc-brinks/"
    },
    {
      id: 6,
      title: "Cadastro de Alunos",
      description: "Criação de casdastro de alunos com validação de formulários.",
      longDescription: "",
      tech: ["HTML", "CSS", "Javascript", "SQL-server", "Jquery", "PHP"],
      image: "assets/images-project/cad-alunos.png",
      githubUrl: "https://github.com/kemuelkesley/cadalunos--Finalizado",
      liveUrl: "https://kemuelkesley.github.io/cadalunos--Finalizado/"
    },
    {
      id: 7,
      title: "Criação de blog-teste",
      description: "Criação de blog simples para praticar conceitos",
      longDescription: "O principal objetivo deste projeto foi criar um portfólio pessoal para colocar em prática algumas das novas habilidades que aprendi Foi construído utilizando HTML , CSS e JavaScript , aplicando design responsivo e interatividade para proporcionar uma experiência funcional e amigável ao usuário.",
      tech: ["HTML","CSS"],
      image: "assets/images-project/about-me.png",
      githubUrl: "https://github.com/kemuelkesley/about-me",
      liveUrl: "https://about-me-gamma-sable.vercel.app/index.html"
    }
  ];

  const experiences: Experience[] = [
    {
      id: 1,
      role: "Desenvolvedor FullStack",
      company: "Tribunal Eleitoral de Alagoas TRE-AL",
      period: "2023 - Presencial",
      description: "Desenvolvi melhorias e participei da criação de novos sistemas, com foco em estruturação de dados, fluxos de trabalho e layouts.",
      longDescription: "Fui responsável pela arquitetura, documentação e modelagem de sistemas no Projeto de Gerenciamento de Urnas Eletrônicas. Estruturei o fluxo de dados e a organização do sistema no Projeto de Reembolso de Despesas de Viagem de Servidores Públicos. Além disso, contribuí para a criação de layouts e estilo para a nova intranet, aplicando as melhores práticas de design no Projeto de Intranet.",
      skills: ["Java", "Oracle", "Python", "HTML", "CSS", "Javascript" ],
      type: "Work"
    },
    {
      id: 2,
      role: "Desenvolvedor FullStack",
      company: "Casa da Industria - SENAI/SESI – Parceria com o Governo",
      period: "2021 a 2022  - Presencial",
      description: "Atuei na criação de interfaces e desenvolvimento de sistemas, contribuindo para soluções web completas em projetos internos e governamentais.",
      longDescription: "Fui responsável pela criação da interface visual completa do sistema de matrícula de alunos no Projeto Qualificação SENAI, utilizando HTML, CSS, Bootstrap, JavaScript, jQuery, PHP e SQL. No Projeto IoT – Agendamento de Reuniões, desenvolvi a tela de login e o banco de dados para controle de reservas de salas. No Projeto Catraca SENAI, criei um procedimento automatizado que insere diariamente os alunos matriculados em um novo banco de dados, garantindo a atualização contínua e precisa dos registros.",
      skills:["HTML", "CSS", "JavaScript", "Sql-Server", "Jquery", "Bootstrap", "Python", "RM-Totvs"],
      type: "Work"
    },

    {
      id: 3,
      role: "Desenvolvedor Python",
      company: "MyIA",
      period: "2021 - 2021 - Remoto",
      description: "Atuei no aprimoramento de métodos de ensino e no desenvolvimento de funcionalidades relacionadas ao uso e evolução da plataforma Moodle, além de colaborar em projetos envolvendo Python e Django.",
      longDescription: "Desenvolvi melhores métodos de ensino para abordar questões relacionadas aos critérios de desenvolvimento da plataforma, incluindo a adição de provas, o upload de videoaulas, materiais didáticos, links e o treinamento de professores para utilizarem com eficiência as ferramentas do Moodle. Além disso, participei de um projeto de desenvolvimento utilizando Python, Django e bibliotecas de ciência de dados como Pandas, NumPy e Matplotlib, sendo responsável pela criação da estrutura inicial do projeto e pela definição dos primeiros componentes lógicos e arquiteturais.",
      skills: ["Python", "Django", "Ciencias de dados", "Analise de dados", "Scrum"],
      type: "Education"
    },
    {
      id: 4,
      role: "Estudante de Engenharia de Software/ Sistema de Informação",
      company: "Universidade Estacio de Sá",
      period: "2020 - 2026 (Previsão)",
      description: "Cursando bacharelado com foco em estruturas de dados, algoritmos, arquitetura de software e metodologias ágeis de desenvolvimento.",
      longDescription: "Bacharelado em andamento com ênfase prática. Tenho me destacado nas disciplinas de Algoritmos Avançados e Programação Orientada a Objetos. Participo ativamente de hackathons universitários e grupos de estudo sobre Inteligência Artificial. Meu TCC está sendo planejado na área de Machine Learning aplicado à acessibilidade na web.",
      skills: ["Algoritmos", "Estrutura de Dados", "Java", "Python", "Scrum"],
      type: "Education"
    },

  ];

  return (
    <div className="min-h-screen font-sans text-gray-200 selection:bg-vivid-pink selection:text-white">
      <Background />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-vivid-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-vivid-cyan to-vivid-purple">
            KEMUEL <span className="text-white">KESLEY</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm font-medium hover:text-vivid-cyan transition-all duration-300 transform hover:scale-110"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="text-sm font-medium hover:text-vivid-cyan transition-all duration-300 transform hover:scale-110"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className="text-sm font-medium hover:text-vivid-cyan transition-all duration-300 transform hover:scale-110"
            >
              Experiência
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-sm font-medium hover:text-vivid-cyan transition-all duration-300 transform hover:scale-110"
            >
              Projetos
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/5"
            >
              Contato
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Animated Role Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vivid-purple/10 border border-vivid-purple/30 text-vivid-purple mb-6 animate-fade-in overflow-hidden h-10">
              <Sparkles size={16} />
              <div className="relative h-full w-64 md:w-80">
                {titles.map((text, idx) => (
                  <span 
                    key={idx}
                    className={`absolute left-0 top-0 text-sm font-medium uppercase tracking-wider transition-all duration-700 transform ${
                      idx === titleIndex 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8 animate-fade-in" style={{ animationDelay: '0.10s' }}>
              Criando o <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-vivid-purple via-vivid-pink to-vivid-orange-400 animate-gradient pr-4 inline-block">
                Futuro Digital 
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Em constante evolução na programação, construindo soluções digitais com foco em desempenho, usabilidade e aprendizado contínuo.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <a 
                href="https://wa.me/5582988516305" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-vivid-dark font-bold rounded-full hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Vamos Conversar 
                {/* WhatsApp Icon SVG */}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
              >
                Ver Projetos <Code2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="relative group order-2 lg:order-1">
              {/* Decorative Borders/Glows */}
              <div className="absolute -inset-4 bg-gradient-to-r from-vivid-cyan via-vivid-purple to-vivid-pink rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-vivid-cyan to-vivid-purple rounded-2xl opacity-50 blur-sm"></div>
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-square lg:aspect-[3/4] border border-white/10 bg-gray-900">
                <img 
                  // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80"                   
                  src="/assets/images/kemuel.png"                 
                  alt="Retrato Profissional de Kemuel Kesley" 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition duration-700 filter grayscale hover:grayscale-0" 
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Mais que código, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vivid-purple to-vivid-pink">construo soluções.</span>
              </h2>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Olá! Sou <strong>Kemuel Kesley</strong>, futuro Engenheiro de Software apaixonado por resolver problemas complexos através da tecnologia. Minha jornada começou com a curiosidade de entender como as coisas funcionam "por trás das telas" e evoluiu para uma carreira focada em desenvolvimento full-stack.
                </p>
                <p>
                  Acredito que o código é uma ferramenta para melhorar vidas e impulsionar negócios. Combino rigor técnico com uma sensibilidade apurada para design e experiência do usuário (UX), garantindo que minhas entregas sejam não apenas funcionais, mas também intuitivas e memoráveis.
                </p>
                <p>
                  Estou constantemente aprendendo novas tecnologias e metodologias ágeis para me manter na vanguarda do desenvolvimento web e mobile.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://drive.google.com/file/d/1UhQJcaw0_Dt--q1nHTAR9ZHPC01Uhfij/view?usp=sharing" // coloque o PDF em assets/cv.pdf
                  download="Kemuel_Kesley_CV.pdf"
                  className="px-8 py-3 bg-vivid-purple hover:bg-vivid-purple/90 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Download size={18} /> Baixar CV
                </a>
                <div className="flex gap-4 items-center justify-center sm:justify-start px-4">
                  <a href="https://github.com/kemuelkesley" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white border border-white/5"><Github size={20} /></a>
                  <a href="https://www.linkedin.com/in/kemuel-kesley-23886435/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-blue-400 border border-white/5"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}       
        <section id="skills" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              
              <div className="w-full md:w-1/3">
                <h2 className="text-4xl font-display font-bold mb-6">
                  Tech Stack <br />
                  <span className="text-vivid-cyan">Moderno</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Utilizo as ferramentas mais atuais do mercado para garantir que cada
                  aplicação seja rápida, segura e fácil de manter. Meu foco em Django ecossistema 
                  e Python, Java com Spring Boot.
                </p>
              </div>

              <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Django", icon: "vscode-icons:file-type-django" },
                  { name: "Python", icon: "logos:python" },
                  { name: "Java", icon: "logos:java" },
                  { name: "Spring Boot", icon: "logos:spring-icon" },
                  { name: "Postgres", icon: "logos:postgresql" },
                  { name: "Bootstrap", icon: "logos:bootstrap" },
                  { name: "SQL Server", icon: "vscode-icons:file-type-sql" },
                  { name: "HTML", icon: "vscode-icons:file-type-html" },
                  { name: "CSS", icon: "vscode-icons:file-type-css" },
                  { name: "JavaScript", icon: "logos:javascript" },
                  { name: "FastAPI", icon: "logos:fastapi" },                  
                  { name: "Git", icon: "logos:git-icon" },
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl 
                    hover:border-vivid-purple/50 hover:bg-white/10 transition-all group cursor-default"
                  >
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Icon icon={skill.icon} width="48" />
                    </div>
                    <h3 className="font-bold text-lg">{skill.name}</h3>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">
            Minha <span className="text-vivid-purple">Jornada</span>
          </h2>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-vivid-cyan via-vivid-purple to-transparent opacity-30 md:-translate-x-1/2" />

            <div className="space-y-12 overflow-hidden p-4">
              {experiences.map((exp, idx) => (
                <ExperienceItem key={exp.id} exp={exp} idx={idx} onClick={setSelectedExperience} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (Carousel) */}
      <section id="projects" className="py-24 bg-black/20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Projetos <span className="text-vivid-pink">Selecionados</span></h2>
              <p className="text-gray-400">Deslize para ver mais</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollProjects('left')} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
                <ChevronLeft />
              </button>
              <button onClick={() => scrollProjects('right')} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="min-w-[300px] md:min-w-[400px] snap-start cursor-pointer group relative rounded-2xl overflow-hidden bg-gray-900 border border-white/10 hover:border-vivid-pink/50 transition-all duration-500 hover:shadow-2xl hover:shadow-vivid-pink/10"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded bg-white/10 text-white border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-vivid-cyan font-bold text-sm uppercase tracking-wide">
                    Ver Detalhes <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedProject(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-gray-900 w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
              <h3 className="text-3xl font-display font-bold text-white mb-2">{selectedProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map(t => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-vivid-purple/20 text-vivid-purple border border-vivid-purple/30 font-medium">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="space-y-4 mb-8 text-gray-300 leading-relaxed">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={selectedProject.liveUrl} className="flex-1 py-3 bg-vivid-cyan hover:bg-vivid-cyan/90 text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Globe size={18} /> Ver Online
                </a>
                <a href={selectedProject.githubUrl} className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/10 flex items-center justify-center gap-2 transition-colors">
                  <Github size={18} /> Código
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal (New) */}
      {selectedExperience && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedExperience(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-gray-900 w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Panel - Artistic/Iconic */}
            <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-gradient-to-br from-vivid-dark via-gray-900 to-vivid-purple/20 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/5">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl shadow-vivid-purple/10 mb-4">
                {selectedExperience.type === 'Work' ? (
                  <Briefcase size={64} className="text-vivid-cyan" />
                ) : (
                  <GraduationCap size={64} className="text-vivid-pink" />
                )}
              </div>
              <h4 className="text-xl font-display font-bold text-center text-white">{selectedExperience.company}</h4>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                 <Calendar size={14} /> {selectedExperience.period}
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="w-full md:w-3/5 p-8 overflow-y-auto">
              <h3 className="text-3xl font-display font-bold text-white mb-2">{selectedExperience.role}</h3>
              
              {selectedExperience.skills && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedExperience.skills.map(s => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-vivid-cyan" /> {s}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="space-y-4 mb-8 text-gray-300 leading-relaxed">
                <p>{selectedExperience.longDescription || selectedExperience.description}</p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-sm text-gray-500 italic">
                  "A excelência não é um ato, mas um hábito."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-vivid-cyan to-vivid-purple">inovar?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Estou disponível para projetos freelance e oportunidades full-time. Entre em contato através do formulário abaixo.
            </p>
          </div>
          
          <ContactForm />
          
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 font-medium">
            © 2025 KemSoftware. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Github size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110"><Mail size={24} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;