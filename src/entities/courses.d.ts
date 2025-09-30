/**
 * Collection ID: courses
 * Interface for Courses
 */
export interface Courses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  courseName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  careerPathsDescription?: string;
  /** @wixFieldType text */
  duration?: string;
  /** @wixFieldType text */
  eligibilityCriteria?: string;
  /** @wixFieldType text */
  learningOutcomes?: string;
  /** @wixFieldType image */
  courseImage?: string;
}
