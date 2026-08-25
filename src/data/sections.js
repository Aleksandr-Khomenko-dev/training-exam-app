import { ocaTopics, ocaQuestions } from './ocaQuestions.js'
import { ocpTopics, ocpQuestions } from './ocpQuestions.js'
import { interviewTopics, interviewQuestions } from './interviewQuestions.js'
import { codeTopics, codeQuestions } from './codeQuestions.js'

export const sections = [
  {
    key: 'OCA',
    label: 'OCA Exam',
    labelRu: 'Экзамен OCA',
    subtitle: 'Oracle Certified Associate · Java SE 8 Programmer I (1Z0-808)',
    subtitleRu: 'Oracle Certified Associate · Java SE 8 Programmer I (1Z0-808)',
    topics: ocaTopics,
    questions: ocaQuestions,
    accent: '#2563eb',
    // Approximate real exam format — Oracle occasionally revises these, double-check on their site.
    examMeta: { fullQuestionCount: 70, timeLimitMin: 90, passPercent: 65 },
  },
  {
    key: 'OCP',
    label: 'OCP Exam',
    labelRu: 'Экзамен OCP',
    subtitle: 'Oracle Certified Professional · Java SE 8 Programmer II (1Z0-809)',
    subtitleRu: 'Oracle Certified Professional · Java SE 8 Programmer II (1Z0-809)',
    topics: ocpTopics,
    questions: ocpQuestions,
    accent: '#7c3aed',
    examMeta: { fullQuestionCount: 85, timeLimitMin: 150, passPercent: 65 },
  },
  {
    key: 'INTERVIEW',
    label: 'Interview Prep',
    labelRu: 'Подготовка к собеседованию',
    subtitle: 'Middle-level Java Developer · technical interview questions',
    subtitleRu: 'Java-разработчик уровня Middle · технические вопросы на собеседовании',
    topics: interviewTopics,
    questions: interviewQuestions,
    accent: '#059669',
    examMeta: null,
  },
  {
    key: 'CODE',
    label: 'Code Practice',
    labelRu: 'Практика по коду',
    subtitle: 'Predict the output, spot the bug · Junior & Middle levels',
    subtitleRu: 'Предскажи результат, найди баг · уровни Junior и Middle',
    topics: codeTopics,
    questions: codeQuestions,
    accent: '#d97706',
    examMeta: null,
  },
]

export const getSection = (key) => sections.find((s) => s.key === key)
