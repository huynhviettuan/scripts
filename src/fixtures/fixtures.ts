import { mergeTests } from '@playwright/test';
import { test as hookFixtures } from 'src/fixtures/hook-fixtures';
import { test as pageFixtures } from 'src/fixtures/page-fixtures';

export const test = mergeTests(pageFixtures, hookFixtures);
