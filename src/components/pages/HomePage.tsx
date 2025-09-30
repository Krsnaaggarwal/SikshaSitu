import { Link } from 'react-router-dom';
import { Brain, BookOpen, Building2, Target, ArrowRight, Users, Award, MapPin, Smartphone, MessageSquare, Mail, Clock, Cloud, Server, Database, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function HomePage() {
  const { member, isAuthenticated, actions } = useMember();

  // Career disciplines data for charts and navigation
  const careerDisciplines = [
    {
      id: 'data-science',
      title: 'Data Science & AI-ML',
      avgSalary: 37.5,
      jobCount: 1250,
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Deep Learning'],
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys']
    },
    {
      id: 'web-development',
      title: 'Web Development',
      avgSalary: 23.5,
      jobCount: 2100,
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'MongoDB'],
      topCompanies: ['Meta', 'Netflix', 'Flipkart', 'Zomato', 'PayTM']
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      avgSalary: 32.5,
      jobCount: 1850,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'CI/CD', 'Azure', 'GCP'],
      topCompanies: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'IBM', 'Red Hat', 'HashiCorp']
    },
    {
      id: 'public-admin',
      title: 'Public Administration',
      avgSalary: 15.0,
      jobCount: 850,
      skills: ['Policy Analysis', 'Public Law', 'Administration', 'Leadership', 'Communication'],
      topCompanies: ['Government of India', 'State Governments', 'PSUs', 'Municipal Corps', 'UPSC']
    },
    {
      id: 'education',
      title: 'Education & Teaching',
      avgSalary: 12.5,
      jobCount: 1500,
      skills: ['Pedagogy', 'Curriculum Design', 'Classroom Management', 'Assessment', 'Technology Integration'],
      topCompanies: ['CBSE', 'State Education Boards', 'Kendriya Vidyalaya', 'Navodaya Schools', 'Universities']
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Medical',
      avgSalary: 18.0,
      jobCount: 950,
      skills: ['Clinical Skills', 'Patient Care', 'Medical Knowledge', 'Emergency Response', 'Healthcare Management'],
      topCompanies: ['AIIMS', 'Government Hospitals', 'State Health Departments', 'WHO', 'Red Cross']
    }
  ];

  // Chart data
  const salaryData = careerDisciplines.map(discipline => ({
    name: discipline.title.split(' ')[0] + (discipline.title.includes('&') ? ' & ' + discipline.title.split('& ')[1].split(' ')[0] : ''),
    salary: discipline.avgSalary,
    jobs: discipline.jobCount
  }));

  const skillsData = careerDisciplines.flatMap(discipline => 
    discipline.skills.slice(0, 3).map(skill => ({
      skill,
      demand: Math.floor(Math.random() * 40) + 60, // Random demand between 60-100
      category: discipline.title.split(' ')[0]
    }))
  );

  const jobRolesData = [
    { role: 'Software Engineer', count: 2500, growth: 15 },
    { role: 'Data Scientist', count: 1800, growth: 25 },
    { role: 'DevOps Engineer', count: 1600, growth: 30 },
    { role: 'Cloud Architect', count: 900, growth: 35 },
    { role: 'Site Reliability Engineer', count: 750, growth: 40 },
    { role: 'IAS Officer', count: 450, growth: 5 },
    { role: 'Government Teacher', count: 1200, growth: 8 }
  ];

  const COLORS = ['#0000FF', '#7AE061', '#9B9BFF', '#EFAFAA', '#A9FF94', '#64CC4B'];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Personalized Assessments',
      description: 'Discover your strengths and interests through comprehensive aptitude and career assessments',
      href: '/assessments',
      color: 'bg-icon-primary/10 text-icon-primary'
    },
    {
      icon: BookOpen,
      title: 'Course Mapping',
      description: 'Explore detailed pathways from courses to government job opportunities',
      href: '/courses',
      color: 'bg-icon-secondary-medium/10 text-icon-secondary-medium'
    },
    {
      icon: Building2,
      title: 'College Directory',
      description: 'Find nearby government colleges with comprehensive details and admission information',
      href: '/colleges',
      color: 'bg-icon-accent-light/10 text-icon-accent-light'
    },
    {
      icon: Target,
      title: 'Government Jobs',
      description: 'Access current government job openings with eligibility criteria and application deadlines',
      href: '/jobs',
      color: 'bg-icon-accent-warm/10 text-icon-accent-warm'
    },
    {
      icon: MessageSquare,
      title: 'AI Interview Prep',
      description: 'Get personalized interview questions generated by AI for any government career role',
      href: '/interview-prep',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Mail,
      title: 'Email Templates',
      description: 'AI-generated professional email templates for networking and informational interviews',
      href: '/email-templates',
      color: 'bg-icon-secondary-medium/10 text-icon-secondary-medium'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Students Guided', icon: Users },
    { number: '500+', label: 'Government Colleges', icon: Building2 },
    { number: '1,000+', label: 'Career Paths', icon: Target },
    { number: '95%', label: 'Success Rate', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Horizontally Scrolling Career Navigation Banner */}
      <section className="w-full bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light py-4 overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll space-x-8 whitespace-nowrap">
            {/* First set of career links */}
            {careerDisciplines.map((discipline, index) => (
              <button
                key={`first-${discipline.id}`}
                onClick={() => scrollToSection(discipline.id)}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 font-paragraph text-sm font-medium"
              >
                {discipline.id === 'data-science' && <Brain className="w-4 h-4" />}
                {discipline.id === 'web-development' && <BookOpen className="w-4 h-4" />}
                {discipline.id === 'cloud-devops' && <Cloud className="w-4 h-4" />}
                {discipline.id === 'public-admin' && <Building2 className="w-4 h-4" />}
                {discipline.id === 'education' && <Users className="w-4 h-4" />}
                {discipline.id === 'healthcare' && <Award className="w-4 h-4" />}
                <span>{discipline.title}</span>
              </button>
            ))}
            {/* Duplicate set for seamless loop */}
            {careerDisciplines.map((discipline, index) => (
              <button
                key={`second-${discipline.id}`}
                onClick={() => scrollToSection(discipline.id)}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 font-paragraph text-sm font-medium"
              >
                {discipline.id === 'data-science' && <Brain className="w-4 h-4" />}
                {discipline.id === 'web-development' && <BookOpen className="w-4 h-4" />}
                {discipline.id === 'cloud-devops' && <Cloud className="w-4 h-4" />}
                {discipline.id === 'public-admin' && <Building2 className="w-4 h-4" />}
                {discipline.id === 'education' && <Users className="w-4 h-4" />}
                {discipline.id === 'healthcare' && <Award className="w-4 h-4" />}
                <span>{discipline.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Hero Section - Inspired by the 3D grid layout */}
      <section className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="relative">
          {/* 3D Grid Background Inspired Layout */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-icon-secondary-medium/20"></div>
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-primary/10"></div>
              ))}
            </div>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary leading-tight">
                    Your Career Journey Starts Here
                  </h1>
                <p className="font-paragraph text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">{"Discover personalized career paths through government education. Get AI-powered recommendations, explore local colleges, and access government job opportunities - all in one platform."}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button asChild size="lg" className="font-paragraph">
                    <Link to="/assessments">
                      Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button onClick={actions.login} size="lg" className="font-paragraph">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
                <Button variant="outline" asChild size="lg" className="font-paragraph">
                  <Link to="/colleges">Explore Colleges</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center space-y-2">
                      <Icon className="w-6 h-6 mx-auto text-primary" />
                      <div className="font-heading text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="font-paragraph text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Visual - Premium Hero Image */}
            <div className="relative h-96 lg:h-[500px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/9b0f10_814b1621a9c24cfbbf68f37a4090c49f~mv2.png?originWidth=576&originHeight=448"
                  alt="Students engaged in career planning and education"
                  width={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-icon-secondary-medium/20"></div>
                
                {/* Floating Achievement Cards */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-icon-secondary-medium rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-primary">50K+</p>
                      <p className="font-paragraph text-xs text-gray-600">Success Stories</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-20 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-primary">AI-Powered</p>
                      <p className="font-paragraph text-xs text-gray-600">Assessments</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-icon-accent-light rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-primary">95%</p>
                      <p className="font-paragraph text-xs text-gray-600">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Premium Imagery */}
      <section className="w-full bg-background py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
              Comprehensive Career Guidance Platform
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to make informed decisions about your education and career in government sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const featureImages = [
                "https://static.wixstatic.com/media/9b0f10_fef170f1f69140009ad9def648019f4d~mv2.png?originWidth=384&originHeight=384",
                "https://static.wixstatic.com/media/9b0f10_94569580a7bf4870803b835b5355375f~mv2.png?originWidth=384&originHeight=384",
                "https://static.wixstatic.com/media/9b0f10_d6c500a954494d48bb35a4f5f79f7cae~mv2.png?originWidth=384&originHeight=384",
                "https://static.wixstatic.com/media/9b0f10_e246becfe285419fa1242623e5b953c8~mv2.png?originWidth=384&originHeight=384",
                "https://static.wixstatic.com/media/9b0f10_6af9ab04fb1e4a4cb343a8eef710b775~mv2.png?originWidth=384&originHeight=384",
                "https://static.wixstatic.com/media/9b0f10_fef170f1f69140009ad9def648019f4d~mv2.png?originWidth=384&originHeight=384"
              ];
              
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/20 overflow-hidden">
                  {/* Premium Feature Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={featureImages[index]}
                      alt={`${feature.title} illustration`}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-heading text-xl font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto font-paragraph text-primary hover:text-primary group-hover:translate-x-2 transition-transform duration-300">
                      <Link to={feature.href}>
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>



      {/* Career Discipline Cards Section */}
      <section className="w-full bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10 py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-icon-secondary-medium to-icon-accent-light bg-clip-text text-transparent">
              Explore Career Disciplines
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-3xl mx-auto">
              Discover detailed insights into various career paths with salary data, required skills, and top companies
            </p>
          </div>

          {/* Career Discipline Cards */}
          <div className="space-y-16">
            {careerDisciplines.map((discipline, index) => (
              <div key={discipline.id} id={discipline.id} className="scroll-mt-24">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-white to-primary/5 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Content Side */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            {discipline.id === 'data-science' && <Brain className="w-8 h-8 text-primary" />}
                            {discipline.id === 'web-development' && <BookOpen className="w-8 h-8 text-primary" />}
                            {discipline.id === 'cloud-devops' && <Cloud className="w-8 h-8 text-primary" />}
                            {discipline.id === 'public-admin' && <Building2 className="w-8 h-8 text-primary" />}
                            {discipline.id === 'education' && <Users className="w-8 h-8 text-primary" />}
                            {discipline.id === 'healthcare' && <Award className="w-8 h-8 text-primary" />}
                            <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                              {discipline.title}
                            </h3>
                          </div>
                          
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-primary/10 to-icon-secondary-medium/10 rounded-lg p-4">
                              <div className="text-2xl font-heading font-bold text-primary">₹{discipline.avgSalary} LPA</div>
                              <div className="text-sm font-paragraph text-gray-600">Average Salary</div>
                            </div>
                            <div className="bg-gradient-to-r from-icon-secondary-medium/10 to-icon-accent-light/10 rounded-lg p-4">
                              <div className="text-2xl font-heading font-bold text-icon-secondary-medium">{discipline.jobCount}+</div>
                              <div className="text-sm font-paragraph text-gray-600">Job Openings</div>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Key Skills Required</h4>
                          <div className="flex flex-wrap gap-2">
                            {discipline.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} className="bg-primary/10 text-primary font-paragraph">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Top Companies */}
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Top Hiring Companies</h4>
                          <div className="flex flex-wrap gap-2">
                            {discipline.topCompanies.map((company, companyIndex) => (
                              <Badge key={companyIndex} variant="outline" className="font-paragraph border-primary/20 text-gray-700">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                            <Link to="/courses">
                              <BookOpen className="w-4 h-4 mr-2" />
                              View Courses
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="font-paragraph">
                            <Link to="/jobs">
                              <Target className="w-4 h-4 mr-2" />
                              Find Jobs
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="font-paragraph">
                            <Link to="/assessments">
                              <Brain className="w-4 h-4 mr-2" />
                              Take Assessment
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Charts Side */}
                      <div className="space-y-6">
                        {/* Salary Comparison Chart */}
                        <Card className="border-primary/20">
                          <CardHeader>
                            <CardTitle className="font-heading text-lg text-primary">Salary Comparison</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={salaryData.filter(item => item.name.toLowerCase().includes(discipline.title.split(' ')[0].toLowerCase()) || discipline.title.toLowerCase().includes(item.name.toLowerCase()))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" className="font-paragraph text-xs" />
                                <YAxis className="font-paragraph text-xs" />
                                <Tooltip />
                                <Bar dataKey="salary" fill="#0000FF" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>

                        {/* Skills Demand Chart */}
                        <Card className="border-primary/20">
                          <CardHeader>
                            <CardTitle className="font-heading text-lg text-primary">Skills in Demand</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                              <PieChart>
                                <Pie
                                  data={discipline.skills.slice(0, 5).map((skill, idx) => ({
                                    name: skill,
                                    value: Math.floor(Math.random() * 30) + 70
                                  }))}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label
                                >
                                  {discipline.skills.slice(0, 5).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits Section with Premium Video */}
      <section className="w-full bg-secondary py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground">
                  Built for Rural & Semi-Urban India
                </h2>
                <p className="font-paragraph text-lg text-secondary-foreground/80 leading-relaxed">
                  Our platform is specifically designed to bridge the gap between rural students and quality government education opportunities.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary-foreground mb-2">Mobile-First Design</h3>
                    <p className="font-paragraph text-secondary-foreground/80">Optimized for smartphones with offline capabilities for areas with limited connectivity.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary-foreground mb-2">Hyper-Local Focus</h3>
                    <p className="font-paragraph text-secondary-foreground/80">Find colleges, courses, and opportunities specifically in your district and nearby areas.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-secondary-foreground mb-2">Multi-Language Support</h3>
                    <p className="font-paragraph text-secondary-foreground/80">Available in Hindi, English, and regional languages for better accessibility.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Premium Video Background */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-icon-secondary-medium/20 flex items-center justify-center">
                  {/* Video Placeholder with Play Button */}
                  <div className="relative w-full h-full">
                    <Image
                      src="https://static.wixstatic.com/media/9b0f10_bdb85a008fb6405eb58524da4cf5d052~mv2.png?originWidth=576&originHeight=576"
                      alt="Rural students using technology for education"
                      width={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <p className="font-heading text-2xl font-bold text-primary">1M+</p>
                    <p className="font-paragraph text-xs text-gray-600">Students Reached</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section with Premium Background */}
      <section className="w-full relative py-16 lg:py-24 overflow-hidden">
        {/* Premium Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/9b0f10_45742cd6bd3346cf9fec5f616b201a20~mv2.png?originWidth=1152&originHeight=1152"
            alt="Students celebrating success"
            width={1200}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-icon-secondary-medium/90"></div>
        </div>
        
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">
                Ready to Shape Your Future?
              </h2>
              <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of students who have found their perfect career path through government education opportunities.
              </p>
            </div>
            
            {/* Success Stories Carousel */}
            <div className="grid md:grid-cols-3 gap-6 my-12">
              {[
                { name: "Priya Sharma", role: "IAS Officer", image: "https://static.wixstatic.com/media/9b0f10_4bb2849b2c4c417ab2247e3313c3c6e8~mv2.png?originWidth=1152&originHeight=1152" },
                { name: "Rahul Kumar", role: "Bank Manager", image: "https://static.wixstatic.com/media/9b0f10_6035f3746d714d7684a9c63ffde55f35~mv2.png?originWidth=1152&originHeight=1152" },
                { name: "Anita Patel", role: "Teacher", image: "https://static.wixstatic.com/media/9b0f10_8c0f5244d3d146d6a616e3a1e407cb58~mv2.png?originWidth=1152&originHeight=1152" }
              ].map((story, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.name}
                      width={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-white">{story.name}</h3>
                  <p className="font-paragraph text-sm text-white/80">{story.role}</p>
                </div>
              ))}
            </div>
            
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-paragraph bg-white text-primary hover:bg-white/90 shadow-xl">
                  <Link to="/assessments">
                    Take Assessment <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-paragraph border-white/20 text-white hover:bg-white/10">
                  <Link to="/profile">View My Profile</Link>
                </Button>
              </div>
            ) : (
              <Button onClick={actions.login} size="lg" className="font-paragraph bg-white text-primary hover:bg-white/90 shadow-xl">
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </section>
      {/* Premium Testimonials Section with Video */}
      <section className="w-full bg-gradient-to-br from-background to-primary/5 py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
              Success Stories That Inspire
            </h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-3xl mx-auto">
              Real students, real success stories. See how our platform has transformed careers across India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Video Testimonial */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-icon-secondary-medium/20">
                  <Image
                    src="https://static.wixstatic.com/media/9b0f10_4d3b300f01d94b4ea3f7be459f04b490~mv2.png?originWidth=576&originHeight=320"
                    alt="Student testimonial video"
                    width={600}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-l-[16px] border-l-primary border-y-[12px] border-y-transparent ml-1"></div>
                    </button>
                  </div>
                </div>
                
                {/* Video Caption */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-heading font-semibold text-primary">Rajesh Kumar</p>
                  <p className="font-paragraph text-sm text-gray-600">From Village to IAS Officer</p>
                </div>
              </div>
            </div>

            {/* Written Testimonials */}
            <div className="space-y-6">
              {[
                {
                  name: "Meera Singh",
                  role: "Government Teacher",
                  location: "Uttar Pradesh",
                  quote: "The career assessment helped me discover my passion for teaching. Today, I'm proud to serve my community as a government school teacher.",
                  image: "https://static.wixstatic.com/media/9b0f10_354492c69813438a8ec71316e3b53f9d~mv2.png?originWidth=576&originHeight=320"
                },
                {
                  name: "Amit Patel",
                  role: "Bank Officer",
                  location: "Gujarat",
                  quote: "The platform's course recommendations and college directory made my journey to becoming a bank officer smooth and well-informed.",
                  image: "https://static.wixstatic.com/media/9b0f10_ffa415cc081144afa11364c99d52dce5~mv2.png?originWidth=576&originHeight=320"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-primary/10 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-paragraph text-gray-600 italic mb-3">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-heading font-semibold text-primary">{testimonial.name}</p>
                          <p className="font-paragraph text-sm text-gray-500">{testimonial.role} • {testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Statistics with Images */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "50,000+", label: "Students Guided", image: "https://static.wixstatic.com/media/9b0f10_267ddcd3253c49d29326bd00078a4e3d~mv2.png?originWidth=576&originHeight=320" },
              { number: "500+", label: "Government Colleges", image: "https://static.wixstatic.com/media/9b0f10_d9e274669f9b4d2899782ca401a089d5~mv2.png?originWidth=576&originHeight=320" },
              { number: "1,000+", label: "Career Paths", image: "https://static.wixstatic.com/media/9b0f10_ed5ddeb314d74c12aca9f9735483104a~mv2.png?originWidth=576&originHeight=320" },
              { number: "95%", label: "Success Rate", image: "https://static.wixstatic.com/media/9b0f10_4fdb614cfd9e4ab9a5588c1d1008d4e4~mv2.png?originWidth=576&originHeight=320" }
            ].map((stat, index) => (
              <Card key={index} className="text-center border-primary/10 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={stat.image}
                      alt={stat.label}
                      width={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="font-paragraph text-sm text-gray-600">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}