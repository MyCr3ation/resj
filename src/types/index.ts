// src/types/index.ts

export interface Experience {
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description: string;
}

export interface Education {
	institution: string;
	degree: string;
	startDate: string;
	endDate: string;
	description: string;
}

export interface ResumeFormData {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	summary: string;
	experiences: Experience[];
	education: Education[];
	skills: string[];
	templateId: number;
}
