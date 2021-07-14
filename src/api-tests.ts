import { Test } from "./runner/types";
import * as assert from 'assert';

const tests: Test[] = [
	{
		name: 'success test',
		function: async () => {
			assert.strictEqual(true, true)
		}
	},
	{
		name: 'fail test',
		function: async () => {
			assert.strictEqual(true, false)
		}
	},
	{
		name: 'success test',
		function: async () => {
			assert.strictEqual(true, true)
		}
	},
	{
		name: 'fail test',
		function: async () => {
			assert.strictEqual(true, false)
		}
	},
	{
		name: 'success test',
		function: async () => {
			assert.strictEqual(true, true)
		}
	},
	{
		name: 'fail test',
		function: async () => {
			assert.strictEqual(true, false)
		},
	},
	{
		name: 'fail test',
		function: async () => {
			assert.strictEqual(true, false)
		},
	}, {
		name: 'fail test',
		function: async () => {
			assert.strictEqual(true, false)
		},
	}, {
		name: 'fail test',
		function: async () => {
			assert.strictEqual(true, false)
		},
	},
]

export default tests;