import { useState } from 'react';
import { Calendar, ExternalLink, IndianRupee, Monitor, FileText, AlertCircle, BookOpen, Building2, Target, Brain, MessageSquare, Clock, TrendingUp, Users, Award, Globe, Download, Link as LinkIcon, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EngineeringExamsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Engineering Entrance Exams Data
  const engineeringExams = [
    {
      id: 'jee-main',
      name: 'JEE Main',
      fullName: 'Joint Entrance Examination Main',
      description: 'National level entrance exam for admission to NITs, IIITs, and other CFTIs',
      applicationStart: '2024-12-01',
      applicationEnd: '2024-12-31',
      examDate: '2025-01-24 to 2025-01-31',
      resultDate: '2025-02-12',
      applicationFee: '₹1,000 (General), ₹500 (SC/ST/PWD)',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://jeemain.nta.nic.in',
      eligibility: 'Class 12 passed with PCM, Age limit: 25 years (30 for reserved)',
      programs: ['B.Tech', 'B.E', 'B.Arch', 'B.Planning'],
      conductingBody: 'National Testing Agency (NTA)',
      status: 'upcoming',
      priority: 'high',
      syllabus: 'Physics, Chemistry, Mathematics (for B.Tech/B.E), Aptitude Test (for B.Arch/B.Planning)',
      examPattern: '90 questions (30 each in PCM), 3 hours duration, 4 marks for correct answer, -1 for wrong answer',
      cutoff: 'Previous year cutoff: General - 87.8992241, OBC - 68.0234447, SC - 46.8825338, ST - 34.6728999',
      admitCardDate: '2025-01-15',
      counsellingStart: '2025-02-20',
      totalSeats: '1,08,000+ seats across NITs, IIITs, GFTIs',
      examCenters: '500+ cities across India',
      attempts: 'Maximum 3 attempts',
      preparationTips: [
        'Focus on NCERT textbooks for conceptual clarity',
        'Practice previous year questions and mock tests regularly',
        'Time management is crucial - practice solving papers within time limit',
        'Strengthen weak areas through targeted practice'
      ],
      importantLinks: [
        { name: 'Application Form', url: 'https://jeemain.nta.nic.in/application' },
        { name: 'Admit Card', url: 'https://jeemain.nta.nic.in/admit-card' },
        { name: 'Result', url: 'https://jeemain.nta.nic.in/result' },
        { name: 'Counselling', url: 'https://josaa.nic.in' }
      ],
      examLanguages: ['Hindi', 'English', 'Assamese', 'Bengali', 'Gujarati', 'Kannada', 'Malayalam', 'Marathi', 'Odia', 'Punjabi', 'Tamil', 'Telugu', 'Urdu'],
      negativeMarking: 'Yes, -1 mark for wrong answer',
      qualifyingMarks: 'General: 89.75 percentile, OBC: 74.31 percentile, SC: 54.01 percentile, ST: 44.33 percentile'
    },
    {
      id: 'jee-advanced',
      name: 'JEE Advanced',
      fullName: 'Joint Entrance Examination Advanced',
      description: 'For admission to IITs and ISM Dhanbad',
      applicationStart: '2025-04-30',
      applicationEnd: '2025-05-05',
      examDate: '2025-05-18',
      resultDate: '2025-06-09',
      applicationFee: '₹2,800 (General), ₹1,400 (SC/ST/PWD)',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://jeeadv.ac.in',
      eligibility: 'JEE Main qualified, Top 2,50,000 candidates',
      programs: ['B.Tech', 'B.S', 'Dual Degree'],
      conductingBody: 'IIT (Rotating)',
      status: 'upcoming',
      priority: 'high',
      syllabus: 'Physics, Chemistry, Mathematics (Advanced level)',
      examPattern: '2 papers (Paper 1 & 2), 3 hours each, Multiple choice and numerical questions',
      cutoff: 'Previous year cutoff: Common Rank List - 2319, OBC-NCL - 1259, SC - 1137, ST - 554',
      admitCardDate: '2025-05-12',
      counsellingStart: '2025-06-15',
      totalSeats: '17,000+ seats across 23 IITs',
      examCenters: '400+ cities across India',
      attempts: 'Maximum 2 attempts in consecutive years',
      preparationTips: [
        'Master JEE Main syllabus thoroughly before attempting Advanced',
        'Focus on conceptual understanding rather than rote learning',
        'Practice multi-concept problems and previous year papers',
        'Develop problem-solving speed and accuracy'
      ],
      importantLinks: [
        { name: 'Registration Portal', url: 'https://jeeadv.ac.in/registration' },
        { name: 'Admit Card Download', url: 'https://jeeadv.ac.in/admit-card' },
        { name: 'Answer Key', url: 'https://jeeadv.ac.in/answer-key' },
        { name: 'JoSAA Counselling', url: 'https://josaa.nic.in' }
      ],
      examLanguages: ['Hindi', 'English'],
      negativeMarking: 'Yes, varies by question type',
      qualifyingMarks: 'Minimum marks required in each subject for ranking'
    },
    {
      id: 'bitsat',
      name: 'BITSAT',
      fullName: 'Birla Institute of Technology and Science Admission Test',
      description: 'For admission to BITS Pilani campuses',
      applicationStart: '2025-01-03',
      applicationEnd: '2025-03-15',
      examDate: '2025-05-20 to 2025-05-30',
      resultDate: '2025-06-05',
      applicationFee: '₹3,400 (Male), ₹2,900 (Female)',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://www.bitsadmission.com',
      eligibility: 'Class 12 with PCM, Min 75% aggregate',
      programs: ['B.E', 'B.Tech', 'B.Pharm', 'M.Sc'],
      conductingBody: 'BITS Pilani',
      status: 'upcoming',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics, English Proficiency, Logical Reasoning',
      examPattern: '150 questions, 3 hours, +3 for correct, -1 for wrong answer',
      cutoff: 'Previous year cutoff: Pilani Campus - 380+, Goa Campus - 360+, Hyderabad Campus - 350+',
      admitCardDate: '2025-05-15',
      counsellingStart: '2025-06-10',
      totalSeats: '4,000+ seats across all campuses',
      examCenters: '150+ cities across India and abroad',
      attempts: 'Once per year',
      preparationTips: [
        'Focus on speed and accuracy as there is negative marking',
        'Practice English and Logical Reasoning sections regularly',
        'NCERT books are sufficient for Physics, Chemistry, and Mathematics',
        'Take multiple mock tests to improve time management'
      ],
      importantLinks: [
        { name: 'Online Application', url: 'https://www.bitsadmission.com/application' },
        { name: 'Slot Booking', url: 'https://www.bitsadmission.com/slot-booking' },
        { name: 'Score Card', url: 'https://www.bitsadmission.com/scorecard' },
        { name: 'Admission Process', url: 'https://www.bitsadmission.com/admission' }
      ],
      examLanguages: ['English'],
      negativeMarking: 'Yes, -1 mark for wrong answer',
      qualifyingMarks: 'No minimum qualifying marks, admission based on merit'
    },
    {
      id: 'viteee',
      name: 'VITEEE',
      fullName: 'VIT Engineering Entrance Examination',
      description: 'For admission to VIT campuses',
      applicationStart: '2024-10-30',
      applicationEnd: '2025-02-28',
      examDate: '2025-04-24 to 2025-04-30',
      resultDate: '2025-05-10',
      applicationFee: '₹1,150',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://viteee.vit.ac.in',
      eligibility: 'Class 12 with PCM, Min 60% aggregate',
      programs: ['B.Tech'],
      conductingBody: 'VIT University',
      status: 'ongoing',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics, English',
      examPattern: '125 questions, 2.5 hours, +1 for correct, no negative marking',
      cutoff: 'Previous year cutoff: Vellore Campus - 50,000 rank, Chennai Campus - 80,000 rank',
      admitCardDate: '2025-04-15',
      counsellingStart: '2025-05-15',
      totalSeats: '10,000+ seats across all campuses',
      examCenters: '120+ cities across India',
      attempts: 'Once per year',
      preparationTips: [
        'No negative marking, so attempt all questions',
        'Focus on NCERT syllabus for all three subjects',
        'Practice time management as 2.5 hours for 125 questions',
        'English section is scoring, practice vocabulary and grammar'
      ],
      importantLinks: [
        { name: 'Application Portal', url: 'https://viteee.vit.ac.in/application' },
        { name: 'Hall Ticket', url: 'https://viteee.vit.ac.in/hall-ticket' },
        { name: 'Results', url: 'https://viteee.vit.ac.in/results' },
        { name: 'Counselling', url: 'https://viteee.vit.ac.in/counselling' }
      ],
      examLanguages: ['English'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on rank'
    },
    {
      id: 'srmjeee',
      name: 'SRMJEEE',
      fullName: 'SRM Joint Engineering Entrance Examination',
      description: 'For admission to SRM Institute of Science and Technology',
      applicationStart: '2024-10-15',
      applicationEnd: '2025-03-31',
      examDate: '2025-04-15 to 2025-04-25',
      resultDate: '2025-05-05',
      applicationFee: '₹1,100',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://www.srmist.edu.in',
      eligibility: 'Class 12 with PCM, Min 50% aggregate',
      programs: ['B.Tech', 'B.Arch'],
      conductingBody: 'SRM Institute',
      status: 'ongoing',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics',
      examPattern: '105 questions, 2.5 hours, +1 for correct, no negative marking',
      cutoff: 'Previous year cutoff: Main Campus - 25,000 rank, Other campuses - 50,000 rank',
      admitCardDate: '2025-04-10',
      counsellingStart: '2025-05-10',
      totalSeats: '8,000+ seats across all campuses',
      examCenters: '100+ cities across India',
      attempts: 'Once per year',
      preparationTips: [
        'No negative marking, attempt all questions',
        'Equal weightage to all three subjects',
        'Practice previous year question papers',
        'Focus on speed as time per question is limited'
      ],
      importantLinks: [
        { name: 'Online Application', url: 'https://www.srmist.edu.in/application' },
        { name: 'Admit Card', url: 'https://www.srmist.edu.in/admit-card' },
        { name: 'Result Declaration', url: 'https://www.srmist.edu.in/results' },
        { name: 'Counselling Process', url: 'https://www.srmist.edu.in/counselling' }
      ],
      examLanguages: ['English'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on rank'
    },
    {
      id: 'comedk',
      name: 'COMEDK UGET',
      fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
      description: 'For engineering colleges in Karnataka',
      applicationStart: '2025-03-01',
      applicationEnd: '2025-04-15',
      examDate: '2025-05-11',
      resultDate: '2025-05-25',
      applicationFee: '₹1,800',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://www.comedk.org',
      eligibility: 'Class 12 with PCM, Karnataka domicile preferred',
      programs: ['B.E'],
      conductingBody: 'COMEDK',
      status: 'upcoming',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics',
      examPattern: '180 questions, 3 hours, +1 for correct, no negative marking',
      cutoff: 'Previous year cutoff: Top colleges - 15,000 rank, Good colleges - 30,000 rank',
      admitCardDate: '2025-05-05',
      counsellingStart: '2025-06-01',
      totalSeats: '45,000+ seats in Karnataka engineering colleges',
      examCenters: '50+ cities in Karnataka and neighboring states',
      attempts: 'Once per year',
      preparationTips: [
        'Focus on Karnataka state board syllabus',
        'No negative marking, so attempt all questions',
        'Equal weightage to Physics, Chemistry, and Mathematics',
        'Practice time management for 180 questions in 3 hours'
      ],
      importantLinks: [
        { name: 'Application Form', url: 'https://www.comedk.org/application' },
        { name: 'Hall Ticket', url: 'https://www.comedk.org/hall-ticket' },
        { name: 'Answer Key', url: 'https://www.comedk.org/answer-key' },
        { name: 'KEA Counselling', url: 'https://kea.kar.nic.in' }
      ],
      examLanguages: ['English'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on rank'
    },
    {
      id: 'mht-cet',
      name: 'MHT CET',
      fullName: 'Maharashtra Common Entrance Test',
      description: 'For engineering colleges in Maharashtra',
      applicationStart: '2025-03-15',
      applicationEnd: '2025-04-30',
      examDate: '2025-05-15 to 2025-05-20',
      resultDate: '2025-06-01',
      applicationFee: '₹1,000',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://cetcell.mahacet.org',
      eligibility: 'Class 12 with PCM, Maharashtra domicile',
      programs: ['B.Tech', 'B.E'],
      conductingBody: 'State CET Cell, Maharashtra',
      status: 'upcoming',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics',
      examPattern: '150 questions, 3 hours, +1 for correct, no negative marking',
      cutoff: 'Previous year cutoff: Open category - 99.5+ percentile for top colleges',
      admitCardDate: '2025-05-10',
      counsellingStart: '2025-06-10',
      totalSeats: '1,50,000+ seats in Maharashtra engineering colleges',
      examCenters: '200+ centers across Maharashtra',
      attempts: 'Once per year',
      preparationTips: [
        'Focus on Maharashtra state board syllabus',
        'No negative marking, attempt all questions',
        'Mathematics carries more weightage',
        'Practice previous year MHT CET papers'
      ],
      importantLinks: [
        { name: 'Online Application', url: 'https://cetcell.mahacet.org/application' },
        { name: 'Admit Card', url: 'https://cetcell.mahacet.org/admit-card' },
        { name: 'Result', url: 'https://cetcell.mahacet.org/result' },
        { name: 'CAP Counselling', url: 'https://fe2024.mahacet.org' }
      ],
      examLanguages: ['English', 'Marathi'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on percentile'
    },
    {
      id: 'wbjee',
      name: 'WBJEE',
      fullName: 'West Bengal Joint Entrance Examination',
      description: 'For engineering colleges in West Bengal',
      applicationStart: '2024-12-27',
      applicationEnd: '2025-02-17',
      examDate: '2025-04-27',
      resultDate: '2025-05-15',
      applicationFee: '₹500 (General), ₹400 (SC/ST)',
      examMode: 'Offline (OMR based)',
      officialWebsite: 'https://www.wbjeeb.nic.in',
      eligibility: 'Class 12 with PCM, West Bengal domicile',
      programs: ['B.Tech', 'B.E'],
      conductingBody: 'WBJEEB',
      status: 'ongoing',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics',
      examPattern: '155 questions, 2 hours, +1 for correct, no negative marking',
      cutoff: 'Previous year cutoff: General Merit Rank - 2000 for top colleges',
      admitCardDate: '2025-04-20',
      counsellingStart: '2025-05-25',
      totalSeats: '50,000+ seats in West Bengal engineering colleges',
      examCenters: '100+ centers across West Bengal',
      attempts: 'Once per year',
      preparationTips: [
        'Focus on West Bengal board syllabus',
        'OMR based exam, practice bubble filling',
        'No negative marking, attempt all questions',
        'Mathematics has highest weightage'
      ],
      importantLinks: [
        { name: 'Application Portal', url: 'https://www.wbjeeb.nic.in/application' },
        { name: 'Admit Card', url: 'https://www.wbjeeb.nic.in/admit-card' },
        { name: 'Answer Key', url: 'https://www.wbjeeb.nic.in/answer-key' },
        { name: 'Counselling', url: 'https://www.wbjeeb.nic.in/counselling' }
      ],
      examLanguages: ['English', 'Bengali'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on rank'
    },
    {
      id: 'kcet',
      name: 'KCET',
      fullName: 'Karnataka Common Entrance Test',
      description: 'For engineering colleges in Karnataka',
      applicationStart: '2025-02-15',
      applicationEnd: '2025-03-30',
      examDate: '2025-04-18 to 2025-04-19',
      resultDate: '2025-05-10',
      applicationFee: '₹650 (General), ₹325 (SC/ST)',
      examMode: 'Offline (OMR based)',
      officialWebsite: 'https://kea.kar.nic.in',
      eligibility: 'Class 12 with PCM, Karnataka domicile',
      programs: ['B.E', 'B.Tech'],
      conductingBody: 'Karnataka Examinations Authority',
      status: 'upcoming',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics, Biology (optional)',
      examPattern: '180 questions, 3 hours, +1 for correct, no negative marking',
      cutoff: 'Previous year cutoff: General Merit - 50+ marks for decent colleges',
      admitCardDate: '2025-04-10',
      counsellingStart: '2025-05-20',
      totalSeats: '80,000+ seats in Karnataka engineering colleges',
      examCenters: '500+ centers across Karnataka',
      attempts: 'Once per year',
      preparationTips: [
        'Focus on Karnataka state board (PUC) syllabus',
        'OMR based exam, practice filling bubbles correctly',
        'No negative marking, attempt all questions',
        'Equal weightage to Physics, Chemistry, and Mathematics'
      ],
      importantLinks: [
        { name: 'Online Application', url: 'https://kea.kar.nic.in/application' },
        { name: 'Hall Ticket', url: 'https://kea.kar.nic.in/hall-ticket' },
        { name: 'Answer Key', url: 'https://kea.kar.nic.in/answer-key' },
        { name: 'KEA Counselling', url: 'https://kea.kar.nic.in/counselling' }
      ],
      examLanguages: ['English', 'Kannada'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on rank'
    },
    {
      id: 'ts-eamcet',
      name: 'TS EAMCET',
      fullName: 'Telangana State Engineering, Agriculture & Medical Common Entrance Test',
      description: 'For engineering colleges in Telangana',
      applicationStart: '2025-03-01',
      applicationEnd: '2025-04-15',
      examDate: '2025-05-03 to 2025-05-08',
      resultDate: '2025-05-20',
      applicationFee: '₹800 (General), ₹400 (SC/ST)',
      examMode: 'Computer Based Test (CBT)',
      officialWebsite: 'https://eamcet.tsche.ac.in',
      eligibility: 'Class 12 with PCM, Telangana/Andhra Pradesh domicile',
      programs: ['B.Tech', 'B.E'],
      conductingBody: 'Telangana State Council of Higher Education',
      status: 'upcoming',
      priority: 'medium',
      syllabus: 'Physics, Chemistry, Mathematics',
      examPattern: '160 questions, 3 hours, +1 for correct, +0.25 for guess, no negative marking',
      cutoff: 'Previous year cutoff: OC category - 40,000 rank for good colleges',
      admitCardDate: '2025-04-25',
      counsellingStart: '2025-05-30',
      totalSeats: '1,20,000+ seats in Telangana engineering colleges',
      examCenters: '150+ centers across Telangana and Andhra Pradesh',
      attempts: 'Once per year',
      preparationTips: [
        'Focus on Telangana state board syllabus',
        'No negative marking, attempt all questions',
        'Bonus marks for partially correct answers',
        'Mathematics has highest weightage in ranking'
      ],
      importantLinks: [
        { name: 'Application Form', url: 'https://eamcet.tsche.ac.in/application' },
        { name: 'Hall Ticket', url: 'https://eamcet.tsche.ac.in/hall-ticket' },
        { name: 'Answer Key', url: 'https://eamcet.tsche.ac.in/answer-key' },
        { name: 'TS EAPCET Counselling', url: 'https://tseapcet.nic.in' }
      ],
      examLanguages: ['English', 'Telugu'],
      negativeMarking: 'No negative marking',
      qualifyingMarks: 'No minimum qualifying marks, admission based on rank'
    }
  ];

  // Get exam status and styling
  const getExamStatus = (exam: any) => {
    const now = new Date();
    const appStart = new Date(exam.applicationStart);
    const appEnd = new Date(exam.applicationEnd);
    
    if (now < appStart) {
      return { status: 'upcoming', color: 'bg-blue-100 text-blue-700', label: 'Upcoming' };
    } else if (now >= appStart && now <= appEnd) {
      return { status: 'ongoing', color: 'bg-green-100 text-green-700', label: 'Apply Now' };
    } else {
      return { status: 'closed', color: 'bg-gray-100 text-gray-600', label: 'Closed' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  // Filter exams based on search and filters
  const filteredExams = engineeringExams.filter(exam => {
    const matchesSearch = searchTerm === '' || 
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = selectedPriority === 'all' || exam.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || getExamStatus(exam).status === selectedStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

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
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
                <span className="font-heading text-sm font-semibold text-primary uppercase tracking-wider">Engineering Entrance Exams</span>
                <Calendar className="w-6 h-6 text-icon-secondary-medium" />
              </div>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light bg-clip-text text-transparent">
                Engineering Entrance Exam Calendar 2025
              </h1>
              <p className="font-paragraph text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Complete guide to top engineering entrance exams in India for B.Tech, B.E, B.Arch, and B.Planning admissions. 
                Get all the essential information including timelines, fees, exam patterns, and preparation tips.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div 
              className="text-center space-y-3 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-xl flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-primary">{engineeringExams.length}</div>
                <div className="font-paragraph text-sm text-gray-600">Major Exams</div>
              </div>
            </motion.div>
            <motion.div 
              className="text-center space-y-3 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-icon-secondary-medium to-icon-accent-light rounded-xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-icon-secondary-medium">
                  {engineeringExams.filter(exam => getExamStatus(exam).status === 'ongoing').length}
                </div>
                <div className="font-paragraph text-sm text-gray-600">Applications Open</div>
              </div>
            </motion.div>
            <motion.div 
              className="text-center space-y-3 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-icon-accent-light to-icon-accent-warm rounded-xl flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-icon-accent-light">500+</div>
                <div className="font-paragraph text-sm text-gray-600">Engineering Colleges</div>
              </div>
            </motion.div>
            <motion.div 
              className="text-center space-y-3 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-icon-accent-warm to-primary rounded-xl flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-icon-accent-warm">15L+</div>
                <div className="font-paragraph text-sm text-gray-600">Annual Applicants</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search exams by name, description, or conducting body..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-paragraph"
              />
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="font-paragraph">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="font-paragraph">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Applications Open</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Exam Calendar Grid */}
      <section className="py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredExams.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-gray-600 mb-2">
                No exams found
              </h3>
              <p className="font-paragraph text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredExams.map((exam, index) => {
                const examStatus = getExamStatus(exam);
                return (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`group hover:shadow-2xl transition-all duration-500 border-l-4 ${getPriorityColor(exam.priority)} overflow-hidden h-full`}>
                      <CardHeader className="relative pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-heading text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                                {exam.name}
                              </h3>
                              <Badge className={`${examStatus.color} font-paragraph text-xs`}>
                                {examStatus.label}
                              </Badge>
                            </div>
                            <p className="font-heading text-sm font-medium text-gray-700">{exam.fullName}</p>
                            <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                              {exam.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        {/* Key Dates */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              Important Dates
                            </h4>
                            <div className="space-y-2 text-sm font-paragraph">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Application:</span>
                                <span className="font-medium text-gray-800">
                                  {new Date(exam.applicationStart).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - {new Date(exam.applicationEnd).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Exam Date:</span>
                                <span className="font-medium text-gray-800">{exam.examDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Result:</span>
                                <span className="font-medium text-gray-800">
                                  {new Date(exam.resultDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <IndianRupee className="w-4 h-4 mr-2" />
                              Exam Details
                            </h4>
                            <div className="space-y-2 text-sm font-paragraph">
                              <div>
                                <span className="text-gray-600">Fee:</span>
                                <span className="font-medium text-gray-800 ml-2">{exam.applicationFee}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Mode:</span>
                                <span className="font-medium text-gray-800 ml-2 flex items-center">
                                  <Monitor className="w-3 h-3 mr-1" />
                                  {exam.examMode}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Conducted by:</span>
                                <span className="font-medium text-gray-800 ml-2">{exam.conductingBody}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Programs Offered */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Programs Offered</h4>
                          <div className="flex flex-wrap gap-2">
                            {exam.programs.map((program, programIndex) => (
                              <Badge key={programIndex} className="bg-primary/10 text-primary font-paragraph">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Additional Details Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              Additional Dates
                            </h4>
                            <div className="space-y-2 text-sm font-paragraph">
                              {exam.admitCardDate && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Admit Card:</span>
                                  <span className="font-medium text-gray-800">
                                    {new Date(exam.admitCardDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                  </span>
                                </div>
                              )}
                              {exam.counsellingStart && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Counselling:</span>
                                  <span className="font-medium text-gray-800">
                                    {new Date(exam.counsellingStart).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              Exam Stats
                            </h4>
                            <div className="space-y-2 text-sm font-paragraph">
                              {exam.totalSeats && (
                                <div>
                                  <span className="text-gray-600">Total Seats:</span>
                                  <span className="font-medium text-gray-800 ml-2">{exam.totalSeats}</span>
                                </div>
                              )}
                              {exam.examCenters && (
                                <div>
                                  <span className="text-gray-600">Exam Centers:</span>
                                  <span className="font-medium text-gray-800 ml-2">{exam.examCenters}</span>
                                </div>
                              )}
                              {exam.attempts && (
                                <div>
                                  <span className="text-gray-600">Attempts:</span>
                                  <span className="font-medium text-gray-800 ml-2">{exam.attempts}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Exam Languages */}
                        {exam.examLanguages && (
                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Globe className="w-4 h-4 mr-2" />
                              Available Languages
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exam.examLanguages.map((language, langIndex) => (
                                <Badge key={langIndex} className="bg-icon-accent-light/10 text-icon-accent-light font-paragraph">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Negative Marking & Qualifying Marks */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {exam.negativeMarking && (
                            <div className="space-y-3">
                              <h4 className="font-heading font-semibold text-primary">Negative Marking</h4>
                              <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                                {exam.negativeMarking}
                              </p>
                            </div>
                          )}
                          
                          {exam.qualifyingMarks && (
                            <div className="space-y-3">
                              <h4 className="font-heading font-semibold text-primary">Qualifying Marks</h4>
                              <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                                {exam.qualifyingMarks}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Preparation Tips */}
                        {exam.preparationTips && (
                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <Lightbulb className="w-4 h-4 mr-2" />
                              Preparation Tips
                            </h4>
                            <ul className="space-y-2">
                              {exam.preparationTips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="font-paragraph text-sm text-gray-600 leading-relaxed">{tip}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Important Links */}
                        {exam.importantLinks && (
                          <div className="space-y-3">
                            <h4 className="font-heading font-semibold text-primary flex items-center">
                              <LinkIcon className="w-4 h-4 mr-2" />
                              Important Links
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {exam.importantLinks.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors group"
                                >
                                  <Download className="w-4 h-4 text-primary group-hover:text-primary/80" />
                                  <span className="font-paragraph text-sm text-primary group-hover:text-primary/80 font-medium">
                                    {link.name}
                                  </span>
                                  <ExternalLink className="w-3 h-3 text-primary/60 ml-auto" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Eligibility */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Eligibility Criteria
                          </h4>
                          <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                            {exam.eligibility}
                          </p>
                        </div>

                        {/* Exam Pattern */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Exam Pattern</h4>
                          <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                            {exam.examPattern}
                          </p>
                        </div>

                        {/* Syllabus */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Syllabus</h4>
                          <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                            {exam.syllabus}
                          </p>
                        </div>

                        {/* Previous Year Cutoff */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Previous Year Cutoff
                          </h4>
                          <p className="font-paragraph text-sm text-gray-600 leading-relaxed">
                            {exam.cutoff}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                          <Button asChild className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium flex-1">
                            <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Official Website
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="font-paragraph flex-1">
                            <Link to="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Prep Courses
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="font-paragraph flex-1">
                            <Link to="/colleges">
                              <Building2 className="w-4 h-4 mr-2" />
                              Find Colleges
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-icon-secondary-medium/10 to-icon-accent-light/10">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h3 className="font-heading text-2xl font-bold text-primary">
              Need Help with Exam Preparation?
            </h3>
            <p className="font-paragraph text-gray-600 max-w-2xl mx-auto">
              Get personalized guidance, study materials, and expert tips to crack your target engineering entrance exam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                <Link to="/assessments">
                  <Brain className="w-4 h-4 mr-2" />
                  Take Aptitude Test
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-paragraph">
                <Link to="/courses">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Prep Courses
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-paragraph">
                <Link to="/interview-prep">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Interview Preparation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}