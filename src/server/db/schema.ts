import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

import { type InferResultType } from "~/server/db/types";

import { common_columns } from "./tables/commonColumns";

export * from "auth-schema";

export const USER_ROLE = pgEnum("USER_ROLE", [
  "receptionist",
  "nurse",
  "doctor",
  "admin",
  "patient"
]);

export type USER_ROLE_ENUM = (typeof USER_ROLE)["enumValues"][number];

export const USER_STATUS = pgEnum("USER_STATUS", [
  "Offline",
  "Available",
  "Busy",
  "Do not disturb",
  "Be Right Back"
]);
export const PURCHASE_ORDER_STATUS = pgEnum("PURCHASE_ORDER_STATUS", [
  "Draft",
  "Pending Approval",
  "Approved",
  "Rejected",
  "Created",
  "Acknowledged",
  "Partially Fulfilled",
  "Fulfilled",
  "Partially Received",
  "Received",
  "Invoiced",
  "Paid",
  "Closed",
  "Cancelled"
]);
export const BLOOD_GROUP = pgEnum("BLOOD_GROUP", [
  "O+",
  "B+",
  "A+",
  "AB+",
  "O-",
  "A-",
  "B-",
  "AB-",
  ""
]);
export const VISIT_TYPES = pgEnum("VISIT_TYPES", ["opd", "ipd"]);
export const APPOINTMENT_STATUS = pgEnum("APPOINTMENT_STATUS", [
  "cancelled",
  "completed",
  "scheduled",
  "no show",
  "pending",
  "unscheduled"
]);
export const BILLING_ITEM_UNITS = pgEnum("BILLING_ITEM_UNITS", ["day", "item", "hour"]);
export const MEDICINE_CATEGORY = pgEnum("MEDICINE_CATEGORY", [
  "Allopathy",
  "Ayurvedic",
  "Cosmetic",
  "Drug",
  "Surgical",
  "Generic",
  "OTC"
]);
export const ORDER_BOOK_PRIORITY = pgEnum("ORDER_BOOK_PRIORITY", ["Low", "Medium", "High"]);
export const ORDER_STATUS = pgEnum("ORDER_STATUS", [
  "Processing",
  "Ordered",
  "Delivered",
  "Cancelled",
  "On Hold"
]);
export const REQUESTED_STATUS = pgEnum("REQUESTED_STATUS", ["Approved", "Pending", "Declined"]);
export const CONSULTANT_TYPE = pgEnum("CONSULTANT_TYPE", ["consultant", "unit_admission"]);
export const PAYMENT_STATUS = pgEnum("PAYMENT_STATUS", ["pending", "completed"]);

