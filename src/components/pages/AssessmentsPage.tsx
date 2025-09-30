import { Brain, Clock, Target, CheckCircle, ArrowRight, Play, Sparkles, Star, Zap, Award, TrendingUp, Lightbulb, MapPin, Calendar, Users, Briefcase, BookOpen, Rocket, Bot, Wand2, Cpu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
imimport { useState, useEffect } from 'react';
port { BaseCrudService } from '@/integrations';
import { Assessments } from '@/entities/assessments';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function AssessmentsPageContent() {
  const [assessments, setAssessments] = useState<Assessments[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessments | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Comprehensive career assessment questions based on actual government career paths
  const getMockQuestions = () => [
    {
      question: "You're tasked with implementing a new government scheme in rural areas. What's your first priority?",
      options: [
        "Conduct detailed data analysis to understand demographic needs and resource allocation requirements",
        "Organize community meetings to explain the scheme and gather feedback from local stakeholders",
        "Set up digital infrastructure and technology systems to ensure efficient scheme delivery",
        "Coordinate with local officials and create a systematic implementation timeline"
      ]
    },
    {
      question: "A citizen approaches you with a complaint about delayed government services. How do you respond?",
      options: [
        "Listen carefully, document the issue, and personally follow up to ensure resolution",
        "Explain the standard procedure and guide them through the proper channels for complaint redressal",
        "Investigate the technical or systemic issues causing the delay and work to fix them",
        "Escalate to appropriate authorities while keeping the citizen informed of progress"
      ]
    },
    {
      question: "Which of these real-world government challenges would you be most motivated to solve?",
      options: [
        "Improving digital literacy and technology access in rural schools and communities",
        "Reducing bureaucratic delays and making government services more citizen-friendly",
        "Implementing sustainable development projects for environmental conservation",
        "Enhancing public healthcare delivery and medical facilities in underserved areas"
      ]
    },
    {
      question: "In a government role, what type of decision-making responsibility appeals to you most?",
      options: [
        "Financial planning: Managing budgets, allocating resources, and ensuring fiscal responsibility",
        "Policy implementation: Translating government policies into actionable programs at ground level",
        "Technical solutions: Designing and implementing technology-based solutions for public services",
        "Human resource management: Leading teams, training staff, and developing organizational capacity"
      ]
    },
    {
      question: "You notice inefficiencies in your department's workflow. What's your approach?",
      options: [
        "Analyze data and processes to identify bottlenecks and propose systematic improvements",
        "Discuss with colleagues and stakeholders to understand different perspectives before suggesting changes",
        "Research and propose technology solutions that could automate or streamline the processes",
        "Present a detailed report to supervisors with evidence-based recommendations for improvement"
      ]
    },
    {
      question: "Which aspect of public service motivates you the most?",
      options: [
        "Direct impact on citizens' lives through improved service delivery and problem-solving",
        "Contributing to nation-building through policy implementation and governance",
        "Using your technical expertise to modernize government operations and increase efficiency",
        "Building community relationships and ensuring inclusive development for all sections of society"
      ]
    },
    {
      question: "How do you prefer to stay updated with developments in your field?",
      options: [
        "Reading government reports, policy documents, and staying informed about regulatory changes",
        "Attending training programs, workshops, and professional development courses",
        "Following technology trends, learning new tools, and pursuing technical certifications",
        "Networking with peers, joining professional associations, and participating in knowledge-sharing forums"
      ]
    },
    {
      question: "In a crisis situation affecting your jurisdiction, what's your immediate response?",
      options: [
        "Assess the situation systematically, gather data, and coordinate with relevant departments for response",
        "Communicate with affected communities, provide reassurance, and ensure transparent information flow",
        "Focus on technical solutions and infrastructure repair to restore normal operations quickly",
        "Mobilize resources, delegate responsibilities, and ensure coordinated emergency response efforts"
      ]
    },
    {
      question: "Which type of government examination preparation strategy suits your learning style?",
      options: [
        "Structured study plan with focus on current affairs, general studies, and analytical reasoning",
        "Group study sessions, mock interviews, and personality development for comprehensive preparation",
        "Technical subject mastery with emphasis on engineering, computer science, or specialized knowledge",
        "Balanced approach combining theoretical knowledge with practical application and case studies"
      ]
    },
    {
      question: "What's your preferred method for engaging with the public in your official capacity?",
      options: [
        "Data-driven presentations and reports that clearly communicate government initiatives and outcomes",
        "Public meetings, community outreach programs, and direct interaction with citizens",
        "Digital platforms, online services, and technology-enabled citizen engagement tools",
        "Formal channels, official communications, and structured feedback mechanisms"
      ]
    },
    {
      question: "Which government sector challenge would you be most equipped to handle?",
      options: [
        "Education: Improving school infrastructure, teacher training, and student learning outcomes",
        "Healthcare: Enhancing medical facilities, public health programs, and disease prevention",
        "Infrastructure: Developing roads, bridges, digital connectivity, and urban planning",
        "Administration: Streamlining processes, improving governance, and ensuring policy compliance"
      ]
    },
    {
      question: "How do you envision contributing to India's development goals?",
      options: [
        "Through data-driven policy making and evidence-based decision making for better governance",
        "By ensuring inclusive development and equal opportunities for all sections of society",
        "Through technological innovation and digital transformation of government services",
        "By maintaining law and order, ensuring justice, and protecting citizens' rights and safety"
      ]
    },
    {
      question: "Which work environment would help you deliver your best performance?",
      options: [
        "Research-oriented environment with access to data, reports, and analytical tools",
        "Community-facing roles with regular interaction with diverse groups of people",
        "Technology-focused workplace with modern tools and digital infrastructure",
        "Structured office environment with clear hierarchies and defined processes"
      ]
    },
    {
      question: "What's your approach to handling conflicting priorities in government work?",
      options: [
        "Use data analysis and impact assessment to prioritize based on maximum public benefit",
        "Consult with stakeholders and communities to understand their most pressing needs",
        "Focus on technical feasibility and resource optimization to determine priority order",
        "Follow established protocols and guidelines while escalating complex decisions appropriately"
      ]
    },
    {
      question: "Which skill development area would you prioritize for your government career?",
      options: [
        "Analytical skills: Data interpretation, research methodology, and evidence-based decision making",
        "Communication skills: Public speaking, community engagement, and stakeholder management",
        "Technical skills: Digital literacy, modern tools, and technology implementation",
        "Leadership skills: Team management, strategic planning, and organizational development"
      ]
    },
    {
      question: "How do you view the role of technology in government services?",
      options: [
        "Essential for data management, analysis, and informed decision-making processes",
        "Important for citizen engagement, transparency, and improving accessibility of services",
        "Critical for modernizing operations, automating processes, and increasing efficiency",
        "Useful tool that should complement traditional governance methods and human interaction"
      ]
    },
    {
      question: "What's your preferred approach to professional development in government service?",
      options: [
        "Continuous learning through courses, research, and staying updated with policy developments",
        "Practical experience through diverse postings, community work, and hands-on problem solving",
        "Technical training, certifications, and specialization in emerging technologies and tools",
        "Mentorship, networking, and learning from experienced colleagues and senior officers"
      ]
    },
    {
      question: "Which aspect of government accountability do you consider most important?",
      options: [
        "Transparent reporting of outcomes, data-driven performance measurement, and result tracking",
        "Regular public consultation, citizen feedback mechanisms, and responsive governance",
        "Efficient use of technology for monitoring, evaluation, and real-time service delivery",
        "Following due process, maintaining records, and ensuring compliance with rules and regulations"
      ]
    },
    {
      question: "How would you handle resistance to change in a government organization?",
      options: [
        "Present compelling data and evidence to demonstrate the benefits of proposed changes",
        "Engage with stakeholders, understand concerns, and build consensus through dialogue",
        "Implement pilot projects to showcase practical benefits and gradually scale up changes",
        "Follow proper channels, build support from leadership, and ensure systematic change management"
      ]
    },
    {
      question: "What motivates you most about serving in the government sector?",
      options: [
        "Opportunity to use analytical skills and data to solve complex societal problems",
        "Direct impact on people's lives and contributing to community development and welfare",
        "Chance to modernize government operations and bring technological innovation to public service",
        "Stable career with opportunities for growth, learning, and making a difference in governance"
      ]
    }
  ];

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Assessments>('assessments');
      setAssessments(items.filter(item => item.isActive));
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const startAssessment = (assessment: Assessments) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const nextQuestion = () => {
    if (!selectedAssessment?.questionsContent && !selectedAssessment?.questionsData) return;
    
    try {
      const questionsSource = selectedAssessment.questionsData || selectedAssessment.questionsContent;
      const questions = JSON.parse(questionsSource || '[]');
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        completeAssessment();
      }
    } catch (error) {
      console.error('Error parsing questions:', error);
      // Fallback to mock questions if parsing fails
      if (currentQuestion < getMockQuestions().length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        completeAssessment();
      }
    }
  };

  const completeAssessment = () => {
    if (!selectedAssessment) return;
    
    // AI-powered assessment analysis
    const aiResults = analyzeAssessmentWithAI(selectedAssessment, answers);
    setResults(aiResults);
    setIsCompleted(true);
  };

  // AI-powered assessment analysis function
  const analyzeAssessmentWithAI = (assessment: Assessments, userAnswers: Record<number, string>) => {
    try {
      const questionsSource = assessment.questionsData || assessment.questionsContent;
      const questions = JSON.parse(questionsSource || '[]');
      const totalQuestions = questions.length;
      const answeredQuestions = Object.keys(userAnswers).length;
    
      // Advanced scoring algorithm based on answer patterns for government careers
      let score = 0;
      let careerScores = {
        civilServices: 0,      // IAS, IPS, Administrative roles
        education: 0,          // Teaching, Training, Educational administration
        banking: 0,            // Bank officers, Financial services
        technical: 0,          // Engineering, IT, Technical roles
        healthcare: 0,         // Medical, Public health
        lawEnforcement: 0,     // Police, Security, Legal
        research: 0,           // Analysis, Policy research
        publicService: 0       // General government service
      };
      
      // Analyze each answer for career alignment indicators based on realistic scenarios
      Object.entries(userAnswers).forEach(([questionIndex, answer]) => {
        const answerLower = answer.toLowerCase();
        const qIndex = parseInt(questionIndex);
        
        // Question-specific scoring based on realistic government scenarios
        switch (qIndex) {
          case 0: // Implementation priority question
            if (answerLower.includes('data analysis') || answerLower.includes('demographic needs')) {
              careerScores.research += 30;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('community meetings') || answerLower.includes('stakeholder')) {
              careerScores.publicService += 30;
              careerScores.civilServices += 25;
            } else if (answerLower.includes('digital infrastructure') || answerLower.includes('technology')) {
              careerScores.technical += 35;
            } else if (answerLower.includes('coordinate') || answerLower.includes('systematic')) {
              careerScores.civilServices += 30;
              careerScores.publicService += 20;
            }
            break;
            
          case 1: // Citizen complaint handling
            if (answerLower.includes('listen carefully') || answerLower.includes('personally follow')) {
              careerScores.publicService += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('standard procedure') || answerLower.includes('proper channels')) {
              careerScores.civilServices += 30;
              careerScores.publicService += 15;
            } else if (answerLower.includes('technical') || answerLower.includes('systemic issues')) {
              careerScores.technical += 35;
            } else if (answerLower.includes('escalate') || answerLower.includes('appropriate authorities')) {
              careerScores.civilServices += 25;
              careerScores.publicService += 25;
            }
            break;
            
          case 2: // Government challenges motivation
            if (answerLower.includes('digital literacy') || answerLower.includes('technology access')) {
              careerScores.technical += 30;
              careerScores.education += 25;
            } else if (answerLower.includes('bureaucratic delays') || answerLower.includes('citizen-friendly')) {
              careerScores.civilServices += 35;
              careerScores.publicService += 20;
            } else if (answerLower.includes('sustainable development') || answerLower.includes('environmental')) {
              careerScores.research += 25;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('healthcare') || answerLower.includes('medical facilities')) {
              careerScores.healthcare += 40;
            }
            break;
            
          case 3: // Decision-making responsibility
            if (answerLower.includes('financial planning') || answerLower.includes('budgets')) {
              careerScores.banking += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('policy implementation') || answerLower.includes('actionable programs')) {
              careerScores.civilServices += 40;
            } else if (answerLower.includes('technical solutions') || answerLower.includes('technology-based')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('human resource') || answerLower.includes('leading teams')) {
              careerScores.civilServices += 30;
              careerScores.publicService += 20;
            }
            break;
            
          case 4: // Handling inefficiencies
            if (answerLower.includes('analyze data') || answerLower.includes('systematic improvements')) {
              careerScores.research += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('discuss with colleagues') || answerLower.includes('different perspectives')) {
              careerScores.publicService += 30;
              careerScores.civilServices += 25;
            } else if (answerLower.includes('technology solutions') || answerLower.includes('automate')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('detailed report') || answerLower.includes('evidence-based')) {
              careerScores.research += 30;
              careerScores.civilServices += 25;
            }
            break;
            
          case 5: // Public service motivation
            if (answerLower.includes('direct impact') || answerLower.includes('service delivery')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('nation-building') || answerLower.includes('governance')) {
              careerScores.civilServices += 40;
            } else if (answerLower.includes('technical expertise') || answerLower.includes('modernize')) {
              careerScores.technical += 35;
            } else if (answerLower.includes('community relationships') || answerLower.includes('inclusive development')) {
              careerScores.publicService += 35;
              careerScores.civilServices += 15;
            }
            break;
            
          case 6: // Staying updated
            if (answerLower.includes('government reports') || answerLower.includes('policy documents')) {
              careerScores.civilServices += 35;
              careerScores.research += 25;
            } else if (answerLower.includes('training programs') || answerLower.includes('professional development')) {
              careerScores.education += 30;
              careerScores.publicService += 20;
            } else if (answerLower.includes('technology trends') || answerLower.includes('technical certifications')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('networking') || answerLower.includes('knowledge-sharing')) {
              careerScores.publicService += 25;
              careerScores.civilServices += 20;
            }
            break;
            
          case 7: // Crisis response
            if (answerLower.includes('assess systematically') || answerLower.includes('coordinate with departments')) {
              careerScores.civilServices += 35;
              careerScores.research += 20;
            } else if (answerLower.includes('communicate with communities') || answerLower.includes('transparent information')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('technical solutions') || answerLower.includes('infrastructure repair')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('mobilize resources') || answerLower.includes('emergency response')) {
              careerScores.civilServices += 30;
              careerScores.lawEnforcement += 25;
            }
            break;
            
          case 8: // Exam preparation strategy
            if (answerLower.includes('current affairs') || answerLower.includes('analytical reasoning')) {
              careerScores.civilServices += 35;
              careerScores.research += 25;
            } else if (answerLower.includes('mock interviews') || answerLower.includes('personality development')) {
              careerScores.publicService += 30;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('technical subject') || answerLower.includes('specialized knowledge')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('practical application') || answerLower.includes('case studies')) {
              careerScores.research += 30;
              careerScores.civilServices += 20;
            }
            break;
            
          case 9: // Public engagement method
            if (answerLower.includes('data-driven presentations') || answerLower.includes('communicate outcomes')) {
              careerScores.research += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('public meetings') || answerLower.includes('direct interaction')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('digital platforms') || answerLower.includes('technology-enabled')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('formal channels') || answerLower.includes('structured feedback')) {
              careerScores.civilServices += 35;
            }
            break;
            
          case 10: // Sector challenge handling
            if (answerLower.includes('education') || answerLower.includes('teacher training')) {
              careerScores.education += 40;
            } else if (answerLower.includes('healthcare') || answerLower.includes('medical facilities')) {
              careerScores.healthcare += 40;
            } else if (answerLower.includes('infrastructure') || answerLower.includes('digital connectivity')) {
              careerScores.technical += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('administration') || answerLower.includes('policy compliance')) {
              careerScores.civilServices += 40;
            }
            break;
            
          case 11: // Development contribution
            if (answerLower.includes('data-driven policy') || answerLower.includes('evidence-based')) {
              careerScores.research += 40;
              careerScores.civilServices += 25;
            } else if (answerLower.includes('inclusive development') || answerLower.includes('equal opportunities')) {
              careerScores.publicService += 40;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('technological innovation') || answerLower.includes('digital transformation')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('law and order') || answerLower.includes('protecting citizens')) {
              careerScores.lawEnforcement += 40;
            }
            break;
            
          case 12: // Work environment preference
            if (answerLower.includes('research-oriented') || answerLower.includes('analytical tools')) {
              careerScores.research += 40;
            } else if (answerLower.includes('community-facing') || answerLower.includes('diverse groups')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('technology-focused') || answerLower.includes('digital infrastructure')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('structured office') || answerLower.includes('defined processes')) {
              careerScores.civilServices += 35;
              careerScores.banking += 25;
            }
            break;
            
          case 13: // Handling conflicting priorities
            if (answerLower.includes('data analysis') || answerLower.includes('impact assessment')) {
              careerScores.research += 35;
              careerScores.civilServices += 25;
            } else if (answerLower.includes('stakeholders') || answerLower.includes('communities')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('technical feasibility') || answerLower.includes('resource optimization')) {
              careerScores.technical += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('established protocols') || answerLower.includes('escalating decisions')) {
              careerScores.civilServices += 40;
            }
            break;
            
          case 14: // Skill development priority
            if (answerLower.includes('analytical skills') || answerLower.includes('research methodology')) {
              careerScores.research += 40;
            } else if (answerLower.includes('communication skills') || answerLower.includes('stakeholder management')) {
              careerScores.publicService += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('technical skills') || answerLower.includes('technology implementation')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('leadership skills') || answerLower.includes('organizational development')) {
              careerScores.civilServices += 40;
            }
            break;
            
          case 15: // Technology role view
            if (answerLower.includes('data management') || answerLower.includes('informed decision-making')) {
              careerScores.research += 35;
              careerScores.technical += 25;
            } else if (answerLower.includes('citizen engagement') || answerLower.includes('accessibility')) {
              careerScores.publicService += 35;
              careerScores.technical += 25;
            } else if (answerLower.includes('modernizing operations') || answerLower.includes('increasing efficiency')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('complement traditional') || answerLower.includes('human interaction')) {
              careerScores.civilServices += 30;
              careerScores.publicService += 25;
            }
            break;
            
          case 16: // Professional development approach
            if (answerLower.includes('continuous learning') || answerLower.includes('policy developments')) {
              careerScores.research += 35;
              careerScores.civilServices += 25;
            } else if (answerLower.includes('practical experience') || answerLower.includes('community work')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('technical training') || answerLower.includes('emerging technologies')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('mentorship') || answerLower.includes('senior officers')) {
              careerScores.civilServices += 35;
              careerScores.publicService += 20;
            }
            break;
            
          case 17: // Government accountability
            if (answerLower.includes('transparent reporting') || answerLower.includes('performance measurement')) {
              careerScores.research += 35;
              careerScores.civilServices += 25;
            } else if (answerLower.includes('public consultation') || answerLower.includes('responsive governance')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('technology for monitoring') || answerLower.includes('real-time service')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('due process') || answerLower.includes('compliance')) {
              careerScores.civilServices += 40;
            }
            break;
            
          case 18: // Handling resistance to change
            if (answerLower.includes('compelling data') || answerLower.includes('evidence')) {
              careerScores.research += 40;
            } else if (answerLower.includes('engage with stakeholders') || answerLower.includes('build consensus')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('pilot projects') || answerLower.includes('practical benefits')) {
              careerScores.technical += 35;
              careerScores.civilServices += 20;
            } else if (answerLower.includes('proper channels') || answerLower.includes('systematic change')) {
              careerScores.civilServices += 40;
            }
            break;
            
          case 19: // Government service motivation
            if (answerLower.includes('analytical skills') || answerLower.includes('complex societal problems')) {
              careerScores.research += 40;
            } else if (answerLower.includes('direct impact') || answerLower.includes('community development')) {
              careerScores.publicService += 40;
            } else if (answerLower.includes('modernize government') || answerLower.includes('technological innovation')) {
              careerScores.technical += 40;
            } else if (answerLower.includes('stable career') || answerLower.includes('governance')) {
              careerScores.civilServices += 35;
              careerScores.banking += 20;
            }
            break;
        }
        
        // Additional general keyword scoring for comprehensive analysis
        if (answerLower.includes('policy') || answerLower.includes('governance') || answerLower.includes('administration')) {
          careerScores.civilServices += 10;
        }
        if (answerLower.includes('community') || answerLower.includes('citizen') || answerLower.includes('public service')) {
          careerScores.publicService += 10;
        }
        if (answerLower.includes('technology') || answerLower.includes('digital') || answerLower.includes('technical')) {
          careerScores.technical += 10;
        }
        if (answerLower.includes('education') || answerLower.includes('teaching') || answerLower.includes('training')) {
          careerScores.education += 10;
        }
        if (answerLower.includes('healthcare') || answerLower.includes('medical') || answerLower.includes('health')) {
          careerScores.healthcare += 10;
        }
        if (answerLower.includes('banking') || answerLower.includes('financial') || answerLower.includes('budget')) {
          careerScores.banking += 10;
        }
        if (answerLower.includes('research') || answerLower.includes('analysis') || answerLower.includes('data')) {
          careerScores.research += 10;
        }
        if (answerLower.includes('law') || answerLower.includes('security') || answerLower.includes('safety')) {
          careerScores.lawEnforcement += 10;
        }
        
        score += 10; // Base score for each answered question
      });
      
      // Calculate completion percentage
      const completionRate = (answeredQuestions / totalQuestions) * 100;
      score = Math.min(100, (score / totalQuestions) * (completionRate / 100));
      
      // Determine top career matches
      const topCareers = Object.entries(careerScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([career]) => career);
      
      // Generate career recommendations based on top matches
      const careerRecommendations = generateGovernmentCareerRecommendations(topCareers);
      const topCareer = careerRecommendations[0] || 'Public Administration';
      const courseRecommendations = generateCourseRecommendations(careerScores, topCareer);
      const governmentJobRecommendations = generateGovernmentJobRecommendations(careerScores);
      
      // Personalized insights based on government career focus
      const personalizedInsights = generateGovernmentCareerInsights(careerScores, score);
      
      // Generate career trajectory for government roles
      const careerTrajectory = generateCareerTrajectory(topCareer, careerScores);
      
      // Generate future job roles in government sector
      const futureJobRoles = generateFutureJobRoles(topCareer);
      
      // Generate pros and cons for government careers
      const prosAndCons = generateCareerProsAndCons(topCareer);
      
      return {
        score: Math.round(score),
        category: score >= 85 ? 'Outstanding' : score >= 70 ? 'Excellent' : score >= 55 ? 'Good' : 'Developing',
        completionRate: Math.round(completionRate),
        topSkills: topCareers.map(career => formatCareerName(career)),
        skillBreakdown: careerScores,
        recommendations: careerRecommendations,
        detailedCourseRecommendations: courseRecommendations,
        governmentJobs: governmentJobRecommendations,
        personalizedInsights,
        strengths: topCareers.map(career => `${formatCareerName(career)} Aptitude`),
        improvementAreas: getImprovementAreas(careerScores),
        nextSteps: generateNextSteps(careerScores, score),
        careerTrajectory: careerTrajectory,
        futureJobRoles: futureJobRoles,
        prosAndCons: prosAndCons
      };
    } catch (error) {
      console.error('Error analyzing assessment:', error);
      
      // Return fallback results focused on government careers
      const fallbackCareerScores = {
        civilServices: 50,
        education: 50,
        banking: 50,
        technical: 50,
        healthcare: 50,
        lawEnforcement: 50,
        research: 50,
        publicService: 50
      };
      
      return {
        score: 75,
        category: 'Good',
        completionRate: 100,
        topSkills: ['Civil Services', 'Public Administration', 'Government Service'],
        skillBreakdown: fallbackCareerScores,
        recommendations: ['Public Administration', 'Civil Services', 'Government Teaching'],
        detailedCourseRecommendations: {
          onlineCourses: [
            {
              title: 'Public Administration and Governance',
              platform: 'NPTEL (IIT Delhi)',
              description: 'Comprehensive course on Indian administrative system and governance',
              duration: '12 weeks',
              rating: '4.7/5'
            },
            {
              title: 'Indian Polity and Constitution',
              platform: 'Unacademy',
              description: 'Essential knowledge for civil services and government careers',
              duration: '8 weeks',
              rating: '4.6/5'
            }
          ],
          books: [
            {
              title: 'Indian Administration',
              author: 'Avasthi & Maheshwari',
              description: 'Comprehensive guide to Indian administrative system'
            },
            {
              title: 'Introduction to the Constitution of India',
              author: 'D.D. Basu',
              description: 'Authoritative text on Indian constitutional law'
            }
          ],
          channels: [
            {
              name: 'Study IQ Education',
              platform: 'YouTube',
              description: 'Comprehensive UPSC and government exam preparation content',
              subscribers: '4.2M+'
            },
            {
              name: 'Drishti IAS',
              platform: 'Blog/YouTube',
              description: 'Leading civil services preparation platform',
              subscribers: '2.1M+'
            }
          ]
        },
        governmentJobs: ['Administrative Officer', 'Government Teacher', 'Bank Officer'],
        personalizedInsights: ['You show strong potential for government service.', 'Consider exploring various government career options based on your interests.'],
        strengths: ['Civil Services Aptitude', 'Public Administration', 'Government Service'],
        improvementAreas: [],
        nextSteps: ['Explore government career paths', 'Take additional assessments', 'Research exam requirements', 'Consider skill development courses'],
        careerTrajectory: {
          title: 'Government Career Path',
          milestones: [
            {
              year: '0-2 Years',
              role: 'Entry Level Government Position',
              description: 'Start your government career journey by building foundational knowledge and gaining practical experience.',
              skills: ['Government Procedures', 'Public Service', 'Communication', 'Basic Administration'],
              responsibilities: ['Learn government systems', 'Assist senior officers', 'Handle public queries', 'Maintain records']
            },
            {
              year: '2-5 Years',
              role: 'Junior Officer',
              description: 'Develop expertise in your chosen field and take on increased responsibilities.',
              skills: ['Policy Understanding', 'Project Management', 'Leadership', 'Specialized Knowledge'],
              responsibilities: ['Implement policies', 'Manage small teams', 'Handle complex cases', 'Coordinate with departments']
            },
            {
              year: '5-8 Years',
              role: 'Senior Officer',
              description: 'Lead teams and contribute to policy decisions in your organization.',
              skills: ['Strategic Thinking', 'Advanced Leadership', 'Policy Formulation', 'Stakeholder Management'],
              responsibilities: ['Lead major projects', 'Formulate policies', 'Manage large teams', 'Represent department']
            },
            {
              year: '8-10 Years',
              role: 'Department Head/Director',
              description: 'Shape organizational strategy and drive systemic improvements.',
              skills: ['Executive Leadership', 'Vision Setting', 'Inter-departmental Coordination', 'Public Relations'],
              responsibilities: ['Set departmental vision', 'Drive policy changes', 'Manage budgets', 'Lead transformation']
            }
          ]
        },
        futureJobRoles: {
          title: 'Government Service',
          futureRoles: [
            {
              role: 'Digital Governance Specialist',
              description: 'Lead the digital transformation of government services, making citizen interactions seamless through technology.',
              icon: 'Cpu',
              trend: 'High Demand'
            },
            {
              role: 'Policy Innovation Manager',
              description: 'Design and implement innovative policies using data analytics and citizen feedback for better governance.',
              icon: 'Bot',
              trend: 'Emerging'
            },
            {
              role: 'Sustainable Development Coordinator',
              description: 'Drive India\'s sustainable future by coordinating green initiatives and environmental policies.',
              icon: 'Globe',
              trend: 'Critical Need'
            },
            {
              role: 'Citizen Experience Designer',
              description: 'Revolutionize how citizens interact with government through user-centered design and service innovation.',
              icon: 'Wand2',
              trend: 'User-Focused'
            }
          ]
        },
        prosAndCons: {
          title: 'Government Career',
          pros: [
            'Job security and stable employment with comprehensive benefits',
            'Opportunity to serve the public and make a positive impact on society',
            'Clear career progression with defined promotion opportunities',
            'Work-life balance with regulated working hours and holidays',
            'Respect in society and opportunity to contribute to nation building'
          ],
          cons: [
            'Slower salary growth compared to private sector positions',
            'Bureaucratic processes may limit quick decision-making',
            'Limited flexibility in work methods and procedures',
            'Potential for political interference in some roles',
            'Competitive entrance exams with extensive preparation required'
          ]
        },
      };
    }
  };

  // AI Pros and Cons Generator - Generates balanced analysis for any career
  const generateCareerProsAndCons = (careerTitle: string) => {
    const careerLower = careerTitle.toLowerCase();
    
    // Define pros and cons for specific career types
    const careerAnalysis: Record<string, any> = {
      'software engineering': {
        title: 'Software Engineer',
        pros: [
          'High salary potential and excellent growth opportunities',
          'Flexibility to work remotely or freelance',
          'Constant learning and skill development in emerging technologies',
          'High demand in the job market with multiple career paths',
          'Creative problem-solving and innovation opportunities'
        ],
        cons: [
          'Long working hours and potential for burnout',
          'Rapid technology changes require continuous learning',
          'Sedentary work environment with health implications',
          'High competition and pressure to stay updated',
          'Project deadlines can create significant stress'
        ]
      },
      'data science': {
        title: 'Data Scientist',
        pros: [
          'High demand across industries with excellent salary prospects',
          'Opportunity to work on cutting-edge AI and machine learning projects',
          'Direct impact on business decisions and strategy',
          'Diverse career paths from research to product development',
          'Intellectual stimulation through complex problem-solving'
        ],
        cons: [
          'Requires strong mathematical and statistical background',
          'Data quality issues can make analysis challenging',
          'Long hours spent on data cleaning and preprocessing',
          'Need to constantly update skills with new tools and techniques',
          'Results may be misinterpreted by non-technical stakeholders'
        ]
      },
      'public administration': {
        title: 'Civil Servant',
        pros: [
          'Job security and stable employment with government benefits',
          'Opportunity to serve the public and create positive social impact',
          'Clear career progression with defined promotion pathways',
          'Comprehensive healthcare, pension, and retirement benefits',
          'Work-life balance with regulated working hours'
        ],
        cons: [
          'Lower salary compared to private sector positions',
          'Bureaucratic processes can slow decision-making and innovation',
          'Limited flexibility in work methods and procedures',
          'Potential for political interference in policy decisions',
          'Slower adoption of modern technology and practices'
        ]
      },
      'teaching': {
        title: 'Government Teacher',
        pros: [
          'Job security with permanent employment and pension benefits',
          'Opportunity to shape future generations and make social impact',
          'Regular holidays and vacation time throughout the year',
          'Respect in society and community recognition',
          'Continuous learning and intellectual growth opportunities'
        ],
        cons: [
          'Relatively lower salary compared to other professions',
          'Large class sizes can make individual attention difficult',
          'Administrative workload beyond teaching responsibilities',
          'Limited resources and infrastructure in some schools',
          'Dealing with diverse student backgrounds and learning needs'
        ]
      },
      'banking': {
        title: 'Bank Officer',
        pros: [
          'Stable employment with good salary and benefits package',
          'Opportunities for career advancement within the banking sector',
          'Professional development through training and certifications',
          'Respect in society and financial sector expertise',
          'Exposure to various financial products and services'
        ],
        cons: [
          'High pressure to meet sales targets and performance metrics',
          'Long working hours especially during peak business periods',
          'Dealing with difficult customers and complaint resolution',
          'Strict regulatory compliance requirements',
          'Risk of fraud and security-related responsibilities'
        ]
      },
      'police officer': {
        title: 'Police Officer',
        pros: [
          'Opportunity to serve and protect the community',
          'Job security with government employment benefits',
          'Variety in daily work and challenging situations',
          'Respect and authority in maintaining law and order',
          'Career advancement opportunities in law enforcement'
        ],
        cons: [
          'Physical danger and risk to personal safety',
          'Irregular working hours including nights and weekends',
          'High stress from dealing with criminal activities',
          'Public scrutiny and criticism of police actions',
          'Emotional toll from witnessing traumatic situations'
        ]
      }
    };

    // Try to find exact match first
    if (careerAnalysis[careerLower]) {
      return careerAnalysis[careerLower];
    }

    // Try to find partial matches
    for (const [key, analysis] of Object.entries(careerAnalysis)) {
      if (careerLower.includes(key.split(' ')[0]) || key.includes(careerLower.split(' ')[0])) {
        return analysis;
      }
    }

    // Generic pros and cons for any career
    return {
      title: careerTitle,
      pros: [
        'Stable employment with government benefits and job security',
        'Opportunity to serve the public and make a positive social impact',
        'Clear career progression with defined promotion opportunities',
        'Comprehensive healthcare and retirement benefit packages',
        'Work-life balance with regulated working hours and holidays'
      ],
      cons: [
        'Limited salary growth compared to private sector positions',
        'Bureaucratic processes may slow decision-making and innovation',
        'Less flexibility in work methods and operational procedures',
        'Potential for political interference in some administrative roles',
        'Slower adoption of new technologies and modern practices'
      ]
    };
  };

  // Generate government career recommendations based on skill profile
  const generateGovernmentCareerRecommendations = (topCareers: string[]) => {
    const careerMapping: Record<string, string[]> = {
      civilServices: [
        'IAS Officer (Indian Administrative Service)',
        'IPS Officer (Indian Police Service)', 
        'District Collector',
        'Sub-Divisional Magistrate',
        'Block Development Officer'
      ],
      education: [
        'Government School Teacher',
        'Principal/Headmaster',
        'Education Officer',
        'Training and Development Specialist',
        'Academic Administrator'
      ],
      banking: [
        'Bank Probationary Officer',
        'Bank Clerk',
        'Assistant Manager (Banking)',
        'Credit Officer',
        'Financial Analyst (Government)'
      ],
      technical: [
        'Technical Officer (Government)',
        'IT Specialist (Government)',
        'Engineering Officer',
        'Systems Analyst',
        'Digital Infrastructure Manager'
      ],
      healthcare: [
        'Medical Officer (Government)',
        'Public Health Specialist',
        'Healthcare Administrator',
        'Community Health Officer',
        'Medical Research Officer'
      ],
      lawEnforcement: [
        'Police Constable',
        'Sub-Inspector',
        'Assistant Commissioner of Police',
        'Security Officer',
        'Investigation Officer'
      ],
      research: [
        'Research Officer (Government)',
        'Policy Analyst',
        'Statistical Officer',
        'Data Analyst (Government)',
        'Planning Officer'
      ],
      publicService: [
        'Public Relations Officer',
        'Community Development Officer',
        'Social Welfare Officer',
        'Administrative Assistant',
        'Citizen Services Coordinator'
      ]
    };

    const recommendations: string[] = [];
    
    topCareers.forEach(career => {
      const careerRecommendations = careerMapping[career] || [];
      recommendations.push(...careerRecommendations.slice(0, 2)); // Take top 2 from each category
    });

    // Ensure we have at least 3 recommendations
    if (recommendations.length < 3) {
      recommendations.push(
        'Administrative Officer',
        'Government Clerk',
        'Public Service Representative'
      );
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  };

  // AI Course Recommendations Tool - Enhanced with detailed recommendations
  const generateCourseRecommendations = (skills: any, topCareer: string) => {
    const careerRecommendations: Record<string, any> = {
      'Software Engineering': {
        onlineCourses: [
          {
            title: 'Complete Web Development Bootcamp',
            platform: 'Coursera (University of Michigan)',
            description: 'Comprehensive full-stack development course covering HTML, CSS, JavaScript, React, and Node.js',
            duration: '6 months',
            rating: '4.8/5'
          },
          {
            title: 'Programming, Data Structures and Algorithms',
            platform: 'NPTEL (IIT Delhi)',
            description: 'Fundamental computer science concepts essential for software engineering roles',
            duration: '12 weeks',
            rating: '4.7/5'
          }
        ],
        books: [
          {
            title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
            author: 'Robert C. Martin',
            description: 'Essential guide for writing maintainable and professional code'
          },
          {
            title: 'Introduction to Algorithms (CLRS)',
            author: 'Thomas H. Cormen',
            description: 'Comprehensive textbook on algorithms and data structures'
          }
        ],
        channels: [
          {
            name: 'CodeWithHarry',
            platform: 'YouTube',
            description: 'Popular Hindi programming tutorials covering web development, Python, and more',
            subscribers: '3.2M+'
          },
          {
            name: 'GeeksforGeeks',
            platform: 'Blog/YouTube',
            description: 'Comprehensive programming tutorials and interview preparation content',
            subscribers: '1.8M+'
          }
        ]
      },
      'Data Science': {
        onlineCourses: [
          {
            title: 'IBM Data Science Professional Certificate',
            platform: 'Coursera (IBM)',
            description: 'Complete data science program covering Python, SQL, machine learning, and data visualization',
            duration: '8 months',
            rating: '4.6/5'
          },
          {
            title: 'Introduction to Machine Learning',
            platform: 'NPTEL (IIT Madras)',
            description: 'Comprehensive ML course covering algorithms, statistics, and practical applications',
            duration: '12 weeks',
            rating: '4.8/5'
          }
        ],
        books: [
          {
            title: 'Python for Data Analysis',
            author: 'Wes McKinney',
            description: 'Essential guide for data manipulation and analysis using Python and pandas'
          },
          {
            title: 'The Elements of Statistical Learning',
            author: 'Hastie, Tibshirani, Friedman',
            description: 'Comprehensive textbook on statistical learning and machine learning'
          }
        ],
        channels: [
          {
            name: 'Krish Naik',
            platform: 'YouTube',
            description: 'Comprehensive data science tutorials in Hindi and English, covering ML, AI, and statistics',
            subscribers: '800K+'
          },
          {
            name: 'Analytics Vidhya',
            platform: 'Blog/YouTube',
            description: 'Leading data science community with tutorials, competitions, and industry insights',
            subscribers: '500K+'
          }
        ]
      },
      'Public Administration': {
        onlineCourses: [
          {
            title: 'Public Policy and Governance',
            platform: 'Coursera (University of Virginia)',
            description: 'Comprehensive course on policy analysis, implementation, and governance structures',
            duration: '4 months',
            rating: '4.5/5'
          },
          {
            title: 'Constitutional Law and Governance',
            platform: 'NPTEL (NLSIU Bangalore)',
            description: 'In-depth study of Indian constitutional framework and administrative law',
            duration: '12 weeks',
            rating: '4.7/5'
          }
        ],
        books: [
          {
            title: 'Indian Administration',
            author: 'Avasthi & Maheshwari',
            description: 'Comprehensive guide to Indian administrative system and public administration'
          },
          {
            title: 'Introduction to the Constitution of India',
            author: 'D.D. Basu',
            description: 'Authoritative text on Indian constitutional law and governance'
          }
        ],
        channels: [
          {
            name: 'Study IQ Education',
            platform: 'YouTube',
            description: 'Comprehensive UPSC preparation content covering polity, governance, and current affairs',
            subscribers: '4.2M+'
          },
          {
            name: 'Drishti IAS',
            platform: 'Blog/YouTube',
            description: 'Leading civil services preparation platform with detailed analysis and study materials',
            subscribers: '2.1M+'
          }
        ]
      },
      'Teaching': {
        onlineCourses: [
          {
            title: 'Introduction to Teaching and Learning',
            platform: 'Coursera (University of California)',
            description: 'Fundamental teaching methodologies and educational psychology principles',
            duration: '6 weeks',
            rating: '4.6/5'
          },
          {
            title: 'Educational Technology and Digital Learning',
            platform: 'NPTEL (IIT Bombay)',
            description: 'Modern teaching tools and digital classroom management techniques',
            duration: '8 weeks',
            rating: '4.5/5'
          }
        ],
        books: [
          {
            title: 'Pedagogy of the Oppressed',
            author: 'Paulo Freire',
            description: 'Influential work on critical pedagogy and transformative education'
          },
          {
            title: 'Educational Psychology',
            author: 'Anita Woolfolk',
            description: 'Comprehensive guide to learning theories and classroom applications'
          }
        ],
        channels: [
          {
            name: 'CTET Success',
            platform: 'YouTube',
            description: 'Comprehensive teacher eligibility test preparation and teaching methodology content',
            subscribers: '1.5M+'
          },
          {
            name: 'Education Mirror',
            platform: 'Blog/YouTube',
            description: 'Educational news, teaching strategies, and career guidance for educators',
            subscribers: '800K+'
          }
        ]
      },
      'Banking': {
        onlineCourses: [
          {
            title: 'Banking and Financial Markets',
            platform: 'Coursera (University of Pennsylvania)',
            description: 'Comprehensive course on banking operations, financial markets, and risk management',
            duration: '5 months',
            rating: '4.4/5'
          },
          {
            title: 'Financial Management and Analysis',
            platform: 'NPTEL (IIM Bangalore)',
            description: 'Advanced financial concepts for banking and corporate finance professionals',
            duration: '12 weeks',
            rating: '4.6/5'
          }
        ],
        books: [
          {
            title: 'Banking Theory and Practice',
            author: 'Shekhar & Shekhar',
            description: 'Comprehensive guide to Indian banking system and practices'
          },
          {
            title: 'Financial Markets and Institutions',
            author: 'Frederic S. Mishkin',
            description: 'Global perspective on financial systems and banking operations'
          }
        ],
        channels: [
          {
            name: 'Banking Chronicle',
            platform: 'YouTube',
            description: 'Banking exam preparation, current affairs, and financial sector updates',
            subscribers: '2.3M+'
          },
          {
            name: 'Adda247',
            platform: 'Blog/YouTube',
            description: 'Comprehensive banking and SSC exam preparation with daily updates',
            subscribers: '3.8M+'
          }
        ]
      }
    };

    // Find the best matching recommendations
    let selectedRecommendations = careerRecommendations['Software Engineering']; // default
    
    for (const [key, recommendations] of Object.entries(careerRecommendations)) {
      if (topCareer.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
        selectedRecommendations = recommendations;
        break;
      }
    }

    // Fallback generic recommendations if no match found
    if (!selectedRecommendations || selectedRecommendations === careerRecommendations['Software Engineering']) {
      selectedRecommendations = {
        onlineCourses: [
          {
            title: 'Introduction to Computer Science',
            platform: 'Coursera (Harvard University)',
            description: 'Fundamental computer science concepts and programming basics',
            duration: '12 weeks',
            rating: '4.7/5'
          },
          {
            title: 'Soft Skills for Professional Development',
            platform: 'NPTEL (IIT Kanpur)',
            description: 'Essential communication and leadership skills for career growth',
            duration: '8 weeks',
            rating: '4.5/5'
          }
        ],
        books: [
          {
            title: 'The 7 Habits of Highly Effective People',
            author: 'Stephen R. Covey',
            description: 'Timeless principles for personal and professional effectiveness'
          },
          {
            title: 'Atomic Habits',
            author: 'James Clear',
            description: 'Practical guide to building good habits and breaking bad ones'
          }
        ],
        channels: [
          {
            name: 'Sandeep Maheshwari',
            platform: 'YouTube',
            description: 'Motivational content and practical life advice for personal development',
            subscribers: '27M+'
          },
          {
            name: 'Unacademy',
            platform: 'Blog/YouTube',
            description: 'Comprehensive educational content across various competitive exams and skills',
            subscribers: '8.5M+'
          }
        ]
      };
    }

    return selectedRecommendations;
  };

  // Generate government job recommendations
  const generateGovernmentJobRecommendations = (skills: any) => {
    const jobs = [];
    
    if (skills.leadership >= 40) {
      jobs.push('IAS Officer', 'IPS Officer', 'District Collector');
    }
    if (skills.technical >= 40) {
      jobs.push('Technical Officer', 'IT Specialist', 'Engineer (Government)');
    }
    if (skills.analytical >= 40) {
      jobs.push('Statistical Officer', 'Research Officer', 'Policy Analyst');
    }
    if (skills.communication >= 40) {
      jobs.push('Public Relations Officer', 'Information Officer', 'Teacher');
    }
    if (skills.problemSolving >= 40) {
      jobs.push('Administrative Officer', 'Project Coordinator', 'Operations Manager');
    }
    
    if (jobs.length === 0) {
      jobs.push('Clerk', 'Assistant', 'Support Staff');
    }
    
    return jobs.slice(0, 4);
  };

  // Generate personalized insights based on government career focus
  const generateGovernmentCareerInsights = (careerScores: any, score: number) => {
    const insights = [];
    
    const topCareer = Object.entries(careerScores).reduce((a, b) => careerScores[a[0]] > careerScores[b[0]] ? a : b)[0];
    const topScore = careerScores[topCareer];
    
    // Career-specific insights based on assessment responses
    switch (topCareer) {
      case 'civilServices':
        insights.push(`Your responses indicate strong potential for civil services, particularly in administrative and policy implementation roles.`);
        if (topScore >= 80) {
          insights.push(`You demonstrate excellent leadership qualities and systematic thinking essential for IAS/IPS positions.`);
        }
        break;
      case 'technical':
        insights.push(`Your technical orientation and problem-solving approach align well with government technology roles.`);
        if (topScore >= 80) {
          insights.push(`Consider roles in digital governance, e-governance initiatives, and government IT modernization projects.`);
        }
        break;
      case 'education':
        insights.push(`Your focus on community development and knowledge sharing suggests a strong fit for educational roles.`);
        if (topScore >= 80) {
          insights.push(`You could excel as a government teacher or in educational administration and policy development.`);
        }
        break;
      case 'healthcare':
        insights.push(`Your concern for public welfare and community health indicates potential in healthcare administration.`);
        break;
      case 'banking':
        insights.push(`Your analytical approach and attention to systematic processes suit banking and financial services.`);
        break;
      case 'research':
        insights.push(`Your data-driven thinking and analytical skills are valuable for policy research and planning roles.`);
        break;
      case 'publicService':
        insights.push(`Your community-focused approach and citizen engagement skills are ideal for public service roles.`);
        break;
      case 'lawEnforcement':
        insights.push(`Your focus on safety and systematic problem-solving aligns with law enforcement careers.`);
        break;
    }
    
    // Score-based insights
    if (score >= 85) {
      insights.push("Your assessment responses show exceptional alignment with government service values and approaches.");
    } else if (score >= 70) {
      insights.push("You demonstrate strong capabilities for government roles with some areas for focused development.");
    } else if (score >= 55) {
      insights.push("You have a solid foundation for government careers with opportunities to strengthen key competencies.");
    } else {
      insights.push("Consider exploring different government sectors to find the best match for your interests and skills.");
    }
    
    // Multi-career potential insights
    const strongCareers = Object.entries(careerScores).filter(([, score]) => (score as number) >= 60);
    if (strongCareers.length > 2) {
      insights.push(`You show versatility across multiple government sectors: ${strongCareers.map(([career]) => formatCareerName(career)).join(', ')}.`);
    }
    
    // Practical next steps insight
    if (careerScores.civilServices >= 60) {
      insights.push("Consider starting UPSC preparation or exploring state-level administrative service examinations.");
    } else if (careerScores.technical >= 60) {
      insights.push("Look into government IT positions, digital India initiatives, and technical officer roles.");
    } else if (careerScores.education >= 60) {
      insights.push("Explore teaching eligibility tests (TET) and government school teaching positions in your area.");
    }
    
    return insights;
  };

  // Get improvement areas
  const getImprovementAreas = (skills: Record<string, number>) => {
    return Object.entries(skills)
      .filter(([, score]) => score < 40)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2)
      .map(([skill]) => skill.charAt(0).toUpperCase() + skill.slice(1));
  };

  // Format career name for display
  const formatCareerName = (careerKey: string) => {
    const careerNames: Record<string, string> = {
      civilServices: 'Civil Services',
      education: 'Education',
      banking: 'Banking',
      technical: 'Technical',
      healthcare: 'Healthcare',
      lawEnforcement: 'Law Enforcement',
      research: 'Research',
      publicService: 'Public Service'
    };
    
    return careerNames[careerKey] || careerKey.charAt(0).toUpperCase() + careerKey.slice(1);
  };

  // Generate next steps
  const generateNextSteps = (skills: any, score: number) => {
    const steps = [];
    
    if (score < 60) {
      steps.push("Take additional assessments to better understand your interests");
      steps.push("Explore skill development courses in your areas of interest");
    } else {
      steps.push("Research specific career paths that match your skill profile");
      steps.push("Connect with professionals in your recommended fields");
    }
    
    const topSkill = Object.entries(skills).reduce((a, b) => skills[a[0]] > skills[b[0]] ? a : b)[0];
    steps.push(`Focus on developing your ${topSkill} skills through practical projects`);
    steps.push("Consider internships or volunteer work in your areas of interest");
    
    return steps;
  };

  // AI Future Job Roles Generator - Predicts emerging roles in the next 5-10 years
  const generateFutureJobRoles = (topCareer: string) => {
    const futureRoles: Record<string, any> = {
      'Software Engineering': {
        title: 'Software Engineer',
        futureRoles: [
          {
            role: 'AI Ethics Compliance Officer',
            description: 'Ensure AI systems in government services are fair, transparent, and ethical. You\'ll be the guardian of responsible AI implementation, shaping how technology serves citizens while protecting their rights and privacy.',
            icon: 'Bot',
            trend: 'High Demand'
          },
          {
            role: 'Quantum Computing Specialist',
            description: 'Lead India\'s quantum revolution in government cybersecurity and data processing. You\'ll work on breakthrough technologies that will secure national infrastructure and solve complex computational challenges.',
            icon: 'Cpu',
            trend: 'Emerging'
          },
          {
            role: 'Digital Twin Architect',
            description: 'Create virtual replicas of government infrastructure and services. You\'ll design digital twins of smart cities, helping optimize everything from traffic flow to energy consumption across Indian urban centers.',
            icon: 'Globe',
            trend: 'Growing Fast'
          },
          {
            role: 'Metaverse Government Services Designer',
            description: 'Pioneer virtual government offices and citizen services in the metaverse. You\'ll make government interactions more accessible and engaging, bringing public services into immersive digital spaces.',
            icon: 'Wand2',
            trend: 'Future Ready'
          }
        ]
      },
      'Data Science': {
        title: 'Data Scientist',
        futureRoles: [
          {
            role: 'Climate Data Intelligence Analyst',
            description: 'Use advanced analytics to combat climate change and guide India\'s environmental policies. You\'ll predict weather patterns, optimize renewable energy, and help build a sustainable future for the nation.',
            icon: 'Globe',
            trend: 'Critical Need'
          },
          {
            role: 'Behavioral Economics Modeler',
            description: 'Apply data science to understand citizen behavior and improve government program effectiveness. You\'ll design data-driven policies that nudge positive social outcomes and enhance public welfare.',
            icon: 'Brain',
            trend: 'High Impact'
          },
          {
            role: 'Predictive Governance Specialist',
            description: 'Forecast social and economic trends to help government make proactive decisions. You\'ll use machine learning to predict everything from migration patterns to resource needs, keeping India ahead of challenges.',
            icon: 'TrendingUp',
            trend: 'Strategic'
          },
          {
            role: 'Digital Health Analytics Director',
            description: 'Transform healthcare delivery through data insights and AI-powered diagnostics. You\'ll lead India\'s digital health revolution, making quality healthcare accessible to every citizen through intelligent data systems.',
            icon: 'Zap',
            trend: 'Revolutionary'
          }
        ]
      },
      'Public Administration': {
        title: 'Civil Servant',
        futureRoles: [
          {
            role: 'Smart City Integration Manager',
            description: 'Orchestrate the transformation of Indian cities into intelligent, connected ecosystems. You\'ll coordinate IoT networks, smart infrastructure, and citizen apps to create seamless urban experiences.',
            icon: 'Cpu',
            trend: 'Urban Future'
          },
          {
            role: 'Digital Citizen Experience Designer',
            description: 'Revolutionize how citizens interact with government through intuitive digital platforms. You\'ll design user-friendly interfaces that make government services as easy as ordering food online.',
            icon: 'Wand2',
            trend: 'User-Centric'
          },
          {
            role: 'Cross-Border Digital Diplomacy Specialist',
            description: 'Navigate international relations in the digital age, managing cyber diplomacy and digital trade agreements. You\'ll represent India\'s interests in global digital governance and technology partnerships.',
            icon: 'Globe',
            trend: 'Global Impact'
          },
          {
            role: 'AI-Powered Policy Simulation Expert',
            description: 'Test and refine government policies using advanced AI simulations before implementation. You\'ll predict policy outcomes, minimize risks, and ensure every government decision is data-backed and citizen-focused.',
            icon: 'Bot',
            trend: 'Evidence-Based'
          }
        ]
      },
      'Teaching': {
        title: 'Government Teacher',
        futureRoles: [
          {
            role: 'Virtual Reality Learning Experience Designer',
            description: 'Create immersive educational experiences that transport students to historical events, scientific phenomena, and global cultures. You\'ll make learning unforgettable through cutting-edge VR technology.',
            icon: 'Wand2',
            trend: 'Immersive Ed'
          },
          {
            role: 'AI Learning Companion Developer',
            description: 'Design AI tutors that provide personalized learning support to every student. You\'ll create intelligent systems that adapt to individual learning styles and help bridge educational gaps across India.',
            icon: 'Bot',
            trend: 'Personalized'
          },
          {
            role: 'Global Classroom Connectivity Specialist',
            description: 'Connect Indian students with peers and experts worldwide through advanced communication technologies. You\'ll break down geographical barriers and bring global perspectives to every classroom.',
            icon: 'Globe',
            trend: 'Connected World'
          },
          {
            role: 'Neuroscience-Based Learning Optimizer',
            description: 'Apply brain science to optimize how students learn and retain information. You\'ll use neuroscience insights to design teaching methods that maximize learning potential and cognitive development.',
            icon: 'Brain',
            trend: 'Science-Driven'
          }
        ]
      },
      'Banking': {
        title: 'Bank Officer',
        futureRoles: [
          {
            role: 'Blockchain Financial Infrastructure Architect',
            description: 'Build the next generation of secure, transparent financial systems using blockchain technology. You\'ll design decentralized banking solutions that make financial services more accessible and trustworthy.',
            icon: 'Cpu',
            trend: 'Decentralized'
          },
          {
            role: 'Digital Currency Policy Specialist',
            description: 'Shape India\'s digital currency landscape and central bank digital currency (CBDC) implementation. You\'ll be at the forefront of the financial revolution, making digital payments seamless and secure.',
            icon: 'Zap',
            trend: 'Currency Future'
          },
          {
            role: 'AI Financial Inclusion Strategist',
            description: 'Use artificial intelligence to bring banking services to underserved communities. You\'ll design AI-powered solutions that assess creditworthiness and provide financial services to every Indian citizen.',
            icon: 'Bot',
            trend: 'Inclusive Finance'
          },
          {
            role: 'Sustainable Finance Impact Analyst',
            description: 'Lead the green finance revolution by analyzing and promoting environmentally sustainable investments. You\'ll help redirect capital towards projects that build a cleaner, more sustainable India.',
            icon: 'Globe',
            trend: 'Green Finance'
          }
        ]
      }
    };

    // Find the best matching future roles
    let selectedRoles = futureRoles['Software Engineering']; // default
    
    for (const [key, roles] of Object.entries(futureRoles)) {
      if (topCareer.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
        selectedRoles = roles;
        break;
      }
    }

    return selectedRoles;
  };

  // AI Career Trajectory Generator - Maps 10-year career path with milestones
  const generateCareerTrajectory = (topCareer: string, skills: any) => {
    const trajectories: Record<string, any> = {
      'Software Engineering': {
        title: 'Software Engineer',
        milestones: [
          {
            year: '0-2 Years',
            role: 'Junior Software Developer',
            description: 'Start your journey building foundational programming skills and learning industry best practices.',
            skills: ['Programming Languages (Java/Python)', 'Version Control (Git)', 'Basic Database Knowledge', 'Problem-solving'],
            responsibilities: ['Write clean, maintainable code', 'Debug and fix software issues', 'Learn from senior developers', 'Participate in code reviews']
          },
          {
            year: '2-5 Years',
            role: 'Senior Software Developer',
            description: 'Take ownership of complex features and mentor junior developers while expanding your technical expertise.',
            skills: ['Advanced Programming Concepts', 'System Design Basics', 'API Development', 'Testing Frameworks'],
            responsibilities: ['Lead feature development', 'Mentor junior developers', 'Design software architecture', 'Optimize application performance']
          },
          {
            year: '5-8 Years',
            role: 'Technical Lead / Engineering Manager',
            description: 'Bridge the gap between technical execution and business strategy while leading development teams.',
            skills: ['Team Leadership', 'Project Management', 'Advanced System Design', 'Stakeholder Communication'],
            responsibilities: ['Lead cross-functional teams', 'Make technical decisions', 'Plan project roadmaps', 'Coordinate with product managers']
          },
          {
            year: '8-10 Years',
            role: 'Principal Engineer / Engineering Director',
            description: 'Shape the technical vision of the organization and drive innovation across multiple teams.',
            skills: ['Strategic Planning', 'Advanced Leadership', 'Technology Evangelism', 'Business Acumen'],
            responsibilities: ['Define technical strategy', 'Lead multiple engineering teams', 'Drive innovation initiatives', 'Represent company at tech conferences']
          }
        ]
      },
      'Data Science': {
        title: 'Data Scientist',
        milestones: [
          {
            year: '0-2 Years',
            role: 'Junior Data Analyst',
            description: 'Build your foundation in data analysis and learn to extract meaningful insights from data.',
            skills: ['Python/R Programming', 'SQL', 'Excel/Google Sheets', 'Basic Statistics'],
            responsibilities: ['Clean and analyze data', 'Create basic visualizations', 'Generate reports', 'Learn data tools and techniques']
          },
          {
            year: '2-5 Years',
            role: 'Data Scientist',
            description: 'Develop machine learning models and provide data-driven solutions to business problems.',
            skills: ['Machine Learning', 'Advanced Statistics', 'Data Visualization', 'Business Intelligence'],
            responsibilities: ['Build predictive models', 'Design experiments', 'Present insights to stakeholders', 'Collaborate with engineering teams']
          },
          {
            year: '5-8 Years',
            role: 'Senior Data Scientist / ML Engineer',
            description: 'Lead data science projects and implement scalable machine learning solutions in production.',
            skills: ['Deep Learning', 'MLOps', 'Cloud Platforms', 'Team Leadership'],
            responsibilities: ['Lead data science initiatives', 'Deploy models to production', 'Mentor junior data scientists', 'Drive data strategy']
          },
          {
            year: '8-10 Years',
            role: 'Principal Data Scientist / Head of Data',
            description: 'Shape the data strategy of the organization and lead data science teams across the company.',
            skills: ['Strategic Data Planning', 'Advanced Leadership', 'Data Governance', 'Business Strategy'],
            responsibilities: ['Define data science strategy', 'Lead data science organization', 'Drive AI/ML adoption', 'Collaborate with C-level executives']
          }
        ]
      },
      'Public Administration': {
        title: 'Civil Servant',
        milestones: [
          {
            year: '0-3 Years',
            role: 'Assistant Section Officer',
            description: 'Begin your civil service career by learning government procedures and public policy implementation.',
            skills: ['Government Procedures', 'Public Policy Basics', 'Administrative Skills', 'Communication'],
            responsibilities: ['Handle administrative tasks', 'Assist in policy implementation', 'Interact with citizens', 'Learn government systems']
          },
          {
            year: '3-6 Years',
            role: 'Section Officer / Deputy Collector',
            description: 'Take on greater responsibilities in policy implementation and citizen services delivery.',
            skills: ['Policy Analysis', 'Project Management', 'Leadership', 'Stakeholder Management'],
            responsibilities: ['Manage government programs', 'Lead small teams', 'Coordinate with departments', 'Handle complex citizen issues']
          },
          {
            year: '6-9 Years',
            role: 'Joint Collector / Additional Secretary',
            description: 'Lead major government initiatives and shape policy decisions at the district or state level.',
            skills: ['Strategic Planning', 'Advanced Leadership', 'Policy Formulation', 'Crisis Management'],
            responsibilities: ['Lead major initiatives', 'Formulate policies', 'Manage large teams', 'Coordinate with political leadership']
          },
          {
            year: '9-12 Years',
            role: 'Collector / Secretary',
            description: 'Hold senior administrative positions with significant impact on governance and public welfare.',
            skills: ['Executive Leadership', 'Inter-governmental Relations', 'Public Speaking', 'Strategic Vision'],
            responsibilities: ['Lead district administration', 'Implement major policies', 'Represent government publicly', 'Drive systemic changes']
          }
        ]
      },
      'Teaching': {
        title: 'Government Teacher',
        milestones: [
          {
            year: '0-3 Years',
            role: 'Primary Teacher / TGT',
            description: 'Start your teaching career by developing classroom management skills and effective teaching methodologies.',
            skills: ['Classroom Management', 'Curriculum Knowledge', 'Student Psychology', 'Teaching Methods'],
            responsibilities: ['Teach assigned subjects', 'Manage classroom discipline', 'Assess student progress', 'Communicate with parents']
          },
          {
            year: '3-6 Years',
            role: 'Senior Teacher / PGT',
            description: 'Enhance your subject expertise and take on additional responsibilities within the school system.',
            skills: ['Advanced Subject Knowledge', 'Educational Technology', 'Mentoring', 'Administrative Skills'],
            responsibilities: ['Mentor new teachers', 'Lead subject committees', 'Develop curriculum materials', 'Coordinate school activities']
          },
          {
            year: '6-9 Years',
            role: 'Head Teacher / Vice Principal',
            description: 'Move into school leadership roles and contribute to educational policy and school management.',
            skills: ['Educational Leadership', 'School Management', 'Policy Understanding', 'Community Relations'],
            responsibilities: ['Manage school operations', 'Lead teacher development', 'Implement education policies', 'Engage with community']
          },
          {
            year: '9-12 Years',
            role: 'Principal / Education Officer',
            description: 'Lead educational institutions and influence education policy at the district or state level.',
            skills: ['Strategic Leadership', 'Educational Vision', 'Policy Formulation', 'Stakeholder Management'],
            responsibilities: ['Lead educational institutions', 'Shape education policy', 'Drive educational innovation', 'Represent education sector']
          }
        ]
      },
      'Banking': {
        title: 'Bank Officer',
        milestones: [
          {
            year: '0-2 Years',
            role: 'Probationary Officer',
            description: 'Learn banking operations and customer service while rotating through different departments.',
            skills: ['Banking Operations', 'Customer Service', 'Financial Products', 'Regulatory Knowledge'],
            responsibilities: ['Handle customer transactions', 'Learn banking procedures', 'Assist in loan processing', 'Maintain customer relationships']
          },
          {
            year: '2-5 Years',
            role: 'Assistant Manager',
            description: 'Specialize in specific banking areas and take on supervisory responsibilities.',
            skills: ['Credit Analysis', 'Risk Management', 'Team Leadership', 'Sales & Marketing'],
            responsibilities: ['Manage branch operations', 'Lead small teams', 'Handle complex transactions', 'Drive business growth']
          },
          {
            year: '5-8 Years',
            role: 'Manager / Deputy General Manager',
            description: 'Lead branch operations and contribute to regional banking strategy and growth.',
            skills: ['Strategic Planning', 'Advanced Leadership', 'Business Development', 'Regulatory Compliance'],
            responsibilities: ['Manage large branches', 'Develop business strategies', 'Ensure compliance', 'Lead regional initiatives']
          },
          {
            year: '8-10 Years',
            role: 'General Manager / Regional Head',
            description: 'Shape banking strategy at the regional level and drive organizational growth and innovation.',
            skills: ['Executive Leadership', 'Strategic Vision', 'Stakeholder Management', 'Digital Banking'],
            responsibilities: ['Lead regional operations', 'Drive digital transformation', 'Manage key relationships', 'Shape bank policies']
          }
        ]
      }
    };

    // Find the best matching trajectory
    let selectedTrajectory = trajectories['Software Engineering']; // default
    
    for (const [key, trajectory] of Object.entries(trajectories)) {
      if (topCareer.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
        selectedTrajectory = trajectory;
        break;
      }
    }

    return selectedTrajectory;
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="relative w-16 h-16 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <Brain className="absolute inset-0 m-auto w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-2">Preparing Your Journey</h3>
              <p className="font-paragraph text-gray-600">Loading mind-blowing assessments...</p>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Assessment Taking Interface
  if (selectedAssessment && !isCompleted) {
    // Try to use the new questionsData field first, fallback to questionsContent, then to mock questions
    let questions = [];
    let questionsSource = '';
    
    try {
      questionsSource = selectedAssessment.questionsData || selectedAssessment.questionsContent;
      questions = JSON.parse(questionsSource || '[]');
      
      // If questions array is empty or invalid, use mock questions
      if (!Array.isArray(questions) || questions.length === 0) {
        questions = getMockQuestions();
      }
    } catch (error) {
      console.error('Error parsing questions, using mock data:', error);
      questions = getMockQuestions();
    }
    
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Progress Header with Floating Elements */}
            <motion.div 
              className="relative space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Floating Background Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-icon-secondary-medium/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-icon-accent-light/10 to-icon-accent-warm/10 rounded-full blur-xl"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <motion.h1 
                    className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-icon-secondary-medium bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedAssessment.assessmentTitle}
                  </motion.h1>
                  <Button variant="outline" onClick={resetAssessment} className="hover:scale-105 transition-transform">
                    Exit Assessment
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full flex items-center justify-center">
                        <span className="text-white font-heading font-bold text-sm">{currentQuestion + 1}</span>
                      </div>
                      <span className="font-paragraph text-gray-600">of {questions.length} questions</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="font-paragraph text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-3 bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light rounded-full relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Question Card with Enhanced Visuals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                <CardContent className="relative p-8 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-xl flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-gray-800 leading-relaxed">
                        {currentQ?.question || 'Question not available'}
                      </h2>
                    </div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {currentQ?.options?.map((option: string, index: number) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`group w-full p-5 text-left rounded-xl border-2 transition-all duration-300 font-paragraph relative overflow-hidden ${
                          answers[currentQuestion] === option
                            ? 'border-primary bg-gradient-to-r from-primary/10 to-icon-secondary-medium/10 text-primary shadow-lg scale-105'
                            : 'border-gray-200 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-icon-secondary-medium/5 hover:scale-102'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Animated Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-icon-secondary-medium/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          answers[currentQuestion] === option ? 'opacity-100' : ''
                        }`}></div>
                        
                        <div className="relative flex items-center space-x-4">
                          <motion.div 
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              answers[currentQuestion] === option
                                ? 'border-primary bg-primary'
                                : 'border-gray-300 group-hover:border-primary/70'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {answers[currentQuestion] === option && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-white"
                              />
                            )}
                          </motion.div>
                          <span className="flex-1 text-gray-700 group-hover:text-gray-900 transition-colors">
                            {option}
                          </span>
                          {answers[currentQuestion] === option && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    )) || (
                      // Fallback if no options are available
                      <div className="text-center py-8">
                        <p className="font-paragraph text-gray-600 mb-4">
                          Question options are not available. Please try refreshing the page.
                        </p>
                        <Button onClick={resetAssessment} variant="outline" className="font-paragraph">
                          Return to Assessments
                        </Button>
                      </div>
                    )}
                  </div>

                  <motion.div 
                    className="flex justify-end pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Button
                      onClick={nextQuestion}
                      disabled={!answers[currentQuestion] || !currentQ}
                      className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium hover:from-primary/90 hover:to-icon-secondary-medium/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                    >
                      <span className="mr-2">
                        {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                      </span>
                      <motion.div
                        animate={{ x: answers[currentQuestion] ? [0, 5, 0] : 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Results Interface
  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Celebration Header */}
            <motion.div 
              className="text-center space-y-6 relative"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Floating Celebration Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-primary to-icon-secondary-medium rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              <motion.div 
                className="relative w-24 h-24 mx-auto"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-icon-secondary-medium to-primary rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-icon-secondary-medium/20 to-primary/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h1 className="font-heading text-4xl font-bold bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light bg-clip-text text-transparent mb-4">
                  🎉 Assessment Complete! 🎉
                </h1>
                <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Congratulations! Here are your personalized results and mind-blowing career recommendations
                </p>
              </motion.div>
            </motion.div>

            {/* Animated Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-white via-primary/5 to-icon-secondary-medium/10 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light"
                    animate={{ 
                      background: [
                        "linear-gradient(45deg, #0000FF, #7AE061, #9B9BFF)",
                        "linear-gradient(135deg, #7AE061, #9B9BFF, #0000FF)",
                        "linear-gradient(225deg, #9B9BFF, #0000FF, #7AE061)",
                        "linear-gradient(315deg, #0000FF, #7AE061, #9B9BFF)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
                
                <CardContent className="relative p-8 text-center space-y-6">
                  <h2 className="font-heading text-2xl font-bold text-primary">AI-Powered Assessment Results</h2>
                  
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
                  >
                    <div className="text-6xl font-heading font-bold bg-gradient-to-r from-primary to-icon-secondary-medium bg-clip-text text-transparent">
                      {results.score}%
                    </div>
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-icon-secondary-medium/20 rounded-full blur-xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Badge className="bg-gradient-to-r from-icon-secondary-medium to-primary text-white font-paragraph px-6 py-2 text-lg shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      {results.category}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-icon-accent-light to-icon-accent-warm text-white font-paragraph px-4 py-2 shadow-lg">
                      {results.completionRate}% Complete
                    </Badge>
                  </div>
                  
                  {/* AI Insights */}
                  {results.personalizedInsights && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      className="bg-gradient-to-r from-primary/5 to-icon-secondary-medium/5 rounded-xl p-4 mt-6"
                    >
                      <h3 className="font-heading font-semibold text-primary mb-3 flex items-center">
                        <Brain className="w-5 h-5 mr-2" />
                        AI Insights
                      </h3>
                      <div className="space-y-2">
                        {results.personalizedInsights.map((insight: string, index: number) => (
                          <p key={index} className="font-paragraph text-sm text-gray-700 text-left">
                            • {insight}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Results Grid with AI Features */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Career Recommendations */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white to-primary/5 overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-icon-secondary-medium/10 rounded-full -translate-y-10 translate-x-10"></div>
                  
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-lg flex items-center justify-center mr-3">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      Career Pathways
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.recommendations.map((career: string, index: number) => (
                      <motion.div 
                        key={index} 
                        className="group p-4 bg-gradient-to-r from-primary/5 to-icon-secondary-medium/5 rounded-xl border border-primary/10 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-primary to-icon-secondary-medium rounded-full"></div>
                          <span className="font-paragraph text-primary font-semibold group-hover:text-primary/80 transition-colors">
                            {career}
                          </span>
                          <TrendingUp className="w-4 h-4 text-icon-secondary-medium ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skill Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white to-icon-secondary-medium/5 overflow-hidden h-full">
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-icon-secondary-medium/10 to-icon-accent-light/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-icon-secondary-medium to-icon-accent-light rounded-lg flex items-center justify-center mr-3">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      Skill Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.topSkills && results.topSkills.map((skill: string, index: number) => (
                      <motion.div 
                        key={index} 
                        className="group p-4 bg-gradient-to-r from-icon-secondary-medium/5 to-icon-accent-light/5 rounded-xl border border-icon-secondary-medium/10 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-icon-secondary-medium to-icon-accent-light rounded-full"></div>
                            <span className="font-paragraph text-icon-secondary-medium font-semibold">
                              {skill}
                            </span>
                          </div>
                          <Zap className="w-4 h-4 text-icon-accent-light" />
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Improvement Areas */}
                    {results.improvementAreas && results.improvementAreas.length > 0 && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <h4 className="font-heading font-semibold text-yellow-800 mb-2">Growth Areas</h4>
                        <div className="space-y-2">
                          {results.improvementAreas.map((area: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="font-paragraph text-sm text-yellow-700">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Government Jobs */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white to-icon-accent-warm/5 overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-icon-accent-warm/10 to-primary/10 rounded-full -translate-y-8 -translate-x-8"></div>
                  
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-icon-accent-warm to-primary rounded-lg flex items-center justify-center mr-3">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      Government Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.governmentJobs && results.governmentJobs.map((job: string, index: number) => (
                      <motion.div 
                        key={index} 
                        className="group p-4 bg-gradient-to-r from-icon-accent-warm/5 to-primary/5 rounded-xl border border-icon-accent-warm/10 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.2 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-icon-accent-warm to-primary rounded-full"></div>
                          <span className="font-paragraph text-icon-accent-warm font-semibold group-hover:text-icon-accent-warm/80 transition-colors">
                            {job}
                          </span>
                          <Target className="w-4 h-4 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* AI Career Trajectory Section */}
            {results.careerTrajectory && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white via-primary/5 to-icon-secondary-medium/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="font-heading text-xl text-primary flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      Your 10-Year Career Trajectory: {results.careerTrajectory.title}
                    </CardTitle>
                    <p className="text-center font-paragraph text-gray-600 mt-2">
                      AI-powered career roadmap based on your assessment results
                    </p>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-8">
                      {results.careerTrajectory.milestones.map((milestone: any, index: number) => (
                        <motion.div 
                          key={index} 
                          className="relative"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 3.0 + index * 0.2 }}
                        >
                          {/* Timeline connector */}
                          {index < results.careerTrajectory.milestones.length - 1 && (
                            <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-primary to-icon-secondary-medium opacity-30"></div>
                          )}
                          
                          <div className="flex items-start space-x-6">
                            {/* Timeline marker */}
                            <motion.div 
                              className="w-12 h-12 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <span className="text-white font-heading font-bold text-sm">{index + 1}</span>
                            </motion.div>
                            
                            {/* Milestone content */}
                            <div className="flex-1 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                              <div className="space-y-4">
                                {/* Header */}
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                                  <div>
                                    <h3 className="font-heading text-lg font-bold text-primary">{milestone.role}</h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Calendar className="w-4 h-4 text-icon-secondary-medium" />
                                      <span className="font-paragraph text-sm font-medium text-icon-secondary-medium">{milestone.year}</span>
                                    </div>
                                  </div>
                                  <Badge className="bg-gradient-to-r from-primary/10 to-icon-secondary-medium/10 text-primary border border-primary/20 font-paragraph">
                                    Milestone {index + 1}
                                  </Badge>
                                </div>
                                
                                {/* Description */}
                                <p className="font-paragraph text-gray-700 leading-relaxed">
                                  {milestone.description}
                                </p>
                                
                                {/* Skills and Responsibilities Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                  {/* Key Skills */}
                                  <div className="space-y-3">
                                    <h4 className="font-heading font-semibold text-primary flex items-center">
                                      <Zap className="w-4 h-4 mr-2" />
                                      Key Skills to Develop
                                    </h4>
                                    <div className="space-y-2">
                                      {milestone.skills.map((skill: string, skillIndex: number) => (
                                        <motion.div 
                                          key={skillIndex}
                                          className="flex items-center space-x-2 p-2 bg-gradient-to-r from-primary/5 to-icon-secondary-medium/5 rounded-lg"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 3.2 + index * 0.2 + skillIndex * 0.1 }}
                                        >
                                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-icon-secondary-medium rounded-full"></div>
                                          <span className="font-paragraph text-sm text-gray-700">{skill}</span>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Key Responsibilities */}
                                  <div className="space-y-3">
                                    <h4 className="font-heading font-semibold text-primary flex items-center">
                                      <Briefcase className="w-4 h-4 mr-2" />
                                      Key Responsibilities
                                    </h4>
                                    <div className="space-y-2">
                                      {milestone.responsibilities.map((responsibility: string, respIndex: number) => (
                                        <motion.div 
                                          key={respIndex}
                                          className="flex items-center space-x-2 p-2 bg-gradient-to-r from-icon-accent-light/5 to-icon-accent-warm/5 rounded-lg"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 3.4 + index * 0.2 + respIndex * 0.1 }}
                                        >
                                          <div className="w-2 h-2 bg-gradient-to-r from-icon-accent-light to-icon-accent-warm rounded-full"></div>
                                          <span className="font-paragraph text-sm text-gray-700">{responsibility}</span>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Motivational Footer */}
                    <motion.div 
                      className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-icon-secondary-medium/10 to-icon-accent-light/10 rounded-xl border border-primary/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4.0 }}
                    >
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Star className="w-5 h-5 text-primary" />
                          <h4 className="font-heading font-bold text-primary">Your Journey Starts Today!</h4>
                          <Star className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-paragraph text-gray-700 max-w-2xl mx-auto">
                          This trajectory is based on your unique skills and interests. Remember, every expert was once a beginner. 
                          Stay consistent, keep learning, and celebrate small wins along the way. Your dream career is achievable!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                          <Button asChild size="sm" className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                            <Link to="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Find Relevant Courses
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="font-paragraph">
                            <Link to="/jobs">
                              <Target className="w-4 h-4 mr-2" />
                              Explore Entry-Level Jobs
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* AI Future Job Roles Section */}
            {results.futureJobRoles && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.8, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white via-icon-accent-light/5 to-icon-accent-warm/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="font-heading text-xl text-primary flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-lg flex items-center justify-center mr-3">
                        <Rocket className="w-4 h-4 text-white" />
                      </div>
                      Future Job Roles in {results.futureJobRoles.title} (2025-2035)
                    </CardTitle>
                    <p className="text-center font-paragraph text-gray-600 mt-2">
                      AI-predicted emerging roles that will shape the future of your career field
                    </p>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid md:grid-cols-2 gap-6">
                      {results.futureJobRoles.futureRoles.map((role: any, index: number) => {
                        const getIcon = (iconName: string) => {
                          const icons = { Bot, Cpu, Globe, Wand2, Brain, TrendingUp, Zap };
                          return icons[iconName as keyof typeof icons] || Rocket;
                        };
                        const IconComponent = getIcon(role.icon);
                        
                        return (
                          <motion.div 
                            key={index} 
                            className="relative group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 5.0 + index * 0.2 }}
                          >
                            <div className="bg-white/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-full">
                              <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-3">
                                    <motion.div 
                                      className="w-10 h-10 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-lg flex items-center justify-center flex-shrink-0"
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                    >
                                      <IconComponent className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <div className="flex-1">
                                      <h3 className="font-heading text-lg font-bold text-primary leading-tight">
                                        {role.role}
                                      </h3>
                                    </div>
                                  </div>
                                  <Badge className="bg-gradient-to-r from-icon-accent-light/10 to-icon-accent-warm/10 text-icon-accent-warm border border-icon-accent-warm/20 font-paragraph text-xs">
                                    {role.trend}
                                  </Badge>
                                </div>
                                
                                {/* Description */}
                                <p className="font-paragraph text-gray-700 leading-relaxed text-sm">
                                  {role.description}
                                </p>
                                
                                {/* Future Indicator */}
                                <div className="flex items-center space-x-2 pt-2">
                                  <div className="w-2 h-2 bg-gradient-to-r from-icon-accent-light to-icon-accent-warm rounded-full animate-pulse"></div>
                                  <span className="font-paragraph text-xs text-gray-500">Emerging in next 5-10 years</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Future Vision Footer */}
                    <motion.div 
                      className="mt-8 p-6 bg-gradient-to-r from-icon-accent-light/10 via-icon-accent-warm/10 to-primary/10 rounded-xl border border-primary/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 5.8 }}
                    >
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Rocket className="w-5 h-5 text-primary" />
                          <h4 className="font-heading font-bold text-primary">The Future is Bright!</h4>
                          <Rocket className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-paragraph text-gray-700 max-w-2xl mx-auto">
                          These emerging roles represent the exciting future of your field. Start building relevant skills today - 
                          focus on digital literacy, adaptability, and continuous learning to position yourself for these tomorrow's opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                          <Button asChild size="sm" className="font-paragraph bg-gradient-to-r from-icon-accent-light to-icon-accent-warm">
                            <Link to="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Prepare for the Future
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="font-paragraph">
                            <Link to="/assessments">
                              <Brain className="w-4 h-4 mr-2" />
                              Explore More Assessments
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Next Steps Section */}
            {results.nextSteps && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white via-icon-accent-light/5 to-icon-accent-warm/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="font-heading text-xl text-primary flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-lg flex items-center justify-center mr-3">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      Your Personalized Action Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid md:grid-cols-2 gap-6">
                      {results.nextSteps.map((step: string, index: number) => (
                        <motion.div 
                          key={index} 
                          className="group relative p-4 bg-gradient-to-br from-white to-primary/5 border border-primary/20 rounded-xl hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 4.4 + index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white font-heading font-bold text-xs">{index + 1}</span>
                            </div>
                            <span className="font-paragraph text-gray-700 text-sm leading-relaxed">
                              {step}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* AI Pros and Cons Analysis Tool */}
            {results.prosAndCons && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.4, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white via-icon-accent-light/5 to-icon-accent-warm/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="font-heading text-xl text-primary flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-lg flex items-center justify-center mr-3">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      Career Pros & Cons Analysis: {results.prosAndCons.title}
                    </CardTitle>
                    <p className="text-center font-paragraph text-gray-600 mt-2">
                      Objective analysis to help you make informed career decisions
                    </p>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Pros Section */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 4.6 }}
                        className="space-y-4"
                      >
                        <h3 className="font-heading text-lg font-bold text-icon-secondary-medium flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Pros
                        </h3>
                        <div className="space-y-3">
                          {results.prosAndCons.pros.map((pro: string, index: number) => (
                            <motion.div
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-gradient-to-r from-icon-secondary-medium/5 to-icon-secondary-medium/10 rounded-lg border border-icon-secondary-medium/20"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 4.8 + index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-icon-secondary-medium rounded-full mt-2 flex-shrink-0"></div>
                              <p className="font-paragraph text-sm text-gray-700 leading-relaxed">{pro}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Cons Section */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 4.6 }}
                        className="space-y-4"
                      >
                        <h3 className="font-heading text-lg font-bold text-icon-accent-warm flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          Cons
                        </h3>
                        <div className="space-y-3">
                          {results.prosAndCons.cons.map((con: string, index: number) => (
                            <motion.div
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-gradient-to-r from-icon-accent-warm/5 to-icon-accent-warm/10 rounded-lg border border-icon-accent-warm/20"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 4.8 + index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-icon-accent-warm rounded-full mt-2 flex-shrink-0"></div>
                              <p className="font-paragraph text-sm text-gray-700 leading-relaxed">{con}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Balanced Perspective Footer */}
                    <motion.div 
                      className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-icon-secondary-medium/10 to-icon-accent-light/10 rounded-xl border border-primary/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 5.2 }}
                    >
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Lightbulb className="w-5 h-5 text-primary" />
                          <h4 className="font-heading font-bold text-primary">Make an Informed Decision</h4>
                          <Lightbulb className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-paragraph text-gray-700 max-w-2xl mx-auto text-sm">
                          Every career has its advantages and challenges. Consider these factors alongside your personal interests, 
                          values, and long-term goals to make the best decision for your future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                          <Button asChild size="sm" className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                            <Link to="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Explore Training Options
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="font-paragraph">
                            <Link to="/interview-prep">
                              <Target className="w-4 h-4 mr-2" />
                              Interview Preparation
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* AI Course Recommendations Tool */}
            {results.detailedCourseRecommendations && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.6, duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white via-icon-accent-light/5 to-icon-accent-warm/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="font-heading text-xl text-primary flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-lg flex items-center justify-center mr-3">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      AI-Powered Learning Recommendations
                    </CardTitle>
                    <p className="text-center font-paragraph text-gray-600 mt-2">
                      Personalized courses, books, and channels for your career path
                    </p>
                  </CardHeader>
                  <CardContent className="relative space-y-8">
                    {/* Online Courses Section */}
                    <div className="space-y-4">
                      <h3 className="font-heading text-lg font-bold text-primary flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Top-Rated Online Courses
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {results.detailedCourseRecommendations.onlineCourses.map((course: any, index: number) => (
                          <motion.div 
                            key={index}
                            className="bg-gradient-to-br from-white to-primary/5 border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 4.8 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-heading font-semibold text-primary text-sm leading-tight">{course.title}</h4>
                                <Badge className="bg-icon-secondary-medium/10 text-icon-secondary-medium font-paragraph text-xs">
                                  {course.rating}
                                </Badge>
                              </div>
                              <p className="font-paragraph text-xs font-medium text-icon-secondary-medium">{course.platform}</p>
                              <p className="font-paragraph text-xs text-gray-600 leading-relaxed">{course.description}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-paragraph text-gray-500">Duration: {course.duration}</span>
                                <Button size="sm" variant="outline" className="font-paragraph text-xs h-7 px-3">
                                  Enroll Now
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Essential Books Section */}
                    <div className="space-y-4">
                      <h3 className="font-heading text-lg font-bold text-primary flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Essential Books
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {results.detailedCourseRecommendations.books.map((book: any, index: number) => (
                          <motion.div 
                            key={index}
                            className="bg-gradient-to-br from-white to-icon-accent-light/5 border border-icon-accent-light/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 5.0 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div className="space-y-3">
                              <h4 className="font-heading font-semibold text-primary text-sm leading-tight">{book.title}</h4>
                              <p className="font-paragraph text-xs font-medium text-icon-accent-light">by {book.author}</p>
                              <p className="font-paragraph text-xs text-gray-600 leading-relaxed">{book.description}</p>
                              <Button size="sm" variant="outline" className="font-paragraph text-xs h-7 px-3 w-full">
                                Find on Amazon
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* YouTube Channels & Blogs Section */}
                    <div className="space-y-4">
                      <h3 className="font-heading text-lg font-bold text-primary flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Influential Channels & Blogs
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {results.detailedCourseRecommendations.channels.map((channel: any, index: number) => (
                          <motion.div 
                            key={index}
                            className="bg-gradient-to-br from-white to-icon-accent-warm/5 border border-icon-accent-warm/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 5.2 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-heading font-semibold text-primary text-sm leading-tight">{channel.name}</h4>
                                <Badge className="bg-icon-accent-warm/10 text-icon-accent-warm font-paragraph text-xs">
                                  {channel.subscribers}
                                </Badge>
                              </div>
                              <p className="font-paragraph text-xs font-medium text-icon-accent-warm">{channel.platform}</p>
                              <p className="font-paragraph text-xs text-gray-600 leading-relaxed">{channel.description}</p>
                              <Button size="sm" variant="outline" className="font-paragraph text-xs h-7 px-3 w-full">
                                Visit Channel
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <motion.div 
                      className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-icon-secondary-medium/10 to-icon-accent-light/10 rounded-xl border border-primary/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 5.6 }}
                    >
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <h4 className="font-heading font-bold text-primary">Start Your Learning Journey!</h4>
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-paragraph text-gray-700 max-w-2xl mx-auto text-sm">
                          These recommendations are specifically curated for your career path. Start with one online course, 
                          pick up a book, and follow these channels to stay updated with industry trends.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                          <Button asChild size="sm" className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                            <Link to="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Explore More Courses
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="font-paragraph">
                            <Link to="/jobs">
                              <Target className="w-4 h-4 mr-2" />
                              Find Related Jobs
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Enhanced Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium hover:from-primary/90 hover:to-icon-secondary-medium/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/courses">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Explore Recommended Courses 
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="font-paragraph border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-4 rounded-xl transition-all duration-300">
                  <Link to="/jobs">
                    <Target className="w-5 h-5 mr-2" />
                    View Government Jobs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  onClick={resetAssessment} 
                  size="lg"
                  className="font-paragraph border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Take Another Assessment
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main Assessments List
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10">
      <Header />
      
      {/* Hero Section with Mind-Blowing Visuals */}
      <section className="relative py-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-icon-secondary-medium/20 rounded-full blur-xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-32 right-16 w-24 h-24 bg-gradient-to-br from-icon-accent-light/20 to-icon-accent-warm/20 rounded-full blur-xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-icon-secondary-medium/20 to-primary/20 rounded-full blur-xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light bg-clip-text text-transparent mb-6">
                Discover Your Destiny
              </h1>
              <motion.div
                className="inline-flex items-center space-x-2 mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-heading text-xl text-primary font-semibold">Career Assessments</span>
                <Sparkles className="w-6 h-6 text-icon-secondary-medium" />
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="font-paragraph text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Unlock your potential with our revolutionary AI-powered assessments. Discover your unique strengths, 
              explore exciting career paths, and embark on a journey toward your dream government career.
            </motion.p>

            {/* Floating Interactive Elements */}
            <motion.div 
              className="flex justify-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Brain, label: "AI-Powered", color: "from-primary to-icon-secondary-medium" },
                { icon: Target, label: "Personalized", color: "from-icon-secondary-medium to-icon-accent-light" },
                { icon: Zap, label: "Instant Results", color: "from-icon-accent-light to-icon-accent-warm" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-paragraph text-sm font-medium text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Assessments Grid with Enhanced Visuals */}
      <section className="py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            {assessments.length === 0 ? (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-gray-600 mb-4">
                  Amazing Assessments Coming Soon!
                </h3>
                <p className="font-paragraph text-gray-500 text-lg">
                  We're crafting mind-blowing assessments just for you. Check back soon for an incredible experience!
                </p>
              </motion.div>
            ) : (
              <>
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                    Choose Your Assessment Adventure
                  </h2>
                  <p className="font-paragraph text-gray-600 max-w-2xl mx-auto">
                    Each assessment is carefully designed to reveal different aspects of your potential
                  </p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {assessments.map((assessment, index) => (
                    <motion.div
                      key={assessment._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group"
                    >
                      <Card className="relative border-0 shadow-xl bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden h-full transition-all duration-500 hover:shadow-2xl">
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-icon-secondary-medium/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Floating Decorative Elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-icon-secondary-medium/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-icon-accent-light/20 to-icon-accent-warm/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <CardHeader className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className="space-y-3 flex-1">
                              <CardTitle className="font-heading text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                                {assessment.assessmentTitle}
                              </CardTitle>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Badge className="bg-gradient-to-r from-primary/10 to-icon-secondary-medium/10 text-primary border border-primary/20 font-paragraph text-xs">
                                  {assessment.assessmentType}
                                </Badge>
                              </motion.div>
                            </div>
                            
                            <motion.div 
                              className="w-14 h-14 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Brain className="w-7 h-7 text-white" />
                            </motion.div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="relative space-y-6">
                          <p className="font-paragraph text-gray-600 leading-relaxed line-clamp-3">
                            {assessment.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <motion.div 
                              className="flex items-center space-x-2 text-sm font-paragraph text-gray-500"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-icon-accent-light/10 to-icon-accent-warm/10 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-icon-accent-warm" />
                              </div>
                              <span className="font-medium">{assessment.estimatedDurationMinutes} minutes</span>
                            </motion.div>
                            
                            <motion.div
                              className="flex items-center space-x-1"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Sparkles className="w-4 h-4 text-primary" />
                              <span className="font-paragraph text-xs font-medium text-primary">Interactive</span>
                            </motion.div>
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              onClick={() => startAssessment(assessment)}
                              className="w-full font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium hover:from-primary/90 hover:to-icon-secondary-medium/90 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                              size="lg"
                            >
                              <motion.div
                                className="flex items-center justify-center space-x-2"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Play className="w-5 h-5" />
                                <span>Start Your Journey</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </motion.div>
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Call-to-Action Section with Enhanced Visuals */}
      <motion.section 
        className="relative py-16 bg-gradient-to-r from-secondary via-secondary to-primary overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-white/10 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Unlock Your Potential?
            </motion.h2>
            
            <p className="font-paragraph text-lg text-secondary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who have discovered their perfect career path through our revolutionary assessment platform. 
              Your future starts with a single click!
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="font-paragraph bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-paragraph border-2 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default function AssessmentsPage() {
  return <AssessmentsPageContent />;
}