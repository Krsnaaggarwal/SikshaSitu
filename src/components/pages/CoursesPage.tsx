import { useState, useEffect } from 'react';
import { BookOpen, Clock, Users, ArrowRight, Search, Filter, Target, Award, Building2, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { Courses } from '@/entities/courses';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Courses | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm]);

  const fetchCourses = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Courses>('courses');
      setCourses(items);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;
    
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  };

  const getDurationBadgeColor = (duration: string) => {
    if (duration?.includes('1 year') || duration?.includes('12 months')) return 'bg-icon-secondary-medium/10 text-icon-secondary-medium';
    if (duration?.includes('2 year') || duration?.includes('24 months')) return 'bg-icon-accent-light/10 text-icon-accent-light';
    if (duration?.includes('3 year') || duration?.includes('36 months')) return 'bg-icon-accent-warm/10 text-icon-accent-warm';
    return 'bg-primary/10 text-primary';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-paragraph text-gray-600">Loading courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Course Detail Modal
  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => setSelectedCourse(null)}
              className="font-paragraph"
            >
              ← Back to Courses
            </Button>

            {/* Course Header */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h1 className="font-heading text-3xl font-bold text-primary">
                    {selectedCourse.courseName}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`font-paragraph ${getDurationBadgeColor(selectedCourse.duration || '')}`}>
                      {selectedCourse.duration}
                    </Badge>
                  </div>
                  <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-6">
                  {selectedCourse.eligibilityCriteria && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Eligibility Criteria
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed">
                          {selectedCourse.eligibilityCriteria}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedCourse.learningOutcomes && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Learning Outcomes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed">
                          {selectedCourse.learningOutcomes}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedCourse.careerPathsDescription && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Career Opportunities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed">
                          {selectedCourse.careerPathsDescription}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="font-paragraph">
                    <Link to="/colleges">
                      Find Colleges Offering This Course <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-paragraph">
                    <Link to="/jobs">
                      Related Government Jobs
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-paragraph">
                    <Link to="/interview-prep">
                      Interview Preparation
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Course Image */}
              <div className="space-y-4">
                {selectedCourse.courseImage && (
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={selectedCourse.courseImage}
                      alt={selectedCourse.courseName || 'Course image'}
                      width={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <Card className="border-primary/20">
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-heading font-semibold text-primary">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start font-paragraph">
                        <Link to="/assessments">
                          Take Career Assessment
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start font-paragraph">
                        <Link to="/colleges">
                          Find Nearby Colleges
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="w-full justify-start font-paragraph">
                        <Link to="/interview-prep">
                          Interview Preparation
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
            src="https://static.wixstatic.com/media/9b0f10_2ce66295afba4587b42a51b69d87acee~mv2.png?originWidth=1152&originHeight=640"
            alt="Students studying courses"
            width={1200}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
              Course Directory
            </h1>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Explore comprehensive course information and discover pathways to government career opportunities
            </p>
          </div>
        </div>
      </section>



      {/* Search and Filter */}
      <section className="py-8 border-b border-primary/10 bg-white">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-4">
              All Available Courses
            </h2>
            <p className="font-paragraph text-gray-600 max-w-2xl mx-auto">
              Browse our complete catalog of courses and find the perfect match for your career goals
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses by name or description..."
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

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'No courses found' : 'No courses available'}
              </h3>
              <p className="font-paragraph text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for new courses.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="font-paragraph text-gray-600">
                  Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card 
                    key={course._id} 
                    className="border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCourse(course)}
                  >
                    {course.courseImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={course.courseImage}
                          alt={course.courseName || 'Course image'}
                          width={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="space-y-2">
                        <CardTitle className="font-heading text-lg text-primary group-hover:text-primary/80 transition-colors">
                          {course.courseName}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {course.duration && (
                            <Badge className={`font-paragraph text-xs ${getDurationBadgeColor(course.duration)}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {course.duration}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="font-paragraph text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                      
                      {course.careerPathsDescription && (
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="font-paragraph text-xs text-primary font-medium mb-1">Career Opportunities:</p>
                          <p className="font-paragraph text-xs text-gray-600 line-clamp-2">
                            {course.careerPathsDescription}
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between font-paragraph text-primary hover:text-primary group-hover:bg-primary/10"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section with Premium Background */}
      <section className="relative bg-secondary py-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/9b0f10_b7786506c7ac4a35bd2290a8d23f4b12~mv2.png?originWidth=1152&originHeight=640"
            alt="Students choosing courses"
            width={1200}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-secondary-foreground">
              Need Help Choosing the Right Course?
            </h2>
            <p className="font-paragraph text-secondary-foreground/80 max-w-2xl mx-auto">
              Take our career assessment to get personalized course recommendations based on your interests and aptitude.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-paragraph">
              <Link to="/assessments">
                Take Career Assessment <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}