import { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, ExternalLink, Search, Filter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { GovernmentColleges } from '@/entities/governmentcolleges';
import { Image } from '@/components/ui/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<GovernmentColleges[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<GovernmentColleges[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<GovernmentColleges | null>(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    filterColleges();
  }, [colleges, searchTerm]);

  const fetchColleges = async () => {
    try {
      const { items } = await BaseCrudService.getAll<GovernmentColleges>('governmentcolleges');
      setColleges(items);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterColleges = () => {
    let filtered = colleges;
    
    if (searchTerm) {
      filtered = filtered.filter(college =>
        college.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.coursesOffered?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.collegeType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredColleges(filtered);
  };

  const getCollegeTypeBadgeColor = (type: string) => {
    if (type?.toLowerCase().includes('university')) return 'bg-primary/10 text-primary';
    if (type?.toLowerCase().includes('engineering')) return 'bg-icon-secondary-medium/10 text-icon-secondary-medium';
    if (type?.toLowerCase().includes('medical')) return 'bg-icon-accent-warm/10 text-icon-accent-warm';
    if (type?.toLowerCase().includes('arts')) return 'bg-icon-accent-light/10 text-icon-accent-light';
    return 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-paragraph text-gray-600">Loading colleges...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // College Detail Modal
  if (selectedCollege) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => setSelectedCollege(null)}
              className="font-paragraph"
            >
              ← Back to Colleges
            </Button>

            {/* College Header */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h1 className="font-heading text-3xl font-bold text-primary">
                    {selectedCollege.collegeName}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.collegeType && (
                      <Badge className={`font-paragraph ${getCollegeTypeBadgeColor(selectedCollege.collegeType)}`}>
                        {selectedCollege.collegeType}
                      </Badge>
                    )}
                  </div>
                  
                  {selectedCollege.address && (
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="font-paragraph">{selectedCollege.address}</span>
                    </div>
                  )}
                </div>

                {/* College Details */}
                <div className="space-y-6">
                  {selectedCollege.coursesOffered && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg text-primary">
                          Courses Offered
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-paragraph text-gray-600 leading-relaxed">
                          {selectedCollege.coursesOffered}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Contact Information */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-heading text-lg text-primary">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedCollege.contactNumber && (
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="font-paragraph text-gray-600">{selectedCollege.contactNumber}</span>
                        </div>
                      )}
                      {selectedCollege.websiteUrl && (
                        <div className="flex items-center space-x-3">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a 
                            href={selectedCollege.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-primary hover:underline flex items-center space-x-1"
                          >
                            <span>Visit Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedCollege.websiteUrl && (
                    <Button asChild className="font-paragraph">
                      <a href={selectedCollege.websiteUrl} target="_blank" rel="noopener noreferrer">
                        Visit Official Website <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="font-paragraph">
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* College Image and Quick Info */}
              <div className="space-y-4">
                {selectedCollege.collegeImage && (
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={selectedCollege.collegeImage}
                      alt={selectedCollege.collegeName || 'College image'}
                      width={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <Card className="border-primary/20">
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-heading font-semibold text-primary">Quick Info</h3>
                    <div className="space-y-2 text-sm font-paragraph">
                      {selectedCollege.collegeType && (
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <span className="ml-2 text-gray-700">{selectedCollege.collegeType}</span>
                        </div>
                      )}
                      {selectedCollege.contactNumber && (
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <span className="ml-2 text-gray-700">{selectedCollege.contactNumber}</span>
                        </div>
                      )}
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
            src="https://static.wixstatic.com/media/9b0f10_24e725ba841640879ec69fb538d4cb48~mv2.png?originWidth=1152&originHeight=640"
            alt="Government college campus"
            width={1200}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-primary">
              Government Colleges Directory
            </h1>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Discover government colleges in your area with comprehensive information about courses, facilities, and admission details
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
                placeholder="Search by college name, location, or courses..."
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

      {/* Colleges Grid */}
      <section className="py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredColleges.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'No colleges found' : 'No colleges available'}
              </h3>
              <p className="font-paragraph text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for new college listings.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="font-paragraph text-gray-600">
                  Showing {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredColleges.map((college) => (
                  <Card 
                    key={college._id} 
                    className="border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedCollege(college)}
                  >
                    {college.collegeImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={college.collegeImage}
                          alt={college.collegeName || 'College image'}
                          width={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="space-y-2">
                        <CardTitle className="font-heading text-lg text-primary group-hover:text-primary/80 transition-colors">
                          {college.collegeName}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {college.collegeType && (
                            <Badge className={`font-paragraph text-xs ${getCollegeTypeBadgeColor(college.collegeType)}`}>
                              {college.collegeType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {college.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="font-paragraph text-sm text-gray-600 line-clamp-2">
                            {college.address}
                          </p>
                        </div>
                      )}
                      
                      {college.coursesOffered && (
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="font-paragraph text-xs text-primary font-medium mb-1">Courses Offered:</p>
                          <p className="font-paragraph text-xs text-gray-600 line-clamp-2">
                            {college.coursesOffered}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 text-xs font-paragraph text-gray-500">
                          {college.contactNumber && (
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>Contact Available</span>
                            </div>
                          )}
                          {college.websiteUrl && (
                            <div className="flex items-center space-x-1">
                              <Globe className="w-3 h-3" />
                              <span>Website</span>
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

      {/* Location-based CTA with Premium Background */}
      <section className="relative bg-secondary py-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/9b0f10_e652048f279f4558819d8a25cbfa8cff~mv2.png?originWidth=1152&originHeight=640"
            alt="Students at college campus"
            width={1200}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-secondary-foreground">
              Can't Find a College Near You?
            </h2>
            <p className="font-paragraph text-secondary-foreground/80 max-w-2xl mx-auto">
              Our platform is continuously expanding. Contact us to add colleges in your district or get personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="font-paragraph">
                Request College Addition
              </Button>
              <Button variant="outline" size="lg" className="font-paragraph border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                Get Help Finding Colleges
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}