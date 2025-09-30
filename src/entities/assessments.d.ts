/**
 * Collection ID: assessments
 * Interface for Assessments
 */
export interface Assessments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  assessmentTitle?: string;
  /** @wixFieldType text */
  questionsData?: string;
  /** @wixFieldType text */
  assessmentType?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  questionsContent?: string;
  /** @wixFieldType text */
  scoringLogic?: string;
  /** @wixFieldType number */
  estimatedDurationMinutes?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}
