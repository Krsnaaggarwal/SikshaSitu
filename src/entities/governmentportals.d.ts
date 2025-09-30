
/**
 * Collection ID: governmentportals
 * Interface for GovernmentPortals
 */
export interface GovernmentPortals {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  portalName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  portalLink?: string;
  /** @wixFieldType text */
  focusArea?: string;
  /** @wixFieldType text */
  targetAudience?: string;
  /** @wixFieldType image */
  logo?: string;
}
