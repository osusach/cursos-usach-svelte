type Faculty = {
	id: number;
	name: string;
	creation_date: Date;
	modification_date: Date;
};
type Course = {
	id: number;
	name: string;
	creation_date: Date;
	modification_date: Date;
	duration: string;
	vote_count: number;
	difficulty_mean: number;
	time_demand_mean: number;
};
type Career = {
	id: number;
	name: string;
	faculty_id: number;
	creation_date: Date;
	modification_date: Date;
};

export { Faculty, Course, Career };