CREATE TYPE "public"."APPOINTMENT_STATUS" AS ENUM('cancelled', 'completed', 'scheduled', 'no show', 'pending', 'unscheduled');--> statement-breakpoint
CREATE TYPE "public"."BILLING_ITEM_UNITS" AS ENUM('day', 'item', 'hour');--> statement-breakpoint
CREATE TYPE "public"."BLOOD_GROUP" AS ENUM('O+', 'B+', 'A+', 'AB+', 'O-', 'A-', 'B-', 'AB-', '');--> statement-breakpoint
CREATE TYPE "public"."CONSULTANT_TYPE" AS ENUM('consultant', 'unit_admission');--> statement-breakpoint
CREATE TYPE "public"."MEDICINE_CATEGORY" AS ENUM('Allopathy', 'Ayurvedic', 'Cosmetic', 'Drug', 'Surgical', 'Generic', 'OTC');--> statement-breakpoint
CREATE TYPE "public"."ORDER_BOOK_PRIORITY" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
CREATE TYPE "public"."ORDER_STATUS" AS ENUM('Processing', 'Ordered', 'Delivered', 'Cancelled', 'On Hold');--> statement-breakpoint
CREATE TYPE "public"."PAYMENT_STATUS" AS ENUM('pending', 'completed');--> statement-breakpoint
CREATE TYPE "public"."PURCHASE_ORDER_STATUS" AS ENUM('Draft', 'Pending Approval', 'Approved', 'Rejected', 'Created', 'Acknowledged', 'Partially Fulfilled', 'Fulfilled', 'Partially Received', 'Received', 'Invoiced', 'Paid', 'Closed', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."REQUESTED_STATUS" AS ENUM('Approved', 'Pending', 'Declined');--> statement-breakpoint
CREATE TYPE "public"."USER_ROLE" AS ENUM('receptionist', 'nurse', 'doctor', 'admin', 'patient');--> statement-breakpoint
CREATE TYPE "public"."USER_STATUS" AS ENUM('Offline', 'Available', 'Busy', 'Do not disturb', 'Be Right Back');--> statement-breakpoint
CREATE TYPE "public"."VISIT_TYPES" AS ENUM('opd', 'ipd');--> statement-breakpoint
CREATE TABLE "address" (
	"address_id" text PRIMARY KEY NOT NULL,
	"address_type" text,
	"house_number" text,
	"addressLine1" text NOT NULL,
	"addressLine2" text,
	"street_number" text,
	"area" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"pincode" text NOT NULL,
	"primary" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "emergency_contact" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text,
	"mobile_number" text NOT NULL,
	"email" text,
	"relation" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "employer" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"employee_id" text,
	"employee_email" text,
	"employee_mobile_number" text,
	"relationship" text,
	"employer_name" text,
	"employer_email" text,
	"employer_mobile_number" text,
	"employer_area" text,
	"employer_pincode" text,
	"employer_city" text,
	"employer_state" text,
	"employer_country" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "kin" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"relation" text,
	"kin_name" text,
	"mobile_number" text,
	"gender" text,
	"clinical_counselling_given_to" text,
	"financial_counselling_given_to" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "patient" (
	"patient_id" text PRIMARY KEY NOT NULL,
	"title" text,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text,
	"nationality" text,
	"dob" date NOT NULL,
	"gender" text NOT NULL,
	"martial_status" text,
	"blood_group" "BLOOD_GROUP",
	"visit_type" "VISIT_TYPES",
	"father_name" text,
	"mother_name" text,
	"spouse_name" text,
	"mobile" text NOT NULL,
	"alternate_email" text,
	"email" text,
	"img_url" text,
	"is_vip" boolean,
	"name_masking" boolean,
	"mlc" boolean,
	"handle_with_care" boolean,
	"address_id" text,
	"permanent_address_id" text,
	"kin_address_id" text,
	"language" text,
	"religion" text,
	"occupation" text,
	"disabilities_type" text[],
	"race" text[],
	"identification_marks" text,
	"diet_preferences" text,
	"family_income" text,
	"frro_number" text,
	"street_number" text,
	"area" text,
	"identity_type" text,
	"identity_number" text,
	"same_permanent_as_current" boolean,
	"same_kin_as_current" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "patient_identity" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"type" text NOT NULL,
	"file_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "payer" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"payer_name" text,
	"payer_selection" text,
	"payer_type" text,
	"payer_group" text,
	"payer_sub_group" text,
	"insurance_company" text,
	"policy_number" text,
	"policy_limit" text,
	"scheme" text,
	"application_from_date" timestamp,
	"application_to_date" timestamp,
	"required_name" text,
	"base_tarrif" text,
	"capping_percentage" numeric,
	"claim_number" text,
	"tpa_admission_type" text,
	"emplyee_id" text,
	"member_id" text,
	"allow_non_payable_items" boolean,
	"is_co_pay" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "referral" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"lead_source" text,
	"lead_source_name" text,
	"lead_source_comment" text,
	"referral_type" text,
	"referral_name" text,
	"referral_comment" text,
	"referred_inter_facility_name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"create_user_id" text,
	"update_user_id" text,
	"create_function_id" text,
	"update_function_id" text
);
--> statement-breakpoint
CREATE TABLE "remarks" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"remarks" text
);
--> statement-breakpoint
CREATE TABLE "s3_test" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patient_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"phone_number" text,
	"phone_number_verified" boolean,
	CONSTRAINT "patient_user_email_unique" UNIQUE("email"),
	CONSTRAINT "patient_user_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "emergency_contact" ADD CONSTRAINT "emergency_contact_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employer" ADD CONSTRAINT "employer_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kin" ADD CONSTRAINT "kin_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_address_id_address_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("address_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_permanent_address_id_address_address_id_fk" FOREIGN KEY ("permanent_address_id") REFERENCES "public"."address"("address_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_kin_address_id_address_address_id_fk" FOREIGN KEY ("kin_address_id") REFERENCES "public"."address"("address_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "patient_identity" ADD CONSTRAINT "patient_identity_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payer" ADD CONSTRAINT "payer_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referral" ADD CONSTRAINT "referral_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "remarks" ADD CONSTRAINT "remarks_patient_id_patient_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("patient_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_patient_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."patient_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_patient_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."patient_user"("id") ON DELETE cascade ON UPDATE no action;