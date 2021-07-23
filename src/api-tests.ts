import { Test } from "./runner/types";
import * as assert from 'assert';
import { MarinaEventType } from "marina-provider";
import { getMarina } from "./utils/marina";


const tests: Test[] = [
	// isEnabled
	{
		name: 'isEnabled should return true',
		function: async () => {
			const marina = await getMarina();
			assert.strictEqual(await marina.isEnabled(), true);
		}
	},
	// enable
	{
		name: 'enable should throw an error',
		function: async () => {
			try {
				const marina = await getMarina();
				await marina.enable()
			} catch {
				return
			}

			throw new Error('enable() do not throw any errors')
		}
	},
	// getNetwork
	{
		name: 'getNetwork should return "liquid" or "regtest"',
		function: async () => {
			const marina = await getMarina();
			const network = await marina.getNetwork();
			if (network === 'liquid' || network === 'regtest') return;
			throw new Error('network value is invalid')
		}
	},
	// getNextAddress
	{
		name: 'getNextAddress should generate a new address',
		function: async () => {
			const marina = await getMarina();
			const addrs = await marina.getAddresses();
			const nextAddr = await marina.getNextAddress();

			if (addrs.includes(nextAddr)) {
				throw new Error('next address already included in adddresses array')
			}
		}
	},
	// getNextChangeAddress
	{
		name: 'getNextChangeAddress should generate a new change address',
		function: async () => {
			const marina = await getMarina();
			const addrs = await marina.getAddresses();
			const nextAddr = await marina.getNextChangeAddress();

			if (addrs.includes(nextAddr)) {
				throw new Error('next address already included in adddresses array')
			}
		}
	},
	// getAddresses
	{
		name: 'getAddresses should return generated addresses',
		function: async () => {
			const marina = await getMarina();
			const addr = await marina.getNextAddress();
			const changeAddr = await marina.getNextChangeAddress();
			const addrs = await marina.getAddresses();

			if (!addrs.map(a => a.confidentialAddress).includes(addr.confidentialAddress))
				throw new Error('getAddresses does not return the next address');

			if (!addrs.map(a => a.confidentialAddress).includes(changeAddr.confidentialAddress))
				throw new Error('getAddresses does not return the next change address');
		}
	},
	// getCoins
	{
		name: 'getCoins should return an array',
		function: async () => {
			const marina = await getMarina();
			const coins = await marina.getCoins();
			if (Array.isArray(coins)) return;
			throw new Error('do not return an array')
		},
	},
	// getTransactions
	{
		name: 'getTransactions should return an array',
		function: async () => {
			const marina = await getMarina();
			const txs = await marina.getTransactions();
			if (Array.isArray(txs)) return;
			throw new Error('do not return an array')
		}
	},
	// getBalances 
	{
		name: 'getBalances should return an array',
		function: async () => {
			const marina = await getMarina();
			const balances = await marina.getBalances();
			if (Array.isArray(balances)) return;
			throw new Error('do not return an array')
		}
	},
	// on/off 
	{
		name: 'on() should return random event id',
		function: async () => {
			const marina = await getMarina();
			const id = marina.on('DISABLED', () => '')
			const idBis = marina.on('DISABLED', () => '')
			assert.notDeepStrictEqual(id, idBis);
		},
	},
	{
		name: 'on() should throw an error with invalid event type name',
		function: async () => {
			const marina = await getMarina();
			const id = marina.on('DISABLED', () => '')
			const idBis = marina.on('DISABLED', () => '')

			assert.throws(() => {
				marina.on('notamarinaeventType' as MarinaEventType, () => '');
			})

			assert.notDeepStrictEqual(id, idBis);
		},
	},
]

export default tests;