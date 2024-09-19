import { writable } from 'svelte/store';
import type { Course } from './types';

export const selectedCourse = writable<Course>();
export const page_size = 20;