export const address = pgTable("address", {
  addressId: text("address_id").primaryKey().notNull(),
  addressType: text("address_type"),
  houseNumber: text("house_number"),
  addressLine1: text("addressLine1").notNull(),
  addressLine2: text("addressLine2"),
  streetNumber: text("street_number"),
  area: text("area"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  pincode: text("pincode").notNull(),
  isPrimary: boolean("primary"),
  ...common_columns
});

export const patient = pgTable("patient", {
  patientId: text("patient_id").primaryKey().notNull(),
  title: text("title"),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name"),
  nationality: text("nationality"),
  dob: date("dob", { mode: "string" }).notNull(),
  gender: text("gender").notNull(),
  martialStatus: text("martial_status"),
  bloodGroup: BLOOD_GROUP("blood_group"),
  visitType: VISIT_TYPES("visit_type"),
  fatherName: text("father_name"),
  motherName: text("mother_name"),
  spouseName: text("spouse_name"),
  mobile: text("mobile").notNull(),
  alternateNumber: text("alternate_email"),
  email: text("email"),
  imgUrl: text("img_url"),
  isVip: boolean("is_vip"),
  nameMasking: boolean("name_masking"),
  mlc: boolean("mlc"),
  handleWithCare: boolean("handle_with_care"),
  addressId: text("address_id").references(() => address.addressId, {
    onDelete: "cascade"
  }),
  permanentAddressId: text("permanent_address_id").references(() => address.addressId, {
    onDelete: "restrict",
    onUpdate: "cascade"
  }),
  kinAddressId: text("kin_address_id").references(() => address.addressId, {
    onDelete: "restrict",
    onUpdate: "cascade"
  }),
  language: text("language"),
  religion: text("religion"),
  occupation: text("occupation"),
  disabilitiesType: text("disabilities_type").array(),
  race: text("race").array(),
  identificationMarks: text("identification_marks"),
  dietPreferences: text("diet_preferences"),
  familyIncome: text("family_income"),
  frroNumber: text("frro_number"),
  streetNumber: text("street_number"),
  area: text("area"),
  identityType: text("identity_type"),
  identityNumber: text("identity_number"),
  samePermanentAddress: boolean("same_permanent_as_current"),
  sameKinAddress: boolean("same_kin_as_current"),
  ...common_columns
});

export const patientRelations = relations(patient, ({ one }) => {
  return {
    currentAddress: one(address, {
      fields: [patient.addressId],
      references: [address.addressId]
    }),
    permanentAddress: one(address, {
      fields: [patient.permanentAddressId],
      references: [address.addressId]
    }),
    kinAddress: one(address, {
      fields: [patient.kinAddressId],
      references: [address.addressId]
    }),
    referralDetails: one(referralDetails, {
      fields: [patient.patientId],
      references: [referralDetails.patientId]
    }),
    employerDetails: one(employerDetails, {
      fields: [patient.patientId],
      references: [employerDetails.patientId]
    }),
    payerDetails: one(payerDetails, {
      fields: [patient.patientId],
      references: [payerDetails.patientId]
    }),
    kinDetails: one(kinDetails, {
      fields: [patient.patientId],
      references: [kinDetails.patientId]
    }),
    remarksDetails: one(remarks, {
      fields: [patient.patientId],
      references: [remarks.patientId]
    })
  };
});
export type PatientDetailType = InferResultType<"patient">;
export type PatientType = InferResultType<"patient", { currentAddress: true }>;

export const payerDetails = pgTable("payer", {
  id: text("id").primaryKey().notNull(),
  patientId: text("patient_id")
    .references(() => patient.patientId)
    .notNull(),
  name: text("payer_name"),
  selection: text("payer_selection"),
  type: text("payer_type"),
  group: text("payer_group"),
  subGroup: text("payer_sub_group"),
  insuranceCompany: text("insurance_company"),
  policyNumber: text("policy_number"),
  policyLimit: text("policy_limit"),
  scheme: text("scheme"),
  applicationFromDate: timestamp("application_from_date", { mode: "date" }),
  applicationToDate: timestamp("application_to_date", { mode: "date" }),
  requiredName: text("required_name"),
  baseTarrif: text("base_tarrif"),
  cappingPercentage: decimal("capping_percentage"),
  claimNumber: text("claim_number"),
  tpaAdmissionType: text("tpa_admission_type"),
  employeeId: text("emplyee_id"),
  memberId: text("member_id"),
  allowNonPayableItems: boolean("allow_non_payable_items"),
  isCoPay: boolean("is_co_pay"),
  ...common_columns
});

export const kinDetails = pgTable("kin", {
  id: text("id").primaryKey().notNull(),
  patientId: text("patient_id")
    .references(() => patient.patientId)
    .notNull(),
  relation: text("relation"),
  kinName: text("kin_name"),
  mobileNumber: text("mobile_number"),
  gender: text("gender"),
  clinicalCounsellingGivenTo: text("clinical_counselling_given_to"),
  financialCounsellingGivenTo: text("financial_counselling_given_to"),
  ...common_columns
});

export const referralDetails = pgTable("referral", {
  id: text("id").primaryKey().notNull(),
  patientId: text("patient_id")
    .references(() => patient.patientId)
    .notNull(),
  leadSource: text("lead_source"),
  leadSourceName: text("lead_source_name"),
  leadSourceComment: text("lead_source_comment"),
  referralType: text("referral_type"),
  referralName: text("referral_name"),
  referralComment: text("referral_comment"),
  referredInterFacilityName: text("referred_inter_facility_name"),
  ...common_columns
});

export type ReferralType = InferResultType<"referralDetails">;

export const employerDetails = pgTable("employer", {
  id: text("id").primaryKey().notNull(),
  patientId: text("patient_id")
    .references(() => patient.patientId)
    .notNull(),
  employeeId: text("employee_id"),
  employeeEmail: text("employee_email"),
  employeeMobileNumber: text("employee_mobile_number"),
  relationship: text("relationship"),
  employerName: text("employer_name"),
  employerEmail: text("employer_email"),
  employerMobileNumber: text("employer_mobile_number"),
  employerArea: text("employer_area"),
  employerPincode: text("employer_pincode"),
  employerCity: text("employer_city"),
  employerState: text("employer_state"),
  employerCountry: text("employer_country"),
  ...common_columns
});

export const remarks = pgTable("remarks", {
  id: text("id").primaryKey().notNull(),
  patientId: text("patient_id")
    .references(() => patient.patientId)
    .notNull(),
  remarks: text("remarks")
});

export const s3Test = pgTable("s3_test", {
  id: text("id").primaryKey().notNull(),
  key: text("key").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
