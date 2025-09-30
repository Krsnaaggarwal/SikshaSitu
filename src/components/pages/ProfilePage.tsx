import { useState } from 'react';
import { User, Mail, Calendar, Edit, Save, X, Award, BookOpen, Target, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Image } from '@/components/ui/image';

function ProfilePageContent() {
  const { member } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: member?.contact?.firstName || '',
    lastName: member?.contact?.lastName || '',
    nickname: member?.profile?.nickname || '',
    title: member?.profile?.title || '',
  });

  const handleSave = () => {
    // In a real implementation, this would update the member profile
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      firstName: member?.contact?.firstName || '',
      lastName: member?.contact?.lastName || '',
      nickname: member?.profile?.nickname || '',
      title: member?.profile?.title || '',
    });
    setIsEditing(false);
  };

  // Mock data for demonstration - in real app, this would come from user's assessment history
  const mockAssessmentHistory = [
    {
      id: '1',
      title: 'Career Aptitude Assessment',
      completedDate: '2024-01-15',
      score: 85,
      category: 'Excellent'
    },
    {
      id: '2',
      title: 'Interest Assessment',
      completedDate: '2024-01-10',
      score: 78,
      category: 'Good'
    }
  ];

  const mockRecommendations = [
    'Computer Science Engineering',
    'Public Administration',
    'Data Science'
  ];

  const mockBookmarkedCourses = [
    'B.Tech Computer Science',
    'Master in Public Administration',
    'Data Analytics Certificate'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Profile Header */}
      <section className="bg-primary/5 py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                {member?.profile?.photo?.url ? (
                  <Image src={member.profile.photo.url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-primary-foreground" />
                )}
              </div>
              <div>
                <h1 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                  {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                </h1>
                <p className="font-paragraph text-gray-600">
                  {member?.profile?.title || 'Career Explorer'}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="font-paragraph"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-heading text-lg text-primary">
                    Personal Information
                  </CardTitle>
                  {isEditing && (
                    <Button onClick={handleSave} size="sm" className="font-paragraph">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-paragraph">First Name</Label>
                        <Input
                          id="firstName"
                          value={editedProfile.firstName}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-paragraph">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editedProfile.lastName}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nickname" className="font-paragraph">Nickname</Label>
                        <Input
                          id="nickname"
                          value={editedProfile.nickname}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, nickname: e.target.value }))}
                          className="font-paragraph"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title" className="font-paragraph">Title</Label>
                        <Input
                          id="title"
                          value={editedProfile.title}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, title: e.target.value }))}
                          className="font-paragraph"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="font-paragraph text-sm font-medium text-gray-700">Full Name</p>
                          <p className="font-paragraph text-gray-600">
                            {member?.contact?.firstName || 'Not provided'} {member?.contact?.lastName || ''}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-sm font-medium text-gray-700">Email</p>
                          <p className="font-paragraph text-gray-600 flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {member?.loginEmail || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="font-paragraph text-sm font-medium text-gray-700">Member Since</p>
                          <p className="font-paragraph text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {member?._createdDate ? format(new Date(member._createdDate), 'MMM dd, yyyy') : 'Not available'}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-sm font-medium text-gray-700">Last Login</p>
                          <p className="font-paragraph text-gray-600">
                            {member?.lastLoginDate ? format(new Date(member.lastLoginDate), 'MMM dd, yyyy') : 'Not available'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assessment History */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Assessment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockAssessmentHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="font-paragraph text-gray-600 mb-4">No assessments completed yet</p>
                      <Button asChild className="font-paragraph">
                        <Link to="/assessments">Take Your First Assessment</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockAssessmentHistory.map((assessment) => (
                        <div key={assessment.id} className="p-4 border border-primary/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-heading font-semibold text-primary">{assessment.title}</h3>
                            <Badge className="bg-icon-secondary-medium/10 text-icon-secondary-medium font-paragraph">
                              {assessment.score}% - {assessment.category}
                            </Badge>
                          </div>
                          <p className="font-paragraph text-sm text-gray-600">
                            Completed on {format(new Date(assessment.completedDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      ))}
                      <Button asChild variant="outline" className="w-full font-paragraph">
                        <Link to="/assessments">Take Another Assessment</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Career Recommendations */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Career Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockRecommendations.length === 0 ? (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="font-paragraph text-gray-600 mb-4">Complete an assessment to get personalized recommendations</p>
                      <Button asChild className="font-paragraph">
                        <Link to="/assessments">Get Recommendations</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {mockRecommendations.map((recommendation, index) => (
                        <div key={index} className="p-3 bg-primary/5 rounded-lg">
                          <span className="font-paragraph text-primary font-medium">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-sm text-gray-600">Assessments Completed</span>
                    <Badge className="bg-primary/10 text-primary font-paragraph">
                      {mockAssessmentHistory.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-sm text-gray-600">Courses Bookmarked</span>
                    <Badge className="bg-icon-secondary-medium/10 text-icon-secondary-medium font-paragraph">
                      {mockBookmarkedCourses.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-paragraph text-sm text-gray-600">Profile Completion</span>
                    <Badge className="bg-icon-accent-warm/10 text-icon-accent-warm font-paragraph">
                      75%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Bookmarked Courses */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Bookmarked Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockBookmarkedCourses.length === 0 ? (
                    <div className="text-center py-4">
                      <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="font-paragraph text-sm text-gray-600 mb-3">No bookmarked courses</p>
                      <Button asChild variant="outline" size="sm" className="font-paragraph">
                        <Link to="/courses">Browse Courses</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {mockBookmarkedCourses.map((course, index) => (
                        <div key={index} className="p-2 border border-primary/10 rounded text-sm">
                          <span className="font-paragraph text-gray-700">{course}</span>
                        </div>
                      ))}
                      <Button asChild variant="outline" size="sm" className="w-full font-paragraph">
                        <Link to="/courses">View All Courses</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-primary">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" size="sm" className="w-full justify-start font-paragraph">
                    <Link to="/assessments">
                      <Brain className="w-4 h-4 mr-2" />
                      Take Assessment
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full justify-start font-paragraph">
                    <Link to="/courses">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full justify-start font-paragraph">
                    <Link to="/colleges">
                      <Award className="w-4 h-4 mr-2" />
                      Find Colleges
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full justify-start font-paragraph">
                    <Link to="/jobs">
                      <Target className="w-4 h-4 mr-2" />
                      View Jobs
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full justify-start font-paragraph">
                    <Link to="/interview-prep">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Interview Prep
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full justify-start font-paragraph">
                    <Link to="/email-templates">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Templates
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to view and manage your profile">
      <ProfilePageContent />
    </MemberProtectedRoute>
  );
}