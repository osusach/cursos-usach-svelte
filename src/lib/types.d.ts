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
	votes: {
		difficulty_stats: [
			{
				score: number;
				votes: number;
			}
		];
		time_demand_stats: [
			{
				score: number;
				votes: number;
			}
		];
	};
};
type Career = {
	id: number;
	name: string;
	faculty_id: number;
	creation_date: Date;
	modification_date: Date;
};

type User = {
	profile_img: string;
	name: string;
	token: string;
};
type Comment = {
	id: number;
	course_id: number;
	user_id: number;
	parent_id: number;
	reply_count: number;
	content: string;
	upvotes: number;
	creation_date: Date;
	modification_date: Date;
	is_already_voted: boolean;
	user_name: string;
	user_profile_img: string;
};
export { Faculty, Course, Career, User, Comment };
