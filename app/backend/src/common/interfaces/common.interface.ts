import { Types } from "mongoose";

export enum UserType {
  RECRUITER = 'RECRUITER',
  CANDIDATE = 'CANDIDATE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  FREELANCE = 'FREELANCE',
  TEMPORARY = 'TEMPORARY',
}

export enum WorkType {
  REMOTE = 'REMOTE',
  ON_SITE = 'ON_SITE',
  HYBRID = 'HYBRID',
}

export enum DegreeEnum {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  ASSOCIATE = 'ASSOCIATE',
  BACHELORS = 'BACHELORS',
  MASTERS = 'MASTERS',
  DOCTORATE = 'DOCTORATE',
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
  VOCATIONAL = 'VOCATIONAL',
}

export enum IndustryEnum {
  TECH = 'TECH',
  FINANCE = 'FINANCE',
  HEALTHCARE = 'HEALTHCARE',
  EDUCATION = 'EDUCATION',
}

export enum HistoryEventType {
}

export interface UserRequest {
  email:string;
  userId:Types.ObjectId;
  role:UserType
} 

