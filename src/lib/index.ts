import { writable } from 'svelte/store';
import type { Career, Course, Faculty } from './types';
import { persisted } from 'svelte-persisted-store';

export const selectedCourse = writable<Course>();
export const selectedFaculty = persisted<string>('selectedFaculty', '');
export const selectedCareer = persisted<string>('selectedCareer', '');

export const page_size = 20;
export const max_pagination_size = 5;

export function range(size: number, startAt = 0) {
	return [...Array(size).keys()].map((i) => i + startAt);
}
