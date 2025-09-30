import { useState } from 'react';
import { Mail, Send, Copy, CheckCircle, User, Briefcase, ArrowRight, Sparkles, Bot, Wand2, FileText, MessageSquare, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailTemplate {
  subject: string;
  htmlContent: string;
  plainTextContent: string;
}

export default function EmailTemplatesPage() {
  const [careerTitle, setCareerTitle] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [studentName, setStudentName] = useState('');
  const [professionalName, setProfessionalName] = useState('');
  const [generatedTemplate, setGeneratedTemplate] = useState<EmailTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Popular career options for quick selection
  const popularCareers = [
    'Software Engineer',
    'Data Scientist',
    'IAS Officer',
    'Bank Manager',
    'Government Teacher',
    'Civil Engineer',
    'Doctor',
    'Police Officer',
    'Marketing Manager',
    'Financial Analyst',
    'HR Manager',
    'Research Scientist',
    'Journalist',
    'Lawyer',
    'Architect'
  ];

  // AI-powered email template generation
  const generateEmailTemplate = (career: string, studentName: string, professionalName: string): EmailTemplate => {
    const careerLower = career.toLowerCase();
    
    // Generate personalized subject line
    const subject = `Request for Informational Interview - Aspiring ${career}`;
    
    // Generate HTML email content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informational Interview Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0000FF, #7AE061); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .highlight { background: #e6f3ff; padding: 15px; border-left: 4px solid #0000FF; margin: 20px 0; border-radius: 4px; }
        .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #666; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
        .professional { color: #0000FF; font-weight: bold; }
        .student { color: #7AE061; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h2>📧 Informational Interview Request</h2>
        <p>Connecting Students with Industry Professionals</p>
    </div>
    
    <div class="content">
        <p>Dear <span class="professional">${professionalName || '[Professional\'s Name]'}</span>,</p>
        
        <p>I hope this email finds you well. My name is <span class="student">${studentName || '[Your Name]'}</span>, and I am a student with a keen interest in pursuing a career in <strong>${career}</strong>.</p>
        
        <div class="highlight">
            <p><strong>🎯 Purpose of this email:</strong> I would be incredibly grateful for the opportunity to learn from your experience and insights in the ${career} field through a brief informational interview.</p>
        </div>
        
        <p>I am particularly interested in understanding:</p>
        <ul>
            <li>🚀 Your career journey and what led you to ${careerLower.includes('engineer') ? 'engineering' : careerLower.includes('data') ? 'data science' : careerLower.includes('ias') ? 'civil services' : careerLower.includes('teacher') ? 'education' : careerLower.includes('doctor') ? 'healthcare' : careerLower.includes('bank') ? 'banking' : 'your field'}</li>
            <li>📚 Essential skills and qualifications for success in this role</li>
            <li>🌟 Current trends and future opportunities in the industry</li>
            <li>💡 Advice for someone starting their career in this field</li>
        </ul>
        
        <div class="highlight">
            <p><strong>⏰ Time Commitment:</strong> I would only need 15 minutes of your valuable time, and I'm happy to work around your schedule. The conversation can be conducted via phone, video call, or in person - whatever is most convenient for you.</p>
        </div>
        
        <p>I understand how busy you must be, and I truly appreciate you considering my request. Your guidance would be invaluable as I navigate my career path and make informed decisions about my future.</p>
        
        <p>Thank you very much for your time and consideration. I look forward to the possibility of learning from your expertise.</p>
        
        <div class="signature">
            <p>Warm regards,</p>
            <p><strong class="student">${studentName || '[Your Name]'}</strong><br>
            📧 [Your Email Address]<br>
            📱 [Your Phone Number]<br>
            🎓 [Your Educational Institution/Program]</p>
        </div>
        
        <div class="footer">
            <p><em>💼 This email was crafted to help students connect with industry professionals for career guidance.</em></p>
        </div>
    </div>
</body>
</html>`;

    // Generate plain text version
    const plainTextContent = `Subject: ${subject}

Dear ${professionalName || '[Professional\'s Name]'},

I hope this email finds you well. My name is ${studentName || '[Your Name]'}, and I am a student with a keen interest in pursuing a career in ${career}.

PURPOSE: I would be incredibly grateful for the opportunity to learn from your experience and insights in the ${career} field through a brief informational interview.

I am particularly interested in understanding:
• Your career journey and what led you to ${careerLower.includes('engineer') ? 'engineering' : careerLower.includes('data') ? 'data science' : careerLower.includes('ias') ? 'civil services' : careerLower.includes('teacher') ? 'education' : careerLower.includes('doctor') ? 'healthcare' : careerLower.includes('bank') ? 'banking' : 'your field'}
• Essential skills and qualifications for success in this role
• Current trends and future opportunities in the industry
• Advice for someone starting their career in this field

TIME COMMITMENT: I would only need 15 minutes of your valuable time, and I'm happy to work around your schedule. The conversation can be conducted via phone, video call, or in person - whatever is most convenient for you.

I understand how busy you must be, and I truly appreciate you considering my request. Your guidance would be invaluable as I navigate my career path and make informed decisions about my future.

Thank you very much for your time and consideration. I look forward to the possibility of learning from your expertise.

Warm regards,

${studentName || '[Your Name]'}
[Your Email Address]
[Your Phone Number]
[Your Educational Institution/Program]

---
This email was crafted to help students connect with industry professionals for career guidance.`;

    return {
      subject,
      htmlContent,
      plainTextContent
    };
  };

  const handleGenerateTemplate = () => {
    const career = careerTitle || selectedCareer;
    if (!career) return;

    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const template = generateEmailTemplate(career, studentName, professionalName);
      setGeneratedTemplate(template);
      setIsGenerating(false);
      setShowTemplate(true);
    }, 2000);
  };

  const resetForm = () => {
    setCareerTitle('');
    setSelectedCareer('');
    setStudentName('');
    setProfessionalName('');
    setGeneratedTemplate(null);
    setShowTemplate(false);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-icon-secondary-medium/10">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                AI Email Templates
              </h1>
              <motion.div
                className="inline-flex items-center space-x-2 mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-6 h-6 text-primary" />
                <span className="font-heading text-xl text-primary font-semibold">Professional Networking</span>
                <Sparkles className="w-6 h-6 text-icon-secondary-medium" />
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="font-paragraph text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Generate professional email templates to request informational interviews with industry professionals. 
              Our AI creates personalized, respectful emails that help you build valuable career connections.
            </motion.p>

            {/* Floating Interactive Elements */}
            <motion.div 
              className="flex justify-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: Bot, label: "AI-Generated", color: "from-primary to-icon-secondary-medium" },
                { icon: Mail, label: "Professional Tone", color: "from-icon-secondary-medium to-icon-accent-light" },
                { icon: Target, label: "Career-Specific", color: "from-icon-accent-light to-icon-accent-warm" }
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
            {!showTemplate ? (
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
                      Generate Professional Email Template
                    </CardTitle>
                    <p className="font-paragraph text-gray-600">
                      Create a personalized email template to request informational interviews with industry professionals
                    </p>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6">
                    {/* Career Selection */}
                    <div className="space-y-4">
                      <Label className="font-paragraph text-sm font-medium text-gray-700">
                        Choose the professional's career field
                      </Label>
                      <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                        <SelectTrigger className="font-paragraph">
                          <SelectValue placeholder="Select a career field..." />
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

                    {/* Custom Career Input */}
                    <div className="space-y-4">
                      <Label htmlFor="careerTitle" className="font-paragraph text-sm font-medium text-gray-700">
                        Enter a specific career title
                      </Label>
                      <Input
                        id="careerTitle"
                        placeholder="e.g., Machine Learning Engineer, District Collector, Investment Banker..."
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

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentName" className="font-paragraph text-sm font-medium text-gray-700">
                          Your Name (Optional)
                        </Label>
                        <Input
                          id="studentName"
                          placeholder="e.g., Priya Sharma"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="professionalName" className="font-paragraph text-sm font-medium text-gray-700">
                          Professional's Name (Optional)
                        </Label>
                        <Input
                          id="professionalName"
                          placeholder="e.g., Dr. Rajesh Kumar"
                          value={professionalName}
                          onChange={(e) => setProfessionalName(e.target.value)}
                          className="font-paragraph"
                        />
                      </div>
                    </div>

                    {/* Generate Button */}
                    <motion.div className="pt-6">
                      <Button
                        onClick={handleGenerateTemplate}
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
                            <span>AI is crafting your email...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Wand2 className="w-5 h-5" />
                            <span>Generate Email Template</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>

                    {/* Features Preview */}
                    <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                      {[
                        { icon: Mail, title: "Professional Format", desc: "Proper email structure and etiquette" },
                        { icon: User, title: "Personalized Content", desc: "Tailored to specific career fields" },
                        { icon: FileText, title: "HTML & Plain Text", desc: "Both formats for any email client" }
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
                      <Mail className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h2 className="font-heading text-3xl font-bold text-primary">
                      Email Template Generated!
                    </h2>
                    <Sparkles className="w-8 h-8 text-icon-secondary-medium" />
                  </div>
                  <p className="font-paragraph text-lg text-gray-600">
                    Professional email template for <span className="font-semibold text-primary">{careerTitle || selectedCareer}</span> networking
                  </p>
                  <Button onClick={resetForm} variant="outline" className="font-paragraph">
                    Generate Another Template
                  </Button>
                </motion.div>

                {/* Email Templates */}
                {generatedTemplate && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Subject Line */}
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-primary/5">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary flex items-center justify-between">
                          <div className="flex items-center">
                            <Send className="w-5 h-5 mr-2" />
                            Email Subject Line
                          </div>
                          <Button
                            onClick={() => copyToClipboard(generatedTemplate.subject, 'subject')}
                            variant="outline"
                            size="sm"
                            className="font-paragraph"
                          >
                            {copiedField === 'subject' ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                              </>
                            )}
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-gray-50 rounded-lg font-paragraph text-gray-800">
                          {generatedTemplate.subject}
                        </div>
                      </CardContent>
                    </Card>

                    {/* HTML Email Template */}
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-primary/5">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            HTML Email Template
                          </div>
                          <div className="flex space-x-2">
                            <Badge className="bg-icon-secondary-medium/10 text-icon-secondary-medium font-paragraph">
                              Rich Format
                            </Badge>
                            <Button
                              onClick={() => copyToClipboard(generatedTemplate.htmlContent, 'html')}
                              variant="outline"
                              size="sm"
                              className="font-paragraph"
                            >
                              {copiedField === 'html' ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy HTML
                                </>
                              )}
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* HTML Preview */}
                          <div className="border rounded-lg overflow-hidden">
                            <div 
                              className="p-4 max-h-96 overflow-y-auto"
                              dangerouslySetInnerHTML={{ __html: generatedTemplate.htmlContent }}
                            />
                          </div>
                          
                          {/* HTML Code */}
                          <details className="group">
                            <summary className="cursor-pointer font-paragraph text-sm text-primary hover:text-primary/80 transition-colors">
                              View HTML Source Code
                            </summary>
                            <div className="mt-3 p-4 bg-gray-900 text-green-400 rounded-lg text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">
                              <pre>{generatedTemplate.htmlContent}</pre>
                            </div>
                          </details>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Plain Text Template */}
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-white to-primary/5">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Plain Text Template
                          </div>
                          <div className="flex space-x-2">
                            <Badge className="bg-icon-accent-light/10 text-icon-accent-light font-paragraph">
                              Universal Format
                            </Badge>
                            <Button
                              onClick={() => copyToClipboard(generatedTemplate.plainTextContent, 'plain')}
                              variant="outline"
                              size="sm"
                              className="font-paragraph"
                            >
                              {copiedField === 'plain' ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy Text
                                </>
                              )}
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                          {generatedTemplate.plainTextContent}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Usage Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-icon-accent-light/5 to-icon-accent-warm/5">
                    <CardHeader>
                      <CardTitle className="font-heading text-lg text-primary flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Usage Tips for Success
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Before Sending:</h4>
                          <ul className="space-y-2 font-paragraph text-sm text-gray-600">
                            <li>• Research the professional's background and recent work</li>
                            <li>• Customize the placeholders with your actual information</li>
                            <li>• Double-check spelling and grammar</li>
                            <li>• Send during business hours (9 AM - 5 PM)</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-heading font-semibold text-primary">Follow-up Etiquette:</h4>
                          <ul className="space-y-2 font-paragraph text-sm text-gray-600">
                            <li>• Wait 1-2 weeks before following up</li>
                            <li>• Send a thank you note after the interview</li>
                            <li>• Keep the conversation to 15 minutes as promised</li>
                            <li>• Connect on LinkedIn after the meeting</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <Button asChild className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium">
                    <Link to="/interview-prep">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Interview Preparation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-paragraph">
                    <Link to="/jobs">
                      <Target className="w-4 h-4 mr-2" />
                      Find Job Opportunities
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-paragraph">
                    <Link to="/assessments">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Career Assessment
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-secondary via-secondary to-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-foreground">
              Why Use Our AI Email Templates?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Bot,
                  title: "AI-Powered Personalization",
                  description: "Each template is customized based on the specific career field and professional context.",
                  color: "bg-secondary-foreground/10"
                },
                {
                  icon: Mail,
                  title: "Professional Standards",
                  description: "Templates follow proper business email etiquette and maintain a respectful, humble tone.",
                  color: "bg-secondary-foreground/10"
                },
                {
                  icon: Target,
                  title: "Higher Response Rates",
                  description: "Well-crafted emails with clear purpose and time commitment get better responses.",
                  color: "bg-secondary-foreground/10"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-4 p-4 sm:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-secondary-foreground">
                    {feature.title}
                  </h3>
                  <p className="font-paragraph text-sm sm:text-base text-secondary-foreground/80 leading-relaxed">
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