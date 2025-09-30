/**
 * Collection ID: governmentjobs
 * Interface for GovernmentJobs
 */
export interface GovernmentJobs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  requiredQualifications?: string;
  /** @wixFieldType text */
  eligibilityCriteria?: string;
  /** @wixFieldType text */
  payScale?: string;
  /** @wixFieldType date */
  applicationDeadline?: Date | string;
  /** @wixFieldType url */
  officialNotificationUrl?: string;
}
