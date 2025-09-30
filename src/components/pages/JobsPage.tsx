import { useState, useEffect } from 'react';
import { Target, Calendar, ExternalLink, Search, Filter, Clock, DollarSign, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { GovernmentJobs } from '@/entities/governmentjobs';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format, isAfter, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export default function JobsPage() {
  const [jobs, setJobs] = useState<GovernmentJobs[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<GovernmentJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<GovernmentJobs | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm]);

  const fetchJobs = async () => {
    try {
      const { items } = await BaseCrudService.getAll<GovernmentJobs>('governmentjobs');
      setJobs(items);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredQualifications?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  };

  const isDeadlineActive = (deadline: Date | string | undefined) => {
    if (!deadline) return false;
    try {
      const deadlineDate = typeof deadline === 'string' ? parseISO(deadline) : deadline;
      return isAfter(deadlineDate, new Date());
    } catch {
      return false;
    }
  };

  const formatDeadline = (deadline: Date | string | undefined) => {
    if (!deadline) return 'Not specified';
    try {
      const deadlineDate = typeof deadline === 'string' ? parseISO(deadline) : deadline;
      return format(deadlineDate, 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const getDeadlineBadgeColor = (deadline: Date | string | undefined) => {
    if (!deadline) return 'bg-gray-100 text-gray-600';
    
    try {
      const deadlineDate = typeof deadline === 'string' ? parseISO(deadline) : deadline;
      const now = new Date();
      const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDeadline < 0) return 'bg-red-100 text-red-600';
      if (daysUntilDeadline <= 7) return 'bg-icon-accent-warm/10 text-icon-accent-warm';
      if (daysUntilDeadline <= 30) return 'bg-yellow-100 text-yellow-600';
      return 'bg-icon-secondary-medium/10 text-icon-secondary-medium';
    } catch {
      return 'bg-gray-100 text-gray-600';
    }
  };

  const getJobImage = (jobTitle: string, index: number) => {
    const title = jobTitle?.toLowerCase() || '';
    
    // Specific job type images based on job title keywords
    if (title.includes('teacher') || title.includes('education') || title.includes('professor') || title.includes('lecturer')) {
      return 'https://static.wixstatic.com/media/9b0f10_b3dcfc64635e4ca4831f5c4fdd622824~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('police') || title.includes('constable') || title.includes('inspector') || title.includes('security')) {
      return 'https://static.wixstatic.com/media/9b0f10_b1d133dc365e4af0b96cfa3d2ab763f9~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('bank') || title.includes('clerk') || title.includes('po') || title.includes('officer') || title.includes('finance')) {
      return 'https://static.wixstatic.com/media/9b0f10_300166d3ecae463db2f8b85322bc52ad~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('engineer') || title.includes('technical') || title.includes('it') || title.includes('computer')) {
      return 'https://static.wixstatic.com/media/9b0f10_27d9b41602ec4d1c856abfa30196b494~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('doctor') || title.includes('nurse') || title.includes('medical') || title.includes('health')) {
      return 'https://static.wixstatic.com/media/9b0f10_6f519961187b48dca655264534d0fb09~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('ias') || title.includes('ips') || title.includes('civil') || title.includes('administrative')) {
      return 'https://static.wixstatic.com/media/9b0f10_5451da3f6c8d4d74b3df98109813023b~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('railway') || title.includes('train') || title.includes('station') || title.includes('transport')) {
      return 'https://static.wixstatic.com/media/9b0f10_63899c28a4f7436d914150a7afad6107~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('postal') || title.includes('post') || title.includes('mail') || title.includes('delivery')) {
      return 'https://static.wixstatic.com/media/9b0f10_694061871d8c4b7d9669e8a261b92f4b~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('defense') || title.includes('army') || title.includes('navy') || title.includes('air force') || title.includes('military')) {
      return 'https://static.wixstatic.com/media/9b0f10_e0185f5425f3440eafe2a981f546914c~mv2.png?originWidth=384&originHeight=256';
    }
    if (title.includes('court') || title.includes('judge') || title.includes('legal') || title.includes('law')) {
      return 'https://static.wixstatic.com/media/9b0f10_0c37dc201dad4479a5a0428b9881f496~mv2.png?originWidth=384&originHeight=256';
    }
    
    // Default government office images for other jobs
    const defaultImages = [
      'https://static.wixstatic.com/media/9b0f10_847f3156c8eb49fa92e8cbed8ad5292a~mv2.png?originWidth=1152&originHeight=640',
      'https://static.wixstatic.com/media/9b0f10_56ee33556f9145f7bd773662054f1002~mv2.png?originWidth=1152&originHeight=640',
      'https://static.wixstatic.com/media/9b0f10_5451da3f6c8d4d74b3df98109813023b~mv2.png?originWidth=384&originHeight=256',
      'https://static.wixstatic.com/media/9b0f10_300166d3ecae463db2f8b85322bc52ad~mv2.png?originWidth=384&originHeight=256',
      'https://static.wixstatic.com/media/9b0f10_b3dcfc64635e4ca4831f5c4fdd622824~mv2.png?originWidth=384&originHeight=256'
    ];
    
    return defaultImages[index % defaultImages.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-paragraph text-gray-600">Loading government jobs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Job Detail Modal
  if (selectedJob) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => setSelectedJob(null)}
              className="font-paragraph"
            >
              ← Back to Jobs
            </Button>

            {/* Job Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Job Image */}
                <div className="aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={getJobImage(selectedJob.jobTitle || '', 0)}
                    alt={`${selectedJob.jobTitle} illustration`}
                    width={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h1 className="font-heading text-3xl font-bold text-primary">
                  {selectedJob.jobTitle}
                </h1>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className={`font-paragraph ${getDeadlineBadgeColor(selectedJob.applicationDeadline)}`}>
                    <Calendar className="w-3 h-3 mr-1" />
                    Deadline: {formatDeadline(selectedJob.applicationDeadline)}
                  </Badge>
                  {selectedJob.payScale && (
                    <Badge className="bg-primary/10 text-primary font-paragraph">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {selectedJob.payScale}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Job Details */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {selectedJob.jobDescription && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Job Description
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed whitespace-pre-line">
                          {selectedJob.jobDescription}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedJob.requiredQualifications && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Required Qualifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed whitespace-pre-line">
                          {selectedJob.requiredQualifications}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedJob.eligibilityCriteria && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Eligibility Criteria
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed whitespace-pre-line">
                          {selectedJob.eligibilityCriteria}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-heading text-lg text-primary">Application Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {selectedJob.applicationDeadline && (
                          <div>
                            <p className="font-paragraph text-sm font-medium text-gray-700">Application Deadline</p>
                            <p className="font-paragraph text-sm text-gray-600">
                              {formatDeadline(selectedJob.applicationDeadline)}
                            </p>
                            {!isDeadlineActive(selectedJob.applicationDeadline) && (
                              <p className="font-paragraph text-xs text-red-600 mt-1">
                                ⚠️ Deadline has passed
                              </p>
                            )}
                          </div>
                        )}
                        
                        {selectedJob.payScale && (
                          <div>
                            <p className="font-paragraph text-sm font-medium text-gray-700">Pay Scale</p>
                            <p className="font-paragraph text-sm text-gray-600">{selectedJob.payScale}</p>
                          </div>
                        )}
                      </div>

                      {selectedJob.officialNotificationUrl && (
                        <Button asChild className="w-full font-paragraph">
                          <a href={selectedJob.officialNotificationUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-2" />
                            View Official Notification
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                      
                      <Button asChild variant="outline" className="w-full font-paragraph">
                        <Link to="/interview-prep">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Interview Preparation
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-heading font-semibold text-primary">Need Help?</h3>
                      <div className="space-y-2 text-sm font-paragraph">
                        <p className="text-gray-600">
                          Get guidance on application process and exam preparation.
                        </p>
                        <Button variant="outline" size="sm" className="w-full font-paragraph">
                          Get Application Help
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Premium Background */}
      <section className="relative bg-primary/5 py-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/9b0f10_847f3156c8eb49fa92e8cbed8ad5292a~mv2.png?originWidth=1152&originHeight=640"
            alt="Government office building"
            width={1200}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
              Government Jobs
            </h1>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Discover current government job opportunities with detailed information about requirements, deadlines, and application processes
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-primary/10">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by job title, description, or qualifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-paragraph"
              />
            </div>
            <Button variant="outline" className="font-paragraph">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'No jobs found' : 'No jobs available'}
              </h3>
              <p className="font-paragraph text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for new job postings.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="font-paragraph text-gray-600">
                  Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                  <Card 
                    key={job._id} 
                    className="border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
                    onClick={() => setSelectedJob(job)}
                  >
                    {/* Premium Job Image */}
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={getJobImage(job.jobTitle || '', index)}
                        alt={`${job.jobTitle} illustration`}
                        width={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <CardHeader>
                      <div className="space-y-3">
                        <CardTitle className="font-heading text-lg text-primary group-hover:text-primary/80 transition-colors">
                          {job.jobTitle}
                        </CardTitle>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className={`font-paragraph text-xs ${getDeadlineBadgeColor(job.applicationDeadline)}`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDeadline(job.applicationDeadline)}
                          </Badge>
                          {job.payScale && (
                            <Badge className="bg-primary/10 text-primary font-paragraph text-xs">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {job.payScale.length > 15 ? `${job.payScale.substring(0, 15)}...` : job.payScale}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {job.jobDescription && (
                        <p className="font-paragraph text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {job.jobDescription}
                        </p>
                      )}
                      
                      {job.requiredQualifications && (
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="font-paragraph text-xs text-primary font-medium mb-1">Required Qualifications:</p>
                          <p className="font-paragraph text-xs text-gray-600 line-clamp-2">
                            {job.requiredQualifications}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 text-xs font-paragraph text-gray-500">
                          {job.officialNotificationUrl && (
                            <div className="flex items-center space-x-1">
                              <FileText className="w-3 h-3" />
                              <span>Official Notification</span>
                            </div>
                          )}
                          {isDeadlineActive(job.applicationDeadline) ? (
                            <div className="flex items-center space-x-1 text-icon-secondary-medium">
                              <Clock className="w-3 h-3" />
                              <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-red-500">
                              <Clock className="w-3 h-3" />
                              <span>Expired</span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="font-paragraph text-primary hover:text-primary p-0 h-auto"
                        >
                          View Details →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Job Alerts CTA with Premium Background */}
      <section className="relative bg-secondary py-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/9b0f10_56ee33556f9145f7bd773662054f1002~mv2.png?originWidth=1152&originHeight=640"
            alt="Professional working in government office"
            width={1200}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-secondary-foreground">
              Never Miss a Job Opportunity
            </h2>
            <p className="font-paragraph text-secondary-foreground/80 max-w-2xl mx-auto">
              Set up job alerts based on your qualifications and interests to get notified about new government job postings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="font-paragraph">
                Set Up Job Alerts
              </Button>
              <Button variant="outline" size="lg" className="font-paragraph border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                View Application Tips
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );