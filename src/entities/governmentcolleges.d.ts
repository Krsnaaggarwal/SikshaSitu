/**
 * Collection ID: governmentcolleges
 * Interface for GovernmentColleges
 */
export interface GovernmentColleges {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  collegeName?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  coursesOffered?: string;
  /** @wixFieldType text */
  collegeType?: string;
  /** @wixFieldType text */
  contactNumber?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType image */
  collegeImage?: string;
}