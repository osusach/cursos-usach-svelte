import { writable } from 'svelte/store';
import type { Career, Course, Faculty } from './types';

export const selectedCourse = writable<Course>();
export const page_size = 20;
export const selectedFaculty = writable<string>('');
export const selectedCareer = writable<string>('');
