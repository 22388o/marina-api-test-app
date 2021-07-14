import { Test } from "./runner/types";
import * as assert from 'assert';
import { getMarina } from "./utils/marina";

const marina = getMarina();

const tests: Test[] = [
	{
		name: 'isEnabled should return true',
		function: async () => {
			assert.strictEqual(await marina.isEnabled(), true);
		}
	},
	{
		name: 'enable should throw an error',
		function: async () => {
			try {
				await marina.enable()
			} catch {
				return
			}

			throw new Error('enable() do not throw any errors')
		}
	},
	{
		name: 'getNetwork should return "liquid" or "regtest"',
		function: async () => {
			const network = await marina.getNetwork();
			if (network === 'liquid' || network === 'regtest') return;
			throw new Error('network value is invalid')
		}
	},
	{
		name: 'getNextAddress should generate a new address',
		function: async () => {
			const addrs = await marina.getAddresses();
			const nextAddr = await marina.getNextAddress();

			if (addrs.includes(nextAddr)) {
				throw new Error('next address already included in adddresses array')
			}
		}
	},
	{
		name: 'getNextChangeAddress should generate a new change address',
		function: async () => {
			const addrs = await marina.getAddresses();
			const nextAddr = await marina.getNextChangeAddress();

			if (addrs.includes(nextAddr)) {
				throw new Error('next address already included in adddresses array')
			}
		}
	},
	{
		name: 'getAddresses should return generated addresses',
		function: async () => {
			const addr = await marina.getNextAddress();
			const changeAddr = await marina.getNextChangeAddress();
			const addrs = await marina.getAddresses();

			if (!addrs.map(a => a.confidentialAddress).includes(addr.confidentialAddress))
				throw new Error('getAddresses does not return the next address');

			if (!addrs.map(a => a.confidentialAddress).includes(changeAddr.confidentialAddress))
				throw new Error('getAddresses does not return the next change address');
		}
	},
	{
		name: 'getCoins should return an array',
		function: async () => {
			const coins = await marina.getCoins();
			if (Array.isArray(coins)) return;
			throw new Error('do not return an array')
		},
	},
	{
		name: 'getTransactions should return an array',
		function: async () => {
			const txs = await marina.getTransactions();
			if (Array.isArray(txs)) return;
			throw new Error('do not return an array')
		},
	}, {
		name: 'getBalances should return an array',
		function: async () => {
			const balances = await marina.getBalances();
			if (Array.isArray(balances)) return;
			throw new Error('do not return an array')
		},
	}, {
		name: 'on/off test',
		function: async () => {
			const id = marina.on('DISABLED', () => '')
			const idBis = marina.on('DISABLED', () => '')
			assert.notDeepStrictEqual(id, idBis);
		},
	},
]

export default tests;