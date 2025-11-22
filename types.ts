import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string; // Descrição mais detalhada para o modal
  tech: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ReactNode;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  longDescription?: string; // Descrição detalhada para o modal
  skills?: string[]; // Tecnologias usadas nessa experiência
  type: 'Education' | 'Work';
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}