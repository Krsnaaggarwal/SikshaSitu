import { useState, useEffect } from 'react';
import { Brain, MessageSquare, Target, Lightbulb, ArrowRight, Sparkles, CheckCircle, Clock, Users, Award, BookOpen, Zap, Bot, Wand2, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface InterviewQuestion {
  question: string;
  assessment: string;
  type: 'technical' | 'situational' | 'behavioral';
}

interface GeneratedQuestions {
  careerTitle: string;
  questions: InterviewQuestion[];
}

export default function InterviewPrepPage() {
  const [careerTitle, setCareerTitle] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestions | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  // Predefined career options for quick selection
  const popularCareers = [
    'IAS Officer',
    'Bank Officer',
    'Government Teacher',
    'Police Officer',
    'Railway Officer',
    'Defense Officer',
    'Civil Engineer',
    'Data Analyst',
    'Healthcare Worker',
    'Tax Officer',
    'Software Engineer',
    'Administrative Officer',
    'Public Relations Officer',
    'Research Officer',
    'Technical Officer'
  ];

  // AI-powered question generation function
  const generateInterviewQuestions = (career: string): InterviewQuestion[] => {
    const careerLower = career.toLowerCase();
    
    // Define question templates based on career type
    const questionSets: Record<string, InterviewQuestion[]> = {
      'ias officer': [
        {
          question: "How would you handle a situation where you need to implement a government policy that faces strong public resistance in your district?",
          assessment: "Assessing leadership skills, conflict resolution, and ability to balance policy implementation with public sentiment.",
          type: 'situational'
        },
        {
          question: "Describe the key components of India's federal structure and how it impacts administrative decision-making.",
          assessment: "Testing knowledge of constitutional framework and understanding of governance structures.",
          type: 'technical'
        },
        {
          question: "Tell me about a time when you had to work with people from diverse backgrounds to achieve a common goal.",
          assessment: "Evaluating interpersonal skills, cultural sensitivity, and team collaboration abilities.",
          type: 'behavioral'
        },
        {
          question: "If you discovered corruption in your department, what steps would you take to address it while ensuring due process?",
          assessment: "Testing ethical standards, decision-making under pressure, and knowledge of anti-corruption procedures.",
          type: 'situational'
        },
        {
          question: "What motivates you to serve in the civil services, and how do you plan to make a positive impact on society?",
          assessment: "Understanding personal motivation, commitment to public service, and vision for societal contribution.",
          type: 'behavioral'
        }
      ],
      'bank officer': [
        {
          question: "How would you assess the creditworthiness of a small business owner applying for their first business loan?",
          assessment: "Testing knowledge of credit analysis, risk assessment, and understanding of small business financing.",
          type: 'technical'
        },
        {
          question: "A customer is upset about unexpected charges on their account. How would you handle this situation?",
          assessment: "Evaluating customer service skills, problem-solving ability, and conflict resolution techniques.",
          type: 'situational'
        },
        {
          question: "Describe a time when you had to explain complex financial information to someone with limited financial knowledge.",
          assessment: "Assessing communication skills, patience, and ability to simplify complex concepts.",
          type: 'behavioral'
        },
        {
          question: "What are the key differences between various types of bank deposits, and how would you recommend the best option to a customer?",
          assessment: "Testing product knowledge, analytical thinking, and customer advisory skills.",
          type: 'technical'
        },
        {
          question: "If you suspected a transaction might be fraudulent, what immediate steps would you take?",
          assessment: "Evaluating attention to detail, knowledge of fraud prevention protocols, and decision-making under pressure.",
          type: 'situational'
        }
      ],
      'government teacher': [
        {
          question: "How would you adapt your teaching methods to accommodate students with different learning abilities in the same classroom?",
          assessment: "Testing inclusive teaching practices, adaptability, and understanding of diverse learning needs.",
          type: 'situational'
        },
        {
          question: "Explain the key principles of child-centered pedagogy and how you would implement them in your classroom.",
          assessment: "Assessing knowledge of modern teaching methodologies and educational psychology.",
          type: 'technical'
        },
        {
          question: "Tell me about a time when you had to handle a difficult situation with a student or parent.",
          assessment: "Evaluating interpersonal skills, patience, and conflict resolution abilities.",
          type: 'behavioral'
        },
        {
          question: "How would you integrate technology into your lessons to enhance student engagement and learning outcomes?",
          assessment: "Testing digital literacy, innovation in teaching, and understanding of educational technology.",
          type: 'technical'
        },
        {
          question: "What strategies would you use to motivate students who show little interest in academics?",
          assessment: "Assessing motivational skills, creativity in teaching, and understanding of student psychology.",
          type: 'situational'
        }
      ],
      'police officer': [
        {
          question: "How would you handle a domestic violence case while ensuring the safety of all parties involved?",
          assessment: "Testing knowledge of legal procedures, empathy, and ability to handle sensitive situations.",
          type: 'situational'
        },
        {
          question: "Explain the key provisions of the Indian Penal Code that every police officer should know.",
          assessment: "Assessing legal knowledge and understanding of fundamental law enforcement principles.",
          type: 'technical'
        },
        {
          question: "Describe a situation where you had to remain calm under extreme pressure.",
          assessment: "Evaluating stress management, emotional control, and decision-making under pressure.",
          type: 'behavioral'
        },
        {
          question: "What steps would you take if you witnessed a fellow officer engaging in misconduct?",
          assessment: "Testing ethical standards, integrity, and understanding of professional accountability.",
          type: 'situational'
        },
        {
          question: "How do you plan to build trust and positive relationships with the community you serve?",
          assessment: "Assessing community policing mindset, communication skills, and commitment to public service.",
          type: 'behavioral'
        }
      ],
      'software engineer': [
        {
          question: "How would you approach debugging a complex issue in a production system that's affecting thousands of users?",
          assessment: "Testing problem-solving methodology, pressure handling, and systematic thinking.",
          type: 'situational'
        },
        {
          question: "Explain the difference between object-oriented and functional programming paradigms with examples.",
          assessment: "Assessing fundamental programming knowledge and ability to explain technical concepts clearly.",
          type: 'technical'
        },
        {
          question: "Tell me about a time when you had to learn a new technology quickly to complete a project.",
          assessment: "Evaluating learning agility, adaptability, and self-motivation.",
          type: 'behavioral'
        },
        {
          question: "How would you design a scalable system to handle user authentication for a government portal with millions of users?",
          assessment: "Testing system design skills, scalability thinking, and security awareness.",
          type: 'technical'
        },
        {
          question: "If you disagreed with a technical decision made by your team lead, how would you handle it?",
          assessment: "Assessing communication skills, professional maturity, and ability to handle disagreements constructively.",
          type: 'behavioral'
        }
      ]
    };

    // Try to find exact match first
    if (questionSets[careerLower]) {
      return questionSets[careerLower];
    }

    // Try to find partial matches
    for (const [key, questions] of Object.entries(questionSets)) {
      if (careerLower.includes(key.split(' ')[0]) || key.includes(careerLower.split(' ')[0])) {
        return questions;
      }
    }

    // Generic questions for any career
    return [
      {
        question: `What specific skills and qualifications make you suitable for an entry-level ${career} position?`,
        assessment: "Evaluating self-awareness, relevant skills assessment, and understanding of job requirements.",
        type: 'behavioral'
      },
      {
        question: `How would you handle a situation where you need to work with limited resources to achieve your goals as a ${career}?`,
        assessment: "Testing resourcefulness, problem-solving ability, and adaptability to constraints.",
        type: 'situational'
      },
      {
        question: `Describe the key responsibilities and challenges you expect to face in a ${career} role.`,
        assessment: "Assessing job knowledge, realistic expectations, and preparation for the role.",
        type: 'technical'
      },
      {
        question: `Tell me about a time when you had to learn something new quickly. How did you approach it?`,
        assessment: "Evaluating learning agility, self-motivation, and ability to acquire new skills.",
        type: 'behavioral'
      },
      {
        question: `How would you prioritize multiple tasks with competing deadlines in your ${career} role?`,
        assessment: "Testing time management, organizational skills, and decision-making under pressure.",
        type: 'situational'
      }
    ];
  };

  const handleGenerateQuestions = () => {
    const career = careerTitle || selectedCareer;
    if (!career) return;

    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const questions = generateInterviewQuestions(career);
      setGeneratedQuestions({
        careerTitle: career,
        questions
      });
      setIsGenerating(false);
      setShowQuestions(true);
    }, 2000);
  };

  const resetForm = () => {
    setCareerTitle('');
    setSelectedCareer('');
    setGeneratedQuestions(null);
    setShowQuestions(false);
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-primary/10 text-primary';
      case 'situational':
        return 'bg-icon-secondary-medium/10 text-icon-secondary-medium';
      case 'behavioral':
        return 'bg-icon-accent-warm/10 text-icon-accent-warm';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <Brain className="w-4 h-4" />;
      case 'situational':
        return <Target className="w-4 h-4" />;
      case 'behavioral':
        return <Users className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10">
      <Header />
      
      {/* Hero Section */}
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
                AI Interview Preparation
              </h1>
              <motion.div
                className="inline-flex items-center space-x-2 mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-6 h-6 text-primary" />
                <span className="font-heading text-xl text-primary font-semibold">Powered by AI</span>
                <Sparkles className="w-6 h-6 text-icon-secondary-medium" />
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="font-paragraph text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Get personalized interview questions for any government career role. Our AI generates insightful technical, 
              situational, and behavioral questions to help you ace your next interview.
            </motion.p>

            {/* Floating Interactive Elements */}
            <motion.div 
              className="flex justify-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Brain, label: "Technical Questions", color: "from-primary to-icon-secondary-medium" },
                { icon: Target, label: "Situational Scenarios", color: "from-icon-secondary-medium to-icon-accent-light" },
                { icon: Users, label: "Behavioral Assessment", color: "from-icon-accent-light to-icon-accent-warm" }
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

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!showQuestions ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  <CardHeader className="relative text-center pb-8">
                    <CardTitle className="font-heading text-2xl font-bold text-primary mb-4">
                      Generate Interview Questions
                    </CardTitle>
                    <p className="font-paragraph text-gray-600">
                      Enter a career title to get personalized interview questions tailored for Indian government roles
                    </p>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6">
                    {/* Quick Selection */}
                    <div className="space-y-4">
                      <Label className="font-paragraph text-sm font-medium text-gray-700">
                        Choose from popular careers
                      </Label>
                      <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                        <SelectTrigger className="font-paragraph">
                          <SelectValue placeholder="Select a career..." />
                        </SelectTrigger>
                        <SelectContent>
                          {popularCareers.map((career) => (
                            <SelectItem key={career} value={career} className="font-paragraph">
                              {career}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className="font-paragraph text-sm text-gray-500">OR</span>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Custom Input */}
                    <div className="space-y-4">
                      <Label htmlFor="careerTitle" className="font-paragraph text-sm font-medium text-gray-700">
                        Enter any career title
                      </Label>
                      <Input
                        id="careerTitle"
                        placeholder="e.g., Data Scientist, Civil Engineer, Administrative Officer..."
                        value={careerTitle}
                        onChange={(e) => setCareerTitle(e.target.value)}
                        className="font-paragraph"
                        disabled={!!selectedCareer}
                      />
                      {selectedCareer && (
                        <p className="font-paragraph text-xs text-gray-500">
                          Clear the selection above to enter a custom career title
                        </p>
                      )}
                    </div>

                    {/* Generate Button */}
                    <motion.div className="pt-6">
                      <Button
                        onClick={handleGenerateQuestions}
                        disabled={(!careerTitle && !selectedCareer) || isGenerating}
                        className="w-full font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium hover:from-primary/90 hover:to-icon-secondary-medium/90 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        {isGenerating ? (
                          <motion.div 
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Bot className="w-5 h-5" />
                            </motion.div>
                            <span>AI is generating questions...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Wand2 className="w-5 h-5" />
                            <span>Generate Interview Questions</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>

                    {/* Features Preview */}
                    <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                      {[
                        { icon: Brain, title: "Technical Questions", desc: "Role-specific technical knowledge" },
                        { icon: Target, title: "Situational Scenarios", desc: "Real-world problem solving" },
                        { icon: Users, title: "Behavioral Assessment", desc: "Soft skills and personality" }
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="text-center space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-icon-secondary-medium/10 rounded-lg flex items-center justify-center mx-auto">
                            <feature.icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="font-heading text-sm font-semibold text-gray-800">{feature.title}</h3>
                          <p className="font-paragraph text-xs text-gray-600">{feature.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Results Header */}
                <motion.div 
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h2 className="font-heading text-3xl font-bold text-primary">
                      Interview Questions Generated!
                    </h2>
                    <Sparkles className="w-8 h-8 text-icon-secondary-medium" />
                  </div>
                  <p className="font-paragraph text-lg text-gray-600">
                    AI-generated questions for <span className="font-semibold text-primary">{generatedQuestions?.careerTitle}</span> role
                  </p>
                  <Button onClick={resetForm} variant="outline" className="font-paragraph">
                    Generate for Different Career
                  </Button>
                </motion.div>

                {/* Questions List */}
                {generatedQuestions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-white to-primary/5">
                      <CardHeader>
                        <CardTitle className="font-heading text-xl text-primary flex items-center">
                          <MessageSquare className="w-6 h-6 mr-3" />
                          Interview Questions for {generatedQuestions.careerTitle}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-6">
                          {generatedQuestions.questions.map((q, index) => (
                            <motion.li
                              key={index}
                              className="relative"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                            >
                              <div className="flex items-start space-x-4">
                                {/* Question Number */}
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-white font-heading font-bold text-sm">{index + 1}</span>
                                </div>
                                
                                {/* Question Content */}
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-start justify-between">
                                    <h3 className="font-paragraph text-gray-800 leading-relaxed pr-4">
                                      {q.question}
                                    </h3>
                                    <Badge className={`${getQuestionTypeColor(q.type)} flex items-center space-x-1 flex-shrink-0`}>
                                      {getQuestionTypeIcon(q.type)}
                                      <span className="font-paragraph text-xs capitalize">{q.type}</span>
                                    </Badge>
                                  </div>
                                  
                                  <div className="bg-gradient-to-r from-primary/5 to-icon-secondary-medium/5 rounded-lg p-3 border-l-4 border-primary/30">
                                    <em className="font-paragraph text-sm text-gray-600 not-italic">
                                      <strong className="text-primary">Assessment Focus:</strong> {q.assessment}
                                    </em>
                                  </div>
                                </div>
                              </div>
                            </motion.li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button asChild className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                    <Link to="/courses">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Find Relevant Courses
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-paragraph">
                    <Link to="/jobs">
                      <Target className="w-4 h-4 mr-2" />
                      View Job Opportunities
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-paragraph">
                    <Link to="/assessments">
                      <Brain className="w-4 h-4 mr-2" />
                      Take Career Assessment
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-secondary via-secondary to-primary">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground">
              Why Use Our AI Interview Prep?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Bot,
                  title: "AI-Powered Intelligence",
                  description: "Advanced AI analyzes job requirements and generates relevant questions for any career path.",
                  color: "bg-secondary-foreground/10"
                },
                {
                  icon: Target,
                  title: "Role-Specific Questions",
                  description: "Tailored questions that match the specific requirements and challenges of your target role.",
                  color: "bg-secondary-foreground/10"
                },
                {
                  icon: TrendingUp,
                  title: "Comprehensive Assessment",
                  description: "Covers technical knowledge, situational judgment, and behavioral competencies.",
                  color: "bg-secondary-foreground/10"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto`}>
                    <feature.icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-secondary-foreground">
                    {feature.title}
                  </h3>
                  <p className="font-paragraph text-secondary-foreground/80">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}